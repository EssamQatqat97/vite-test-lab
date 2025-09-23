#!/bin/sh
# Instruct the shell to exit if any command fails, this helps to fail fast in case of errors related to file permissions, existance, etc... (Since we will do a few file operations here)
set -e

# If no db.json exists in the writable data dir (e.g. first run of a named volume), seed it
if [ ! -f /data/db.json ]; then
  cp /seed/db.json /data/db.json
fi

json-server --host 0.0.0.0 --watch /data/db.json --port 3001 &

serve -s dist -l 3000