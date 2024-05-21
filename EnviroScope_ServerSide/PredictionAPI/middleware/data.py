import openmeteo_requests
import requests_cache
from retry_requests import retry
import pandas as pd
from apscheduler.schedulers.background import BackgroundScheduler
import atexit
import time

temp_data=[]
hum_data=[]


def filldatafiles():
    cache_session = requests_cache.CachedSession('.cache', expire_after=3600)
    retry_session = retry(cache_session, retries=5, backoff_factor=0.2)
    openmeteo = openmeteo_requests.Client(session=retry_session)

    url = "https://api.open-meteo.com/v1/forecast"
    params = {
        "latitude": 41.3253,
        "longitude": 19.8184,
        "hourly": ["temperature_2m", "relative_humidity_2m"]
    }

    responses = openmeteo.weather_api(url, params=params)

    response = responses[0]
    #print(f"Coordinates {response.Latitude()}°N {response.Longitude()}°E")
    #print(f"Elevation {response.Elevation()} m asl")
    #print(f"Timezone {response.Timezone()} {response.TimezoneAbbreviation()}")
    #print(f"Timezone difference to GMT+0 {response.UtcOffsetSeconds()} s")

    hourly = response.Hourly()
    hourly_temperature_2m = hourly.Variables(0).ValuesAsNumpy()
    hourly_relative_humidity_2m = hourly.Variables(1).ValuesAsNumpy()
    temp_data=hourly_temperature_2m
    hum_data=hourly_relative_humidity_2m
    data=[temp_data,hum_data]
#   print(data)
    return data

#     temp_data_file_path = r'C:\Users\Joni\Documents\GitHub\EnviroScope\EnviroScope_ServerSide\temperature_data.txt'
#     hum_data_file_path = r'C:\Users\Joni\Documents\GitHub\EnviroScope\EnviroScope_ServerSide\humidity_data.txt'

#     with open(temp_data_file_path, "w") as temp_file:
#         for temperature in hourly_temperature_2m:
#             temp_file.write(str(temperature) + "\n")

#     with open(hum_data_file_path, "w") as hum_file:
#         for humidity in hourly_relative_humidity_2m:
#             hum_file.write(str(humidity) + "\n")

#     data = [hourly_temperature_2m, hourly_relative_humidity_2m]
#     print(data)


# scheduler = BackgroundScheduler()
# scheduler.add_job(filldatafiles, 'interval', minutes=1)
# scheduler.start()
# atexit.register(lambda: scheduler.shutdown())


