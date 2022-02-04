#!/bin/sh

export GOOGLE_APPLICATION_CREDENTIALS="/scripts/credentials.json"
cd /scripts/
npm run checkDiff
