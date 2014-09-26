import os
import pickle
import ConfigParser
import collections
import json

def getProfileFileFromPath(profilePath, fileFormat = ".txt"):
    return os.path.join(profilePath, os.path.basename(profilePath)+fileFormat)

def loadProfileFromConfig(profilePath):
    config = ConfigParser.ConfigParser()
    config.read(profilePath)
    return collections.OrderedDict(config._sections)

def getProfilesJSON():
    pickleData = open('/opt/attng/bin/attng/src/att/resources/resourceCache.pickle','rb')
    resource = pickle.load(pickleData)
    profiles = resource.getProfiles()
    jsonResult = []
    for profile in profiles:
        profileData = loadProfileFromConfig(getProfileFileFromPath(profile))
        jsonProfile = {"profile":profile, "setup":profileData}
        jsonResult.append(jsonProfile)
    return json.dumps(jsonResult)

print getProfilesJSON()
