const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

async function uploadFile(filePath, url) {
  try {
    const fileStream = fs.createReadStream(filePath);
    const formData = new FormData();
    formData.append('file', fileStream);
    formData.append('name', 'xupea');
    // platform
    // arch 
    // version 0.0.1

    const response = await axios.post(url, formData, {
      headers: formData.getHeaders(),
    });

    console.log('文件上传成功');
    console.log('服务器响应:', response.data);
  } catch (error) {
    console.error('文件上传失败:', error);
  }
}

// 上传文件
uploadFile('/Users/xupea/Desktop/Photos/IMG_5814.jpg', 'http://localhost:3000/upload-single-file');