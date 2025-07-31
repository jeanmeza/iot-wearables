iot-wearables
=============

### About


# Settings

1. change the setting.js file in ~/<your username>/.node-red/ path to this:

```bash
module.exports = {
  httpStatic: '/home/<your username>/.node-red/projects/iot-wearables/public',
  editorTheme: {
    projects: {
      enabled: true,
    },
  },
};
```

2. Add the `public` directory provided in this project to `~/<your username>/.node-red/` path.

3. Wokwi heart-rate generator: https://wokwi.com/projects/435578598139787265

4. MQTT Explorer is used to test the correctness of our mqtt code.

## Wokwi

```bash
#include "WiFi.h"
#include "DHT.h"
#include <PubSubClient.h>

#define SSID "Wokwi-GUEST"
#define SSID_PASSWORD ""

#define MQTT_SERVER "broker.hivemq.com"
#define MQTT_PORT 1883

#define DHTPIN 5
#define DHTTYPE DHT22

#define MQTT_TOPIC "sensor/heart-rate"

DHT dht(DHTPIN, DHTTYPE);
WiFiClient espClient;
PubSubClient client(espClient);

const int ledPin = 4;
int heartRate = 70, Sp02 = 95;

void setup_wifi() {
  WiFi.begin(SSID, SSID_PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
  }
}

void reconnect() {
  while (!client.connected()) {
    Serial.println("Attempting MQTT connection...");
    String clientId = "ESP32Client-" + String(random(0xffff), HEX);
    if (client.connect(clientId.c_str())) {
      Serial.println("connected");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      delay(5000);
    }
  }
}

void setup() {
  Serial.begin(115200);
  pinMode(ledPin, OUTPUT);
  setup_wifi();
  dht.begin();
  client.setServer(MQTT_SERVER, MQTT_PORT);
}

void loop() {
  if (!client.connected()) {
    Serial.println("reconnecting...");
    reconnect();
  }
  client.loop();

  float temperature = dht.readTemperature();
  float humidity = dht.readHumidity();

  if (isnan(temperature) || isnan(humidity)) {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }

  String payload = String("{\"heartRate\":") + temperature +
                  ",\"speed\":" + humidity + "}";

  Serial.println(payload);

  client.publish(MQTT_TOPIC, payload.c_str(), true);

  if (temperature > 30) {
    digitalWrite(ledPin, HIGH);
  } else {
    digitalWrite(ledPin, LOW);
  }

  delay(1000);
}
```
