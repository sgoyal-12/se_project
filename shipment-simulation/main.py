import random
import time
import requests

SHIPMENT_ID = input("Enter Shipment ID: ")
ENDPOINT = f"http://tracefresh.himanshu.co/api/shipments/{SHIPMENT_ID}/logs/"


def send_request():
    # generate random temp and humidity
    values = {
        "shipmentId": SHIPMENT_ID,
        "temperature": str(random.randint(0, 5)),
        "humidity": str(random.randint(90, 100)),
        # Don't send timestamp — server will generate it
    }

    # send request to the server
    response = requests.post(ENDPOINT, json=values)
    if response.status_code == 200:
        print(f"Successfully sent data: {values}")
    else:
        print(f"Failed to send data: {response.status_code}, {response.text}")


for _ in range(10):
    send_request()
    time.sleep(1)
