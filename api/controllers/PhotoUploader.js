const path = require('path');
const fs = require('fs');
const imageDownloader = require('image-downloader');

async function handleUploadByLink(req, res) {
  try {
    const { link } = req.body;
    const newName = 'photo' + Date.now() + '.jpg';
    const uploadDir = path.join(__dirname, '..', 'uploads');

    const destPath = path.join(uploadDir, newName);

    await imageDownloader.image({
      url: link,
      dest: destPath,
    });

    res.json(newName);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Image download failed' });
  }
}

async function handleUploadLocalFile(req, res) {
  try {
    const uploadedFiles = [];
    for(let i=0 ; i<req.files.length ; i++) {
      const {path,originalname} = req.files[i];
      const parts = originalname.split('.');
      const ext = parts[parts.length - 1]
      const newPath = path + '.' + ext;
      fs.renameSync(path, newPath);
      uploadedFiles.push(newPath.replace("uploads" , ""));
    }
    res.json(uploadedFiles);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  handleUploadByLink,
  handleUploadLocalFile
}

