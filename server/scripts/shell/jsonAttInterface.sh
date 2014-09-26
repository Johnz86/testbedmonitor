#!/bin/bash
# usage: ./$0 <servername>
# this script returns owner of the server based on data in resource cache

. scripts/shell/common.sh

JSON_MESSAGE=$1

export PATH=/usr/bin:/usr/local/bin:$PATH
sudo attngWebFunctions $JSON_MESSAGE

