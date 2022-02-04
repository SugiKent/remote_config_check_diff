#!/bin/sh

export GOOGLE_APPLICATION_CREDENTIALS="/scripts/credentials.json"
cd /scripts/
cat /scripts/credentials.json
npm run checkDiff
