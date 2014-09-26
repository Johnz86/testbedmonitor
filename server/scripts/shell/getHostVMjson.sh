#!/bin/bash
# usage getJsonHostVM.sh <servername>
# returns the amount of RAM in megabytes for requested xen virtula machine 

SERVER=$1

. scripts/shell/common.sh

ssh $SSHOPTS -i $SSHKEY root@$SERVER xm list | awk 'BEGIN{print "[ "}; END{print "{\42testbed_count\42: "NR"}]"}; NR > 1 { format = "{\42hostname\42 : \42%s\42, \42id\42 : %s, \42memory\42 : %s, \42cpu\42 : %s, \42state\42 : \42%s\42, \42time\42 : %s },"; if (NF == 6) {gsub(/r-----$/, "running", $5); gsub(/-b----$/, "blocked", $5); gsub(/--p---$/, "paused", $5); gsub(/---s--$/, "shutdown", $5); gsub(/----c-$/, "crushed", $5); gsub(/-----d$/, "dying", $5); printf format,$1,$2,$3,$4,$5,$6; } else printf format,$1,"\42-\42",$2,$3,"down",$4; }'
