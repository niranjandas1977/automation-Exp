#!/bin/bash

MAIN_URL_DEFAULT=https://xxxxxxxxx
MAIN_URL="${MAIN_URL:=$MAIN_URL_DEFAULT}"
AUDIO_DEFAULT=true
AUDIO="${AUDIO:=$AUDIO_DEFAULT}"
VIDEO_DEFAULT=true
VIDEO="${VIDEO:=$VIDEO_DEFAULT}"

TASK_SLEEP_DEFAULT=1
# TASK_SLEEP_DEFAULT=0.1
TASK_SLEEP="${TASK_SLEEP:=$TASK_SLEEP_DEFAULT}"

PASSWORD_DEFAULT='xxxxxx'
PASSWORD="${PASSWORD:=$PASSWORD_DEFAULT}"

START=$1
START="${START:=5001}"

COUNT=$2
COUNT="${COUNT:=100}"
END=$START+$COUNT-1

EMAIL_BASENAME_DEFAULT='xxxxxxxx'
EMAIL_BASENAME="${EMAIL_BASE:=$EMAIL_BASENAME_DEFAULT}"

EMAIL_DOMAIN=@xxxx.com

let LIMIT=$START+64

for (( i=$START; i<=$END; i++ ))
do
    USERNAME=$EMAIL_BASENAME$i$EMAIL_DOMAIN

    if [ $i -lt $LIMIT ]
    then
        FULL_URL=$MAIN_URL\?video=true\&audio=true\&password=$PASSWORD\&username=$USERNAME
    else
        FULL_URL=$MAIN_URL\?video=false\&audio=false\&password=$PASSWORD\&username=$USERNAME
    fi

    echo $i $FULL_URL
    ./launch.sh $FULL_URL $i

    sleep $TASK_SLEEP

    echo $(ps aux | grep chrome | wc -l)
done

sleep 10
echo $(ps aux | grep chrome | wc -l)