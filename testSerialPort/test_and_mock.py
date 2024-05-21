import serial
from unittest.mock import MagicMock, patch

mock_serial = MagicMock()
mock_serial.in_waiting = True  

mock_serial.readline.side_effect = [
    b'Sensor data line 1\n',
    b'Sensor data line 2\n',
    b'Sensor data line 3\n',
    b''  
]
outputFilePath = r"EnviroScope_ServerSide\CollectorAPI\data.txt"


with patch('serial.Serial', return_value=mock_serial):
    ser = serial.Serial('COM3', 9600, timeout=1)

    with open(outputFilePath, 'w') as file:
        while True:
            if mock_serial.readline.call_count < 4:  
                data = ser.readline().decode('utf-8').strip()
                if not data:
                    break
                print(data)
                file.write(data + '\n')
            else:
                break

    ser.close()
