#!/bin/bash

docker run \
-d \
-p 3001:3001 \
--name result-app \
--network host \
result-app:latest
