export FILE=/Users/xupea/Desktop/Photos/IMG_5814.jpg

curl -k http://localhost:3000/upload-single-file -X POST -F "file=@${FILE}" -F platform=windows -F arch=x86
