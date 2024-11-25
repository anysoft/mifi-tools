#!/bin/bash

# 检查传入的参数
if [ "$#" -eq 0 ]; then
    echo "未输入参数，使用默认值 'mtd4'."
    parameter="mtd4"
else
    parameter="$1"
fi

# 检查文件是否存在
if [ ! -e "$parameter" ]; then
    echo "错误: 文件 '$parameter' 不存在，请输入有效的文件名。"
    exit 1
fi

# 调用 Python 脚本提取文件
if ! python3 squashfs_extract.py output "$parameter"; then
    echo "错误: Python 脚本执行失败。"
    exit 1
fi

# 提取文件名（去除扩展名）
filename=$(basename "$parameter")
filename_no_ext="${filename%.*}"

# 检查是否存在 squashfs-root 文件夹，并删除
if [ -d "squashfs-root" ]; then
    echo "发现 'squashfs-root' 文件夹，正在删除..."
    rm -rf squashfs-root
    if [ $? -ne 0 ]; then
        echo "错误: 删除 'squashfs-root' 文件夹失败。"
        exit 1
    fi
fi

# 可选：打印出执行的命令
echo "执行命令: unsquashfs ${filename_no_ext}_*"

# 使用 unsquashfs 命令
if ! unsquashfs ${filename_no_ext}_*; then
    echo "错误: unsquashfs 命令执行失败。"
    exit 1
fi
