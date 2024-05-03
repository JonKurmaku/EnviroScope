from flask import Flask, request, jsonify
from db_config import connect_to_database
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/predicted-values', methods=['GET'])
def get_predicted_values():
    try:
        connection = connect_to_database()
        if connection:
            cursor = connection.cursor()

            query = 'SELECT temperature, humidity FROM sensor1prediction ORDER BY id DESC LIMIT 1'
            cursor.execute(query)

            row = cursor.fetchone()

            cursor.close()
            connection.close()

            if row:
                temperature, humidity = row
                data = {'temperature': temperature, 'humidity': humidity}
                return jsonify(data)
            else:
                return jsonify({'error': 'No data found'})

        else:
            return jsonify({'error': 'Failed to connect to database'})
    except Exception as e:
        return jsonify({'error': f'Error fetching predicted values: {e}'})

if __name__ == '__main__':
    app.run(debug=True)


