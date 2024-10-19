import os
import platform
import requests
import zipfile
import shutil
import subprocess

# define
url = 'https://googledownloads.cn/android/repository/platform-tools-latest-{}.zip'

# 判断操作系统类型
os_type = platform.system().lower()
url = url.format(os_type).lower()

current_path = os.path.dirname(os.path.abspath(__file__))
project_path = os.path.dirname(current_path)
platform_tools_path = os.path.join(project_path, 'platform-tools')
platform_tools_system_path = os.path.join(platform_tools_path, os_type)
# *****/adb.exce
adb_exe_path = os.path.join(platform_tools_system_path, "adb")

# platform_tools_path = os.path.dirname(adb_exe_path)

platform_tools_zip_file_name = f'platform-tools-latest-{os_type.lower()}.zip'


def download(url, path):
    if not os.path.exists(os.path.dirname(path)):
        os.makedirs(os.path.dirname(path))
    r = requests.get(url, stream=True)
    with open(path, 'wb') as f:
        f.write(r.content)


def move_and_remove(src, dest):
    if not os.path.exists(dest):
        os.makedirs(dest)
    if os.path.exists(src) and os.path.isdir(src):
        for item in os.listdir(src):
            s = os.path.join(src, item)
            d = os.path.join(dest, item)
            if os.path.isdir(s):
                shutil.move(s, d)
            else:
                shutil.move(s, dest)
        os.rmdir(src)
    else:
        print("Source directory does not exist.")


def check_platform_tools():
    if os_type == 'linux' or os_type == 'darwin':
        if os.path.exists(adb_exe_path):
            return
    elif os_type == 'windows':
        if os.path.exists(f'{adb_exe_path}.exe'):
            return
    download(url, os.path.join(platform_tools_path, platform_tools_zip_file_name))
    unzip_file(os.path.join(platform_tools_path, platform_tools_zip_file_name), platform_tools_path)
    move_and_remove(os.path.join(platform_tools_path, 'platform-tools'),
                    os.path.join(platform_tools_path, os_type.lower()))


# 解压zip文件
def unzip_file(zip_path, extract_path):
    with zipfile.ZipFile(zip_path, 'r') as zip_ref:
        zip_ref.extractall(extract_path)


def pull_file(source, target):
    if source.startswith('/'):
        source = source.replace('\\', '/')
    return run_adb_command([source, target], op='pull')


def push_file(source, target):
    return run_adb_command([source, target], op='push')


def run_adb_command(command, op='shell', print_log=False):
    args = [adb_exe_path, op]
    if isinstance(command, list):
        args.extend(command)
    else:
        args.append(command)

    process = subprocess.Popen(args, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    out, err = process.communicate()

    # if len(out) > 0:
    #     out = out.strip()
    response = b''
    if process.returncode != 0:
        response = err
    else:
        response = out
    if response != b'' and print_log:
        lines = response.decode('utf-8').split('\r\r\n')
        lines = [line for line in lines if line]
        print(lines)
    return out


def get_sub_dirs(path):
    if path.startswith('/'):
        path = path.replace('\\', '/')
    run_adb_command("ls -lha {} |grep -ve '\.' |grep -v ' -> '|grep ^d|awk {}".format(path,"'{print $9}'"), op='shell')
    out = run_adb_command("ls -lha {} |grep -ve '\.' |grep -v ' -> '|grep ^d|awk {}".format(path,"'{print $9}'"), op='shell')
    file_lists = out.decode('utf-8').split('\r\r\n')
    file_lists = [file_name for file_name in file_lists if file_name]
    return file_lists
def get_sub_files(path):
    if path.startswith('/'):
        path = path.replace('\\', '/')
    out = run_adb_command("ls -lha {} |grep -v ^d |grep -v ^l|grep -v 'total '|awk {}".format(path,"'{print $9}'"), op='shell')
    file_lists = out.decode('utf-8').split('\r\r\n')
    file_lists = [file_name for file_name in file_lists if file_name]
    return file_lists

def get_partitions_from_system():
    out = run_adb_command("cat /proc/partitions |grep -v major|grep mtd |awk '{print $3}'")
    size_lists = out.decode('utf-8').split('\r\r\n')
    size_lists = [mtd_size for mtd_size in size_lists if mtd_size]

    # out = run_adb_command("cat /proc/partitions |grep -v major|grep mtd |awk '{print $4}'")
    # name_lists = out.decode('utf-8').split('\r\r\n')
    # name_lists = [mtd_name for mtd_name in name_lists if mtd_name]

    out = run_adb_command("cat /proc/mtd |grep mtd |awk '{print $4}'")
    out = out.replace(b'"', b'')
    name_lists = out.decode('utf-8').split('\r\r\n')
    name_lists = [mtd_name for mtd_name in name_lists if mtd_name]

    start_index = 0
    partitions = []
    for i in range(len(name_lists)):
        mtd_name = name_lists[i]
        mtd_size = int(size_lists[i]) * 1024
        partitions.append((f'{i}.{mtd_name}',start_index,mtd_size))
        start_index += mtd_size
    return partitions



check_platform_tools()


if __name__ == '__main__':
    pass