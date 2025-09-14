import { NextRequest, NextResponse } from 'next/server';
import { agentOrchestrator } from '@/lib/agent/orchestrator';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, input } = body;

    if (!type || !input) {
      return NextResponse.json(
        { error: 'Missing required fields: type, input' },
        { status: 400 }
      );
    }

    if (!['market', 'audience', 'competition', 'creative'].includes(type)) {
      return NextResponse.json(
        { error: 'Invalid task type' },
        { status: 400 }
      );
    }

    const taskId = agentOrchestrator.createTask(type, input);

    return NextResponse.json({ taskId });
  } catch (error) {
    console.error('Error creating agent task:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const tasks = agentOrchestrator.getAllTasks();
    return NextResponse.json({ tasks });
  } catch (error) {
    console.error('Error fetching agent tasks:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}