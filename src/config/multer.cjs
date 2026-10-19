const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { v4 } = require('uuid');
const cloudinary = require('./cloudinary.cjs');

//configurando multer para o upload de imagens no Cloudinary.
module.exports = {
  storage: new CloudinaryStorage({
    cloudinary,
    params: {
      folder: 'dev-burguer',
      public_id: (_req, file) => v4().concat(`-${file.originalname}`),
    },
  }),
};
