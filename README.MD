# INTRO
UFI & MIFI tools

squashfs tools
jffs2 mount
...


# usage
```
1. copy mtd4/4.rootfs/full.bin into this dir
2. rename it to mtd4
3. execute 0.clean.sh to clean the env
4. execute 1.unpackage.sh 
5. execute 2.delete_mgmt_file.sh
6. execute 3.fix_basic_default_parameters.sh
7. execute 4.replace_web.sh
8. execute 5.repackage.sh

9. flash mtd4.new  
```
