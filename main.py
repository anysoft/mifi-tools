import json
import sys
import os

from pyutils import zxic_firmware_tools, check_and_delete_files, nv_compare, nv_replace, nv_sort, adb_tools

current_script_name = os.path.basename(__file__)
mifi_tools_base_dirs = os.path.dirname(os.path.abspath(__file__))
work_space_path = mifi_tools_base_dirs
arm_tools_path = os.path.join(mifi_tools_base_dirs, "arm-tools")

default_firmware_name = 'full.bin'

# 输出目录
output_path_name = 'output'
rootfs_path_name = 'squashfs-root'


def clear_screen():
    if os.name == 'nt':  # 如果是 Windows 系统
        os.system('cls')
    else:  # 如果是类 Unix 系统
        os.system('clear')


def main_menu():
    clear_screen()
    print(f'############################### MIFI-TOOLS ##################################')
    print(f'【PS】仅支持 zxic 中兴微固件\n\n')

    print(f'功能菜单:                工作目录:{work_space_path} 固件名称: {default_firmware_name}\n')

    print('----------------------------------固件解包/打包---------------------------------------')

    print(f'O) 设定工作目录/选择编程器固件        BACK) 备份分区及文件\n')
    print(f'A) 编程器固件 拆分为 mtd 分区        D) mtds 分区合并为 编程器固件\n')

    print(f'B) rootfs(squashfs镜像提取)        C) squashfs 格式的 rootfs 回写\n\n')

    # print(f'        只能从(8MB flash) 编程器固件 或 MTD4(rootfs)分区 提取squashfs格式的rootfs')
    # print(f'        不支持 16MB falsh 的固件，16MB falsh 固件本身也无需/无法提取，其rootfs分区为jffs2文件系统，直接到linux上挂载编辑即可\n')

    # print(f'        将squashfs格式的rootfs回写到 编程器固件 或 mtd4 分区\n')

    print('----------------------------------文件及配置修改---------------------------------------')
    print(f'1) 对比输出文件目录树及删除特定文件\n')
    print(f'2) 根据pyutils/default_parameter_default 修改 默认配置/etc_ro/default/default_parameter_* \n')
    print(f'3) 对比 2 个配置文件 \n')
    print(f'4) 对指定配置文件根据配置项的首字母排序输出 \n')

    print('-----------------------------------未实现----------------------------------------')
    print(f'\nR) 刷写 rootfs 分区        I) 刷写 imagefs 分区        U) 刷写 userdata 分区 \n')
    print(f'W) 刷指定 web(仅支持可读写 16MB 设备，adb 刷写)  \n')
    print(f'AUTO) 一键制作全功能后台编程器固件及mtd4(基于squashfs的rootfs分区) \n')

    print(f'####################### by: anysoft ##########################')


def continue_any_key():
    input("按下Enter键继续......")


def set_work_space_and_bin():
    firmware_file_path = input("请输入固件完整路径: ")
    if os.path.exists(firmware_file_path):
        work_space_path = os.path.dirname(firmware_file_path)
        default_firmware_name = os.path.basename(firmware_file_path)
    else:
        print(f'{firmware_file_path} 文件不存在，请重新输入！')
        set_work_space_and_bin()


def pull_dirs(path, target):
    if path.startswith('/'):
        path = path.replace('\\', '/')
    os.makedirs(target, exist_ok=True)
    dirs = adb_tools.get_sub_dirs(path)
    for dir in dirs:
        if path == '/' and dir in ['dev','media','proc','sys','tmp']:
            print(f'Skip system dirs /{dir}')
            continue # 跳过系统目录

        # if path != '/':
        #     target = os.path.join(target, dir)
        pull_dirs(os.path.join(path, dir), os.path.join(target, dir))
    files = adb_tools.get_sub_files(path)
    print(f'Start to scan {path}......')
    for file in files:
        file_path = os.path.join(path, file)
        target_path = os.path.join(target, file)
        if file_path.startswith('/'):
            file_path = file_path.replace('\\', '/')
        adb_tools.pull_file(file_path, target_path)
        print(f'Pull {file_path} to {target_path}')
    print('\n')


