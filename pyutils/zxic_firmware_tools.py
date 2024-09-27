import json
import os
import shutil
import sys
import struct


### 定义参数

# 当前脚本文件名称
script_name = os.path.basename(__file__)


# 输出目录
output_path_name = 'output'

# 固件内分区信息保存文件
package_json_file_name = "packages.json"

# 合并后的新固件名称
merged_firmware_name = "full.new.bin"

# zxic 编程器固件文件魔法头
zxic_firmware_magic_header = '00005a045a583735323156316c1e0000'
# squashfs 镜像文件魔法头
squashfs_magic_header = '68737173'


# 检查核对文件魔法头
def check_magic_header(file_path,size,target):
    with open(file_path, "rb") as file:
        header = file.read(size)
        if header.hex() == target:
            return True
    return False

# 通过文件魔法头判断文件是否是 zxic 编程器固件
def is_zxic_fireware_file(file_path):
    return check_magic_header(file_path=file_path, size=16, target=zxic_firmware_magic_header)

# 通过文件魔法头判断文件是否是 squashfs 镜像
def is_squashfs_file(file_path):
    return check_magic_header(file_path=file_path, size=4, target=squashfs_magic_header)

# 通过判断是否 squashfs 以及文件大小是否一致，来判断是否是 mtd4 分区
def is_mtd4_squashfs_file(file_path):
    if is_squashfs_file(file_path):
        file_size = os.path.getsize(file_path)
        with open(file_path, "rb") as file:
            file.seek(40)
            raw_data = file.read(8)
            suqashfs_size = struct.unpack('<Q', raw_data)[0]
            if file_size > suqashfs_size:
                return True
            elif file_size == suqashfs_size:
                print(f"{file_path} is a squashfs file not a mtd4 file!")
            else:
                raise ValueError(f"{file_path} is a squashfs file but it's file size error!")
    else:
        print(f"{file_path} is not a squashfs/mtd4 file !")
    return False


def get_file_size_in_kb(file_path):
    try:
        # 获取文件大小（以字节为单位）
        size_in_bytes = os.path.getsize(file_path)
        # 将字节转换为KB
        size_in_kb = size_in_bytes / 1024
        print(f"The file size is {size_in_kb} KB")
    except FileNotFoundError:
        print("File not found")


# 从编程器固件或者 zloader中读取分区结构
def get_partions_info_from_firmware(firmware_file_path):
    partitions = []
    with open(firmware_file_path, "rb") as file:
        file.seek(8224)  # 0x2020
        mtd_offsets = 0
        i = 0
        while True:
            data = file.read(40)
            if data[:2] == b"\x00\x00":
                break
            name = data[:16].rstrip(b"\x00").decode("utf-8")
            ftype = data[16:32].rstrip(b"\x00").decode("utf-8")
            size = struct.unpack("<I", data[36:])[0]
            if ftype != "nand":
                break
            print(f"mtd 分区名: {name}, 类型: {ftype}, 大小(Bytes): {size}")
            partitions.append((f"{i}.{name}", mtd_offsets, size))  # 存储分区的信息
            i += 1
            mtd_offsets += size
    return partitions

# 针对编程器固件读取分区表并拆分分区
def split_mtds_by_partitions(firmware_file_path,output_path):
    partitions = get_partions_info_from_firmware(firmware_file_path)
    with open(firmware_file_path, "rb") as file:
        # 输出每个分区文件
        for i, (name, offset, size) in enumerate(partitions):
            file.seek(offset)
            data = file.read(size)
            with open(os.path.join(output_path, name), "wb") as partition_file:
                partition_file.write(data)
                print(f"分区 {i} {name} 输出到 {name}")
        # 输出分区结构备份
        package_json_file = os.path.join(output_path, package_json_file_name)
        with open(package_json_file, "w") as json_file:
            json.dump(partitions, json_file)
            print(f'分区结构表输出到: {package_json_file}')





