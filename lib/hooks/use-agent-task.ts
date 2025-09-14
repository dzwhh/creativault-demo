'use client';

import { useState, useEffect, useCallback } from 'react';
import type { AgentTask, AgentTaskPartial } from '@/lib/types';

interface UseAgentTaskOptions {
  pollInterval?: number;
  enableSSE?: boolean;
}

interface UseAgentTaskReturn {
  task: AgentTask | null;
  loading: boolean;
  error: string | null;
  progress: number;
  currentStep: string | null;
  refresh: () => void;
}

export function useAgentTask(
  taskId: string | null,
  options: UseAgentTaskOptions = {}
): UseAgentTaskReturn {
  const { pollInterval = 2000, enableSSE = true } = options;
  
  const [task, setTask] = useState<AgentTask | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState<string | null>(null);

  const fetchTask = useCallback(async () => {
    if (!taskId) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`/api/agent/task/${taskId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const taskData = await response.json();
      setTask(taskData);
      
      // Calculate progress based on completed steps
      if (taskData.steps) {
        const completedSteps = taskData.steps.filter((step: any) => step.status === 'completed').length;
        const totalSteps = taskData.steps.length;
        const calculatedProgress = totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0;
        setProgress(calculatedProgress);
        
        // Find current running step
        const runningStep = taskData.steps.find((step: any) => step.status === 'running');
        setCurrentStep(runningStep?.name || null);
      }
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [taskId]);

  // SSE connection
  useEffect(() => {
    if (!taskId || !enableSSE) return;

    let eventSource: EventSource | null = null;
    let pollTimer: number | null = null;

    const setupSSE = () => {
      try {
        eventSource = new EventSource(`/api/agent/stream?taskId=${taskId}`);
        
        eventSource.onmessage = (event) => {
          try {
            const data: AgentTaskPartial = JSON.parse(event.data);
            
            // Update progress
            if (data.progress !== undefined) {
              setProgress(data.progress);
            }
            
            // Update current step
            if (data.step) {
              setCurrentStep(data.step);
            }
            
            // Refresh task data when status changes
            if (data.status) {
              fetchTask();
            }
            
          } catch (parseError) {
            console.error('Error parsing SSE data:', parseError);
          }
        };

        eventSource.onerror = (event) => {
          console.error('SSE error:', event);
          
          // Fallback to polling on SSE failure
          if (eventSource) {
            eventSource.close();
            eventSource = null;
          }
          
          // Start polling as fallback
          pollTimer = setInterval(fetchTask, pollInterval);
        };

        eventSource.onopen = () => {
          console.log('SSE connection opened for task:', taskId);
        };

      } catch (sseError) {
        console.error('Error setting up SSE:', sseError);
        // Fallback to polling
        pollTimer = setInterval(fetchTask, pollInterval);
      }
    };

    // Initial fetch
    fetchTask();

    // Set up SSE or polling
    if (typeof EventSource !== 'undefined') {
      setupSSE();
    } else {
      // Fallback to polling if SSE is not supported
      pollTimer = setInterval(fetchTask, pollInterval);
    }

    // Cleanup
    return () => {
      if (eventSource) {
        eventSource.close();
      }
      if (pollTimer) {
        clearInterval(pollTimer);
      }
    };
  }, [taskId, enableSSE, pollInterval, fetchTask]);

  return {
    task,
    loading,
    error,
    progress,
    currentStep,
    refresh: fetchTask,
  };
}