import os
import numpy as np
import joblib
#from knnModel.trainModel import train

def load_models():
    #train()
    dirPath = 'EnviroScope_ServerSide/PredictionAPI/knnModel/knn_model_files/'
    model_temp = joblib.load(os.path.join(dirPath, 'knn_temp.pkl'))
    model_hum = joblib.load(os.path.join(dirPath, 'knn_hum.pkl'))
    return model_temp, model_hum

def predict_next_days():
    model_temp, model_hum = load_models()

    next_days_data = [
        [25.1, 0.65],  
        [24.8, 0.68],  
        [26.0, 0.63]   
    ]
    X_pred = np.array(next_days_data)

    predictions_temp = model_temp.predict(X_pred)
    predictions_hum = model_hum.predict(X_pred)

    predicted_data = {'temperature': predictions_temp, 'humidity': predictions_hum}
    return predicted_data

predicted_data = predict_next_days()
print("Predicted temperatures for next days:")
for day, temp in enumerate(predicted_data['temperature'], start=1):
    print(f"Day {day}: {temp:.2f} °C")

print("\nPredicted humidities for next days:")
for day, hum in enumerate(predicted_data['humidity'], start=1):
    print(f"Day {day}: {hum:.2f}")