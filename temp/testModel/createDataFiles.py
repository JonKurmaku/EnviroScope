from fetchFile import data

temperature_data = [row[0] for row in data]
humidity_data = [row[1] for row in data]

with open("EnviroScope_ServerSide/PredictionAPI/testModel/data/temperature_data.txt", "w") as file:
    for temperature in temperature_data:
        file.write(str(temperature) + "\n")


with open("EnviroScope_ServerSide/PredictionAPI/testModel/data/humidity_data.txt", "w") as file:
    for humidity in humidity_data:
        file.write(str(humidity) + "\n")