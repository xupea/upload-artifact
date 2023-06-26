const axios = require("axios");
const fs = require("fs");

function downloadFile(url, dest) {
  const filePath = "./IMG_5814.jpg";

  const writer = fs.createWriteStream(filePath);

  axios.get(url, { responseType: "stream" }).then((res) => {
    res.data.pipe(writer);
  });
}

downloadFile("http://localhost:3000/download/remote-assistance/mac/arm64");