# 分割固件，支持 zxic 8MB 和 16MB 固件
def split_firmware(firmware_file_path):
    if not os.path.exists(firmware_file_path):
        print(f"{firmware_file_path} 文件不存在!")
        return
    

    output_path = os.path.join(os.path.dirname(firmware_file_path), output_path_name)
    if not os.path.exists(output_path):
        os.mkdir(output_path)

    with open(firmware_file_path, "rb") as file:
        file_size = os.path.getsize(firmware_file_path)
        mtd4_file_system = "unknown"
        if file_size == 8 * 1024 * 1024:
            mtd4_file_system = "squashfs"
        elif file_size == 16 * 1024 * 1024:
            mtd4_file_system = "jffs2"
        else:
            print(f"{firmware_file_path} 似乎并不是一个 zxic 的编程器固件，文件大小必须是 8MB/16MB!")
            return

        if is_zxic_fireware_file(firmware_file_path):
            print(f"{firmware_file_path} 固件的rootfs分区是 {mtd4_file_system} 文件系统， 固件大小 size={file_size} bytes")
            # 是 zxic 固件
            # partitions = get_partions_info(firmware_file_path)
            split_mtds_by_partitions(firmware_file_path, output_path)

            # partitions = []  # 用来存储各个分区的偏移量和大小
            # file.seek(8224)  # 0x2020
            # mtd_offsets = 0
            # i = 0
            # while True:
            #     data = file.read(40)
            #     if data[:2] == b"\x00\x00":
            #         break
            #     name = data[:16].rstrip(b"\x00").decode("utf-8")
            #     ftype = data[16:32].rstrip(b"\x00").decode("utf-8")
            #     size = struct.unpack("<I", data[36:])[0]
            #     if ftype != "nand":
            #         break
            #     print(f"mtd 分区名: {name}, 类型: {ftype}, 大小(Bytes): {size}")
            #     partitions.append((f"{i}.{name}", mtd_offsets, size))  # 存储分区的信息
            #     i += 1
            #     mtd_offsets += size

            # # 输出每个分区文件
            # for i, (name, offset, size) in enumerate(partitions):
            #     file.seek(offset)
            #     data = file.read(size)
            #     with open(os.path.join(output_path, name), "wb") as partition_file:
            #         partition_file.write(data)
            #         print(f"分区 {i} {name} 输出到 {name}")
            # # 输出分区结构备份
            # package_json_file = os.path.join(output_path, package_json_file_name)
            # with open(package_json_file, "w") as json_file:
            #     json.dump(partitions, json_file)
            #     print(f'分区结构表输出到: {package_json_file}')
        # elif header.hex().startswith("68737173"):
        #     print(f"{firmware_file_path}")
    return output_path

# 合并 MTD 分区为编程器固件
def merge_firmware(mtds_directory):
    if len(mtds_directory) < 2:
        print(f"{mtds_directory} 路径错误!")
        return
    mtds_directory = os.path.join(mtds_directory, output_path_name)
    
    package_json_file = os.path.join(mtds_directory, package_json_file_name)
    if not os.path.exists(package_json_file):
        print(f'目录 {mtds_directory} 未找到 {package_json_file_name}')
        return

    merged_firmware_file = os.path.join(mtds_directory, merged_firmware_name)

    with open(package_json_file, "r") as json_file:
        partitions = json.load(json_file)
    full_firmware = bytearray()
    for name, offset, size in partitions:
        with open(os.path.join(mtds_directory,name), "rb") as partition_file:
            print(f'合并 mtd 分区 {name} 到 {merged_firmware_file}...')
            data = partition_file.read()
            full_firmware += data
    with open(merged_firmware_file, "wb") as full_file:
        full_file.write(full_firmware)
    print(f"合并固件到 {merged_firmware_file} 成功!")


# 编程器固件或 mtd 分区内查找squashfs镜像文件
def find_squashfs(filename):
    # Squashfs filesystem, little endian, version 4.0, compression:xz
    magic = '68 73 71 73 ** ** 00 00 ** ** ** ** 00 00 ** 00 ** 00 00 00 ** 00 ** 00 ** ** ** 00 ** 00 00 00 ** ** ** ** 00 00 00 00 ** ** ** 00 00 00 00 00 ** ** ** 00 00 00 00 00 FF FF FF FF FF FF FF FF'
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

# 提取并导出 squashfs 镜像文件，输出文件大小信息
def extract_squashfs_file(squashfs_image, offset, size, output_filename):
    parent_directory = os.path.dirname(squashfs_image)
    original_file_name = os.path.basename(squashfs_image)
    file_name_without_extension = os.path.splitext(original_file_name)[0]
    file_extension = os.path.splitext(original_file_name)[1]

    new_file = f'{file_name_without_extension}_{output_filename}{file_extension}'
    output_path = parent_directory
    if os.path.basename(output_path) != output_path_name:
        output_path = os.path.join(parent_directory,output_path_name)
    file_path = os.path.join(output_path, new_file)

    with open(squashfs_image, 'rb') as f_in:
        f_in.seek(offset)
        data = f_in.read(size)
        with open(file_path, 'wb') as f_out:
            f_out.write(data)
    print("文件",file_path,"提取完成，文件大小为", size, "字节")


