#!/usr/bin/python3
import RPi.GPIO as io
import time

#Number of pin is 18 (GPIO24)
#BCM = Broadcom SOC channel
rain_sensor = 24
io.setmode(io.BCM)
io.setup(rain_sensor, io.IN)

if io.input(rain_sensor) == 0:
    f= open("/home/pi/Desktop/aldi-weather-station/packages/pi-station/output/rain.json","w+")
    f.write('{"rain":"true"}')
    f.close()
else:
    f= open("/home/pi/Desktop/aldi-weather-station/packages/pi-station/output/rain.json","w+")
    f.write('{"rain":"false"}')
    f.close()
	
