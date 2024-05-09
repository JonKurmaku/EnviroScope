import joblib
import os
import numpy as np
from sklearn.neighbors import KNeighborsRegressor

def load_data(file_path):
    with open(file_path, 'r') as file:
        data = [float(line.strip()) for line in file]
    return np.array(data)

def train():
    temperature_data = load_data(r"C:\Users\Joni\Documents\GitHub\EnviroScope\EnviroScope_ServerSide\PredictionAPI\knnModel\data\temperature_data.txt")
    humidity_data = load_data(r"C:\Users\Joni\Documents\GitHub\EnviroScope\EnviroScope_ServerSide\PredictionAPI\knnModel\data\humidity_data.txt")

    X_train = np.column_stack((temperature_data[:-1], humidity_data[:-1]))  
    y_temp_train = temperature_data[1:]  
    y_hum_train = humidity_data[1:]

    model_temp = KNeighborsRegressor(n_neighbors=5)  
    model_hum = KNeighborsRegressor(n_neighbors=5)   

    model_temp.fit(X_train, y_temp_train)
    model_hum.fit(X_train, y_hum_train)

    dirPath = 'EnviroScope_ServerSide/PredictionAPI/knnModel/knn_model_files'
    os.makedirs(dirPath, exist_ok=True)

    joblib.dump(model_temp, os.path.join(dirPath, 'knn_temp.pkl'))
    joblib.dump(model_hum, os.path.join(dirPath, 'knn_hum.pkl'))


