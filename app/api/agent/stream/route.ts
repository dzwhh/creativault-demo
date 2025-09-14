import { NextRequest } from 'next/server';
import { agentOrchestrator } from '@/lib/agent/orchestrator';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const taskId = searchParams.get('taskId');

  if (!taskId) {
    return new Response('Missing taskId parameter', { status: 400 });
  }

  // Create a readable stream for SSE
  const stream = new ReadableStream({
    start(controller) {
      // Set up SSE headers
      const headers = {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Cache-Control',
      };

      // Send initial connection
      const encoder = new TextEncoder();
      
      const sendData = (data: any) => {
        const formatted = `data: ${JSON.stringify(data)}\n\n`;
        controller.enqueue(encoder.encode(formatted));
      };

      // Subscribe to task updates
      const unsubscribe = agentOrchestrator.subscribe(taskId, (data) => {
        sendData(data);
        
        // Close connection when task is complete or failed
        if (data.status === 'done' || data.status === 'failed') {
          setTimeout(() => {
            controller.close();
          }, 1000);
        }
      });

      // Send current task status
      const task = agentOrchestrator.getTask(taskId);
      if (task) {
        sendData({
          taskId,
          status: task.status,
          progress: task.status === 'done' ? 100 : 0
        });
      }

      // Handle client disconnect
      request.signal.addEventListener('abort', () => {
        unsubscribe();
        controller.close();
      });

      // Keep-alive ping every 30 seconds
      const keepAlive = setInterval(() => {
        if (!controller.desiredSize) {
          clearInterval(keepAlive);
          return;
        }
        
        controller.enqueue(encoder.encode(': keep-alive\n\n'));
      }, 30000);

      // Cleanup on close
      controller.addEventListener('close', () => {
        clearInterval(keepAlive);
        unsubscribe();
      });
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Cache-Control',
    },
  });
}