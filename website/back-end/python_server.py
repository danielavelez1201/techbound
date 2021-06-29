from flask import Flask
import dotenv
from dotenv import load_dotenv
load_dotenv()
import boto3
import sys
import os
import openai

access_key = os.environ.get('ACCESS_KEY')
secret_access_key = os.environ.get('AWS_SECRET')
openai.api_key = os.environ.get('OPENAI_API_KEY')

app = Flask(__name__)

@app.route('/api')
def try_api():

    response = openai.Completion.create(
    engine="davinci",
    prompt="Once upon a time",
    max_tokens=5
    )

    print(response['choices'])

    return "finished"

@app.route('/tldr')
def resume_analyze():
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
                'Name': '172e9503-235a-4915-93a0-493a9f769b40.pdf'
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
    result = ""
    for item in blocks:
        if item["BlockType"] == "LINE":
            response = openai.Completion.create(
            engine="davinci",
            prompt= item["Text"] + " tl;dr:",
            temperature=0.3,
            max_tokens=60,
            top_p=1.0,
            frequency_penalty=0.8,
            presence_penalty=0.0,
            stop=["\n"]
            )
            #result += "I have experience in " + item["Text"] + ". What career do you recommend for me? "
            print(response['choices'][0]['text'])
            result += response['choices'][0]['text']
    
    return result

@app.route('/classify')
def resume_classify():
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
                'Name': '172e9503-235a-4915-93a0-493a9f769b40.pdf'
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
    result = ""
    for item in blocks:
        if item["BlockType"] == "LINE":
            response = openai.Completion.create(
            engine="davinci",
            prompt= "Text: " + item["Text"] + " Keywords: ",
            temperature=0.3,
            max_tokens=60,
            top_p=1.0,
            frequency_penalty=0.8,
            presence_penalty=0.0,
            stop=["\n"]
            )
            result += response['choices'][0]['text']
    
    return result