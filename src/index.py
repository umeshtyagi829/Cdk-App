from __future__ import print_function
import boto3
import json

client = boto3.resource('dynamodb')

def lambda_handler(event, context):
    for record in event['Records']:
        print("test")
        payload = record["body"]
        rec =  str(payload)
        print(rec)
        table = client.Table("Employee")
        print(table.table_status)
        response = table.put_item(Item={'EmpName': rec,  'id': 2})
        print(response)