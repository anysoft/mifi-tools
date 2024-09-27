import os

from pyutils import configs


def delete_files(dir_path, files_to_delete):
    print(f"n\n\n#######################\nstart to delete in directory:\n{dir_path}")

    for file_name in files_to_delete:
        file_path = os.path.join(dir_path, file_name)
        if os.path.exists(file_path):
            os.remove(file_path)
            print(f"Deleted {file_name}")


def check_files(dir_path, files_to_check, check_extra=True):

    print(f"\n\n\n#######################\nstart to scan directory:\n{dir_path}")
    dir_files = os.listdir(dir_path)

    missing_files = [file for file in files_to_check if file not in dir_files]
    if missing_files:
        print(f"The following files are missing:\n {', '.join(missing_files)}")

    if check_extra:
        extra_files = [file for file in dir_files if file not in files_to_check]
        if extra_files:
            print(
                f"The following extra files found in the directory:\n {', '.join(extra_files)}"
            )


def main(default_config_path, rootfs_directory):

    script_path = os.path.abspath(__file__)
    current_directory = os.path.dirname(script_path)


    dir_list = ['bin', 'sbin']
    # dir_list = ['bin', 'sbin', 'usr/bin', 'usr/sbin']

    # usr_bin_check = [,[[,cal,traceroute,find,traceroute6,users,dumpleases,top,awk,cut,basename,tr,unzip,dirname,env,killall,head,tty,groups,sort,hostid,expr,free,tftp,[,wc,id,md5sum,test,
    # usr_sbin_check = arping,brctl,dhcprelay,udhcpd
    for dir in dir_list:
        dir_path = os.path.join(rootfs_directory, dir)
        bin_to_delete = configs.get_item_list(default_config_path,dir,'delete_file_list') # ["terminal_mgmt", "tc_tbf.sh"]
        bin_to_check = configs.get_item_list(default_config_path,dir,'base_file_list')
        check_files(dir_path, bin_to_check)
        delete_files(dir_path, bin_to_delete)


if __name__ == "__main__":
    main()