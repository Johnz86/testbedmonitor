#!/bin/bash
# usage getDiskInfo.sh <servername>
# returns the disk information from machine 

df -hPl | awk 'BEGIN{print "[ "}; END{print "{\42filesystems\42: "NR"}]"}; NR > 1 { format = "{\42filesystem\42 : \42%s\42, \42blocks\42 : \42%s\42, \42used\42 : \42%s\42, \42available\42 : \42%s\42, \42use\42 : \42%s\42, \42mounted\42 : \42%s\42 },"; printf format,$1,$2,$3,$4,$5,$6; }'
