def read_file_into_matrix(file_path):
    data_matrix = []
    try:
        with open(file_path, 'r') as file:
            for line in file:
                line_data = list(map(float, line.strip().split()))
                data_matrix.append(line_data)
        return data_matrix
    except FileNotFoundError:
        print(f"File '{file_path}' not found.")
        return None





