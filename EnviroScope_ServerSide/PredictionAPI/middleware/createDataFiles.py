from middleware.fetchFile import read_file_into_matrix

def refreshData():
    file_path = r"C:\Users\Joni\Documents\GitHub\EnviroScope\EnviroScope_ServerSide\CollectorAPI\test_bench\output.txt"  
    data = read_file_into_matrix(file_path)

    temperature_data = [row[0] for row in data]
    humidity_data = [row[1] for row in data]

    print("Refreshed T")
    print("Refreshed H")

    with open(r"EnviroScope_ServerSide\PredictionAPI\knnModel\data\temperature_data.txt", "w") as file:
        for temperature in temperature_data:
            file.write(str(temperature) + "\n")


    with open(r"EnviroScope_ServerSide\PredictionAPI\knnModel\data\humidity_data.txt", "w") as file:
        for humidity in humidity_data:
            file.write(str(humidity) + "\n")


