from data import filldatafiles
import zlib  
def dataGen():
    data = filldatafiles()
    temp_data = data[0]
    hum_data = data[1]

    def float_to_bits(num, int_bits, frac_bits):
        int_part = int(num)
        frac_part = num - int_part
        int_part_bits = bin(int_part & (2**int_bits - 1))[2:].zfill(int_bits)
        frac_part_bits = bin(int(frac_part * (2**frac_bits)) & (2**frac_bits - 1))[2:].zfill(frac_bits)
        return int_part_bits + frac_part_bits

    def calculate_checksum(bitstring):
        print("Bitstring",bitstring)
        byte_array = bytearray(int(bitstring[i:i+8], 2) for i in range(0, len(bitstring)-8, 8)) 
        print("Byte array: ",byte_array)
        checksum = zlib.crc32(byte_array) & 0xFF  
        print("Calculated Checksum: ",checksum)
        return checksum

    def convert_lists_to_final(list1, list2):
        final_array = []
        for num1, num2 in zip(list1, list2):
            num1_bits = float_to_bits(num1, 8, 8)
            num2_bits = float_to_bits(num2, 8, 8)
            all_bits = num1_bits + num2_bits
            checksum = calculate_checksum(all_bits)
            checksum_bits = bin(checksum)[2:].zfill(8)
            final_bits = all_bits + checksum_bits
            final_array.append(final_bits)
        return final_array

    final = convert_lists_to_final(temp_data, hum_data)
    filepath = r'C:\Users\Joni\Documents\GitHub\EnviroScope\EnviroScope_ServerSide\CollectorAPI\data.txt'

    with open(filepath, "w") as data_file:
        for entry in final:
            data_file.write(str(entry) + "\n")

    with open(filepath, "r") as data_file:
        for entry in data_file:
            entry = entry.strip()
            data_bits = entry[:-8]
            stored_checksum_bits = entry[-8:]
            stored_checksum = int(stored_checksum_bits, 2)
            if calculate_checksum(data_bits) == stored_checksum:
                print(f'Checksum validation succeeded for entry: {entry}')
            else:
                print(f'Checksum validation failed for entry: {entry}')

dataGen()
