#include <avr/io.h>
#include <mega16.h>
#include <util/delay.h>

#define LED1 (1 << PB0)
#define LED2 (1 << PB2)
#define LED1_DDR DDRA // output
#define LED2_DDR DDRB // output
#define LED1_PORT PORTA
#define LED2_PORT PORTB

int main(void) {

  LED1_DDR = LED1;
  LED2_DDR = LED2;

  while (1) {
    LED1_PORT ^= LED1;
    _delay_ms(1000);
    LED2_PORT ^= LED2;
    _delay_ms(1000);
  }
}