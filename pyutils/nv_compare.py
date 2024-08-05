def parse_config(file_path):
    config = {}
    with open(file_path, 'r', encoding='utf-8') as file:
        for line in file:
            if '=' in line:
                key, value = line.strip().split('=', 1)
                config[key] = value
            #else:
            #    print(f"Ignoring line: {line.strip()} as it does not contain a key-value pair.")
    return config


def compare_configs(file1, file2):
    result = {
        'unique_in_file1': {},
        'unique_in_file2': {},
        'different_values': {}
    }

    config1 = parse_config(file1)
    config2 = parse_config(file2)

    for key, value in config1.items():
        if key in config2:
            if config2[key] != value:
                result['different_values'][key] = (value, config2[key])
        else:
            result['unique_in_file1'][key] = value

    for key, value in config2.items():
        if key not in config1:
            result['unique_in_file2'][key] = value

    return result

def main(config_file1, config_file2):


    result = compare_configs(config_file1, config_file2)

    print("Keys unique to first file:")
    for key in sorted(result['unique_in_file1'].keys(), key=lambda x: (x.split('_')[0], *x.split('_')[1:])):
        print(f"{key.replace(':', '=')}: {result['unique_in_file1'][key]}")

    print("\nKeys unique to second file:")
    for key in sorted(result['unique_in_file2'].keys(), key=lambda x: (x.split('_')[0], *x.split('_')[1:])):
        print(f"{key.replace(':', '=')}: {result['unique_in_file2'][key]}")

    print("\nKeys with different values:")
    for key in sorted(result['different_values'].keys(), key=lambda x: (x.split('_')[0], *x.split('_')[1:])):
        value = result['different_values'][key]
        print(f"{key.replace(':', '=')}: {value[0]} vs {value[1]}")


if __name__ == "__main__":
    config_file1 = r'D:\wifi\随身wifi助手\TQ\f231zc_v1.0_jd\info\nv1.txt'
    config_file2 = r'D:\wifi\随身wifi助手\TQ\f231zc_v1.0_jd\pull\etc_ro\default\default_parameter_user'
    main()