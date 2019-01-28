from time import sleep
import RPi.GPIO as GPIO
import paho.mqtt.client as paho

def on_connect(client, userdata, flags, rc):
    print("connack received with code %d." % (rc))

def on_subscribe(client, userdata, mid, granted_qos):
    print("Subscribed: "+str(mid)+" "+str(granted_qos))

def on_message(client, userdata, msg):
    print(msg.topic+" "+str(msg.qos)+" "+str(msg.payload))

client = paho.Client()
client.on_subscribe = on_subscribe
client.on_message = on_message
client.on_connect = on_connect
client.connect("10.0.0.68", 5111)
client.subscribe("shutter/1", qos=1)
client.loop_start()

print("here")
GPIO.setmode(GPIO.BCM)

pins = [5,6,13,19,26,16,20,21]

for pin in pins:
    GPIO.setup(pin, GPIO.OUT)
    GPIO.output(pin, False)

while True:
    for pin in pins:
        sleep(0.5)
        GPIO.output(pin, True)
    for pin in pins:
        sleep(0.5)
        GPIO.output(pin, False)
