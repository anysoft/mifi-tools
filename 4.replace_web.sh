#!/bin/bash

# 接收一个参数作为目录名
manufacturer="$1"
borad_name="$2"

# 检查参数是否为空
if [ -z "$version" ]; then
    default_parameter=./squashfs-root/etc_ro/default/default_parameter_user
    manufacturer=$(cat $default_parameter | grep rootdev_modeldes | awk -F "=" '{print $2}')
    if [ "$manufacturer" = "SZXF" ]; then
        if [ -z "$borad_name" ]; then
            borad_name="mf761"
        fi
        
    elif [ "$manufacturer" = "DEMO" ]; then
        remo=$(cat $default_parameter | grep "remo_" | wc -l)
        if [ "$remo" -gt 0 ]; then
            manufacturer="REMO"
            if [ -z "$borad_name" ]; then
                borad_name="1869y"
            fi
        fi
        alk=$(cat $default_parameter | grep "remo_" | wc -l)
        if [ "$alk" -gt 0 ]; then
            manufacturer="ALK"
            if [ -z "$borad_name" ]; then
                borad_name="uz901"
            fi
        fi
        
    fi
fi


# 检查参数是否为空
if [ -z "$manufacturer" ]; then
    echo "错误：厂商信息为空"
    exit 1
fi
# 检查参数是否为空
if [ -z "$borad_name" ]; then
    echo "错误：主板信息为空"
    exit 1
fi

# 定义要清理的目录
TARGET_DIR="./squashfs-root/etc_ro"

# 清理目标目录
rm -rf "$TARGET_DIR"/web

# 复制新的内容到目标目录
cp -a "./webs/$borad_name/web" "$TARGET_DIR"

echo "操作完成，厂商：$manufacturer 主板：$borad_name"



