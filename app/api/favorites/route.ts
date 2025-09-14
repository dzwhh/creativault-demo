import { NextRequest, NextResponse } from 'next/server';
import { randomId } from '@/lib/utils';
import type { Favorite } from '@/lib/types';

// In-memory favorites store - replace with database in production
let mockFavorites: Favorite[] = [];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const targetType = searchParams.get('targetType');
    const targetId = searchParams.get('targetId');
    const userId = searchParams.get('userId') || 'user1';

    if (targetType && targetId) {
      // Check if specific item is favorited
      const favorite = mockFavorites.find(
        f => f.userId === userId && f.targetType === targetType && f.targetId === targetId
      );
      
      const count = mockFavorites.filter(
        f => f.targetType === targetType && f.targetId === targetId
      ).length;

      return NextResponse.json({
        isFavorited: !!favorite,
        count,
        favorite: favorite || null,
      });
    } else {
      // Get all favorites for user
      const userFavorites = mockFavorites.filter(f => f.userId === userId);
      return NextResponse.json({
        favorites: userFavorites,
        total: userFavorites.length,
      });
    }
  } catch (error) {
    console.error('Error fetching favorites:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { targetType, targetId, userId = 'user1', note } = body;

    if (!targetType || !targetId) {
      return NextResponse.json(
        { error: 'Missing required fields: targetType, targetId' },
        { status: 400 }
      );
    }

    // Check if already favorited
    const existingFavorite = mockFavorites.find(
      f => f.userId === userId && f.targetType === targetType && f.targetId === targetId
    );

    if (existingFavorite) {
      return NextResponse.json(
        { error: 'Already favorited' },
        { status: 409 }
      );
    }

    // Create new favorite
    const favorite: Favorite = {
      id: randomId(),
      userId,
      targetType,
      targetId,
      note,
      createdAt: new Date().toISOString(),
    };

    mockFavorites.push(favorite);

    const count = mockFavorites.filter(
      f => f.targetType === targetType && f.targetId === targetId
    ).length;

    return NextResponse.json({
      success: true,
      favorite,
      isFavorited: true,
      count,
    });
  } catch (error) {
    console.error('Error creating favorite:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { targetType, targetId, userId = 'user1' } = body;

    if (!targetType || !targetId) {
      return NextResponse.json(
        { error: 'Missing required fields: targetType, targetId' },
        { status: 400 }
      );
    }

    // Find and remove favorite
    const favoriteIndex = mockFavorites.findIndex(
      f => f.userId === userId && f.targetType === targetType && f.targetId === targetId
    );

    if (favoriteIndex === -1) {
      return NextResponse.json(
        { error: 'Favorite not found' },
        { status: 404 }
      );
    }

    const removedFavorite = mockFavorites.splice(favoriteIndex, 1)[0];

    const count = mockFavorites.filter(
      f => f.targetType === targetType && f.targetId === targetId
    ).length;

    return NextResponse.json({
      success: true,
      removed: removedFavorite,
      isFavorited: false,
      count,
    });
  } catch (error) {
    console.error('Error deleting favorite:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}