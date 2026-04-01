// app/api/docs/[slug]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    
    // Security: Prevent directory traversal attacks
    const sanitized = path.basename(slug);
    
    // Add .md extension back
    const filename = `${sanitized}.md`;
    
    // Construct the full file path
    const filePath = path.join(process.cwd(), 'docs', 'guides', filename);
    
    // Read the file
    const content = await fs.readFile(filePath, 'utf-8');
    
    // Return as markdown with proper content type
    return new NextResponse(content, {
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
      },
    });
    
  } catch (error) {
    console.error('Error serving doc:', error);
    return NextResponse.json(
      { error: 'Document not found' },
      { status: 404 }
    );
  }
}