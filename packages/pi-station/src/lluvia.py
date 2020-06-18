#!/usr/bin/python3
import RPi.GPIO as io

#Este es el mismo pin que el dht11, aunque tengan diferentes valores
rain_sensor = 17
io.setmode(io.BCM)
io.setup(rain_sensor, io.IN)

if io.input(rain_sensor):
	f= open("./output/rain.json","w+")
	f.write("No esta lloviendo :)")
	f.close()
else:
	f= open("./output/rain.json","w+")
	f.write("Esta lloviendo :(")
	f.close()
