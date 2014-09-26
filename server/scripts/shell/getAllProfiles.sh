#!/bin/bash
# this script returns information about all profiles from attng
export PYTHONPATH=/opt/attng/bin/attng/src
export PATH=/usr/local/bin:/usr/bin:$PATH
python2.7 ./scripts/python/profilesJSON.py