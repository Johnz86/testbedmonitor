#!/bin/bash
#sets up the private keys for ssh connection
export SSHOPTS="-o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -o ConnectTimeout=1 -o NumberOfPasswordPrompts=0 -o LogLevel=quiet"
export SSHKEY=/srv/www/htdocs/testbedmonitor/scripts/shell/testbedManagerKey.private
