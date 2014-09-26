#!/bin/bash
#return status of virtual hosts servers in json format with status.
nmap -sP -R  10.66.1-22.254 10.66.40.254 10.66.50.254  | awk 'BEGIN{print "[ "}; END{print "{\42host_count\42: "NR"}]"}; /Host/ {gsub(/[()]/,"",$3); format = "{\42hostname\42 : \42%s\42, \42ipadress\42 : \42%s\42, \42status\42 : \42%s\42},"; printf format,$2,$3,$7;}'
