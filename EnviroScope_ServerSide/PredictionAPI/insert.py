from db_config import connect_to_database
from testModel.prediction import prediction_data

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
    

insert_data_into_database(prediction_data[1][0],prediction_data[0][0])