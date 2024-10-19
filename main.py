import json
import sys
import os

from pyutils import zxic_firmware_tools, check_and_delete_files, nv_compare, nv_replace, nv_sort, adb_tools

current_script_name = os.path.basename(__file__)
mifi_tools_base_dirs = os.path.dirname(os.path.abspath(__file__))

default_config_path = os.path.join(mifi_tools_base_dirs, 'configs.ini')

work_space_path = mifi_tools_base_dirs
arm_tools_path = os.path.join(mifi_tools_base_dirs, "arm-tools")

default_firmware_name = 'full.bin'

# 输出目录
output_dir_name = 'output'
rootfs_dir_name = 'squashfs-root'

output_path = os.path.join(work_space_path, output_dir_name)


def clear_screen():
    if os.name == 'nt':  # 如果是 Windows 系统
        os.system('cls')
    else:  # 如果是类 Unix 系统
        os.system('clear')


def print_soft_info():
    print(f'############################### MIFI-TOOLS ##################################')
    print(f'【PS】仅支持 zxic 中兴微固件\n')
    print(f'功能菜单:                固件目录:{work_space_path} 固件名称: {default_firmware_name}')


def print_author_info():
    print(f'####################### by: anysoft ##########################')


def main_menu():
    sub_menu_firmware_tools()


def sub_menu_firmware_tools(msg=''):
    clear_screen()
    print_soft_info()
    print('----------------------------------固件工具箱---------------------------------------')
    print(f'【环境及备份】')
    print(f'O) 设定工作目录/选择编程器固件        BACK) 备份分区及文件\n')

    print(f'【分区拆分/合并】')
    print(f'S) 编程器固件 拆分为 mtd 分区        M) mtds 分区合并为 编程器固件\n')

    print(f'【squashfs 镜像提取/回写】')
    print(f'R) rootfs(squashfs镜像提取)        W) squashfs 格式的 rootfs 回写\n')
    # print(f'        只能从(8MB flash) 编程器固件 或 MTD4(rootfs)分区 提取squashfs格式的rootfs')
    # print(f'        不支持 16MB falsh 的固件，16MB falsh 固件本身也无需/无法提取，其rootfs分区为jffs2文件系统，直接到linux上挂载编辑即可\n')
    # print(f'        将squashfs格式的rootfs回写到 `编程器固件` 或 `mtd4` 分区\n')

    print(f'【squashfs 解压/压缩】')
    print(f'UNPACK) `squashfs`镜像解压为`squashfs_root`目录    PACK) `squashfs`镜像解压为`squashfs_root`目录\n')

    print(f'【rootfs目录修改】')
    print(f'1) 对比输出文件目录树及删除特定文件')
    print(f'2) 根据 `pyutils/default_parameter_default` 修改 默认配置 `/etc_ro/default/default_parameter_*`')
    print(f'3) 替换 `web` ')
    print(f'4) 对比 2 个配置文件 ')
    print(f'5) 对指定配置文件根据配置项的首字母排序输出 \n')

    print(f'AUTO) 一键制作全功能后台编程器固件及mtd4(基于squashfs的rootfs分区) \n')

    print(f'PART) ★★进入分区刷写菜单★★ ')

    print_author_info()

    print(msg)


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

    elif user_input == 'S':
        print('编程器固件拆分为 mtd 分区')
        zxic_firmware_tools.split_firmware(os.path.join(work_space_path, default_firmware_name))
        continue_any_key()

    elif user_input == 'M':
        print('合并 mtd 分区为 编程器固件')
        zxic_firmware_tools.merge_firmware(work_space_path)
        continue_any_key()

    elif user_input == 'R':
        print('rootfs(squashfs镜像提取)')
        user_input = input(
            f'默认将从{os.path.join(work_space_path, default_firmware_name)} 中提取，如需选择其他文件请输入字母 O :').upper()

        unpack_file_path = os.path.join(work_space_path, default_firmware_name)
        if user_input == 'O':
            unpack_file_path = input(f'请输入待提取文件路径:')
        zxic_firmware_tools.unpack_firmware(unpack_file_path)
        continue_any_key()

    elif user_input == 'W':
        print('squashfs 格式的 rootfs 回写')
        rootfs_image_path = input(f'请输入待回写的 squashfs 格式的 rootfs 镜像文件:')
        target_image_path = input(f'请输入回写目标文件(编程器固件/mtd4分区文件):')
        zxic_firmware_tools.repack_firmware(rootfs_image_path, target_image_path)
        continue_any_key()

    elif user_input == '1':
        print('对比输出文件目录树及删除特定文件')
        check_and_delete_files.main(default_config_path ,os.path.join(output_path, rootfs_dir_name))
        continue_any_key()

    elif user_input == '2':
        print('替换默认配置')
        # target_image_path = input(f'请输入目标配置目录:')
        nv_replace.main(os.path.join(output_path, rootfs_dir_name))
        continue_any_key()

    elif user_input == '3':
        print('替换web')
        print('正在努力实现.......')
        # target_image_path = input(f'请输入目标配置目录:')
        # nv_replace.main(os.path.join(output_path, rootfs_dir_name))
        continue_any_key()

    elif user_input == '4':
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
    elif user_input == 'AUTO':
        print('一键制作全功能后台编程器固件及mtd4(基于squashfs的rootfs分区)')
        print('正在努力实现......')
        continue_any_key()

    elif user_input == 'PART':
        sub_menu_active_device()
    else:
        # print("无法识别的命令。")
        sub_menu_firmware_tools(f'无法识别的命令。{user_input}')


