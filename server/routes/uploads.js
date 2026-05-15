const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
const { getUploads, addUpload, deleteUpload, logAudit } = require('../db/queries');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

const UPLOAD_DIR = process.env.UPLOAD_DIR || './uploads';

// Ensure upload directory exists
const ensureUploadDir = async () => {
  try {
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
  } catch (error) {
    console.error('Error creating upload directory:', error);
  }
};

ensureUploadDir();

// Configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    cb(null, `${name}-${timestamp}${ext}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    // Allow PDF and image files
    const allowedMimes = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF and images are allowed.'));
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
});

// GET /api/uploads
// Public route - get all uploads
router.get('/', async (req, res) => {
  try {
    const language = req.query.language;
    const uploads = await getUploads(language);
    res.json(uploads);
  } catch (error) {
    console.error('Error fetching uploads:', error);
    res.status(500).json({ error: 'Failed to fetch uploads' });
  }
});

// POST /api/uploads
// Admin route - upload file
router.post('/', requireAuth, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    const { language = 'en', documentType = 'cv' } = req.body;

    const url = `/uploads/${req.file.filename}`;

    const uploadRecord = await addUpload(
      req.file.filename,
      req.file.originalname,
      req.file.mimetype,
      req.file.size,
      url,
      language,
      documentType
    );

    // Log the upload
    await logAudit('UPLOAD', 'uploads', {
      filename: req.file.filename,
      language,
      documentType,
    });

    res.json(uploadRecord);
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: error.message || 'Failed to upload file' });
  }
});

// DELETE /api/uploads/:filename
// Admin route - delete upload
router.delete('/:filename', requireAuth, async (req, res) => {
  try {
    const filename = req.params.filename;

    // Delete from database
    const deleted = await deleteUpload(filename);

    if (!deleted) {
      return res.status(404).json({ error: 'Upload not found' });
    }

    // Delete from disk
    try {
      await fs.unlink(path.join(UPLOAD_DIR, filename));
    } catch (error) {
      console.warn(`Failed to delete file from disk: ${filename}`, error);
      // Don't fail the request if disk deletion fails
    }

    // Log the deletion
    await logAudit('DELETE', 'uploads', { filename });

    res.json({ success: true, deleted });
  } catch (error) {
    console.error('Error deleting upload:', error);
    res.status(500).json({ error: 'Failed to delete upload' });
  }
});

module.exports = router;
