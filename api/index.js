const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require('cors')
const imageDownloader = require('image-downloader');
const multer = require('multer');
const fs = require('fs');
const urlRoute = require("./routes/pathFinder");
const connectDb = require("./utils/dbConnection");

require("dotenv").config();
const app = express();

connectDb();

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname+'/uploads'));
app.use(cors({
  credentials: true,
  origin: 'http://localhost:5173'
}));



// Define routes
app.use("/api/v1", urlRoute);

// Define a PORT
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.post('/api/v1/upload-by-link', async(req,res) => {
  try {
    const {link} = req.body;
    const newName = 'photo' + Date.now() + '.jpg'
    await imageDownloader.image({
      url: link,
      dest: __dirname + '/uploads/' + newName,
    })
    res.json(newName);
  } catch (error) {
    console.log(error);
  }
})

const photosMiddleware = multer({dest: 'uploads'});
app.post('/api/v1/upload' , photosMiddleware.array('photos',100), (req,res) => {
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
})
