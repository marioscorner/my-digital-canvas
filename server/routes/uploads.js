import express from 'express';
import multer from 'multer';
import path from 'path';
import { promises as fs } from 'fs';
import { getUploads, addUpload, deleteUpload, logAudit } from '../db/queries.js';
import { requireAuth } from '../middleware/auth.js';

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

// Configure multer - temporary storage before renaming
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    // Use a temporary name; we'll rename it properly after validation
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(7);
    cb(null, `temp-${timestamp}-${randomStr}`);
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

/**
 * Generate standardized filename based on document type and language
 * Examples: cv-es.pdf, cv-en.pdf, document-es.pdf, etc.
 */
const generateStandardFilename = (documentType, language, mimeType) => {
  const ext = mimeType === 'application/pdf' ? '.pdf' : 
              mimeType === 'image/jpeg' ? '.jpg' :
              mimeType === 'image/png' ? '.png' :
              mimeType === 'image/webp' ? '.webp' : '.pdf';
  
  return `${documentType}-${language}${ext}`;
};

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

    // Generate standardized filename
    const standardFilename = generateStandardFilename(documentType, language, req.file.mimetype);
    const standardPath = path.join(UPLOAD_DIR, standardFilename);
    const tempPath = path.join(UPLOAD_DIR, req.file.filename);

    // Delete any existing file with the same standardized name
    try {
      await fs.unlink(standardPath);
      // Also delete from database
      await deleteUpload(standardFilename);
    } catch (error) {
      // File doesn't exist yet, which is fine
    }

    // Rename temp file to standard name
    try {
      await fs.rename(tempPath, standardPath);
    } catch (error) {
      console.error('Error renaming file:', error);
      throw new Error('Failed to process uploaded file');
    }

    const url = `/uploads/${standardFilename}`;

    // Add to database with standard filename
    const uploadRecord = await addUpload(
      standardFilename,
      req.file.originalname,
      req.file.mimetype,
      req.file.size,
      url,
      language,
      documentType
    );

    // Log the upload
    await logAudit('UPLOAD', 'uploads', {
      filename: standardFilename,
      originalName: req.file.originalname,
      language,
      documentType,
    });

    res.json(uploadRecord);
  } catch (error) {
    console.error('Error uploading file:', error);
    
    // Cleanup temp file if it exists
    if (req.file) {
      try {
        await fs.unlink(path.join(UPLOAD_DIR, req.file.filename));
      } catch (cleanupError) {
        console.warn('Failed to cleanup temp file:', cleanupError);
      }
    }
    
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

export default router;
