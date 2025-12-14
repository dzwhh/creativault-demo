'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { LineChartIcon, PlayCircle, RotateCcw } from 'lucide-react';

// 打砖块游戏
export default function MarketAnalysisPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [beatPercentage, setBeatPercentage] = useState(0);

  // 游戏状态
  const gameStateRef = useRef({
    ball: { x: 400, y: 300, dx: 4, dy: -4, radius: 8 },
    paddle: { x: 350, y: 380, width: 100, height: 12 },
    bricks: [] as { x: number; y: number; width: number; height: number; visible: boolean; color: string }[],
    animationId: 0,
    score: 0,
  });

  const initBricks = useCallback(() => {
    const bricks = [];
    const colors = ['#3B82F6', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981'];
    const rows = 5;
    const cols = 8;
    const brickWidth = 85;
    const brickHeight = 20;
    const padding = 8;
    const offsetTop = 40;
    const offsetLeft = 35;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        bricks.push({
          x: offsetLeft + col * (brickWidth + padding),
          y: offsetTop + row * (brickHeight + padding),
          width: brickWidth,
          height: brickHeight,
          visible: true,
          color: colors[row],
        });
      }
    }
    return bricks;
  }, []);

  const resetGame = useCallback(() => {
    gameStateRef.current = {
      ball: { x: 400, y: 300, dx: 4, dy: -4, radius: 8 },
      paddle: { x: 350, y: 380, width: 100, height: 12 },
      bricks: initBricks(),
      animationId: 0,
      score: 0,
    };
    setScore(0);
    setGameOver(false);
    setGameStarted(false);
  }, [initBricks]);

  const startGame = useCallback(() => {
    if (!gameStarted) {
      gameStateRef.current.bricks = initBricks();
      gameStateRef.current.ball = { x: 400, y: 300, dx: 4, dy: -4, radius: 8 };
      gameStateRef.current.score = 0;
      setScore(0);
      setGameOver(false);
      setGameStarted(true);
    }
  }, [gameStarted, initBricks]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const state = gameStateRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      state.paddle.x = Math.max(0, Math.min(canvas.width - state.paddle.width, mouseX - state.paddle.width / 2));
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 绘制砖块
      state.bricks.forEach(brick => {
        if (brick.visible) {
          ctx.fillStyle = brick.color;
          ctx.beginPath();
          ctx.roundRect(brick.x, brick.y, brick.width, brick.height, 4);
          ctx.fill();
        }
      });

      // 绘制挡板（高亮效果）
      const paddleGradient = ctx.createLinearGradient(
        state.paddle.x, state.paddle.y,
        state.paddle.x, state.paddle.y + state.paddle.height
      );
      paddleGradient.addColorStop(0, '#60A5FA');
      paddleGradient.addColorStop(0.5, '#3B82F6');
      paddleGradient.addColorStop(1, '#2563EB');
      
      // 挡板发光效果
      ctx.shadowColor = '#3B82F6';
      ctx.shadowBlur = 15;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      
      ctx.fillStyle = paddleGradient;
      ctx.beginPath();
      ctx.roundRect(state.paddle.x, state.paddle.y, state.paddle.width, state.paddle.height, 6);
      ctx.fill();
      
      // 挡板高光
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.beginPath();
      ctx.roundRect(state.paddle.x + 4, state.paddle.y + 2, state.paddle.width - 8, 4, 2);
      ctx.fill();
      
      // 重置阴影
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;

      // 绘制球
      ctx.beginPath();
      ctx.arc(state.ball.x, state.ball.y, state.ball.radius, 0, Math.PI * 2);
      ctx.fillStyle = '#EF4444';
      ctx.fill();
    };

    const update = () => {
      if (!gameStarted || gameOver) {
        draw();
        state.animationId = requestAnimationFrame(update);
        return;
      }

      // 移动球
      state.ball.x += state.ball.dx;
      state.ball.y += state.ball.dy;

      // 墙壁碰撞
      if (state.ball.x <= state.ball.radius || state.ball.x >= canvas.width - state.ball.radius) {
        state.ball.dx = -state.ball.dx;
      }
      if (state.ball.y <= state.ball.radius) {
        state.ball.dy = -state.ball.dy;
      }

      // 挡板碰撞
      if (
        state.ball.y + state.ball.radius >= state.paddle.y &&
        state.ball.x >= state.paddle.x &&
        state.ball.x <= state.paddle.x + state.paddle.width
      ) {
        state.ball.dy = -Math.abs(state.ball.dy);
        // 根据击中位置调整角度
        const hitPos = (state.ball.x - state.paddle.x) / state.paddle.width;
        state.ball.dx = 8 * (hitPos - 0.5);
      }

      // 砖块碰撞
      state.bricks.forEach(brick => {
        if (brick.visible) {
          if (
            state.ball.x + state.ball.radius > brick.x &&
            state.ball.x - state.ball.radius < brick.x + brick.width &&
            state.ball.y + state.ball.radius > brick.y &&
            state.ball.y - state.ball.radius < brick.y + brick.height
          ) {
            brick.visible = false;
            state.ball.dy = -state.ball.dy;
            state.score += 10;
            setScore(state.score);
          }
        }
      });

      // 检查游戏结束
      if (state.ball.y >= canvas.height) {
        setGameOver(true);
        setGameStarted(false);
        if (state.score > highScore) {
          setHighScore(state.score);
        }
        // 计算打败了多少用户：根据消除的方块比例
        const totalBricks = 40; // 5行 x 8列
        const clearedBricks = state.score / 10;
        const clearRatio = clearedBricks / totalBricks;
        // 使用指数函数使分布更合理：消除越多，排名越靠前
        const percentage = Math.min(99, Math.floor(clearRatio * 100 * 0.9 + clearRatio * clearRatio * 10));
        setBeatPercentage(percentage);
      }

      // 检查胜利
      if (state.bricks.every(b => !b.visible)) {
        state.bricks = initBricks();
        state.ball.dx *= 1.1;
        state.ball.dy *= 1.1;
      }

      draw();
      state.animationId = requestAnimationFrame(update);
    };

    state.bricks = initBricks();
    update();

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(state.animationId);
    };
  }, [gameStarted, gameOver, highScore, initBricks]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col items-center justify-center p-8">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
            <LineChartIcon className="w-6 h-6 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Market Analysis</h1>
        </div>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-medium mb-4">
          <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
          Coming Soon
        </div>
        <p className="text-gray-500 max-w-md mx-auto">
          Our AI-powered market analysis tool is under development. Play Breakout while you wait!
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-6">
            <div className="text-sm">
              <span className="text-gray-500">Score:</span>
              <span className="ml-2 font-bold text-blue-600">{score}</span>
            </div>
            <div className="text-sm">
              <span className="text-gray-500">High Score:</span>
              <span className="ml-2 font-bold text-purple-600">{highScore}</span>
            </div>
            {beatPercentage > 0 && (
              <div className="text-sm flex items-center gap-1">
                <span className="text-gray-500">Beat</span>
                <span className="font-bold text-green-600">{beatPercentage}%</span>
                <span className="text-gray-500">of players</span>
              </div>
            )}
          </div>
          <button
            onClick={resetGame}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Reset Game"
          >
            <RotateCcw className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="relative">
          <canvas
            ref={canvasRef}
            width={800}
            height={400}
            className="bg-gray-900 rounded-xl cursor-none"
          />
          
          {!gameStarted && !gameOver && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-xl">
              <button
                onClick={startGame}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                <PlayCircle className="w-5 h-5" />
                Start Game
              </button>
            </div>
          )}

          {gameOver && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 rounded-xl">
              <h3 className="text-2xl font-bold text-white mb-2">Game Over!</h3>
              <p className="text-gray-300 mb-2">Final Score: {score}</p>
              {beatPercentage > 0 && (
                <p className="text-green-400 font-medium mb-4">🎉 You beat {beatPercentage}% of players!</p>
              )}
              <button
                onClick={resetGame}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                <RotateCcw className="w-5 h-5" />
                Play Again
              </button>
            </div>
          )}
        </div>

        <p className="text-xs text-gray-400 text-center mt-4">
          Move your mouse to control the paddle
        </p>
      </div>
    </div>
  );
}
