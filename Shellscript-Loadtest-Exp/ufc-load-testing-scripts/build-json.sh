#!/bin/bash

# common configurable parameters
CLASS_URL=https://xxxx
SHARE_LOAD_AUDIO=true
SHARE_LOAD_VIDEO=true
SHOW_ACTIVITY=true
SHOW_VIDEO=true
BASE_INDEX=801 # must start at 500 since this is starting point of testing
TOTAL_SESSIONS=200

JOB_NAME=myjob005
FILENAME=tasks.json

# This is used to slow down rate of users logging into system
# Please note: total number of nodes in pool will impact the rate as well
TASK_SLEEP=0.25

# This is for generating new task to avoid having to come up with unique name each time
TASK_UID=$(date '+%Y%m%d-%H%M%S')

echo [ > $FILENAME

for (( i=0; i<$TOTAL_SESSIONS; i++ ))
do
   let INDEX=$BASE_INDEX+$i
   TASK_ID=task-$TASK_UID-$i

   echo [$TASK_ID]: $i $INDEX

   echo {\"id\": \"$TASK_ID\", \"commandLine\": \"/bin/bash -c \'"wget https://xxx/test/launch.sh && chmod +x launch.sh && curl -s https://xxxx/test/run.sh | CLASS_URL=$CLASS_URL SHARE_LOAD_AUDIO=$SHARE_LOAD_AUDIO SHARE_LOAD_VIDEO=$SHARE_LOAD_VIDEO SHOW_ACTIVITY=$SHOW_ACTIVITY SHOW_VIDEO=$SHOW_VIDEO TASK_SLEEP=$TASK_SLEEP bash -s $INDEX 1"\'\" } >> $FILENAME

   if [ $i -lt $TOTAL_SESSIONS ]
   then
      echo , >> $FILENAME
   fi
done

echo ] >> $FILENAME
