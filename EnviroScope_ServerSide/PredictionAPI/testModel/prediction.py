
import numpy as np
import joblib

model_temp = joblib.load('random_forest_model_temp.pkl')
model_hum = joblib.load('random_forest_model_hum.pkl')


next_days_data = [
    [25.1, 0.65],  
    [24.8, 0.68],  
    [26.0, 0.63]   
]
X_pred = np.array(next_days_data)

predictions_temp = model_temp.predict(X_pred)
predictions_hum = model_hum.predict(X_pred)


print("Predicted temperatures for next days:")
for day, temp in enumerate(predictions_temp, start=1):
    print(f"Day {day}: {temp:.2f} °C")

print("\nPredicted humidities for next days:")
for day, hum in enumerate(predictions_hum, start=1):
    print(f"Day {day}: {hum:.2f}")
