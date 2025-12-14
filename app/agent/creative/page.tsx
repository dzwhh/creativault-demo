'use client';

import { useState, useCallback, useEffect } from 'react';
import { SparklesIcon, PlayCircle, RotateCcw, Zap, Trophy, Info } from 'lucide-react';

type GameState = 'idle' | 'waiting' | 'ready' | 'clicked' | 'too_early' | 'finished';

export default function CreativeAnalysisPage() {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [reactionTimes, setReactionTimes] = useState<number[]>([]);
  const [currentTime, setCurrentTime] = useState<number | null>(null);
  const [startTime, setStartTime] = useState<number>(0);
  const [round, setRound] = useState(0);
  const [bestTime, setBestTime] = useState<number | null>(null);
  
  const totalRounds = 5;

  const getAverageTime = useCallback(() => {
    if (reactionTimes.length === 0) return 0;
    return Math.round(reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length);
  }, [reactionTimes]);

  const getStandardDeviation = useCallback(() => {
    if (reactionTimes.length < 2) return 0;
    const avg = getAverageTime();
    const squareDiffs = reactionTimes.map(time => Math.pow(time - avg, 2));
    const avgSquareDiff = squareDiffs.reduce((a, b) => a + b, 0) / reactionTimes.length;
    return Math.round(Math.sqrt(avgSquareDiff));
  }, [reactionTimes, getAverageTime]);

  const isProfessional = useCallback(() => {
    const avg = getAverageTime();
    const std = getStandardDeviation();
    return avg >= 150 && avg <= 170 && std <= 20;
  }, [getAverageTime, getStandardDeviation]);

  const getPerformanceLevel = useCallback(() => {
    const avg = getAverageTime();
    if (avg === 0) return { level: '', color: '', description: '' };
    if (avg < 150) return { level: 'Superhuman', color: 'text-purple-600', description: '超人级反应！' };
    if (avg <= 170) return { level: 'Pro Gamer', color: 'text-green-600', description: '职业电竞水平！' };
    if (avg <= 200) return { level: 'Excellent', color: 'text-blue-600', description: '优秀水平' };
    if (avg <= 250) return { level: 'Good', color: 'text-cyan-600', description: '良好水平' };
    if (avg <= 300) return { level: 'Average', color: 'text-yellow-600', description: '普通水平' };
    return { level: 'Slow', color: 'text-orange-600', description: '需要练习' };
  }, [getAverageTime]);

  const startTest = useCallback(() => {
    setReactionTimes([]);
    setCurrentTime(null);
    setRound(1);
    setGameState('waiting');
    
    // 随机延迟 1-5 秒后变色
    const delay = 1000 + Math.random() * 4000;
    setTimeout(() => {
      setGameState('ready');
      setStartTime(performance.now());
    }, delay);
  }, []);

  const handleClick = useCallback(() => {
    if (gameState === 'waiting') {
      // 点击太早
      setGameState('too_early');
      setTimeout(() => {
        if (round <= totalRounds) {
          setGameState('waiting');
          const delay = 1000 + Math.random() * 4000;
          setTimeout(() => {
            setGameState('ready');
            setStartTime(performance.now());
          }, delay);
        }
      }, 1000);
    } else if (gameState === 'ready') {
      // 计算反应时间
      const reactionTime = Math.round(performance.now() - startTime);
      setCurrentTime(reactionTime);
      setReactionTimes(prev => [...prev, reactionTime]);
      
      if (bestTime === null || reactionTime < bestTime) {
        setBestTime(reactionTime);
      }
      
      setGameState('clicked');
      
      // 进入下一轮或结束
      setTimeout(() => {
        if (round < totalRounds) {
          setRound(r => r + 1);
          setGameState('waiting');
          const delay = 1000 + Math.random() * 4000;
          setTimeout(() => {
            setGameState('ready');
            setStartTime(performance.now());
          }, delay);
        } else {
          setGameState('finished');
        }
      }, 1500);
    }
  }, [gameState, startTime, round, bestTime]);

  const resetGame = useCallback(() => {
    setGameState('idle');
    setReactionTimes([]);
    setCurrentTime(null);
    setRound(0);
  }, []);

  // 键盘支持
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && (gameState === 'waiting' || gameState === 'ready')) {
        e.preventDefault();
        handleClick();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, handleClick]);

  const getBackgroundColor = () => {
    switch (gameState) {
      case 'waiting': return 'bg-red-500';
      case 'ready': return 'bg-green-500';
      case 'too_early': return 'bg-orange-500';
      case 'clicked': return 'bg-blue-500';
      default: return 'bg-gray-800';
    }
  };

  const getMessage = () => {
    switch (gameState) {
      case 'idle': return 'Click "Start Test" to begin';
      case 'waiting': return 'Wait for green...';
      case 'ready': return 'CLICK NOW!';
      case 'too_early': return 'Too early! Wait for green.';
      case 'clicked': return `${currentTime} ms`;
      case 'finished': return 'Test Complete!';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-orange-50 flex flex-col items-center justify-center p-8">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-pink-100 flex items-center justify-center">
            <SparklesIcon className="w-6 h-6 text-pink-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Creative Analysis</h1>
        </div>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-medium mb-4">
          <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
          Coming Soon
        </div>
        <p className="text-gray-500 max-w-md mx-auto">
          Test your reaction speed! Pro esports players average 150-170ms with low variance.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 w-full max-w-xl">
        {/* Stats Bar */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-4">
            <div className="text-sm">
              <span className="text-gray-500">Round:</span>
              <span className="ml-2 font-bold text-pink-600">{round}/{totalRounds}</span>
            </div>
            <div className="text-sm">
              <span className="text-gray-500">Average:</span>
              <span className="ml-2 font-bold text-blue-600">{getAverageTime() || '-'} ms</span>
            </div>
            <div className="text-sm">
              <span className="text-gray-500">Best:</span>
              <span className="ml-2 font-bold text-green-600">{bestTime || '-'} ms</span>
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

        {/* Game Area */}
        <div
          onClick={gameState === 'waiting' || gameState === 'ready' ? handleClick : undefined}
          className={`relative h-64 rounded-xl flex items-center justify-center transition-colors duration-100 ${getBackgroundColor()} ${
            gameState === 'waiting' || gameState === 'ready' ? 'cursor-pointer' : ''
          }`}
        >
          <div className="text-center">
            {gameState === 'ready' && (
              <Zap className="w-16 h-16 text-white mx-auto mb-4 animate-pulse" />
            )}
            <p className={`text-3xl font-bold ${gameState === 'clicked' ? 'text-white' : 'text-white'}`}>
              {getMessage()}
            </p>
            {gameState === 'clicked' && currentTime && (
              <p className="text-white/80 mt-2">
                {currentTime < 150 ? '⚡ Incredible!' : currentTime <= 170 ? '🎯 Pro level!' : currentTime <= 200 ? '👍 Great!' : currentTime <= 250 ? '😊 Good' : '💪 Keep practicing'}
              </p>
            )}
          </div>

          {/* Start Button Overlay */}
          {gameState === 'idle' && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-xl">
              <button
                onClick={startTest}
                className="flex items-center gap-2 px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-lg font-medium transition-colors"
              >
                <PlayCircle className="w-5 h-5" />
                Start Test
              </button>
            </div>
          )}

          {/* Finished Overlay */}
          {gameState === 'finished' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 rounded-xl">
              <Trophy className={`w-16 h-16 mb-4 ${isProfessional() ? 'text-yellow-400' : 'text-gray-400'}`} />
              <h3 className="text-2xl font-bold text-white mb-2">Test Complete!</h3>
              <div className="text-white/90 mb-1">
                Average: <span className="font-bold">{getAverageTime()} ms</span>
              </div>
              <div className="text-white/80 text-sm mb-1">
                Std Deviation: <span className="font-medium">±{getStandardDeviation()} ms</span>
              </div>
              <div className={`font-bold text-lg mt-2 ${getPerformanceLevel().color}`}>
                {getPerformanceLevel().level}
              </div>
              
              {isProfessional() && (
                <div className="mt-4 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg animate-pulse">
                  <p className="text-white font-bold text-center">
                    🎉 恭喜！你可以去打职业了！🎮
                  </p>
                </div>
              )}
              
              <button
                onClick={resetGame}
                className="flex items-center gap-2 px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-lg font-medium transition-colors mt-6"
              >
                <RotateCcw className="w-5 h-5" />
                Try Again
              </button>
            </div>
          )}
        </div>

        {/* Reaction Times History */}
        {reactionTimes.length > 0 && gameState !== 'finished' && (
          <div className="mt-4 flex gap-2 justify-center flex-wrap">
            {reactionTimes.map((time, index) => (
              <div
                key={index}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  time < 150 ? 'bg-purple-100 text-purple-700' :
                  time <= 170 ? 'bg-green-100 text-green-700' :
                  time <= 200 ? 'bg-blue-100 text-blue-700' :
                  time <= 250 ? 'bg-yellow-100 text-yellow-700' :
                  'bg-orange-100 text-orange-700'
                }`}
              >
                {time} ms
              </div>
            ))}
          </div>
        )}

        <p className="text-xs text-gray-400 text-center mt-4">
          Click or press Space when the screen turns green
        </p>

        {/* Pro Reference */}
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-500 text-center flex items-center justify-center gap-2">
            {/* Info Tooltip */}
            <span className="relative group">
              <Info className="w-4 h-4 text-gray-400 cursor-help" />
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-50">
                <div className="bg-gray-900 text-white text-xs rounded-lg p-3 shadow-xl w-64">
                  <div className="font-semibold mb-2 text-center border-b border-gray-700 pb-2">Reaction Time | Level | Description</div>
                  <div className="space-y-1">
                    <div className="flex justify-between"><span className="text-purple-400">&lt; 150ms</span><span>Superhuman</span></div>
                    <div className="flex justify-between"><span className="text-green-400">150-170ms</span><span>Pro Gamer</span></div>
                    <div className="flex justify-between"><span className="text-blue-400">170-200ms</span><span>Excellent</span></div>
                    <div className="flex justify-between"><span className="text-cyan-400">200-250ms</span><span>Good</span></div>
                    <div className="flex justify-between"><span className="text-yellow-400">250-300ms</span><span>Average</span></div>
                    <div className="flex justify-between"><span className="text-orange-400">&gt; 300ms</span><span>Slow</span></div>
                  </div>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 bg-gray-900 rotate-45"></div>
              </div>
            </span>
            <span className="font-medium">🎮 Pro Esports Reference:</span> Top players average 150-170ms with ±15ms variance
          </p>
        </div>
      </div>
    </div>
  );
}
