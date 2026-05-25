import express from 'express';
import { getContent, setContent, getAllContent, logAudit } from '../db/queries.js';
import { requireAuth } from '../middleware/auth.js';
import defaultContent from './defaultContent.js';

const router = express.Router();

const isPlainObject = (value) =>
  value && typeof value === 'object' && !Array.isArray(value);

const mergeDefaults = (defaults, content) => {
  if (!isPlainObject(defaults) || !isPlainObject(content)) {
    return content ?? defaults;
  }

  return Object.entries({ ...defaults, ...content }).reduce((merged, [key, value]) => {
    merged[key] = mergeDefaults(defaults[key], value);
    return merged;
  }, {});
};

// GET /api/content
// Public route - get all content
router.get('/', async (req, res) => {
  try {
    const allContent = await getAllContent();
    
    // Merge with defaults to ensure all sections exist
    const merged = mergeDefaults(defaultContent, allContent);
    
    res.json(merged);
  } catch (error) {
    console.error('Error fetching content:', error);
    res.status(500).json({ error: 'Failed to fetch content' });
  }
});

// GET /api/content/:id
// Public route - get specific content section
router.get('/:id', async (req, res) => {
  try {
    const content = await getContent(req.params.id);
    
    if (!content) {
      const defaultValue = defaultContent[req.params.id];
      return res.json(defaultValue || null);
    }
    
    res.json(mergeDefaults(defaultContent[req.params.id], content));
  } catch (error) {
    console.error('Error fetching content:', error);
    res.status(500).json({ error: 'Failed to fetch content' });
  }
});

// PUT /api/content/:id
// Admin route - update content section
router.put('/:id', requireAuth, async (req, res) => {
  try {
    const { data } = req.body;
    
    if (!data) {
      return res.status(400).json({ error: 'Data is required' });
    }
    
    await setContent(req.params.id, data);
    
    // Log the change
    await logAudit('UPDATE', req.params.id, { timestamp: new Date() });
    
    res.json({ success: true, id: req.params.id });
  } catch (error) {
    console.error('Error updating content:', error);
    res.status(500).json({ error: 'Failed to update content' });
  }
});

// Seed default content on first run
router.post('/seed', requireAuth, async (req, res) => {
  try {
    for (const [key, value] of Object.entries(defaultContent)) {
      await setContent(key, value);
    }
    
    res.json({ success: true, message: 'Database seeded with default content' });
  } catch (error) {
    console.error('Error seeding content:', error);
    res.status(500).json({ error: 'Failed to seed content' });
  }
});

export default router;
