rm -rf  mtd4.new
rm -rf  new.squashfs


mksquashfs squashfs-root/ new.squashfs -no-xattrs  -b 262144 -comp xz -Xbcj armthumb -Xdict-size 256KiB  -no-sparse
# -no-duplicates -always-use-fragments
python3 squashfs_extract.py input mtd4 new.squashfs  0

