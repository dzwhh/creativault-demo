'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { ShieldIcon, PlayCircle, RotateCcw, Trophy } from 'lucide-react';

interface Pipe {
  x: number;
  gapY: number;
  passed: boolean;
}

interface GameState {
  birdY: number;
  birdVelocity: number;
  pipes: Pipe[];
  score: number;
  gameStatus: 'idle' | 'playing' | 'gameover';
  highScore: number;
}

const GAME_WIDTH = 480;
const GAME_HEIGHT = 320;
const BIRD_SIZE = 30;
const BIRD_X = 80;
const PIPE_WIDTH = 50;
const PIPE_GAP = 120;
const GRAVITY = 0.35;
const JUMP_FORCE = -5;
const PIPE_SPEED = 3;

export default function CompetitiveAnalysisPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameLoopRef = useRef<number | null>(null);
  const [gameState, setGameState] = useState<GameState>({
    birdY: GAME_HEIGHT / 2,
    birdVelocity: 0,
    pipes: [],
    score: 0,
    gameStatus: 'idle',
    highScore: 0,
  });

  // Bird image (simple emoji-style)
  const drawBird = useCallback((ctx: CanvasRenderingContext2D, y: number, velocity: number) => {
    ctx.save();
    ctx.translate(BIRD_X, y);
    // Rotate bird based on velocity
    const rotation = Math.min(Math.max(velocity * 3, -30), 45) * Math.PI / 180;
    ctx.rotate(rotation);
    
    // Bird body (yellow)
    ctx.fillStyle = '#FFD700';
    ctx.beginPath();
    ctx.ellipse(0, 0, BIRD_SIZE / 2, BIRD_SIZE / 2.5, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Wing
    ctx.fillStyle = '#FFA500';
    ctx.beginPath();
    ctx.ellipse(-5, 3, 10, 6, -0.3, 0, Math.PI * 2);
    ctx.fill();
    
    // Eye
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(8, -5, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(10, -5, 3, 0, Math.PI * 2);
    ctx.fill();
    
    // Beak
    ctx.fillStyle = '#FF6B00';
    ctx.beginPath();
    ctx.moveTo(15, 0);
    ctx.lineTo(22, 3);
    ctx.lineTo(15, 6);
    ctx.closePath();
    ctx.fill();
    
    ctx.restore();
  }, []);

  // Draw pipes
  const drawPipes = useCallback((ctx: CanvasRenderingContext2D, pipes: Pipe[]) => {
    pipes.forEach(pipe => {
      // Pipe gradient
      const gradient = ctx.createLinearGradient(pipe.x, 0, pipe.x + PIPE_WIDTH, 0);
      gradient.addColorStop(0, '#2E8B2E');
      gradient.addColorStop(0.5, '#3CB371');
      gradient.addColorStop(1, '#2E8B2E');
      
      ctx.fillStyle = gradient;
      
      // Top pipe
      const topPipeHeight = pipe.gapY - PIPE_GAP / 2;
      ctx.fillRect(pipe.x, 0, PIPE_WIDTH, topPipeHeight);
      // Top pipe cap
      ctx.fillStyle = '#228B22';
      ctx.fillRect(pipe.x - 5, topPipeHeight - 20, PIPE_WIDTH + 10, 20);
      
      // Bottom pipe
      ctx.fillStyle = gradient;
      const bottomPipeY = pipe.gapY + PIPE_GAP / 2;
      ctx.fillRect(pipe.x, bottomPipeY, PIPE_WIDTH, GAME_HEIGHT - bottomPipeY);
      // Bottom pipe cap
      ctx.fillStyle = '#228B22';
      ctx.fillRect(pipe.x - 5, bottomPipeY, PIPE_WIDTH + 10, 20);
    });
  }, []);

  // Draw background
  const drawBackground = useCallback((ctx: CanvasRenderingContext2D) => {
    // Sky gradient
    const skyGradient = ctx.createLinearGradient(0, 0, 0, GAME_HEIGHT);
    skyGradient.addColorStop(0, '#87CEEB');
    skyGradient.addColorStop(1, '#E0F6FF');
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    
    // Ground
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(0, GAME_HEIGHT - 20, GAME_WIDTH, 20);
    ctx.fillStyle = '#90EE90';
    ctx.fillRect(0, GAME_HEIGHT - 30, GAME_WIDTH, 10);
  }, []);

  // Game loop
  const gameLoop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setGameState(prev => {
      if (prev.gameStatus !== 'playing') return prev;

      // Update bird physics
      let newVelocity = prev.birdVelocity + GRAVITY;
      let newBirdY = prev.birdY + newVelocity;
      
      // Update pipes
      let newPipes = prev.pipes.map(pipe => ({
        ...pipe,
        x: pipe.x - PIPE_SPEED,
      })).filter(pipe => pipe.x > -PIPE_WIDTH);
      
      // Add new pipes
      if (newPipes.length === 0 || newPipes[newPipes.length - 1].x < GAME_WIDTH - 200) {
        const gapY = Math.random() * (GAME_HEIGHT - PIPE_GAP - 100) + 60;
        newPipes.push({ x: GAME_WIDTH, gapY, passed: false });
      }
      
      // Check score
      let newScore = prev.score;
      newPipes = newPipes.map(pipe => {
        if (!pipe.passed && pipe.x + PIPE_WIDTH < BIRD_X) {
          newScore++;
          return { ...pipe, passed: true };
        }
        return pipe;
      });
      
      // Collision detection
      let gameOver = false;
      
      // Ground/ceiling collision
      if (newBirdY < BIRD_SIZE / 2 || newBirdY > GAME_HEIGHT - 30 - BIRD_SIZE / 2) {
        gameOver = true;
      }
      
      // Pipe collision
      newPipes.forEach(pipe => {
        if (BIRD_X + BIRD_SIZE / 2 > pipe.x && BIRD_X - BIRD_SIZE / 2 < pipe.x + PIPE_WIDTH) {
          const topPipeBottom = pipe.gapY - PIPE_GAP / 2;
          const bottomPipeTop = pipe.gapY + PIPE_GAP / 2;
          if (newBirdY - BIRD_SIZE / 2 < topPipeBottom || newBirdY + BIRD_SIZE / 2 > bottomPipeTop) {
            gameOver = true;
          }
        }
      });
      
      if (gameOver) {
        return {
          ...prev,
          birdY: newBirdY,
          birdVelocity: newVelocity,
          gameStatus: 'gameover',
          highScore: Math.max(prev.highScore, newScore),
        };
      }
      
      return {
        ...prev,
        birdY: newBirdY,
        birdVelocity: newVelocity,
        pipes: newPipes,
        score: newScore,
      };
    });
  }, []);

  // Render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      drawBackground(ctx);
      drawPipes(ctx, gameState.pipes);
      drawBird(ctx, gameState.birdY, gameState.birdVelocity);
      
      // Draw score
      ctx.fillStyle = 'white';
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 3;
      ctx.font = 'bold 36px Arial';
      ctx.textAlign = 'center';
      ctx.strokeText(gameState.score.toString(), GAME_WIDTH / 2, 50);
      ctx.fillText(gameState.score.toString(), GAME_WIDTH / 2, 50);
    };

    render();
  }, [gameState, drawBackground, drawPipes, drawBird]);

  // Game loop timer
  useEffect(() => {
    if (gameState.gameStatus === 'playing') {
      const loop = () => {
        gameLoop();
        gameLoopRef.current = requestAnimationFrame(loop);
      };
      gameLoopRef.current = requestAnimationFrame(loop);
    }
    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [gameState.gameStatus, gameLoop]);

  // Handle click/tap for jump
  const handleJump = useCallback(() => {
    if (gameState.gameStatus === 'playing') {
      setGameState(prev => ({
        ...prev,
        birdVelocity: JUMP_FORCE,
      }));
    }
  }, [gameState.gameStatus]);

  // Start game
  const startGame = useCallback(() => {
    setGameState(prev => ({
      birdY: GAME_HEIGHT / 2,
      birdVelocity: 0,
      pipes: [],
      score: 0,
      gameStatus: 'playing',
      highScore: prev.highScore,
    }));
  }, []);

  // Reset game
  const resetGame = useCallback(() => {
    setGameState(prev => ({
      birdY: GAME_HEIGHT / 2,
      birdVelocity: 0,
      pipes: [],
      score: 0,
      gameStatus: 'idle',
      highScore: prev.highScore,
    }));
  }, []);

  // Get rating based on score
  const getRating = useCallback((score: number) => {
    if (score >= 50) return { level: 'Legend', color: 'text-purple-600', emoji: '🏆' };
    if (score >= 30) return { level: 'Expert', color: 'text-yellow-500', emoji: '⭐' };
    if (score >= 20) return { level: 'Pro', color: 'text-green-600', emoji: '🎯' };
    if (score >= 10) return { level: 'Good', color: 'text-blue-600', emoji: '👍' };
    if (score >= 5) return { level: 'Beginner', color: 'text-orange-500', emoji: '😊' };
    return { level: 'Keep Trying', color: 'text-gray-500', emoji: '💪' };
  }, []);

  // Calculate beat percentage based on score
  const getBeatPercentage = useCallback((score: number) => {
    // Simulated distribution: most players score around 5-15
    if (score >= 50) return 99;
    if (score >= 40) return 97;
    if (score >= 30) return 93;
    if (score >= 25) return 88;
    if (score >= 20) return 82;
    if (score >= 15) return 72;
    if (score >= 10) return 58;
    if (score >= 7) return 45;
    if (score >= 5) return 35;
    if (score >= 3) return 22;
    if (score >= 1) return 10;
    return 0;
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-green-50 flex flex-col items-center justify-center p-8">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
            <ShieldIcon className="w-6 h-6 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Competitive Analysis</h1>
        </div>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-medium mb-2">
          <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
          Coming Soon
        </div>
        <p className="text-gray-500 max-w-md mx-auto">
          🐦 Flappy Bird - Click to fly through the pipes! How many can you pass?
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
        {/* Stats Bar */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-4">
            <div className="text-sm">
              <span className="text-gray-500">Score:</span>
              <span className="ml-2 font-bold text-green-600">{gameState.score}</span>
            </div>
            <div className="text-sm">
              <span className="text-gray-500">Best:</span>
              <span className="ml-2 font-bold text-yellow-600">{gameState.highScore}</span>
            </div>
          </div>
          <button
            onClick={resetGame}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Reset"
          >
            <RotateCcw className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Game Canvas */}
        <div className="relative">
          <canvas
            ref={canvasRef}
            width={GAME_WIDTH}
            height={GAME_HEIGHT}
            onClick={handleJump}
            onMouseDown={handleJump}
            className="rounded-xl cursor-pointer border-4 border-green-200"
          />
          
          {/* Idle Overlay */}
          {gameState.gameStatus === 'idle' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 rounded-xl">
              <div className="text-6xl mb-4">🐦</div>
              <p className="text-white mb-4 text-center px-4">
                Click to make the bird fly!<br/>
                <span className="text-sm text-gray-300">Pass through the pipes to score</span>
              </p>
              <button
                onClick={startGame}
                className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors"
              >
                <PlayCircle className="w-5 h-5" />
                Start Game
              </button>
            </div>
          )}

          {/* Game Over Overlay */}
          {gameState.gameStatus === 'gameover' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 rounded-xl">
              <Trophy className={`w-16 h-16 mb-4 ${gameState.score >= 20 ? 'text-yellow-400' : 'text-gray-400'}`} />
              <h3 className="text-2xl font-bold text-white mb-2">Game Over!</h3>
              
              <div className="text-white/90 mb-1">
                Pipes Passed: <span className="font-bold text-green-400">{gameState.score}</span>
                <span className="text-2xl ml-2">{getRating(gameState.score).emoji}</span>
              </div>
              
              <div className={`font-bold text-lg ${getRating(gameState.score).color}`}>
                {getRating(gameState.score).level}
              </div>
              
              <div className="mt-3 px-4 py-2 bg-green-900/50 rounded-lg">
                <p className="text-green-300 text-center">
                  🎯 You beat <span className="font-bold text-white">{getBeatPercentage(gameState.score)}%</span> of players!
                </p>
              </div>
              
              {gameState.score > 0 && gameState.score === gameState.highScore && (
                <div className="mt-3 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg animate-pulse">
                  <p className="text-white font-bold text-center">
                    🏆 New High Score!
                  </p>
                </div>
              )}
              
              <button
                onClick={startGame}
                className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors mt-4"
              >
                <RotateCcw className="w-5 h-5" />
                Try Again
              </button>
            </div>
          )}
        </div>

        <p className="text-xs text-gray-400 text-center mt-4">
          🖱️ Click or tap anywhere to fly up - Don't hit the pipes!
        </p>

        {/* Info Box */}
        <div className="mt-4 p-3 bg-green-50 rounded-lg">
          <p className="text-xs text-gray-500 text-center">
            <span className="font-medium">💡 Tips:</span> Click faster to fly higher, time your taps to pass through the gaps!
          </p>
        </div>
      </div>
    </div>
  );
}
