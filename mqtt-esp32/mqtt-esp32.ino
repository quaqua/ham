#include <WiFi.h>
#include <DHT.h> // https://github.com/adafruit/DHT-sensor-library
#include <PubSubClient.h> // look for PubSub in "Manage Libraries"
 
const char* ssid = "AntennaX";
const char* password =  "anstattda$$";
const char* mqttServer = "10.0.0.6";
const int mqttPort = 1883;
const char* mqttUser = "";
const char* mqttPassword = "";
 
WiFiClient espClient;
PubSubClient client(espClient);
 
#define DHTPIN 3
#define DHTTYPE DHT22 // DHT 22  (AM2302)
DHT dht(DHTPIN, DHTTYPE);

void setup() {
 
  Serial.begin(115200);
  WiFi.begin(ssid, password);
 
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.println("Connecting to WiFi..");
  }
 
  Serial.println("Connected to the WiFi network");
 
  client.setServer(mqttServer, mqttPort);
 
  while (!client.connected()) {
    Serial.println("Connecting to MQTT...");
 
    if (client.connect("ESP32Client", mqttUser, mqttPassword )) {
 
      Serial.println("connected");
 
    } else {
 
      Serial.print("failed with state ");
      Serial.print(client.state());
      delay(2000);
 
    }
  }
 
  client.publish("esp/test", "Hello from ESP32");
 
  client.loop();
}
 
void loop() {
  
  float h = dht.readHumidity();
  float t = dht.readTemperature();
  
  // Convert the value to a char array
  char humString[8];
  dtostrf(h, 1, 2, humString);
  client.publish("bedroom/hum", humString);
  char tempString[8];
  dtostrf(t, 1, 2, tempString);
  client.publish("bedroom/temp", tempString);

  delay(10000);
}
