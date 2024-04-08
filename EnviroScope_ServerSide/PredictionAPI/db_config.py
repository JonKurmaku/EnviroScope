import mysql.connector

def connect_to_database():
    try:
        connection = mysql.connector.connect(
            
            host= '127.0.0.2',
            user= 'root',
            password= '$_Jon_Xhaxhi_123_@_$',
            database= 'enviro_scope',
            
        )

        if connection.is_connected():
            print('Connected to MySQL database')
            return connection
    except Exception as e:
        print('Error connecting to database:', e)
        return None
