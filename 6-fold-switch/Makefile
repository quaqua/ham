MCU=atmega32
F_CPU=1200000
CC=avr-gcc
OBJCOPY=avr-objcopy
CFLAGS=-std=c99 -Wall -g -Os -mmcu=${MCU} -DF_CPU=${F_CPU} -I.
TARGET=main
SRCS=main.c
DEV=/dev/ttyACM1

build:
	${CC} ${CFLAGS} -o ${TARGET}.bin ${SRCS}
	${OBJCOPY} -j .text -j .data -O ihex ${TARGET}.bin ${TARGET}.hex

flash:
	avrdude -p ${MCU} -c avrisp2 -U flash:w:${TARGET}.hex:i -F -P ${DEV}

all: clean build flash

clean:
	rm -f *.bin *.hex
