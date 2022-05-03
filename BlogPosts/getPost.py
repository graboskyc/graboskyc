import sys
import os
import pymongo
from dotenv import load_dotenv
import json
import re
import datetime
from bson.objectid import ObjectId

load_dotenv()
URI = os.getenv('CONNSTR')
id = sys.argv[1]

conn = pymongo.MongoClient(URI)
handle = conn["ig"]["blog"]

doc = handle.find_one({"_id": ObjectId(id) })

filename = "Content/"+ doc["published_at"].split(" ")[0] + "_" + doc["slug"] + ".md"

f = open(filename, "w")

content = """{
    "_id"               : "%s",
    "title"             : "%s",
    "type"              : "%s",
    "status"            : "%s",
    "feature_image"     : "%s",
    "published_at"      : "%s",
    "tags"              : %s
}
""" % (id, doc["title"], doc["type"], doc["status"], doc["feature_image"], doc["published_at"], str(doc["tags"]).replace("'", '"') )

content = content + "-----\n"
content = content + doc["html"]

f.write(content)
f.close()

print("Wrote out to " + filename)