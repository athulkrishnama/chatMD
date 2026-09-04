import { Router, Request, Response } from 'express';
import { Wrap } from '../models/Wrap';
import fs from 'fs';
import path from 'path';

const router = Router();

// Cache the built index.html
let htmlTemplate: string | null = null;
function getHtmlTemplate() {
  if (htmlTemplate && process.env.NODE_ENV === 'production') return htmlTemplate;
  try {
    const filePath = path.join(__dirname, '../../web/dist/index.html');
    htmlTemplate = fs.readFileSync(filePath, 'utf8');
    return htmlTemplate;
  } catch (err) {
    console.error('Could not load index.html template:', err);
    return null;
  }
}

router.get('/:wrapId', async (req: Request, res: Response) => {
  try {
    const wrapId = req.params.wrapId as string;
    
    // Validate MongoDB ObjectId format
    const objectIdRegex = /^[0-9a-fA-F]{24}$/;
    if (!objectIdRegex.test(wrapId)) {
      return res.status(400).send('<h1>Invalid Wrapped ID</h1>');
    }

    const wrap = await Wrap.findById(wrapId);
    if (!wrap) {
      return res.status(404).send(`
        <div style="font-family: sans-serif; text-align: center; margin-top: 50px;">
          <h2>Wrapped not found</h2>
          <p>This Wrapped does not exist or has been deleted.</p>
        </div>
      `);
    }

    if (wrap.status === 'pending' || wrap.status === 'processing') {
      return res.send(`
        <div style="font-family: sans-serif; text-align: center; margin-top: 50px; color: #666;">
          <h2>Your Wrapped is still being prepared.</h2>
          <p>Come back in a little while.</p>
        </div>
      `);
    }

    if (wrap.status === 'failed') {
      return res.send(`
        <div style="font-family: sans-serif; text-align: center; margin-top: 50px; color: #e53e3e;">
          <h2>This Wrapped couldn't be completed.</h2>
          <p>Please try generating it again from the extension.</p>
        </div>
      `);
    }

    // It is completed, inject data into React HTML template
    const template = getHtmlTemplate();
    if (!template) {
      return res.status(500).send('Internal Server Error: UI not built');
    }

    // Prepare JSON payload
    const dataPayload = JSON.stringify({
      success: true,
      chatName: wrap.chatName,
      creatorName: wrap.creatorName,
      profile: wrap.analytics,
      wrapped: wrap.relationship,
    });

    // Generate Meta Tags
    const metaTags = `
      <title>${wrap.creatorName} & ${wrap.chatName} — Chat Wrapped</title>
      <meta name="description" content="Check out this Chat Wrapped." />
      <meta property="og:title" content="${wrap.creatorName} & ${wrap.chatName} — Chat Wrapped" />
      <meta property="og:description" content="Check out this Chat Wrapped." />
      <meta property="og:type" content="website" />
    `;

    const finalHtml = template
      .replace('<!-- SOCIAL_META_TAGS -->', metaTags)
      .replace('<!-- WRAP_DATA -->', `<script>window.__WRAP_DATA__ = ${dataPayload};</script>`);

    res.send(finalHtml);
  } catch (error) {
    console.error('[PublicWrap] Error rendering wrap:', error);
    res.status(500).send('Internal server error');
  }
});

export default router;
