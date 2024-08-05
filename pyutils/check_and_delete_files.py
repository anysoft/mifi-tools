import os


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


def main(rootfs_directory):

    script_path = os.path.abspath(__file__)
    current_directory = os.path.dirname(script_path)

    # 指定目录路径
    bin_path = os.path.join(rootfs_directory, "bin")
    sbin_path = os.path.join(rootfs_directory, "sbin")
    usr_bin_path = os.path.join(rootfs_directory, "usr/bin")
    usr_sbin_path = os.path.join(rootfs_directory, "usr/sbin")

    # 指定要删除的文件列表
    files_to_delete = ["terminal_mgmt", "tc_tbf.sh"]

    # 指定要检测的文件列表
    bin_to_check = [
        "adbd",
        "cli",
        "dhcp6s",
        "dnsmasq",
        "fs_check",
        "goahead",
        "hostapd",
        "ifcfg",
        "ip",
        "nv",
        "radvd",
        "routef",
        "routel",
        "rtpr",
        "tc",
        "wifi_test",
        "wpa_supplicant",
        "zte_amt",
        "zte_log_agent",
        "ls",
        "rmdir",
        "df",
        "sed",
        "ping",
        "busybox",
        "zcat",
        "echo",
        "iptables-save",
        "stat",
        "touch",
        "login",
        "sh",
        "mount",
        "hostname",
        "ln",
        "ip6tables-restore",
        "kill",
        "cat",
        "ash",
        "ip6tables",
        "mkdir",
        "mknod",
        "fsync",
        "iptables-restore",
        "fgrep",
        "date",
        "ip6tables-save",
        "rm",
        "sync",
        "grep",
        "netstat",
        "true",
        "sleep",
        "dnsdomainname",
        "chmod",
        "mv",
        "ps",
        "pwd",
        "ping6",
        "egrep",
        "umount",
        "iptables",
        "false",
        "uname",
        "cp",
        "gunzip",
    ]

    sbin_to_check = [
        "auto_dial.sh",
        "clat_config.sh",
        "config-dns.sh",
        "config-hostname.sh",
        "config-igmpproxy.sh",
        "config-parents.sh",
        "config-udhcpd.sh",
        "customer_type.sh",
        "ddns.sh",
        "defwan_set.sh",
        "firewall_init.sh",
        "fota_release_space.sh",
        "gateway_send_arp.sh",
        "get_errinfo.sh",
        "getpid.sh",
        "global.sh",
        "internet.sh",
        "ip_ratelimit.sh",
        "ipv6_addr_conver",
        "lan.sh",
        "landev_updown.sh",
        "nat.sh",
        "netdog_init_set.sh",
        "ppp_updown.sh",
        "pppd_up.sh",
        "pppoe_dail.sh",
        "pppoe_updown.sh",
        "print_errmsg.sh",
        "psext_down.sh",
        "psext_down_ipv6.sh",
        "psext_up.sh",
        "psext_up_ipv6.sh",
        "psext_updown.sh",
        "psext_updown_ipv6.sh",
        "rm_dev.sh",
        "router_msg_proxy",
        "start_telnetd.sh",
        "start_update_app.sh",
        "tc_tbf.sh",
        "to_mnt_ubifs.sh",
        "udhcpc.sh",
        "upnp.sh",
        "upnp_ipt_init.sh",
        "upnp_ipt_remove.sh",
        "upnp_set_listenip.sh",
        "user-config-udhcpd.sh",
        "wan_ipv4.sh",
        "wan_ipv6.sh",
        "wan_ipv6_config.sh",
        "zte-rtc-clock",
        "zte_arp_proxy",
        "zte_ipv6_slaac",
        "zte_ndp",
        "zte_ufi",
        "zte_watch_devid_qrcode.sh",
        "sysctl",
        "zte_mifi",
        "reboot",
        "route",
        "mdev",
        "udhcpc",
        "mkswap",
        "arp",
        "ifconfig",
        "halt",
        "init",
        "poweroff",
    ]

    usr_bin_check = [
        "[",
        "[[",
        "cal",
        "traceroute",
        "find",
        "traceroute6",
        "users",
        "dumpleases",
        "top",
        "awk",
        "cut",
        "basename",
        "tr",
        "unzip",
        "dirname",
        "env",
        "killall",
        "head",
        "tty",
        "groups",
        "sort",
        "hostid",
        "expr",
        "free",
        "tftp",
        "[",
        "wc",
        "id",
        "md5sum",
        "test",
    ]

    usr_sbin_check = [
        "arping",
        "brctl",
        "dhcprelay",
        "udhcpd"
    ]

    # 检测指定目录的文件是否存在
    check_files(bin_path, bin_to_check)
    check_files(sbin_path, sbin_to_check)
    check_files(usr_bin_path, usr_bin_check)
    check_files(usr_sbin_path, usr_sbin_check)

    # 删除指定目录下的指定文件
    delete_files(bin_path, files_to_delete)
    delete_files(sbin_path, files_to_delete)
    delete_files(usr_bin_path, files_to_delete)
    delete_files(usr_sbin_path, files_to_delete)

if __name__ == "__main__":
    main()