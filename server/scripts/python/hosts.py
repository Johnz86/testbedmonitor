import re

def getEtcHosts():
    """Read the hosts file at the given location and parse the contents"""
    with open('/etc/hosts', 'r') as hosts_file:
        for line in hosts_file.read().split('\n'):
            if len(re.sub('\s*', '', line)) and not line.startswith('#'):
                parts = re.split('\s+', line)
                ip_address = parts[0]
                for host_name in parts[1:]:
                    hosts[host_name] = ip_address
        return hosts
        
print getEtcHosts()