def backup_firmware():
    firmware_name = input("请输入要保存的固件名称: ")
    if len(firmware_name) < 1:
        print(f'{firmware_name} 未输入名称！')
        backup_firmware()

    backups_dir = os.path.join(work_space_path, 'backups')
    firmware_path = os.path.join(backups_dir, firmware_name)
    mtds_path = os.path.join(firmware_path, 'mtd')
    blk_path = os.path.join(firmware_path, 'blk0')
    pull_path = os.path.join(firmware_path, 'pull')
    info_path = os.path.join(firmware_path, 'info')

    if os.path.exists(firmware_path):
        print(f'{firmware_name} 名称已存在，请重新输入！')
        backup_firmware()

    os.makedirs(firmware_path, exist_ok=True)
    os.makedirs(mtds_path, exist_ok=True)
    os.makedirs(blk_path, exist_ok=True)
    os.makedirs(pull_path, exist_ok=True)
    os.makedirs(info_path, exist_ok=True)

    # 获取 mtds 分区信息
    adb_mtds = adb_tools.run_adb_command("cat /proc/mtd |grep -v \"dev:\"|awk '{print $4}'")
    mtd_names = adb_mtds.decode('utf-8').replace('\r\r\n', '\r\n').replace('"', '').split('\r\n')
    mtd_names = [item for item in mtd_names if item]

    adb_mtds = adb_tools.run_adb_command("cat /proc/mtd |grep -v \"dev:\"|awk '{print $1}'")
    mtd_ids = adb_mtds.decode('utf-8').replace('\r\r\n', '\r\n').replace(':', '').split('\r\n')
    mtd_ids = [item for item in mtd_ids if item]

    # 拉取 mtds 分区并合并写入 full.bin
    firmware_data = b'';
    for i in range(len(mtd_ids)):
        mtd_id = mtd_ids[i]
        mtd_name = mtd_names[i]

        mtd_file_name = f'{i}.{mtd_name}'
        mtd_file_path = os.path.join(mtds_path, mtd_file_name)
        partitions_file_path = os.path.join(mtds_path, 'packages.json')
        adb_tools.pull_file(f'/dev/{mtd_id}', mtd_file_path)

        with open(mtd_file_path, 'rb') as f:
            firmware_data += f.read()
        if mtd_name == 'zloader':
            # partitions = zxic_firmware_tools.get_partions_info_from_firmware(mtd_file_path)
            partitions = adb_tools.get_partitions_from_system()
            with open(partitions_file_path, 'w') as json_file:
                json.dump(partitions, json_file)
    # 合并 mtds 分区
    with open(os.path.join(blk_path, 'full.bin'), 'wb') as f:
        f.write(firmware_data)

    # 拉取 info
    file_list = ['mtd', 'cmdline', 'cpuinfo', 'meminfo', 'partitions']

    for file_name in file_list:
        source = f'/proc/{file_name}'
        target = os.path.join(info_path, f'{file_name}.txt')
        adb_tools.pull_file(source, target)

    with open(os.path.join(info_path, 'nv.txt'), 'w') as nv_file:
        nv_file.write(adb_tools.run_adb_command('nv show').decode('utf-8').replace('\r\r\n', '\r\n'))

    # 拉取文件
    pull_dirs('/', pull_path)




def push_arm_tools():
    adb_tools.run_adb_command('mount -o remount,rw /')
    adb_tools.run_adb_command('mount -o remount,rw,suid,exec  /tmp')
    adb_tools.push_file(os.path.join(arm_tools_path, "flashcp"),'/tmp')
    adb_tools.run_adb_command(f'chmod +x /tmp/flashcp')

    adb_tools.push_file(os.path.join(arm_tools_path, "screen"),'/tmp')
    adb_tools.run_adb_command(f'chmod +x /tmp/screen')

    adb_tools.push_file(os.path.join(arm_tools_path, "dd"), '/tmp')
    adb_tools.run_adb_command(f'chmod +x /tmp/dd')


