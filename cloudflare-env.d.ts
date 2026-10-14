declare namespace Cloudflare {
  interface Env {
    DB?: D1Database;
    BUCKET?: R2Bucket;
    CDC_OWNER_EMAIL?: string;
    OPENAI_API_KEY?: string;
    AI_TEXT_MODEL?: string;
    AI_IMAGE_MODEL?: string;
  }
}
