 #!/usr/bin/env python
"""Nice sprites generates a scratch compatible sprite
using only the user's camera. 
All code is within the spritify() function."""


# this has to go above everything else so that it is written before the file runs
# in testing, this is mildy irritating but not a problem
print("""Welcome to TURN ME INTO A SPRITE!
By Dave Davies :)

-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

If this is your first time running, it might take up to a minute to actually load everything.
Please be patient while the code finds its feet.

When the code actually runs, you will see two windows:
1. Your fantastic face
2. How much you and your surroundings are moving

If you strike a pose and freeze for a while, an image will be saved.
You can also press space to save an image.

When you've saved as many images as you want, press and hold q.
Then, a sprite file will be created wherever you saved this file!
It will contain all the images you just took.

Go to the scratch website and "upload a sprite".
Then find the file you just made (which will look like 12345678901234.sprite3)
And you'll see yourself on scratch!

-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

Happy coding ~
""")

from datetime import datetime
from datetime import timedelta
import csv
import hashlib
import imghdr
import json
import math
import numpy as np
import os
import shutil
import statistics

# require pip installs
# pip install rembg
from rembg import remove
# pip install opencv-python
import cv2 as cv



__author__ = "Dave Davies"
__copyright__ = "Copyright 2024, Turn Me Into A Sprite"
__credits__ = ["Hannah Dee", "Dave Price"]
__version__ = "1.0.0"
__maintainer__ = "Dave Davies"
__email__ = "dad58@aber.ac.uk"
__status__ = "Release"