def flash_rootfs():
    mtd4_file_path = input("请输入 mtd4 文件路径")
    if os.path.exists(mtd4_file_path):
        if zxic_firmware_tools.is_mtd4_squashfs_file(mtd4_file_path):
            adb_tools.run_adb_command('mount -o remount,rw /')
            push_arm_tools()
            adb_tools.push_file(f'{mtd4_file_path} /tmp/')
            adb_tools.run_adb_command('/sbin/fota_release_space.sh')
            adb_tools.run_adb_command(f'echo "echo 1>/tmp/a ^C-a d" > /tmp/.screenrc')


def main():
    while True:
        main_menu()
        user_input = input("请输入命令（'exit'退出程序）: ").upper()
        if user_input == 'EXIT':
            sys.exit()
        elif user_input == 'O':
            set_work_space_and_bin()
            continue_any_key()

        elif user_input == 'BACK':
            print('备份编程分区及固件')
            backup_firmware()
            continue_any_key()

        elif user_input == 'A':
            print('编程器固件拆分为 mtd 分区')
            zxic_firmware_tools.split_firmware(os.path.join(work_space_path, default_firmware_name))
            continue_any_key()

        elif user_input == 'D':
            print('合并 mtd 分区为 编程器固件')
            zxic_firmware_tools.merge_firmware(work_space_path)
            continue_any_key()

        elif user_input == 'B':
            print('rootfs(squashfs镜像提取)')
            user_input = input(
                f'默认将从{os.path.join(work_space_path, default_firmware_name)} 中提取，如需选择其他文件请输入字母 O :').upper()

            unpack_file_path = os.path.join(work_space_path, default_firmware_name)
            if user_input == 'O':
                unpack_file_path = input(f'请输入待提取文件路径:')
            zxic_firmware_tools.unpack_firmware(unpack_file_path)
            continue_any_key()

        elif user_input == 'C':
            print('squashfs 格式的 rootfs 回写')
            rootfs_image_path = input(f'请输入待回写的 squashfs 格式的 rootfs 镜像文件:')
            target_image_path = input(f'请输入回写目标文件(编程器固件/mtd4分区文件):')
            zxic_firmware_tools.repack_firmware(rootfs_image_path, target_image_path)
            continue_any_key()

        elif user_input == '1':
            print('对比输出文件目录树及删除特定文件')
            output_path = os.path.join(work_space_path, output_path_name)
            check_and_delete_files.main(os.path.join(output_path, rootfs_path_name))
            continue_any_key()

        elif user_input == '2':
            print('替换默认配置')
            target_image_path = input(f'请输入目标配置目录:')
            nv_replace.main(os.path.join(output_path, rootfs_path_name))
            continue_any_key()

        elif user_input == '3':
            print('2 个配置文件对比')

            source_config_file = input(f'请输入来源配置文件路径:')
            target_config_file = input(f'请输入目标配置文件路径:')
            nv_compare.main(source_config_file, target_config_file)
            continue_any_key()

        elif user_input == '4':
            print('配置项排序')
            target_image_path = input(f'请输入目标配置文件路径:')
            nv_sort.print_sorted_config(target_image_path)
            continue_any_key()


        elif user_input == 'R':
            print('刷写 rootfs 分区')
            print('正在努力实现......')

            continue_any_key()

        elif user_input == 'I':
            print('刷写 imagefs 分区')
            print('正在努力实现......')
            continue_any_key()

        elif user_input == 'U':
            print('刷写 userdata 分区')
            print('正在努力实现......')
            continue_any_key()

        elif user_input == 'W':
            print('刷指定 web')
            print('正在努力实现......')
            continue_any_key()

        elif user_input == 'AUTO':
            print('一键制作全功能后台编程器固件及mtd4(基于squashfs的rootfs分区)')
            print('正在努力实现......')
            continue_any_key()



        else:
            print("无法识别的命令。")


if __name__ == "__main__":
    main()
    pass
