#!/bin/bash
google-chrome --enable-logging=stderr --v=0  --vmodule=*/webrtc/*=1  --use-fake-device-for-media-stream  --use-fake-ui-for-media-stream --headless --remote-debugging-port=$2   "$1"  > chrome$2.log 2>&1 &
