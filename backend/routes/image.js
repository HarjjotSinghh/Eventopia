const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const fs = require('fs');
const axios = require('axios');
const router = express.Router();
const Buffer = require('buffer');
const imageModal = require('../Modals/imageModal');
const path = require('path');
const multiparty = require('multiparty');
const FormData = require('form-data');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/', upload.single('image'), async (req, res) => {
    const tempDirectory = './temp/';
    const tempFilePath = path.join(tempDirectory, `${Date.now()}.jpg`);
    const form = new multiparty.Form();
    try {
        if (!fs.existsSync(tempDirectory)) {
            fs.mkdirSync(tempDirectory);
        }

        const buffer = req.file.buffer;
        fs.writeFileSync(tempFilePath, buffer);
        const formData = new FormData();
        formData.append('image', fs.createReadStream(tempFilePath));
  
        const response = await axios.post('https://api.imgur.com/3/image', formData, {
            headers: {
            Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`
            }
        });
  
        const { link } = response.data.data;
        console.log(link);
  
        imageModal.create({ link })
            .then(image => {
            res.json({ success: true, link: link });
            })
            .catch(error => {
            console.error('Error saving image:', error);
            res.status(500).json({ error: 'Failed to save image' });
        });
    } catch (error) {
      console.error('Error uploading image:', error);
      res.status(500).json({ error: 'Failed to upload image' });
    } finally {
      // Remove the temporary image file
      fs.unlinkSync(tempFilePath);
    }
});

router.get('/:id', (req, res) => {
    const imageId = req.params.id;

    Image.findById(imageId, (error, image) => {
      if (error) {
        console.error('Error finding image:', error);
        return res.status(500).json({ error: 'Failed to find image' });
      }
      if (!image) {
        return res.status(404).json({ error: 'Image not found' });
      }
      res.json({ link: image.link });
    });
  });

module.exports = router;