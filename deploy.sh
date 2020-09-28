#!/bin/bash

tar czf project.tar.gz src .env package.json package-lock.json tsconfig.json
scp project.tar.gz root@82.148.19.60:~
rm -rf project.tar.gz

ssh root@82.148.19.60 << 'ENDSSH'
pm2 stop snappy-worker
rm -rf snappy-worker
mkdir snappy-worker
tar xf project.tar.gz -C snappy-worker
rm -rf project.tar.gz
cd snappy-worker
npm ci
npm run build
pm2 start snappy-worker
ENDSSH