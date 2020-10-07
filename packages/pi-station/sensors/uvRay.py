import time
import busio
import board
import adafruit_veml6070
 
with busio.I2C(board.SCL, board.SDA) as i2c:
    uv = adafruit_veml6070.VEML6070(i2c)
    # Alternative constructors with parameters
    # uv = adafruit_veml6070.VEML6070(i2c, 'VEML6070_1_T')
    # uv = adafruit_veml6070.VEML6070(i2c, 'VEML6070_HALF_T', True)
 
    uv_raw = uv.uv_raw
    risk_level = uv.get_index(uv_raw)
    f= open("/home/pi/Desktop/aldi-weather-station/packages/pi-station/output/uvRay.json","w+")
    f.write('{"uv_index":"%d","uv_risk_level":"%s"}' % (uv_raw, risk_level))
    f.close()

    #while True:
    #    uv_raw = uv.uv_raw
    #    risk_level = uv.get_index(uv_raw)
    #    print (uv_raw)
    #    print (risk_level)
    #    time.sleep(1)
