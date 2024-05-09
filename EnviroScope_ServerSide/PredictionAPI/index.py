from flask import Flask, request, jsonify
from db_config import connect_to_database
from flask_cors import CORS
#from knnModel.prediction import prediction_data
#from knnModel.trainModel import train
from middleware.createDataFiles import refreshData
from knnModel.trainModel import train
from knnModel.prediction import predict_next_days
from apscheduler.schedulers.background import BackgroundScheduler
import atexit
import time


app = Flask(__name__)
CORS(app)

scheduler = BackgroundScheduler()
scheduler.add_job(train, 'interval', minutes=1)
scheduler.add_job(refreshData, 'interval', minutes=1)
scheduler.add_job(predict_next_days, 'interval', minutes=1)
scheduler.start()
atexit.register(lambda: scheduler.shutdown())


@app.route('/predicted-values', methods=['GET'])
def get_predicted_values():
    try:
        connection = connect_to_database()
        if connection:
            cursor = connection.cursor()

            query = 'SELECT AVG(temperature) AS avgTemperature, AVG(humidity) AS avgHumidity FROM sensor1prediction'
            cursor.execute(query)

            row = cursor.fetchone()

            cursor.close()
            connection.close()

            if row:
                temperature, humidity = row
                data = {'avgTemperature': temperature, 'avgHumidity': humidity}
                return jsonify(data)
            else:
                return jsonify({'error': 'No data found'})

        else:
            return jsonify({'error': 'Failed to connect to database'})
    except Exception as e:
        return jsonify({'error': f'Error fetching predicted values: {e}'})


#execute_at_interval(1,refreshData)
#execute_at_interval(62, train)    
#execute_at_interval(62, insert_data_into_database(prediction_data[1][0],prediction_data[0][0]))
    

def insert_data_into_database(temperature, humidity):
    try:
        connection = connect_to_database()

        if connection:
            query = 'INSERT INTO sensor1prediction (temperature, humidity) VALUES (%s, %s)'
            cursor = connection.cursor()

            cursor.execute(query, (temperature, humidity))
            connection.commit()

            cursor.close()
            connection.close()

            return {'success': True}
        else:
            return {'error': 'Failed to connect to database'}
    except Exception as e:
        return {'error': f'Error inserting data into database: {e}'}
    



if __name__ == '__main__':
    app.run(debug=True)






