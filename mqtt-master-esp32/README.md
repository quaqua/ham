# MacOs Pre-Requisites

silabs cp210x driver:
https://www.silabs.com/products/development-tools/software/usb-to-uart-bridge-vcp-drivers


# mosquitto

Now you can test the installation and ensure the server is running successfully.  Open a new command window and start a listener.

mosquitto_sub -t topic/state

In another window, send a message to the listener.

mosquitto_pub -t topic/state -m "Hello World"

Nicely done.

Installing the Python Libraries

To create the link between Python and MQTT we need to install the Python Eclipse MQTT library.  Visit here for the latest downloads and follow the link to download the required version.  Specifically, I downloaded these Python Libraries.

Once downloaded, unpack the tar file and install the library

tar xvf org.eclipse.pho.mqtt.python-1.1.tar
cd org.eclipse.pho.mqtt.python-1.1
sudo python setup.py install