# 从编程器固件或 mtd4分区中提取 squashfs 镜像文件
def unpack_firmware(file_path):
    if len(file_path) < 2:
        print(f"{file_path} path invalid!")
        return
    extract_flag = False
    if is_mtd4_squashfs_file(file_path):
        extract_flag =True
        print(f'{file_path} 识别为`squashfs mtd4`分区....')
    elif is_zxic_fireware_file(file_path):
        extract_flag =True
        print(f'{file_path} 识别为`zxic firmware`编程器固件....')

    squashfs_files_list = find_squashfs(file_path)
    if len(squashfs_files_list) > 0:
        if len(squashfs_files_list) > 1:
            print(f'发现 {len(squashfs_files_list)} 个镜像文件')
        for file_info in squashfs_files_list:
            extract_squashfs_file(file_path, file_info.get('offset'),file_info.get('size'),f"{hex(file_info.get('offset')).replace('0x', '')}-{hex(file_info.get('offset') + file_info.get('size')).replace('0x', '')}")

# 将 squashfs 镜像文件填充 到 编程器固件或 mtd4 分区
def repack_firmware(input_image, target_file_path, replaced_image_file_index=0):
    if not os.path.exists(input_image):
        print(f'待回写 {input_image} 文件不存在')
        return
    if not os.path.exists(target_file_path):
        print(f'回写目标 {target_file_path} 文件不存在')
        return

    squashfs_files_list = find_squashfs(target_file_path)
    if len(squashfs_files_list) > 0:
        replaced_image_file_info = squashfs_files_list[0]
        print(f'发现 {len(squashfs_files_list)} 个镜像文件')
        if len(squashfs_files_list) > 0:
            if replaced_image_file_index > 0:
                replaced_image_file_info = squashfs_files_list[replaced_image_file_index]
            original_image_offset = replaced_image_file_info.get('offset')
            original_image_size = replaced_image_file_info.get('size')

            input_image_size = os.path.getsize(input_image)
            if input_image_size > original_image_size:
                print(f'导入文件大小超过原始文件大小，可能导致文件结构破坏，建议新镜像文件≤原镜像文件')
            shutil.copy2(target_file_path, target_file_path + ".bak")
            with open(target_file_path, 'r+b') as file_a:
                image_file_content = file_a.read()
                file_a.seek(original_image_offset)
                empty_bytes = bytes([0xFF] * original_image_size)
                with open(input_image, 'rb') as file_b:
                    input_image_file_content = file_b.read()
                    file_a.seek(original_image_offset)
                    file_a.write(input_image_file_content)
                    print(f'{input_image} 已回写到 {target_file_path}')
    
    



# 使用帮助
def help(file_name):
    print(f"Usage: python script.py <operation> <firmware_file>\n")
    print(f"operations:\n")
    print(f"    split    split mtds from a firmware")
    print(f"        eg: python3 {file_name} split c:\\full.bin\n")

    print(f"    merge    merge mtds from a directory to a firmware")
    print(f"        eg: python3 {file_name} merge c:\\\n")

    print(f"    unpack    unpack a squashfs from mtd4 or firmware ")
    print(f"        eg: python3 {file_name} unpack c:\\full.bin\n")
    print(f"        eg: python3 {file_name} unpack c:\\mtd4\n")

    print(
        f"    repack    repack squashfs-root to a squashfs filesystem and put it into mtd4 or firmware"
    )
    print(f"        eg: python3 {file_name} repack c:\\squashfs-root c:\\full.bin\n")
    print(f"        eg: python3 {file_name} repack c:\\squashfs-root c:\\mtd4\n")

    return


# 主函数
def main():
    
    if len(sys.argv) < 3:
        help(script_name)
        return

    operation = sys.argv[1]
    file_path = sys.argv[2]

    if operation == "split":
        # 实现拆分固件的方法
        split_firmware(file_path)
    elif operation == "merge":
        # 实现合并固件的方法
        merge_firmware(file_path)
        pass
    elif operation == "unpack":
        # 实现解包固件的方法
        unpack_firmware(file_path)
        pass
    elif operation == "repack":
        # 实现重新打包固件的方法
        if len(sys.argv) != 4:
            print(f"!!!!!!!! repack need at least 4 parameters\n\n")
            help(script_name)
        target_file_path = sys.argv[3]
        replaced_image_file_index = 0
        if len(sys.argv) >= 5:
            replaced_image_file_index = int(sys.argv[4])
        repack_firmware(file_path,target_file_path, replaced_image_file_index)
    else:
        help(script_name)


if __name__ == "__main__":
    main()