# back_sub = the background subtraction algorithm
# vid_in = video input, either a number for live camera or a path for a video
# sprite_name = the name of the resulting sprite (recommend use something that doesn't duplicate such as the date+time)
# sprite_location = where the sprite will be saved
# frames_length = the history of frames as saved in the queue built here
def spritify(back_sub, vid_in, sprite_name, sprite_location, frames_length):

    # if enabled, a csv file will be generated showing all the data per frame
    # and debugging print statements are enabled
    testing = False

    # gonna hold the most recent frames
    frames = []
    frame_num = 0
    white_pixels = 0 # denotes motion
    saved_image_count = 0

    # https://www.programiz.com/python-programming/datetime/strftime
    last_frame = datetime.now()

    # https://docs.opencv.org/4.x/dd/d43/tutorial_py_video_display.html#:~:text=To%20capture%20a%20video%2C%20you,(as%20in%20my%20case).
    cap = cv.VideoCapture(vid_in)
    if not cap.isOpened():
        print("Cannot open camera")
        exit()

    last_frame = datetime.now()

    # https://sokacoding.medium.com/simple-motion-detection-with-python-and-opencv-for-beginners-cdd4579b2319
    # motion detection

    # make a new folder to put the images in
    new_dir = os.path.join(sprite_location, sprite_name)
    os.mkdir(new_dir)

    if testing:
        saving = 0
        with open(os.path.join(sprite_location,sprite_name+'.csv'), 'a', newline='') as file:
                writer = csv.writer(file)
                writer.writerow(["White pixels","Mean","Std Dev","Save"])
        
    while True:
        # Capture frame-by-frame
        ret, frame = cap.read()
        # if frame is read correctly ret is True
        if not ret:
            print("Can't receive frame (stream end?). Exciting ...")
            break

        # produces a mask that shows motion
        # -1 refers to automatically calculating number of peaks
        fgMask = back_sub.apply(frame, -1)

        # counts white pixels on mask
        white_pixels = np.count_nonzero(fgMask)
        
        # calculated standard deviation of frames in queue
        if frame_num > frames_length:
            std_devs = []
            for i in range(frames_length-1):
                if not i > frame_num and i < frame_num + math.ceil(frames_length / 5):
                    std_devs.append(frames[i][3])
            std_dev = statistics.stdev(std_devs)
        else:
            std_dev = 0 

        if testing:
            print("std dev =",std_dev)

        # displays instructions on the video feed
        # top left
        cv.rectangle(fgMask, (2, 2), (160,65), (255,255,255), -1)
        cv.putText(fgMask, "to save an image", (4, 15),
                cv.FONT_HERSHEY_SIMPLEX, 0.5 , (0,0,0))
        cv.putText(fgMask, "move then FREEZE!", (4, 30),
                cv.FONT_HERSHEY_SIMPLEX, 0.5 , (0,0,0))
        cv.putText(fgMask, "for five seconds", (4, 45),
                cv.FONT_HERSHEY_SIMPLEX, 0.5 , (0,0,0))
        cv.putText(fgMask, "or press space...", (4, 60),
                cv.FONT_HERSHEY_SIMPLEX, 0.5 , (0,0,0))     
        # bottom right
        cv.rectangle(fgMask, (475, 455), (638,478), (255,255,255), -1)
        cv.putText(fgMask, "press q when done", (480, 470),
                cv.FONT_HERSHEY_SIMPLEX, 0.5 , (0,0,0))
        

        # Display the resulting frame
        cv.imshow('Soon to be sprite', frame)
        cv.imshow('Motion', fgMask)

        # Our operations on the frame come here
        frame = cv.cvtColor(frame, cv.COLOR_BGR2BGRA) 

        # effectively turns frames into a queue
        frame_num += 1
        mean = 0

        # updates queue
        if frames_length >= frame_num:
            frames.append([frame_num,frame,fgMask,white_pixels,std_dev])
        else:
            frames[frame_num%frames_length] = [frame_num,frame,fgMask,white_pixels,std_dev]
            for frame in frames:
                mean += frame[3]
            mean = mean/frames_length

        
        if testing:
            with open(os.path.join(sprite_location,sprite_name+'.csv'), 'a', newline='') as file:
                writer = csv.writer(file)   
                writer.writerow([white_pixels,mean,std_dev,saving])
                saving = 0

        # time delay between saving frames
        pause = timedelta(days=0, seconds=5, microseconds=0, milliseconds=0, minutes=0, hours=0, weeks=0)

        # if there's been below the threshold of motion
        # and there's been an appropriate delay since the last image
        # and there's been enough frames to fill up the queue
        # and we're not going out of bounds
        # or
        # the user presses space
        # and there's been enough frames to fill up the queue
        # and we're not going out of bounds
        if std_dev < 2000 and \
            datetime.now() - pause > last_frame and \
            frame_num > frames_length+1 and \
            frame_num%frames_length+1<len(frames) \
            or \
            cv.waitKey(1) == ord(" ") and\
            frame_num > frames_length+1 and \
            frame_num%frames_length+1<len(frames):
            
            # display the fact that an image is being saved
            cv.rectangle(fgMask, (475, 455), (700,600), (255,255,255), -1)
            cv.putText(fgMask, "saving one image...", (480, 470),
                    cv.FONT_HERSHEY_SIMPLEX, 0.5 , (0,0,0))
            cv.imshow('Motion', fgMask)
            cv.waitKey(2000)

            # write the frame 
            cv.imwrite(os.path.join(new_dir,"frame%d.png") % saved_image_count, remove(frames[(frame_num%frames_length)+1][1]))

            # provide information
            if testing:
                print("the length of frames is "+str(len(frames)))
                print("frame num = "+str(frame_num))
                print("frames length = "+str(frames_length))
                print('Read a new frame: ', frames[frame_num%frames_length+1][1])
                saving = 300000

            saved_image_count += 1

            # reset the time of the last frame saved to now,
            # so that it can wait for 5 seconds before saving another frame
            last_frame = datetime.now()

            

        # stop 
        if cv.waitKey(1) == ord('q') or cv.waitKey(1) == 27: # escape = 27
            break
    # When everything done, release (stop) the capture
    cap.release()
    cv.destroyAllWindows()

    
    if testing:
        # https://www.pythoncheatsheet.org/cheatsheet/file-directory-path
        print(sprite_location)
        # https://stackoverflow.com/questions/3207219/how-do-i-list-all-files-of-a-directory
        print(os.listdir())

    # gets a list of directories
    onlydirs = [f for f in os.listdir(sprite_location) if os.path.isdir(os.path.join(sprite_location, f))]

    # iterates through the directories
    for directory in onlydirs:
        # only do this if the sprite doesn't already exist (allows for batch spritifying)
        # and only do if made of digits
        # and only do if the length is the same that my format produces (making sure it is my sprite images, not a different random folder)
        if directory+".sprite3" not in os.listdir() and directory.isdigit() and len(directory) == 14:
            
            # gets me to each actual path of the lower directories
            full_dir = os.path.join(sprite_location,directory)
            if testing:
                print(full_dir)

            # gets a list of all files in this directory
            onlyfiles = [f for f in os.listdir(full_dir) if os.path.isfile(os.path.join(full_dir, f))]

            images = []

            # creates the image information for the json
            for x in onlyfiles:
                img_path = os.path.join(full_dir,x)
                print(img_path)
                if imghdr.what(img_path):

                    # Python program to find MD5 hash value of a file
                    # https://www.quickprogrammingtips.com/python/how-to-calculate-md5-hash-of-a-file-in-python.html
                    # https://www.geeksforgeeks.org/md5-hash-python/
                    md5_hash = hashlib.md5()
                    with open(img_path,"rb") as f:
                        # Read and update hash in chunks of 4K
                        for byte_block in iter(lambda: f.read(4096),b""):
                            md5_hash.update(byte_block)
                        md5 = md5_hash.hexdigest()

                    os.rename(img_path, os.path.join(sprite_location,directory,md5+".png"))

                    images.append({"name":str(os.path.basename(img_path)),
                                "bitmapResolution":2,

                                # https://www.programiz.com/python-programming/examples/file-name-from-file-path
                                "dataFormat":str(os.path.splitext(os.path.basename(img_path))[1][1:]),
                                "assetId":md5,
                                "md5ext":md5+".png",
                                "rotationCenterX":256,
                                "rotationCenterY":256},)

            # a Python object (dict):
            sprite = {"isStage":False,
            "name":"Sprite",
            "variables":{},
            "lists":{},
            "broadcasts":{},
            "blocks":{},
            "comments":{},
            "currentCostume":0,
            "costumes":images,
            "sounds":[],
            "volume":100,
            "visible":True,
            "x":-30,
            "y":5,
            "size":100,
            "direction":90,
            "draggable":False,
            "rotationStyle":"all around"
            }

            # convert into JSON:
            json_sprite = json.dumps(sprite)

            # the result is a JSON string:
            if testing:
                print(json_sprite)

            # https://www.geeksforgeeks.org/reading-and-writing-json-to-a-file-in-python/
            # https://www.w3schools.com/python/python_json.asp
            # Writing to sprite.json
            with open(os.path.join(full_dir,"sprite.json"), "w") as outfile:
                outfile.write(json_sprite)  

            # https://stackoverflow.com/questions/1855095/how-to-create-a-zip-archive-of-a-directory
            shutil.make_archive(full_dir, 'zip', full_dir)

            os.rename(full_dir+".zip", full_dir+".sprite3")


# back_sub = cv.createBackgroundSubtractorKNN()
back_sub = cv.createBackgroundSubtractorMOG2(400, 16, False)
frames_length = 100
sprite_name = datetime.now().strftime("%Y%m%d%H%M%S")

# enable if this file is meant to run by itself
# comment out if running via datainator
spritify(back_sub, 0, sprite_name, os.getcwd(), frames_length)
