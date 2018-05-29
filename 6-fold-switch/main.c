#include <avr/io.h>
#include <util/delay.h>

#define LED1 (1 << PB0)
#define LED2 (1 << PB1)
#define LED3 (1 << PB2)

#define BTN1 (1 << PD7)

int main(void) {

  DDRB = LED1 | LED2 | LED3;
  DDRD &= ~BTN1;

  while (1) {
    PORTB &= ~LED3;
    if (PIND & BTN1 == BTN1) {
      PORTB |= LED3;
    }
    // PORTB |= LED1;
    // PORTB &= ~LED2;
    // _delay_ms(100);
    // PORTB &= ~LED1;
    // PORTB |= LED2;
    // _delay_ms(500);
  }
}