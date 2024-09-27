import sys
import os

def parse_config(file_path):
    config = {}
    with open(file_path, 'r') as file:
        for line in file:
            if '=' in line:
                key, value = line.strip().split('=', 1)
                config[key] = value
    return config

def update_config_with_default(default_config, target_file):
    default_data = parse_config(default_config)
    target_data = parse_config(target_file)

    updated = False

    for key, value in default_data.items():
        if key not in target_data:
            print(f"Key '{key}' does not exist in target file")

        elif target_data[key] != value:
            print(f"Key '{key}' mismatch: Source='{target_data[key]}', New='{value}'")
            target_data[key] = value
            updated = True

    if updated:
        # 备份原始文件
        bak_file = target_file + '.bak'
        with open(bak_file, 'w') as file:
            with open(target_file, 'r') as f:
                file.write(f.read())

        # 写入更新后的配置
        with open(target_file, 'w') as file:
            for key, value in target_data.items():
                file.write(f"{key}={value}\n")


if __name__ == "__main__":
    default_config_file = "default_parameter_default"  # 你的默认配置文件
    target_files = ["default_parameter_ro", "default_parameter_sys", "default_parameter_user"]  # 你的目标配置文件列表

    for target_file in target_files:
        current_directory = os.getcwd()
        rootfs_directory = os.path.join(current_directory, 'squashfs-root')

        default_config_file = os.path.join(current_directory, default_config_file)
        target_file = os.path.join(os.path.join(rootfs_directory, 'etc_ro/default'), target_file)
        update_config_with_default(default_config_file, target_file)




