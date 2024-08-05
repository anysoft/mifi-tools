rm -rf  mtd4.new
rm -rf  new.squashfs

mksquashfs squashfs-root/ new.squashfs  -comp xz
python3 squashfs_extract.py input mtd4 new.squashfs  0

