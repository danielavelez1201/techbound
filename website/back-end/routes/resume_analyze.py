import dotenv
from dotenv import load_dotenv
load_dotenv()
import boto3
import sys
import os
access_key = os.environ.get('access-key')
secret_access_key = os.environ.get('secret-access-key')

print(access_key)
print(secret_access_key)
textract = boto3.client(
    service_name="textract",
    region_name="us-east-2",
    aws_access_key_id= access_key,
    aws_secret_access_key= secret_access_key,

)

s3 = boto3.resource('s3')

response = textract.start_document_text_detection(
    DocumentLocation={
        'S3Object': {
            'Bucket': 'techbound-resumes',
            'Name': str(sys.argv[1])
        }}
)

columns = []
lines = []

status = "IN_PROGRESS"

while status == "IN_PROGRESS":
    results = textract.get_document_text_detection(
        JobId=response['JobId']
    )
    status = results["JobStatus"]

blocks = results["Blocks"]
print(blocks[0])
for item in blocks:
    if item["BlockType"] == "LINE":
        print(item["Text"])
