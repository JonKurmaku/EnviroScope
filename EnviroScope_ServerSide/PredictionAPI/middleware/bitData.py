from data import filldatafiles

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

    def convert_lists_to_final(list1, list2):
        final_array = []
        for num1, num2 in zip(list1, list2):
            num1_bits = float_to_bits(num1, 8, 8)
            num2_bits = float_to_bits(num2, 8, 8)
            all_bits = num1_bits + num2_bits
            all_bits_sum = sum(int(bit) for bit in all_bits)
            sum_bits = bin(all_bits_sum & (2**8 - 1))[2:].zfill(8)
            final_bits = num1_bits + num2_bits + sum_bits
            final_array.append(final_bits)
        return final_array


    final = convert_lists_to_final(temp_data, hum_data)
    filepath = r'C:\Users\Joni\Documents\GitHub\EnviroScope\EnviroScope_ServerSide\data.txt'

    with open(filepath, "w") as data:
            for entry in final:
                data.write(str(entry) + "\n")

dataGen()