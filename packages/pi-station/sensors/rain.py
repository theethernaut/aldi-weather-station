#!/usr/bin/python3
import RPi.GPIO as io

#Number of pin is 11 (GPIO17)
rain_sensor = 17
io.setmode(io.BCM)
io.setup(rain_sensor, io.IN)

if io.input(rain_sensor):
    f= open("../output/rain.json","w+")
    f.write('{"raining":"false"}')
    f.close()
else:
    f= open("../output/rain.json","w+")
    f.write('{"raining":"true"}')
    f.close()
	