import sys

def parse_config(file_path):
    config = {}
    with open(file_path, 'r') as file:
        for line in file:
            if '=' in line:
                key, value = line.strip().split('=', 1)
                config[key] = value
            #else:
            #    print(f"Ignoring line: {line.strip()} as it does not contain a key-value pair.")
    return config

def print_sorted_config(file_path):
    try:
        data = parse_config(file_path)
        sorted_keys = sorted(data.keys(), key=lambda x: (x.split('_')[0], *x.split('_')[1:]))
        for key in sorted_keys:
            print(f"{key}={data[key]}")
    except FileNotFoundError:
        print("指定的文件路径不存在。请提供正确的文件路径。")



if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("请提供文件路径作为参数。")
    else:
        file_path = sys.argv[1]
        print_sorted_config(file_path)

    # print_sorted_config('D:\wifi\随身wifi助手\TQ\mf761w_v1.1_changcheng_suning\pull\etc_ro\default\default_parameter_user')
    
