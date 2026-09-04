import { Router, Request, Response } from 'express';
import { createWrapSchema } from '../schemas/wrap.schema';
import { Wrap } from '../models/Wrap';
import { processWrap } from '../services/wrapProcessor';

const router = Router();

// POST /api/wraps
router.post('/', async (req: Request, res: Response) => {
  try {
    // 1. Validate request payload
    const parsed = createWrapSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        error: 'Invalid request payload',
        details: parsed.error.issues,
      });
    }

    const { creatorName, deviceId, chatName, analytics } = parsed.data;

    // 2. Create MongoDB document in 'pending' state
    const wrap = await Wrap.create({
      creatorName: creatorName.trim(),
      deviceId,
      chatName,
      analytics,
      status: 'pending',
    });

    console.log(`[WrapAPI] Created wrap ${wrap._id} for chat "${chatName}"`);

    // 3. Return ID immediately (do not wait for AI)
    res.status(201).json({
      success: true,
      wrapId: wrap._id.toString(),
    });

    // 4. Start background processing (fire and forget)
    processWrap(wrap._id.toString()).catch((err) => {
      console.error(`[WrapAPI] Uncaught error in processWrap for ${wrap._id}:`, err);
    });
  } catch (error) {
    console.error('[WrapAPI] POST /api/wraps error:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// GET /api/wraps/:id
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const wrap = await Wrap.findById(id);
    if (!wrap) {
      return res.status(404).json({ success: false, error: 'Wrap not found' });
    }

    if (wrap.status === 'completed') {
      return res.json({
        status: wrap.status,
        data: {
          chatName: wrap.chatName,
          analytics: wrap.analytics,
          relationship: wrap.relationship,
        },
      });
    }

    if (wrap.status === 'failed') {
      return res.json({
        status: wrap.status,
        error: wrap.error || 'Unknown error occurred during processing',
      });
    }

    // Pending or Processing (Keep payload small, don't send analytics)
    return res.json({
      status: wrap.status,
    });
  } catch (error) {
    console.error('[WrapAPI] GET /api/wraps/:id error:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// GET /api/wraps/device/:deviceId
router.get('/device/:deviceId', async (req: Request, res: Response) => {
  try {
    const { deviceId } = req.params;
    
    // Basic UUID format validation (simple regex)
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(deviceId)) {
      return res.status(400).json({ success: false, error: 'Invalid device ID' });
    }

    const wraps = await Wrap.find({ deviceId })
      .sort({ createdAt: -1 })
      .select('_id creatorName chatName status createdAt');

    const mappedWraps = wraps.map(w => ({
      id: w._id.toString(),
      creatorName: w.creatorName,
      chatName: w.chatName,
      status: w.status,
      createdAt: w.createdAt,
    }));

    res.json({
      success: true,
      wraps: mappedWraps,
    });
  } catch (error) {
    console.error('[WrapAPI] GET /api/wraps/device/:deviceId error:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

export default router;


