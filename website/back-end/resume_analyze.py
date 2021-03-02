import boto3
import sys

textract = boto3.client(
    service_name="textract",
    region_name="us-west-2",
    aws_access_key_id=,
    aws_secret_access_key="YhirouUihghSdVxxBFyaw3lygSAK+sS4U22CNI5m",

)

s3 = boto3.resource('s3')

response = textract.start_document_text_detection(
    DocumentLocation={
        'S3Object': {
            'Bucket': 'techbound',
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
