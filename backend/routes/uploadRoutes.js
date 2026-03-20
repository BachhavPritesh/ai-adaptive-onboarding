const express = require('express');
const router = express.Router();
const upload = require('../config/upload');
const { uploadFiles } = require('../controllers/uploadController');
const { generateStudyContent } = require('../controllers/studyController');

router.post(
  '/upload',
  upload.fields([
    { name: 'resume', maxCount: 1 },
    { name: 'jd', maxCount: 1 }
  ]),
  uploadFiles
);

router.post('/generate-study', generateStudyContent);

module.exports = router;
