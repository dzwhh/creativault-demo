'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { ShieldIcon, PlayCircle, RotateCcw, Eye, Trophy } from 'lucide-react';

type GameState = 'idle' | 'showing' | 'input' | 'result' | 'finished';

interface FlashNumber {
  digit: string;
  x: number;
  y: number;
  delay: number;
}

export default function CompetitiveAnalysisPage() {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [currentNumbers, setCurrentNumbers] = useState<string>('');
  const [userInput, setUserInput] = useState('');
  const [round, setRound] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [results, setResults] = useState<{ numbers: string; input: string; correct: boolean }[]>([]);
  const [flashNumbers, setFlashNumbers] = useState<FlashNumber[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [difficulty, setDifficulty] = useState(1); // 难度等级
  const inputRef = useRef<HTMLInputElement>(null);
  
  const totalRounds = 5;
  const digitsPerRound = 6;

  // 生成随机数字
  const generateNumbers = useCallback(() => {
    let numbers = '';
    for (let i = 0; i < digitsPerRound; i++) {
      numbers += Math.floor(Math.random() * 10).toString();
    }
    return numbers;
  }, []);

  // 生成闪烁位置 - 一排显示
  const generateFlashPositions = useCallback((numbers: string) => {
    const positions: FlashNumber[] = [];
    const flashDuration = Math.max(150, 500 - difficulty * 70); // 更快：难度1=430ms，难度5=150ms
    
    for (let i = 0; i < numbers.length; i++) {
      positions.push({
        digit: numbers[i],
        x: 12 + i * 13, // 均匀分布在一排
        y: 50, // 垂直居中
        delay: flashDuration,
      });
    }
    return positions;
  }, [difficulty]);

  // 计算正确率
  const getAccuracy = useCallback(() => {
    if (results.length === 0) return 0;
    return Math.round((correctCount / results.length) * 100);
  }, [correctCount, results.length]);

  // 计算击败用户比例
  const getBeatPercentage = useCallback(() => {
    const accuracy = getAccuracy();
    // 基于正确率和难度计算排名
    // 假设正态分布：50%正确率对应50%排名
    if (accuracy === 0) return 0;
    const basePercentage = accuracy * 0.8; // 正确率贡献80%
    const difficultyBonus = (difficulty - 1) * 5; // 难度贡献
    return Math.min(99, Math.round(basePercentage + difficultyBonus));
  }, [getAccuracy, difficulty]);

  // 开始新一轮
  const startRound = useCallback(() => {
    const numbers = generateNumbers();
    setCurrentNumbers(numbers);
    setUserInput('');
    setShowAll(false);
    
    const positions = generateFlashPositions(numbers);
    setFlashNumbers(positions);
    setGameState('showing');
    
    // 短暂延迟后一次性显示所有数字
    setTimeout(() => {
      setShowAll(true);
      
      // 快闪后隐藏
      const flashDuration = positions[0]?.delay || 300;
      setTimeout(() => {
        setShowAll(false);
        setGameState('input');
        setTimeout(() => inputRef.current?.focus(), 100);
      }, flashDuration);
    }, 200);
  }, [generateNumbers, generateFlashPositions]);

  // 开始测试
  const startTest = useCallback(() => {
    setResults([]);
    setCorrectCount(0);
    setRound(1);
    setDifficulty(1);
    startRound();
  }, [startRound]);

  // 提交答案
  const submitAnswer = useCallback(() => {
    const isCorrect = userInput === currentNumbers;
    
    setResults(prev => [...prev, {
      numbers: currentNumbers,
      input: userInput,
      correct: isCorrect
    }]);
    
    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
      // 答对提高难度
      setDifficulty(prev => Math.min(5, prev + 0.5));
    } else {
      // 答错降低难度
      setDifficulty(prev => Math.max(1, prev - 0.3));
    }
    
    setGameState('result');
    
    // 显示结果后进入下一轮或结束
    setTimeout(() => {
      if (round < totalRounds) {
        setRound(r => r + 1);
        startRound();
      } else {
        setGameState('finished');
      }
    }, 1500);
  }, [userInput, currentNumbers, round, startRound]);

  // 重置游戏
  const resetGame = useCallback(() => {
    setGameState('idle');
    setResults([]);
    setCorrectCount(0);
    setRound(0);
    setUserInput('');
    setDifficulty(1);
  }, []);

  // 键盘处理
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && gameState === 'input' && userInput.length === digitsPerRound) {
        submitAnswer();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, userInput, submitAnswer]);

  // 获取评级
  const getRating = useCallback(() => {
    const accuracy = getAccuracy();
    if (accuracy >= 100) return { level: 'Perfect', color: 'text-purple-600', emoji: '🏆' };
    if (accuracy >= 80) return { level: 'Excellent', color: 'text-green-600', emoji: '⭐' };
    if (accuracy >= 60) return { level: 'Good', color: 'text-blue-600', emoji: '👍' };
    if (accuracy >= 40) return { level: 'Average', color: 'text-yellow-600', emoji: '😊' };
    return { level: 'Keep Practicing', color: 'text-orange-600', emoji: '💪' };
  }, [getAccuracy]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex flex-col items-center justify-center p-8">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
            <ShieldIcon className="w-6 h-6 text-purple-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Competitive Analysis</h1>
        </div>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-medium mb-4">
          <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
          Coming Soon
        </div>
        <p className="text-gray-500 max-w-md mx-auto">
          Dynamic Visual Acuity (DVA) Test - Identify rapidly flashing numbers to test your visual processing speed.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 w-full max-w-xl">
        {/* Stats Bar */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-4">
            <div className="text-sm">
              <span className="text-gray-500">Round:</span>
              <span className="ml-2 font-bold text-purple-600">{round}/{totalRounds}</span>
            </div>
            <div className="text-sm">
              <span className="text-gray-500">Correct:</span>
              <span className="ml-2 font-bold text-green-600">{correctCount}/{results.length}</span>
            </div>
            <div className="text-sm">
              <span className="text-gray-500">Level:</span>
              <span className="ml-2 font-bold text-blue-600">{difficulty.toFixed(1)}</span>
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
        <div className="relative h-72 bg-gray-900 rounded-xl overflow-hidden">
          {/* Idle State */}
          {gameState === 'idle' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Eye className="w-16 h-16 text-purple-400 mb-4" />
              <p className="text-gray-400 mb-6 text-center px-4">
                Watch for 6 flashing numbers, then type them in order
              </p>
              <button
                onClick={startTest}
                className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
              >
                <PlayCircle className="w-5 h-5" />
                Start Test
              </button>
            </div>
          )}

          {/* Showing Numbers */}
          {gameState === 'showing' && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={`flex gap-4 transition-all duration-150 ${showAll ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
                {flashNumbers.map((flash, index) => (
                  <span 
                    key={index}
                    className="text-5xl font-bold text-white drop-shadow-lg" 
                    style={{ textShadow: '0 0 20px rgba(168, 85, 247, 0.8)' }}
                  >
                    {flash.digit}
                  </span>
                ))}
              </div>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                <p className="text-purple-400 text-sm">Watch carefully...</p>
              </div>
            </div>
          )}

          {/* Input State */}
          {gameState === 'input' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-gray-400 mb-4">Enter the 6 digits you saw:</p>
              <input
                ref={inputRef}
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value.replace(/\D/g, '').slice(0, 6))}
                className="w-64 text-center text-3xl font-mono font-bold tracking-[0.4em] bg-gray-800 text-white border-2 border-purple-500 rounded-lg py-3 px-6 focus:outline-none focus:border-purple-400"
                maxLength={6}
                autoFocus
                placeholder="_ _ _ _ _ _"
              />
              <div className="flex gap-1 mt-2">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-1 rounded-full ${
                      i < userInput.length ? 'bg-purple-500' : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={submitAnswer}
                disabled={userInput.length !== 6}
                className={`mt-4 px-6 py-2 rounded-lg font-medium transition-colors ${
                  userInput.length === 6
                    ? 'bg-purple-600 hover:bg-purple-700 text-white'
                    : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                }`}
              >
                Submit (Enter)
              </button>
            </div>
          )}

          {/* Result State */}
          {gameState === 'result' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              {userInput === currentNumbers ? (
                <>
                  <div className="text-5xl mb-2">✅</div>
                  <p className="text-green-400 text-xl font-bold">Correct!</p>
                  <p className="text-gray-400 mt-2 font-mono text-2xl">{currentNumbers}</p>
                </>
              ) : (
                <>
                  <div className="text-5xl mb-2">❌</div>
                  <p className="text-red-400 text-xl font-bold">Incorrect</p>
                  <div className="mt-2 text-center">
                    <p className="text-gray-500 text-sm">Correct:</p>
                    <p className="text-green-400 font-mono text-2xl">{currentNumbers}</p>
                    <p className="text-gray-500 text-sm mt-1">Your answer:</p>
                    <p className="text-red-400 font-mono text-2xl">{userInput || '(empty)'}</p>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Finished State */}
          {gameState === 'finished' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80">
              <Trophy className={`w-16 h-16 mb-4 ${getAccuracy() >= 80 ? 'text-yellow-400' : 'text-gray-400'}`} />
              <h3 className="text-2xl font-bold text-white mb-2">Test Complete!</h3>
              
              <div className="text-white/90 mb-1">
                Accuracy: <span className="font-bold text-green-400">{getAccuracy()}%</span>
                <span className="text-2xl ml-2">{getRating().emoji}</span>
              </div>
              
              <div className={`font-bold text-lg ${getRating().color}`}>
                {getRating().level}
              </div>
              
              <div className="mt-4 px-4 py-2 bg-purple-900/50 rounded-lg">
                <p className="text-purple-300 text-center">
                  🎯 You beat <span className="font-bold text-white">{getBeatPercentage()}%</span> of players!
                </p>
              </div>
              
              {getAccuracy() === 100 && (
                <div className="mt-4 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg animate-pulse">
                  <p className="text-white font-bold text-center">
                    🏆 完美通关！你的动态视力超群！
                  </p>
                </div>
              )}
              
              <button
                onClick={resetGame}
                className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors mt-6"
              >
                <RotateCcw className="w-5 h-5" />
                Try Again
              </button>
            </div>
          )}
        </div>

        {/* Results History */}
        {results.length > 0 && gameState !== 'finished' && (
          <div className="mt-4 flex gap-2 justify-center flex-wrap">
            {results.map((result, index) => (
              <div
                key={index}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  result.correct 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {result.correct ? '✓' : '✗'}
              </div>
            ))}
          </div>
        )}

        <p className="text-xs text-gray-400 text-center mt-4">
          Watch the flashing numbers, then type them in order
        </p>

        {/* Info Box */}
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-500 text-center">
            <span className="font-medium">💡 DVA Test:</span> Measures your ability to identify fast-moving visual information - crucial for driving, sports & gaming
          </p>
        </div>
      </div>
    </div>
  );
}
