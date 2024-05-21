import serial
outputFilePath = r"EnviroScope_ServerSide\CollectorAPI\temperature_data.txt"

def read_sensor_data(serial_port, baud_rate, timeout, outputFilePath):
    try:
        ser = serial.Serial(serial_port, baud_rate, timeout=timeout)

        with open(outputFilePath, 'w') as file:
            while True:
                if ser.in_waiting > 0:
                    data = ser.readline().decode('utf-8').strip()
                    if not data:
                        break
                    print(data)
                    file.write(data + '\n')

        ser.close()
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    serial_port = 'COM3'  
    baud_rate = 9600
    timeout = 1

    read_sensor_data(serial_port, baud_rate, timeout, outputFilePath)
