#! /bin/bash
docker build . -t o1amide/gittz:latest
docker push o1amide/gittz:latest
ssh root@137.184.1.172  "docker pull o1amide/gittz:latest && docker tag o1amide/gittz:latest dokku/gittz:latest && dokku tags:deploy gittz latest"
