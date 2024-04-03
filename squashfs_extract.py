import os
import shutil
import sys
import time
import struct


def find_squashfs(filename):
    # Squashfs filesystem, little endian, version 4.0, compression:xz
    magic = '68 73 71 73 ** 01 00 00 ** ** ** ** 00 00 04 00 ** 00 00 00 04 00 ** 00 ** ** 01 00 04 00 00 00 ** ** ** ** 00 00 00 00 ** ** ** 00 00 00 00 00 ** ** ** 00 00 00 00 00 FF FF FF FF FF FF FF FF'
    hex_bytes_list = magic.replace(' ','').split('**')
    first_bytes = bytes.fromhex(hex_bytes_list[0])
    squashfs_files_list = []
    with open(filename, 'rb') as f:
        data = f.read()

        index = data.find(first_bytes)
        start_index = index
        file_size = 0
        while index != -1:  # 当找到了匹配的字节序列时
            find_flag = True
            f.seek(start_index)
            print(f"在偏移位置 {start_index} 找到了字节序列")
            for line in hex_bytes_list:
                line_byte_size = int(len(line)/2)
                if line_byte_size == 0 :
                    index = int(index + 1)
                    continue
                f.seek(index)
                if f.read(int(line_byte_size)) == bytes.fromhex(line):
                    index = int(index + line_byte_size + 1)
                    continue
                else:
                    find_flag = False
                    break

            if find_flag:
                f.seek(start_index + 40)
                raw_data = f.read(8)
                file_size = struct.unpack('<Q', raw_data)[0]
                file_info = {}
                file_info.__setitem__('offset',start_index)
                file_info.__setitem__('size',file_size)
                squashfs_files_list.append(file_info)
            index = data.find(first_bytes , start_index + len( first_bytes))
            start_index = index
        return squashfs_files_list

# 提取并导出文件，输出文件大小信息
def extract_squashfs_file(squashfs_image, offset, size, output_filename):
    parent_directory = os.path.dirname(squashfs_image)
    original_file_name = os.path.basename(squashfs_image)
    file_name_without_extension = os.path.splitext(original_file_name)[0]
    file_extension = os.path.splitext(original_file_name)[1]

    new_file = f'{file_name_without_extension}_{output_filename}{file_extension}'
    file_path = os.path.join(parent_directory, new_file)

    with open(squashfs_image, 'rb') as f_in:
        f_in.seek(offset)
        data = f_in.read(size)
        with open(file_path, 'wb') as f_out:
            f_out.write(data)
    print("文件",file_path,"提取完成，文件大小为", size, "字节")


if __name__ == '__main__':
    image_file = 'D:\wifi\随身wifi助手\TQ\yingteng_MZ801_V1.2\mtd\mtd4'
    # sys.argv[1] = 'output'
    # sys.argv[2] = image_file

    script_path = os.path.realpath(__file__)
    print("当前脚本路径: ", script_path)

    script_dir, script_name = os.path.split(script_path)
    print("当前脚本所在目录: ", script_dir)
    print("当前脚本文件名: ", script_name)

    if len(sys.argv) < 3:
        print('Usage:')
        print(f'    python3 {script_name} output mtd4.bin')
        print(f'    python3 {script_name} input mtd4.bin example.squashfs')
        exit(1)
    else:
        image_file = sys.argv[2]


    if sys.argv[1] == 'output':
        squashfs_files_list = find_squashfs(image_file)
        if len(squashfs_files_list) > 0:
            if len(squashfs_files_list) > 1:
                print(f'发现 {len(squashfs_files_list)} 个镜像文件')
            for file_info in squashfs_files_list:
                extract_squashfs_file(image_file, file_info.get('offset'),file_info.get('size'),f"{hex(file_info.get('offset')).replace('0x', '')}-{hex(file_info.get('offset') + file_info.get('size')).replace('0x', '')}")
    elif sys.argv[1] == 'input':
        if len(sys.argv) < 4:
            print(f'必须最少3个参数：eg: python3 {script_name} input mtd4.bin example.squashfs')
            exit(1)
        input_image = sys.argv[3]
        squashfs_files_list = find_squashfs(image_file)
        if len(squashfs_files_list) > 0:
            replaced_image_file_info = squashfs_files_list[0]
            print(f'发现 {len(squashfs_files_list)} 个镜像文件')
            if len(squashfs_files_list) > 0:
                if len(squashfs_files_list) > 1 and len(sys.argv) < 5:
                    print(f'发现 {len(squashfs_files_list)} 个镜像文件，必须4个参数才能打包替换')
                    print(f'eg: python3 {script_name} input mtd4.bin example.squashfs 0')
                    print(f'其中0 表示替换第一个镜像文件，大小不建议超过原始文件大小')
                    exit(1)
                replaced_image_file_index = 0
                if len(sys.argv) >= 5:
                    replaced_image_file_index = int(sys.argv[4])
                replaced_image_file_info = squashfs_files_list[replaced_image_file_index]
                original_image_offset = replaced_image_file_info.get('offset')
                original_image_size = replaced_image_file_info.get('size')

                input_image_size = os.path.getsize(input_image)
                if input_image_size > original_image_size:
                    print(f'导入文件大小超过原始文件大小，可能导致文件结构破坏，建议新镜像文件≤原镜像文件')
                shutil.copy2(image_file, image_file + ".new")
                with open(image_file + ".new", 'r+b') as file_a:
                    image_file_content = file_a.read()
                    file_a.seek(original_image_offset)
                    empty_bytes = bytes([0xFF] * original_image_size)

                    with open(input_image, 'rb') as file_b:
                        input_image_file_content = file_b.read()
                        file_a.seek(original_image_offset)
                        file_a.write(input_image_file_content)
                
