import os
import platform
import requests
import zipfile
import shutil
import subprocess


# define
url = 'https://googledownloads.cn/android/repository/platform-tools-latest-{}.zip'





# 判断操作系统类型
os_type = platform.system()
url = url.format(os_type).lower()

current_path = os.path.dirname(os.path.abspath(__file__))
# *****/adb.exce
adb_exe_path = os.path.join(os.path.basename(current_path),"platform-tools/{}/adb".format(os_type.lower()))
platform_tools_path = os.path.dirname(adb_exe_path)

platform_tools_zip_file_name = f'platform-tools-latest-{os_type.lower()}.zip'

def download(url, path):
    r = requests.get(url, stream=True)
    with open(path, 'wb') as f:
        f.write(r.content)

def move_and_remove(src, dest):
    if not os.path.exists(dest):
        os.makedirs(dest)
    if os.path.exists(src) and os.path.isdir(src) :
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
    unzip_file(platform_tools_zip_file_name, os.path.join(platform_tools_path, os_type.lower()))
    move_and_remove(os.path.join(os.path.join(platform_tools_path, os_type.lower()),'platform-tools'), os.path.join(platform_tools_path, os_type.lower()))

# 解压zip文件
def unzip_file(zip_path, extract_path):
    with zipfile.ZipFile(zip_path, 'r') as zip_ref:
        zip_ref.extractall(extract_path)

def pull_file(command):
    return run_adb_command(command,op='pull')

def push_file(command):
    return run_adb_command(command,op='push')
def run_adb_command(command, op='shell'):
    process = subprocess.Popen([adb_exe_path, op, command], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    out, err = process.communicate()
    if process.returncode != 0:
        print(f"Error: {err.decode('utf-8')}")
    else:
        print(f"Output: {out.decode('utf-8')}")
    return out




check_platform_tools()