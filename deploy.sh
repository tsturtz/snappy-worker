#!/bin/bash

#copy build
tar czf build.tar.gz public build
scp build.tar.gz deployer@82.148.19.60:~
rm -rf build.tar.gz

#running
ssh deployer@82.148.19.60 << 'ENDSSH'
pm2 stop snappy-worker
rm -rf snappy-worker
mkdir snappy-worker
tar xf build.tar.gz -C snappy-worker
rm -rf build.tar.gz
pm2 start snappy-worker
ENDSSH