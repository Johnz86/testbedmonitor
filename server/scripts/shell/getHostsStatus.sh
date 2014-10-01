#!/bin/bash
#return status of virtual hosts servers in json format with status.
verlte() {
    [  "$1" = "`echo -e "$1\n$2" | sort -V | head -n1`" ]
}

verlt() {
    [ "$1" = "$2" ] && return 1 || verlte $1 $2
}
NMAP_VERSION=`nmap -V | grep version | cut -d' ' -f3`

if verlt 6.00 $NMAP_VERSION; then
   nmap --system-dns -v -R -sP -oG - `cat /opt/attng/bin/attng/src/att/resources/VMHosts.txt | grep ipAddress | cut -d' ' -f3` |  awk 'BEGIN{print "[ "}; END{print "{\42host_count\42: "NR"}]"}; /Host/ {gsub(/[()]/,"",$3); format = "{\42hostname\42 : \42%s\42, \42ipadress\42 : \42%s\42, \42status\42 : \42%s\42},"; printf format,$3,$2,$5;}'
else
  nmap -sP -R  `cat /opt/attng/bin/attng/src/att/resources/VMHosts.txt | grep ipAddress | cut -d' ' -f3`  | awk 'BEGIN{print "[ "}; END{print "{\42host_count\42: "NR"}]"}; /Host/ {gsub(/[()]/,"",$3); format = "{\42hostname\42 : \42%s\42, \42ipadress\42 : \42%s\42, \42status\42 : \42%s\42},"; printf format,$2,$3,$7;}'
fi