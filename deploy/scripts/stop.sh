#!/bin/bash

SERVICE_PID=`ps -ef | grep -ie '-p 6060'  | grep -v grep | awk '{print $2}'`
APPLICATION_NAME='ifs'

echo "SERVICE_PID = ${SERVICE_PID}"
if [[ "" !=   "$SERVICE_PID" ]]; then
        echo
        echo "==[${APPLICATION_NAME}](${SERVICE_PID}) stoping..."
        kill -15 $SERVICE_PID
        echo "==[${APPLICATION_NAME}](${SERVICE_PID}) stopped..."
        echo
else
        echo
        echo "==[${APPLICATION_NAME}] service is NOT running..."
        echo
fi
