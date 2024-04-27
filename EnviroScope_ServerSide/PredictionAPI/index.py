from flask import Flask, jsonify
from db_config import connect_to_database
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def get_data_from_database():
    try:
        connection = connect_to_database()

        if connection:
            query = 'SELECT temperature, humidity FROM sensor1prediction'

            cursor = connection.cursor()

            cursor.execute(query)

            result = cursor.fetchone()

            if result:
                temperature, humidity = result
                return {'temperature': temperature, 'humidity': humidity}
            else:
                return {'error': 'No data found'}

            cursor.close()
            connection.close()
    except Exception as e:
        return {'error': f'Error fetching data from database: {e}'}

@app.route('/predicted-values', methods=['GET'])
def get_predicted_values():
    data = get_data_from_database()
    print(data)
    return jsonify(data)
    pass
if __name__ == '__main__':
    app.run(debug=True)
