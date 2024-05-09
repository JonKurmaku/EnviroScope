import joblib
import os
import numpy as np
from sklearn.ensemble import RandomForestRegressor
 
def load_data(file_path):
    with open(file_path, 'r') as file:
        data = [float(line.strip()) for line in file]
    return np.array(data)

def train():
    temperature_data = load_data(r"C:\Users\Joni\Documents\GitHub\EnviroScope\EnviroScope_ServerSide\PredictionAPI\testModel\data\temperature_data.txt")
    humidity_data = load_data(r"C:\Users\Joni\Documents\GitHub\EnviroScope\EnviroScope_ServerSide\PredictionAPI\testModel\data\humidity_data.txt")

    X_train = np.column_stack((temperature_data[:-1], humidity_data[:-1]))  
    y_temp_train = temperature_data[1:]  
    y_hum_train = humidity_data[1:]

    model_temp = RandomForestRegressor(n_estimators=100, random_state=42)
    model_hum = RandomForestRegressor(n_estimators=100, random_state=42)
    model_temp.fit(X_train, y_temp_train)
    model_hum.fit(X_train, y_hum_train)

    dirPath = 'EnviroScope_ServerSide/PredictionAPI/testModel/randomForestModel/'
    os.makedirs(dirPath, exist_ok=True)

    # Save the models with correct file paths
    joblib.dump(model_temp, os.path.join(dirPath, 'random_forest_model_temp.pkl'))
    joblib.dump(model_hum, os.path.join(dirPath, 'random_forest_model_hum.pkl'))