def sub_menu_active_device(msg=''):
    clear_screen()
    print_soft_info()
    print('-----------------------------------分区刷写----------------------------------------')
    print(f'R) 刷写 rootfs 分区        I) 刷写 imagefs 分区        U) 刷写 userdata 分区 \n')


    print(f'W) 刷指定 web(仅支持可读写 16MB 设备，adb 刷写)  \n')

    print(f'MAIN) ★★进入固件工具菜单★★')

    print_author_info()

    print(msg)
    user_input = input("请输入命令（'exit'退出程序）: ").upper()
    if user_input == 'EXIT':
        sys.exit()

    elif user_input == 'R':
        print('刷写 rootfs 分区')
        mtd_file_path = input("请输入 mtd4 文件路径:")
        flash_mtd(mtd_file_path)
        continue_any_key()

    elif user_input == 'N':
        print('刷写 nvrofs 分区')
        mtd_file_path = input("请输入 mtd1 文件路径:")
        flash_mtd(mtd_file_path, mtd='mtd1')
        continue_any_key()

    elif user_input == 'I':
        print('刷写 imagefs 分区')
        mtd_file_path = input("请输入 mtd3 文件路径:")
        flash_mtd(mtd_file_path, mtd='mtd3')
        continue_any_key()

    elif user_input == 'U':
        print('刷写 userdata 分区')
        mtd_file_path = input("请输入 mtd5 文件路径:")
        flash_mtd(mtd_file_path, mtd='mtd5')
        continue_any_key()

    elif user_input == 'W':
        print('刷指定 web')
        print('正在努力实现......')
        continue_any_key()

    elif user_input == 'MAIN':
        print('跳转到固件工具箱菜单')
        sub_menu_firmware_tools()





def continue_any_key():
    input("按下Enter键继续......")


def set_work_space_and_bin():
    global work_space_path
    global default_firmware_name
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
        if path == '/' and dir in ['dev', 'media', 'proc', 'sys', 'tmp']:
            print(f'Skip system dirs /{dir}')
            continue  # 跳过系统目录

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

    backups_dir = os.path.join(mifi_tools_base_dirs, 'backups')
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


def push_arm_tools(applets=['flashcp', 'nohup']):
    adb_tools.run_adb_command('mount -o remount,rw /')
    adb_tools.run_adb_command('mount -o remount,rw,suid,exec  /tmp')

    for applet in applets:
        adb_tools.push_file(os.path.join(arm_tools_path, applet), '/tmp')
        adb_tools.run_adb_command(f'chmod +x /tmp/{applet}')




def flash_mtd(mtd_file_path, mtd='mtd4', mode='flashcp'):
    mtd_file_name = os.path.basename(mtd_file_path)
    if os.path.exists(mtd_file_path):
        # todo 校验各分区 magic 防止刷错分区
        if mtd == 'mtd4':
            if not zxic_firmware_tools.is_mtd4_squashfs_file(mtd_file_path):
                print(f'{mtd} 必须是 squashfs 镜像格式才支持刷写！')
                return
        # todo 校验分区大小是否一致 防止刷错分区
        adb_tools.run_adb_command('mount -o remount,rw /')
        print(f'当前刷机模式为:{mode},刷写分区:{mtd}....')
        flash_command = f'/tmp/nohup /tmp/dd if=/tmp/{mtd_file_name} of=/dev/{mtd} conv=fsync 2>&1 >/mnt/userdata/{mtd}.log'
        if mode == 'dd':
            push_arm_tools(['dd', 'nohup'])
        elif mode == 'flashcp':
            push_arm_tools(['flashcp', 'nohup'])
            flash_command = f'/tmp/nohup /tmp/flashcp /tmp/{mtd_file_name} /dev/{mtd} -v 2>&1 >/mnt/userdata/{mtd}.log'

        adb_tools.push_file(mtd_file_path, f'/tmp/{mtd_file_name}')
        adb_tools.run_adb_command('/sbin/fota_release_space.sh')
        adb_tools.run_adb_command("kill -9 $(ps -ef | grep -v init | grep -v adbd | grep -ve '\[' | grep -v 'sh -l' | grep -v '/bin/login' |grep -v PID| grep -v grep |awk '{print $1}')")
        print("已开始刷写分区，请耐心等待(耗时大概30~50s)......")
        adb_tools.run_adb_command(flash_command)
        print(f'{mtd_file_name} 已刷入 {mtd}分区,开始校验文件一致性....')
        out = adb_tools.run_adb_command(f"md5sum /tmp/{mtd_file_name}" + " |awk '{print $1}'")
        md5_mtd_file = out.decode('utf-8').split('\r\r\n')[0]
        out = adb_tools.run_adb_command(f"md5sum /dev/{mtd}" + " |awk '{print $1}'")
        md5_mtd_block = out.decode('utf-8').split('\r\r\n')[0]
        if md5_mtd_block != md5_mtd_file:
            print(f"分区刷写校验失败，{md5_mtd_block} != {md5_mtd_file} 请重新刷写该分区")
        else:
            print(f"分区刷写校验成功，{md5_mtd_block} ==> {md5_mtd_file} ")


def main():
    while True:
        main_menu()


if __name__ == "__main__":
    main()
    pass
