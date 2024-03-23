from flask import Flask, render_template, Response, request
import os
import json

app = Flask(__name__,
            static_folder='static')

def get_device_list():
    with open("devices.json", "r") as f:
        all_devices = json.loads(f.read())
    return all_devices

@app.route('/')
def hello_world():  # put application's code here
    return render_template("index.html", devices=get_device_list())


@app.route("/wake", methods=['POST'])
def send():
    address = request.json['address']
    if address is None:
        return Response(status=400, response="empty address")
    os.system(f"wakeonlan {address}")
    #print("Waking up ", address)
    return "OK"


if __name__ == '__main__':
    app.run()
