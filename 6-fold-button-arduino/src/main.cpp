#include <Arduino.h>

#define BTN1 2
#define LED1 3
#define LED2 4
#define LED3 5

int buttonState = 0;
void setup() {
    pinMode(LED1, OUTPUT);
    pinMode(LED2, OUTPUT);
    pinMode(LED3, OUTPUT);
    pinMode(BTN1, INPUT);
    digitalWrite(LED1, LOW);
}

void loop() {
    buttonState = digitalRead(BTN1);
    if (buttonState == HIGH) {
        digitalWrite(LED1, HIGH);
        digitalWrite(LED2, HIGH);
        digitalWrite(LED3, HIGH);
    } else {
        digitalWrite(LED1, 0);
        digitalWrite(LED2, LOW);
        digitalWrite(LED3, LOW);
    }
}