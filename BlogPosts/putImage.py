import sys
import os
import boto3
from dotenv import load_dotenv

load_dotenv()
AWS_AK = os.getenv('AWSACCESSKEY')
AWS_SK = os.getenv('AWSSECRET')
BUCKET = os.getenv('AWSBUCKET')
FOLDER = os.getenv('AWSLANDINGFOLDER')

filepath = sys.argv[1]
filepathSplit = filepath.split("/")

session = boto3.Session(aws_access_key_id=AWS_AK,aws_secret_access_key=AWS_SK)
s3 = session.resource('s3')

result = s3.Bucket(BUCKET).upload_file(filepath, FOLDER+"/"+filepathSplit[-1],  ExtraArgs={'ACL':'public-read'})

print(result)
print("Check: https://" + BUCKET +".s3.amazonaws.com/" + FOLDER + "/" + filepathSplit[-1])