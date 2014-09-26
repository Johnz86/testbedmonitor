#!/bin/bash
# usage: ./$0 <servername>
# returns hdd info of target server in text format, multiple lines, space separated
# line x: "Filesystem Size Used Avail Use% MountedOn"
# where Size Used Avail are decimal numbers in kB
# if server is down or cannot be contacted, nothing is returned  

. scripts/shell/common.sh

SERVER=$1

if [ "${SERVER}xxx" == "xxx" ]; then
   HDDINFO=""
else
   HDDINFO=`ssh ${SSHOPTS} -i $SSHKEY root@${SERVER} "df -k | grep -E '/dev/md|/dev/sd|/dev/xv'"` 2>&1 > /dev/null
   if [ "${HDDINFO}xxx" == " xxx" ]; then
      HDDINFO=""
   fi
fi

echo "${HDDINFO}"
exit 0

