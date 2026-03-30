import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://gh-pinned-repos.egoist.dev/?username=pranaysuyash', {
      next: { revalidate: 3600 } // Revalidate every hour
    });
    
    if (!response.ok) {
      throw new Error(`GitHub API responded with status: ${response.status}`);
    }
    
    const repos = await response.json();
    return NextResponse.json(repos);
  } catch (error) {
    console.error('Error fetching GitHub pinned repos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GitHub repositories' },
      { status: 500 }
    );
  }
}