#!/usr/bin/python3
import RPi.GPIO as io

#Number of pin is 11 (GPIO17)
#BCM = Broadcom SOC channel
rain_sensor = 17
io.setmode(io.BCM)
io.setup(rain_sensor, io.IN)

if io.input(rain_sensor):
    f= open("./output/rain.json","w+")
    f.write('{"rain":"false"}')
    f.close()
else:
    f= open("./output/rain.json","w+")
    f.write('{"rain":"true"}')
    f.close()
	
