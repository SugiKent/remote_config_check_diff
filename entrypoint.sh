#!/bin/sh

export GOOGLE_APPLICATION_CREDENTIALS="/scripts/credentials.json"
ls -la /scripts/
# /scripts/credentials.json が多分空
cd /scripts/
npm run checkDiff
