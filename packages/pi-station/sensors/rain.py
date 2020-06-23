#!/usr/bin/python3
import RPi.GPIO as io

#Number of pin is 11 (GPIO17)
rain_sensor = 18
io.setmode(io.BCM)
io.setup(rain_sensor, io.IN)

if io.input(rain_sensor):
    f= open("../output/rain.json","w+")
    f.write('{"rain":"false"}')
    f.close()
else:
    f= open("../output/rain.json","w+")
    f.write('{"rain":"true"}')
    f.close()
	
