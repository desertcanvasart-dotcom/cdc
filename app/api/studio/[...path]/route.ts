import { env } from 'cloudflare:workers';
import { handleStudio } from '../../../../lib/marketing/core.mjs';
export const dynamic = 'force-dynamic';
export function GET(request: Request) { return handleStudio(request, env); }
export function POST(request: Request) { return handleStudio(request, env); }
export function PATCH(request: Request) { return handleStudio(request, env); }
export function DELETE(request: Request) { return handleStudio(request, env); }
