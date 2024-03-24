from flask import Flask, render_template, Response, request
import os
import json
import device_ping

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
    device_id = request.json['id']
    if device_id is None:
        return Response(status=400, response="empty address")
    cmd = f"wakeonlan {get_device_list()[device_id]['mac']}"
    print(cmd)
    os.system(cmd)
    return "OK"


@app.route("/ping", methods=['POST'])
def ping():
    device_id = request.json['id']
    if device_id is None:
        return Response(status=400, response="empty address")
    print(f"Pinging {device_id}")
    result = device_ping.ping(get_device_list()[device_id]['ip'])
    return {"status": "online" if result else "offline"}


if __name__ == '__main__':
    app.run(host=os.getenv("host"), port=os.getenv("port"))
