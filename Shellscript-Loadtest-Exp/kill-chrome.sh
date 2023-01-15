#!/bin/bash

BASE_INDEX=$1
BASE_INDEX="${BASE_INDEX:=1}"

TOTAL_SESSIONS=300

TASK=$(az batch task list --job-id myjob001 | grep task- | grep id | wc -l)
TASK=$(($TASK+1))

for i in {1..1}
do
   let START_INDEX=$BASE_INDEX+$(($i-1))*$TOTAL_SESSIONS
   let END_INDEX=$START_INDEX+$TOTAL_SESSIONS-1
   TASK_ID=task-$TASK-$i

   echo [$TASK_ID]: $i $START_INDEX $END_INDEX

   az batch task create \
    --task-id $TASK_ID \
    --job-id myjob001 \
    --command-line "/bin/bash -c 'killall -9 chrome'"
done
