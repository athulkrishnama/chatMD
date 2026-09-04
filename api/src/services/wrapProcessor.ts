import { Wrap } from '../models/Wrap';
import { analyzeRelationship } from '../ai/analyzeRelationship';

export async function processWrap(wrapId: string) {
  try {
    const wrap = await Wrap.findById(wrapId);
    if (!wrap) {
      console.error(`[WrapProcessor] Wrap ${wrapId} not found`);
      return;
    }

    if (wrap.status !== 'pending') {
      console.log(`[WrapProcessor] Wrap ${wrapId} is already ${wrap.status}`);
      return;
    }

    // 1. Mark as processing
    wrap.status = 'processing';
    await wrap.save();
    console.log(`[WrapProcessor] Wrap ${wrapId} status -> processing`);

    // 2. Build and send AI prompt
    const relationshipResult = await analyzeRelationship(wrap.analytics);

    // 3. Save result and mark completed
    wrap.relationship = relationshipResult;
    wrap.status = 'completed';
    await wrap.save();
    console.log(`[WrapProcessor] Wrap ${wrapId} status -> completed`);

  } catch (error) {
    console.error(`[WrapProcessor] Failed to process wrap ${wrapId}:`, error);
    
    // Attempt to mark as failed
    try {
      await Wrap.findByIdAndUpdate(wrapId, {
        status: 'failed',
        error: error instanceof Error ? error.message : String(error),
      });
    } catch (saveError) {
      console.error(`[WrapProcessor] Failed to save error state for ${wrapId}:`, saveError);
    }
  }
}

