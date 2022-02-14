import sys
import os
import pymongo
from dotenv import load_dotenv
import json
import re
import datetime

load_dotenv()
URI = os.getenv('CONNSTR')
filename = sys.argv[1]

conn = pymongo.MongoClient(URI)
handle = conn["ig"]["blog"]

f = open(filename)
fh = f.readlines()
sections = ''.join(fh).split("-----\n")

newDoc = json.loads(sections[0])
newDoc["markdown"] = sections[1]
newDoc["html"] = sections[1]
newDoc["slug"] = re.sub('[^0-9a-zA-Z]+', '-', newDoc["title"].lower())
newDoc["published_at"] = datetime.datetime.strptime(newDoc["published_at"], "%Y-%m-%d")

print(newDoc)

if("_id" in newDoc):
    result = handle.replace_one({"_id": newDoc["_id"]}, newDoc)
    print("Replacing " + newDoc["_id"])
else:
    result = handle.insert_one(newDoc)
    print("Inserted " + str(result.inserted_id))