const  cloudinary = require("cloudinary").v2;
const {CloudinaryStorage} = require("multer-storage-cloudinary");


// be default key names should be like this

cloudinary.config(
    {
        cloud_name : process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_API_KEY,
        api_secret :process.env.CLOUD_API_SECRET,
    },
);


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'QuestNest',
      allowedFormat: ["png","jpg","jpeg","pdf"],
    },
  });

  module.exports = {cloudinary, storage};
   

