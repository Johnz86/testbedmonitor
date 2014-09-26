import os
import pickle
import ConfigParser
import collections
import json
import re

def getProfileFileFromPath(profilePath, fileFormat = ".txt"):
    return os.path.join(profilePath, os.path.basename(profilePath)+fileFormat)

def loadProfileFromConfig(profilePath):
    config = ConfigParser.ConfigParser()
    config.read(profilePath)
    return collections.OrderedDict(config._sections)
    
def getEtcHosts():
    """Read the hosts file at the given location and parse the contents"""
    hosts = {}
    with open('/etc/hosts', 'r') as hosts_file:
        for line in hosts_file.read().split('\n'):
            if len(re.sub('\s*', '', line)) and not line.startswith('#'):
                parts = re.split('\s+', line)
                ip_address = parts[0]
                for host_name in parts[1:]:
                    hosts[host_name] = ip_address
        return hosts
        
def injectHostIPtoProfileData(data, hosts):
    for item in data:
        if (item not in ['MAIN','DATA_SOURCES']):
            data[item].update({"ipaddress": hosts.get(data[item]['servername'], "undefined")})
        
def getProfilesJSON():
    hosts = getEtcHosts()
    pickleData = open('/opt/attng/bin/attng/src/att/resources/resourceCache.pickle','rb')
    resource = pickle.load(pickleData)
    profiles = resource.getProfiles()
    jsonResult = []
    for profile in profiles:
        profileData = loadProfileFromConfig(getProfileFileFromPath(profile))
        injectHostIPtoProfileData(profileData, hosts)
        jsonProfile = {"profile":profile, "setup":profileData}
        jsonResult.append(jsonProfile)
    return json.dumps(jsonResult)

print getProfilesJSON()