#include <avr/io.h>
#include <util/delay.h>

#define LED1 (1 << PD6)
#define LED2 (1 << PD7)
#define LED3 (1 << PB2)

#define BTN1 (1 << PC2)

int main(void) {

  // DDRB = LED2 | LED3;
  DDRD = LED1 | LED2;
  DDRC &= ~BTN1;

  PORTD |= LED1;
  
  while (1) {
    PORTB &= ~LED2;
    if (PIND & BTN1 == BTN1) {
      PORTD |= LED2;
    }
    // PORTB &= ~LED2;
    // _delay_ms(100);
    // PORTB &= ~LED1;
    // PORTB |= LED2;
    // _delay_ms(500);
  }
}