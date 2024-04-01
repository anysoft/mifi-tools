# 关于编程器固件

> 所谓编程器固件是用编程器读取嵌入式设备的FLASH存储数据生成的文件，类似于直接用工具复制整个硬盘

## 编程器固件与普通固件的差异

- 编程器固件是用特定的结构(按顺序、大小)将一些文件系统分区、文件、镜像包文件等写入到FLASH存储器上-

- 普通固件是则是升级包的特定格式，需要由升级程序进行校验、拆解后将对应的文件系统分区(或文件)写入对应位置的文件系统分区

## 编程器固件与普通电脑硬盘格式上的差异

- 一般嵌入式Flash存储上的文件系统而言不存在分区表的结构，一般是提前约定在特定的存储空间位置写入对应的文件系统分区、镜像。然后将约定的位置写入内核，在内核启动过程中主动按约定位置去寻找、启动文件系统内的根系统。

- 普通电脑上的硬盘数据一般由分区表和硬盘分区组成，分区的大小顺序信息记录在分区表中，比如常见的MBR和GPT分区表格式，嵌入式的设备FLASH一般不直接描述分区表。而是交给内核处理。

## 常见编程器固件的内部结构

在编程器固件内一般是划分为一个一个的块，也就是我们常见的mtd，通过cat /proc/mtd 可以看到mtd块设备的信息，而文件系统则是写入在块设备内。

## 编程器固件的修改

对编程器固件的修改编辑一般分为两个步骤：

1. 按块拆分编程器固件，也就是将完整的`full.bin` 拆解成几个`mtd0~5`的块文件。
2. 针对不同文件系统的块文件进行编辑处理内部文件
   1. jffs2/yaffs2等文件系统要先用mtd-utils挂载到linux系统上，再对内部文件进行修改，修改后卸载文件系统即可。
   2. squashfs文件系统由于是压缩后的只读文件系统，所以一般需要用squashfs-tools工具包进行解压后再进行修改，修改完成后再进行压缩。再将压缩后的squashfs写入到对应的块文件
3.  将单独的块文件合并成完整的`full.bin` 固件 或者直接在`full.bin`的特定偏移位置进行编辑替换即可。



# 棒子编程器固件修改

> 基于上述的一些基础概念的介绍，对编程器固件的修改思路就已经很清晰了

棒子的编程器固件一般分为两种：

1. `16MB` FLASH的编程器固件其中`rootfs`跟系统分区为jffs2文件系统
2. `8MB` FLASH的编程器固件，由于空间不够，对`rootfs`分区采用的压缩后的`squashfs`文件系统

## 修改流程

> 修改流程一般如下：
>
> 1. 提取编程器固件(`随身WiFi助手`对于开了`adb`的设备可以直接一键提取`full.bin`和对应`MTD`分区，无需拆解)
> 2. 拆解`MTD`块设备分区（如果可以进入系统`shell`下，比如`adb`，直接`cat /proc/mtd`可以获取分区结构）
> 3. 挂载/解压`rootfs`分区，`userdata`分区
> 4. 修改3中的分区文件，去控等自定义
> 5. 完成修改后打包/卸载分区，再写入到MTD文件，最后合并`full.bin`

## squashfs(8MB)编程器固件修改

> 以下为`Ubuntu`系统下操作教程

```
# 在`full.bin` 所在目录下载 py脚本
wget https://raw.githubusercontent.com/anysoft/mifi-tools/main/squashfs_extract.py

# 执行提取脚本 得到 full_498000-74eccc.bin 之类的squashfs文件
python3 squashfs_extract.py output full.bin

# 安装squafs-tools 工具
apt install squashfs-tools

# 对 full_498000-74eccc.bin 进行解压
# 解压后文件在 squashfs-root/目录下，可以进行去控修改啦
unsquashfs full_498000-74eccc.bin

# 去控修改
## 一般删除bin 和sbin目录下的一些流控程序、脚本
## 同时编辑 etc/rc 文件开启 adb、去掉远控代码，加上nv set *** 等开机自动对nv修改的命令
## 修改 etc_ro/default/ 目录下几个配置文件的默认配置
## 修改替换 etc_ro/web web.zip 后台(并不是所有棒子、机都支持全功能后台，由于版本不一样，很多机子是不支持全功能后台的)
## 对于不支持全功能后台的机器只能修改 etc_ro/web/js/set.js 内的一些开关来开启一些隐藏菜单，或者编辑com.js修改一些逻辑

# 重新打包，得到 new.squashfs
mksquashfs squashfs-root/ new.squashfs -comp xz

# 用 new.squashfs 替换full.bin中的 rootfs分区，得到 full.bin.new的新编程器固件
python3 squashfs_extract.py input full.bin new.squashfs 0

```

到这里squashfs编程器固件的修改过程就已经完成啦~~





## jffs2 文件系统挂载

```
# 编译安装 mtd-utils
sudo apt update
sudo apt install build-essential liblzo2-dev zlib1g-dev
git clone git://git.infradead.org/mtd-utils.git
cd mtd-utils/
./autogen.sh 
./configure 
make -j8
cp -a mkfs.* /usr/bin/


# 挂载 jffs2的mtd  9830400Bytes /1024 = 9600KB
# total_size后面跟的参数单位是KB，并且其大小要大于jffs2镜像文件的大小
sudo modprobe mtdram total_size=9600  
sudo modprobe mtd
sudo modprobe mtdblock
sudo modprobe jffs2

## 拷贝jffs2镜像文件到/dev/mtd0：
sudo dd if=mtd4 of=/dev/mtd0
# 挂载(mount)/dev/mtdblock0：
sudo mount -t jffs2 -o rw /dev/mtdblock0 rootfs

# 修改去控
。。。。。

# 卸载操作
sudo umount rootfs
sudo rmmod jffs2 mtdblock mtdchar mtdram mtd_blkdevs mtd
rm -rf /dev/mtd0


# 生成新的jffs2文件
dd if=/dev/mtdblock0 of=new_systemfs.jffs2

# 替换 mtd4 合并完整full.bin 刷入即可


# 说明
# mtd4 为打包的jffs2文件，也就是原始的rootfs分区
# rootfs 为要挂载到的目录，mtd4的内容会显示到rootfs文件夹目录
# new_systemfs.jffs2 为新的rootfs分区jffs2文件

```
1. 下载python3脚本
![1. 下载python3脚本](https://img-blog.csdnimg.cn/direct/39d5faed4bc4422e9a19cfbdd36a9a80.png#pic_center)
2. 提取squashfs的rootfs
![2. 提取squashfs的rootfs](https://img-blog.csdnimg.cn/direct/161bc417261848dd827df50409ff77bf.png#pic_center)
3. 安装squashfs-tools并解压
![3. 安装squashfs-tools并解压](https://img-blog.csdnimg.cn/direct/b9baaa7cb92b43308b1d992a7c1e21fe.png#pic_center)
4. 解压后的rootfs分区文件夹
![4. 解压后的rootfs分区文件夹](https://img-blog.csdnimg.cn/direct/fb3ed6d186c64f00a9e38bc147f4d52d.png#pic_center)

5. 重新打包得到new.squashfs
![5. 重新打包得到new.squashfs](https://img-blog.csdnimg.cn/direct/7eda22f42ade45f196204071225cc3af.png#pic_center)

6. 更新编程器固件得到full.bin.new
![6. 更新编程器固件得到full.bin.new](https://img-blog.csdnimg.cn/direct/55780052d27146d2863447ec69d15f92.png#pic_center)
7. 挂载jffs2的rootfs分区
![7. 挂载jffs2的rootfs分区](https://img-blog.csdnimg.cn/direct/5cfa90c2f991491ab6a925c047fed4b5.png#pic_center)
8. 输出新的jffs2
![8. 输出新的jffs2](https://img-blog.csdnimg.cn/direct/a9ae735eaafc4990ad414442062a97cb.png#pic_center)


# 总结
最后总结一下，教程主要参考网上的一些教程，感谢大佬们的付出。
编辑固件最好在linux系统上操作。Windows上可能会导致文件权限出问题，而且一般无法挂载jffs2文件系统。

# 参考来源
https://blog.csdn.net/u014780165/article/details/43192663
py脚本原创
https://github.com/anysoft/mifi-tools/tree/main



# changelog
2024.03.31
增加删除使用过的mtd设备

2024.03.30
发布第一版



 
