
(function () {
  'use strict';

  // ===== CONSTANTS =====
  const BIG = [5, 6, 7, 8, 9], SMALL = [0, 1, 2, 3, 4];
  const HISTORY_API = 'https://draw.ar-lottery01.com/WinGo/WinGo_30S/GetHistoryIssuePage.json';
  const BACKUP_API = 'https://api.allorigins.win/raw?url=' + encodeURIComponent(HISTORY_API);
  const CIRC_MINI = 2 * Math.PI * 20;

  // ===== TELEGRAM STICKERS =====
  const WIN_S = {
    first: "CAACAgUAAxkBAAEP1PhpIPLIMFdfxSV6YZi37mCNW6xWgAACbBQAAkS40VXXrmIAAcheaF42BA",
    medium: ["CAACAgUAAxkBAAEP1PppIPMD4hZ9IIZqlPPnR1cCd1YLGgAC5BIAAhBE0VVZZYrWJBnXHTYE", "CAACAgUAAxkBAAEP1PxpIPMFzSzUwMit8F4o2X6r-sdk2gACBhQAArlQ2VWW4hoqFPQ-VDYE"],
    last: "CAACAgUAAxkBAAEP1RZpIPQVn2ngKC7Mgxx6f3RNGwoZDAAC_hMAAh7v0VWiYWtozzcTRDYE"
  };
  const LOSS_S = ["CAACAgUAAxkBAAEPzOFpGvSipFpy8aZ6vCgMvGQbVVj7UwACeAQAAi-UwFQbqLlkLtUfjDYE", "CAACAgUAAxkBAAEP1RppIPQ275PsQCYd_uj1A9rbmXE3oQACUAUAAt-wwVTMJpZOSkM-OjYE"];

  // ===== ADVANCED PREDICTION ENGINE (All 12 Logics + New) =====
  class NovaPredictionBrain {
    constructor() {
      this.gameHistory = [];
      this.myBets = [];
      
      // All 12 Logics with dynamic weights
      this.weights = {
        pattern: 1.5,       // 1. Dynamic Pattern
        anomaly: 1.2,       // 2. Statistical Anomaly
        timeSeries: 1.3,    // 3. Time Series
        cycle: 1.4,         // 4. Cyclical
        frequency: 1.1,     // 5. Frequency
        confidence: 1.2,    // 6. Confidence Intervals
        reversal: 1.6,      // 7. Trend Reversal
        multiDim: 1.3,      // 8. Multi-Dimensional
        adaptive: 1.4,      // 9. Adaptive (Emotional)
        bayesian: 1.5,      // 10. Bayesian
        ml: 1.7,            // 11. Machine Learning
        ensemble: 1.3,      // 12. Meta-result
        
        // New Advanced Logics
        fibonacci: 1.4,     // 13. Fibonacci Patterns
        harmonic: 1.3,      // 14. Harmonic Analysis
        fractal: 1.5,       // 15. Fractal Patterns
        momentum: 1.6,      // 16. Momentum Indicator
        divergence: 1.4,    // 17. RSI Divergence
        cluster: 1.5,       // 18. Cluster Analysis
        neural: 1.8,        // 19. Neural Network Pattern
        quantum: 1.6,       // 20. Quantum Probability
        chaos: 1.4,         // 21. Chaos Theory
        entropy: 1.3        // 22. Entropy Based
      };
      
      this.currentMode = 'neutral';
      this.gameState = 'unknown'; // trending, ranging, volatile
      this.confidenceHistory = [];
    }

    parseResult(num) {
      const n = parseInt(num);
      return {
        number: n,
        size: (n >= 5) ? 'big' : 'small',
        color: (n === 0) ? 'red' : ((n % 2 === 0) ? 'red' : 'green'),
        value: n
      };
    }

    addHistory(period, number) {
      const data = this.parseResult(number);
      data.period = period;
      this.gameHistory.unshift(data);
      if (this.gameHistory.length > 200) this.gameHistory.pop();
    }

    recordBetOutcome(period, prediction, actualResult, won) {
      this.myBets.unshift({ period, prediction, actualResult, won });
      if (this.myBets.length > 50) this.myBets.pop();
      this.adjustWeightsDynamically();
      this.analyzeGameState();
    }

    analyzeGameState() {
      if (this.gameHistory.length < 10) return;
      
      const h = this.gameHistory;
      const last10 = h.slice(0, 10);
      
      // Check volatility
      let changes = 0;
      for (let i = 0; i < 9; i++) {
        if (h[i] && h[i+1] && h[i].size !== h[i+1].size) changes++;
      }
      const volatility = changes / 9;
      
      // Check trend
      let trend = 0;
      for (let i = 0; i < 5; i++) {
        if (h[i] && h[i+1]) {
          trend += (h[i].size === 'big' ? 1 : -1);
        }
      }
      
      if (volatility > 0.7) {
        this.gameState = 'volatile';
      } else if (Math.abs(trend) > 3) {
        this.gameState = 'trending';
      } else {
        this.gameState = 'ranging';
      }
    }

    adjustWeightsDynamically() {
      if (this.myBets.length < 10) return;
      
      const recentBets = this.myBets.slice(0, 10);
      const winRate = recentBets.filter(b => b.won).length / 10;
      
      // Dynamic weight adjustment based on performance
      if (winRate < 0.4) {
        // Losing streak - shift strategies
        this.weights.reversal *= 1.2;
        this.weights.anomaly *= 1.1;
        this.weights.pattern *= 0.9;
        this.weights.ml *= 0.95;
        this.currentMode = 'cautious';
      } else if (winRate > 0.7) {
        // Winning streak - amplify working strategies
        this.weights.pattern *= 1.1;
        this.weights.ml *= 1.15;
        this.weights.quantum *= 1.1;
        this.currentMode = 'aggressive';
      } else {
        this.currentMode = 'neutral';
      }
      
      // Normalize weights
      const total = Object.values(this.weights).reduce((a, b) => a + b, 0);
      const factor = 20 / total; // Keep sum around 20
      for (let key in this.weights) {
        this.weights[key] *= factor;
      }
    }

    // ===== ALL 12 ORIGINAL LOGICS + NEW ONES =====
    analyze() {
      if (this.gameHistory.length < 5) {
        return { 
          prediction: Math.random() > 0.5 ? 'big' : 'small', 
          confidence: 50, 
          reasoning: 'Initializing Analysis...',
          mode: this.currentMode,
          gameState: this.gameState
        };
      }

      let scores = { big: 0, small: 0 };
      let reasons = [];
      let logicVotes = [];
      
      const h = this.gameHistory;
      const last = h[0];
      const last10 = h.slice(0, 10);
      const last20 = h.slice(0, 20);
      const last50 = h.slice(0, 50);

      // ===== 1. DYNAMIC PATTERN RECOGNITION =====
      const last3Pattern = h.slice(0, 3).map(x => x.size).join('');
      let patternMatchCount = 0;
      let patternPrediction = '';
      
      for (let i = 3; i < h.length - 1; i++) {
        const currentPattern = h.slice(i, i+3).map(x => x.size).join('');
        if (currentPattern === last3Pattern) {
          patternMatchCount++;
          patternPrediction = h[i-1]?.size;
        }
      }
      if (patternMatchCount > 0 && patternPrediction) {
        scores[patternPrediction] += 25 * this.weights.pattern;
        reasons.push(`Pattern (${patternMatchCount} matches)`);
        logicVotes.push({ logic: 'Pattern', vote: patternPrediction, weight: 25 * this.weights.pattern });
      }

      // ===== 2. STATISTICAL ANOMALY DETECTION =====
      const bigCount10 = last10.filter(x => x.size === 'big').length;
      const smallCount10 = 10 - bigCount10;
      
      if (bigCount10 >= 8) { 
        scores.small += 30 * this.weights.anomaly; 
        reasons.push("Anomaly (Extreme Bigs)");
        logicVotes.push({ logic: 'Anomaly', vote: 'small', weight: 30 * this.weights.anomaly });
      } else if (smallCount10 >= 8) { 
        scores.big += 30 * this.weights.anomaly; 
        reasons.push("Anomaly (Extreme Smalls)");
        logicVotes.push({ logic: 'Anomaly', vote: 'big', weight: 30 * this.weights.anomaly });
      } else if (bigCount10 >= 7) {
        scores.small += 20 * this.weights.anomaly;
        reasons.push("Anomaly (Big Heavy)");
        logicVotes.push({ logic: 'Anomaly', vote: 'small', weight: 20 * this.weights.anomaly });
      } else if (smallCount10 >= 7) {
        scores.big += 20 * this.weights.anomaly;
        reasons.push("Anomaly (Small Heavy)");
        logicVotes.push({ logic: 'Anomaly', vote: 'big', weight: 20 * this.weights.anomaly });
      }

      // ===== 3. TIME SERIES FORECASTING =====
      let timeSeriesScore = 0;
      h.slice(0, 20).forEach((item, index) => {
        const weight = Math.pow(0.9, index); // Exponential decay
        timeSeriesScore += (item.size === 'big' ? 1 : -1) * weight * 100;
      });
      
      if (timeSeriesScore > 10) {
        scores.big += 20 * this.weights.timeSeries;
        reasons.push("Time Series (Up Trend)");
        logicVotes.push({ logic: 'TimeSeries', vote: 'big', weight: 20 * this.weights.timeSeries });
      } else if (timeSeriesScore < -10) {
        scores.small += 20 * this.weights.timeSeries;
        reasons.push("Time Series (Down Trend)");
        logicVotes.push({ logic: 'TimeSeries', vote: 'small', weight: 20 * this.weights.timeSeries });
      } else {
        // Ranging - follow last
        scores[last.size] += 10 * this.weights.timeSeries;
        reasons.push("Time Series (Ranging)");
        logicVotes.push({ logic: 'TimeSeries', vote: last.size, weight: 10 * this.weights.timeSeries });
      }

      // ===== 4. CYCLICAL PATTERN ANALYSIS =====
      let oscillations = 0;
      for(let i=0; i<15; i++) {
        if(h[i] && h[i+1] && h[i].size !== h[i+1].size) oscillations++;
      }
      
      if (oscillations >= 10) {
        const nextOscillation = (last.size === 'big') ? 'small' : 'big';
        scores[nextOscillation] += 25 * this.weights.cycle;
        reasons.push("Cyclical (High Oscillation)");
        logicVotes.push({ logic: 'Cycle', vote: nextOscillation, weight: 25 * this.weights.cycle });
      } else if (oscillations <= 4) {
        scores[last.size] += 20 * this.weights.cycle;
        reasons.push("Cyclical (Low Oscillation)");
        logicVotes.push({ logic: 'Cycle', vote: last.size, weight: 20 * this.weights.cycle });
      }

      // ===== 5. FREQUENCY DISTRIBUTION =====
      const bigFreq50 = last50.filter(x => x.size === 'big').length;
      const expected = 25;
      const deviation = Math.abs(bigFreq50 - expected);
      
      if (deviation > 5) {
        // Bet on correction
        if (bigFreq50 > expected) {
          scores.small += 15 * this.weights.frequency;
          reasons.push("Frequency (Correction Expected)");
          logicVotes.push({ logic: 'Frequency', vote: 'small', weight: 15 * this.weights.frequency });
        } else {
          scores.big += 15 * this.weights.frequency;
          reasons.push("Frequency (Correction Expected)");
          logicVotes.push({ logic: 'Frequency', vote: 'big', weight: 15 * this.weights.frequency });
        }
      }

      // ===== 6. CONFIDENCE INTERVALS =====
      const variance = Math.abs(bigCount10 - 5);
      if (variance > 3) {
        // High variance means unstable
        if (bigCount10 > 5) {
          scores.small += 20 * this.weights.confidence;
          reasons.push("Confidence (High Variance Reversal)");
          logicVotes.push({ logic: 'Confidence', vote: 'small', weight: 20 * this.weights.confidence });
        } else {
          scores.big += 20 * this.weights.confidence;
          reasons.push("Confidence (High Variance Reversal)");
          logicVotes.push({ logic: 'Confidence', vote: 'big', weight: 20 * this.weights.confidence });
        }
      }

      // ===== 7. TREND REVERSAL DETECTION =====
      let streak = 0;
      let streakType = last.size;
      for (let item of h) {
        if (item.size === streakType) streak++;
        else break;
      }
      
      if (streak >= 3) {
        const reverse = (streakType === 'big') ? 'small' : 'big';
        scores[reverse] += 35 * this.weights.reversal;
        reasons.push(`Reversal (${streak} streak)`);
        logicVotes.push({ logic: 'Reversal', vote: reverse, weight: 35 * this.weights.reversal });
      } else if (streak === 2) {
        // 50-50 chance
        scores[streakType] += 15 * this.weights.reversal;
        reasons.push("Continue Streak");
        logicVotes.push({ logic: 'Reversal', vote: streakType, weight: 15 * this.weights.reversal });
      }

      // ===== 8. MULTI-DIMENSIONAL PROBABILITY =====
      const redBigCount = last10.filter(x => x.color === 'red' && x.size === 'big').length;
      const greenBigCount = last10.filter(x => x.color === 'green' && x.size === 'big').length;
      const redCount = last10.filter(x => x.color === 'red').length;
      const greenCount = last10.filter(x => x.color === 'green').length;
      
      if (last.color === 'red' && redCount > 0) {
        const redBigProb = redBigCount / redCount;
        if (redBigProb > 0.6) {
          scores.big += 15 * this.weights.multiDim;
          reasons.push("Multi-Dim (Red → Big)");
          logicVotes.push({ logic: 'MultiDim', vote: 'big', weight: 15 * this.weights.multiDim });
        } else if (redBigProb < 0.4) {
          scores.small += 15 * this.weights.multiDim;
          reasons.push("Multi-Dim (Red → Small)");
          logicVotes.push({ logic: 'MultiDim', vote: 'small', weight: 15 * this.weights.multiDim });
        }
      } else if (last.color === 'green' && greenCount > 0) {
        const greenBigProb = greenBigCount / greenCount;
        if (greenBigProb > 0.6) {
          scores.big += 15 * this.weights.multiDim;
          reasons.push("Multi-Dim (Green → Big)");
          logicVotes.push({ logic: 'MultiDim', vote: 'big', weight: 15 * this.weights.multiDim });
        } else if (greenBigProb < 0.4) {
          scores.small += 15 * this.weights.multiDim;
          reasons.push("Multi-Dim (Green → Small)");
          logicVotes.push({ logic: 'MultiDim', vote: 'small', weight: 15 * this.weights.multiDim });
        }
      }

      // ===== 9. ADAPTIVE WEIGHTED (EMOTIONAL) =====
      if (this.currentMode === 'cautious') {
        const safe = (last.size === 'big') ? 'small' : 'big';
        scores[safe] += 20;
        reasons.push("Cautious Mode (Anti-streak)");
        logicVotes.push({ logic: 'Adaptive', vote: safe, weight: 20 });
      } else if (this.currentMode === 'aggressive') {
        scores[last.size] += 25;
        reasons.push("Aggressive Mode (Follow Trend)");
        logicVotes.push({ logic: 'Adaptive', vote: last.size, weight: 25 });
      } else {
        // Neutral - balanced approach
        if (streak >= 2) {
          scores[last.size] += 10;
          reasons.push("Neutral (Cautious Follow)");
        }
      }

      // ===== 10. BAYESIAN INFERENCE =====
      const last20Pairs = [];
      for (let i = 0; i < 19; i++) {
        if (h[i] && h[i+1]) {
          last20Pairs.push({
            first: h[i].size,
            second: h[i+1].size
          });
        }
      }
      
      const bigAfterBig = last20Pairs.filter(p => p.first === 'big' && p.second === 'big').length;
      const bigAfterSmall = last20Pairs.filter(p => p.first === 'small' && p.second === 'big').length;
      const smallAfterBig = last20Pairs.filter(p => p.first === 'big' && p.second === 'small').length;
      const smallAfterSmall = last20Pairs.filter(p => p.first === 'small' && p.second === 'small').length;
      
      const totalBigFirst = bigAfterBig + smallAfterBig;
      const totalSmallFirst = bigAfterSmall + smallAfterSmall;
      
      if (last.size === 'big' && totalBigFirst > 0) {
        const probBigAgain = bigAfterBig / totalBigFirst;
        if (probBigAgain > 0.6) {
          scores.big += 20 * this.weights.bayesian;
          reasons.push("Bayesian (Big follows Big)");
          logicVotes.push({ logic: 'Bayesian', vote: 'big', weight: 20 * this.weights.bayesian });
        } else if (probBigAgain < 0.4) {
          scores.small += 20 * this.weights.bayesian;
          reasons.push("Bayesian (Small follows Big)");
          logicVotes.push({ logic: 'Bayesian', vote: 'small', weight: 20 * this.weights.bayesian });
        }
      } else if (last.size === 'small' && totalSmallFirst > 0) {
        const probSmallAgain = smallAfterSmall / totalSmallFirst;
        if (probSmallAgain > 0.6) {
          scores.small += 20 * this.weights.bayesian;
          reasons.push("Bayesian (Small follows Small)");
          logicVotes.push({ logic: 'Bayesian', vote: 'small', weight: 20 * this.weights.bayesian });
        } else if (probSmallAgain < 0.4) {
          scores.big += 20 * this.weights.bayesian;
          reasons.push("Bayesian (Big follows Small)");
          logicVotes.push({ logic: 'Bayesian', vote: 'big', weight: 20 * this.weights.bayesian });
        }
      }

      // ===== 11. MACHINE LEARNING (Pattern Matching) =====
      const currentSeq = h.slice(0, 5).map(x => x.size);
      let bestMatch = { similarity: 0, result: '' };
      
      for (let i = 5; i < h.length - 1; i++) {
        const historySeq = h.slice(i, i+5).map(x => x.size);
        let matches = 0;
        for (let j = 0; j < 5; j++) {
          if (historySeq[j] === currentSeq[j]) matches++;
        }
        const similarity = matches / 5;
        
        if (similarity > bestMatch.similarity && similarity > 0.6) {
          bestMatch.similarity = similarity;
          bestMatch.result = h[i-1]?.size;
        }
      }
      
      if (bestMatch.result) {
        scores[bestMatch.result] += 30 * this.weights.ml * bestMatch.similarity;
        reasons.push(`ML Match (${Math.round(bestMatch.similarity*100)}%)`);
        logicVotes.push({ logic: 'ML', vote: bestMatch.result, weight: 30 * this.weights.ml * bestMatch.similarity });
      }

      // ===== 12. ENSEMBLE METHOD =====
      // Combine top 3 logic votes
      logicVotes.sort((a, b) => b.weight - a.weight);
      const top3 = logicVotes.slice(0, 3);
      
      top3.forEach(vote => {
        scores[vote.vote] += 10 * this.weights.ensemble;
      });
      if (top3.length > 0) {
        reasons.push(`Ensemble (Top: ${top3[0].logic})`);
      }

      // ===== NEW LOGIC 13: FIBONACCI PATTERNS =====
      const fibSeq = [1, 2, 3, 5, 8, 13];
      let fibScore = { big: 0, small: 0 };
      
      for (let fib of fibSeq) {
        if (fib < h.length) {
          const fibResult = h[fib-1]?.size;
          if (fibResult) {
            fibScore[fibResult] += 1;
          }
        }
      }
      
      if (fibScore.big > fibScore.small) {
        scores.big += 15 * this.weights.fibonacci;
        reasons.push("Fibonacci (Big)");
        logicVotes.push({ logic: 'Fibonacci', vote: 'big', weight: 15 * this.weights.fibonacci });
      } else if (fibScore.small > fibScore.big) {
        scores.small += 15 * this.weights.fibonacci;
        reasons.push("Fibonacci (Small)");
        logicVotes.push({ logic: 'Fibonacci', vote: 'small', weight: 15 * this.weights.fibonacci });
      }

      // ===== NEW LOGIC 14: HARMONIC ANALYSIS =====
      let harmonicSum = 0;
      for (let i = 0; i < 10; i++) {
        if (h[i]) {
          harmonicSum += (h[i].size === 'big' ? 1 : -1) * (1 / (i + 1));
        }
      }
      
      if (harmonicSum > 0.5) {
        scores.big += 15 * this.weights.harmonic;
        reasons.push("Harmonic (Bullish)");
        logicVotes.push({ logic: 'Harmonic', vote: 'big', weight: 15 * this.weights.harmonic });
      } else if (harmonicSum < -0.5) {
        scores.small += 15 * this.weights.harmonic;
        reasons.push("Harmonic (Bearish)");
        logicVotes.push({ logic: 'Harmonic', vote: 'small', weight: 15 * this.weights.harmonic });
      }

      // ===== NEW LOGIC 15: FRACTAL PATTERNS =====
      let fractalScore = 0;
      for (let scale = 2; scale <= 5; scale++) {
        if (h.length >= scale * 2) {
          const firstHalf = h.slice(0, scale).map(x => x.size);
          const secondHalf = h.slice(scale, scale*2).map(x => x.size);
          let matches = 0;
          for (let i = 0; i < scale; i++) {
            if (firstHalf[i] === secondHalf[i]) matches++;
          }
          fractalScore += (matches / scale) * (6 - scale);
        }
      }
      
      if (fractalScore > 3) {
        scores[last.size] += 20 * this.weights.fractal;
        reasons.push("Fractal (Pattern Repeat)");
        logicVotes.push({ logic: 'Fractal', vote: last.size, weight: 20 * this.weights.fractal });
      }

      // ===== NEW LOGIC 16: MOMENTUM INDICATOR =====
      let momentum = 0;
      for (let i = 0; i < 5; i++) {
        if (h[i] && h[i+5]) {
          momentum += (h[i].size === 'big' ? 1 : -1) - (h[i+5].size === 'big' ? 1 : -1);
        }
      }
      
      if (momentum > 2) {
        scores.big += 20 * this.weights.momentum;
        reasons.push("Momentum (Strong Up)");
        logicVotes.push({ logic: 'Momentum', vote: 'big', weight: 20 * this.weights.momentum });
      } else if (momentum < -2) {
        scores.small += 20 * this.weights.momentum;
        reasons.push("Momentum (Strong Down)");
        logicVotes.push({ logic: 'Momentum', vote: 'small', weight: 20 * this.weights.momentum });
      }

      // ===== NEW LOGIC 17: RSI DIVERGENCE =====
      let gains = 0, losses = 0;
      for (let i = 1; i < 14; i++) {
        if (h[i-1] && h[i]) {
          const change = (h[i-1].size === 'big' ? 1 : -1) - (h[i].size === 'big' ? 1 : -1);
          if (change > 0) gains += change;
          else losses -= change;
        }
      }
      
      const rsi = 100 - (100 / (1 + (gains / (losses || 1))));
      
      if (rsi > 70) {
        scores.small += 20 * this.weights.divergence;
        reasons.push("RSI Divergence (Overbought)");
        logicVotes.push({ logic: 'RSI', vote: 'small', weight: 20 * this.weights.divergence });
      } else if (rsi < 30) {
        scores.big += 20 * this.weights.divergence;
        reasons.push("RSI Divergence (Oversold)");
        logicVotes.push({ logic: 'RSI', vote: 'big', weight: 20 * this.weights.divergence });
      }

      // ===== NEW LOGIC 18: CLUSTER ANALYSIS =====
      const clusters = [];
      let currentCluster = [h[0]];
      
      for (let i = 1; i < 10; i++) {
        if (h[i] && h[i].size === currentCluster[0].size) {
          currentCluster.push(h[i]);
        } else {
          if (currentCluster.length >= 2) {
            clusters.push({
              size: currentCluster[0].size,
              length: currentCluster.length
            });
          }
          currentCluster = [h[i]];
        }
      }
      
      const maxCluster = clusters.sort((a, b) => b.length - a.length)[0];
      if (maxCluster && maxCluster.length >= 3) {
        const reverse = maxCluster.size === 'big' ? 'small' : 'big';
        scores[reverse] += 25 * this.weights.cluster;
        reasons.push(`Cluster Break (${maxCluster.size} x${maxCluster.length})`);
        logicVotes.push({ logic: 'Cluster', vote: reverse, weight: 25 * this.weights.cluster });
      }

      // ===== NEW LOGIC 19: NEURAL NETWORK PATTERN =====
      const nnInput = [
        bigCount10 / 10,
        streak / 10,
        oscillations / 15,
        timeSeriesScore / 100,
        momentum / 5
      ];
      
      // Simple neural net simulation
      let nnOutput = 0;
      const weights = [0.3, 0.25, 0.2, 0.15, 0.1];
      for (let i = 0; i < 5; i++) {
        nnOutput += nnInput[i] * weights[i];
      }
      
      if (nnOutput > 0.6) {
        scores.big += 25 * this.weights.neural;
        reasons.push("Neural Net (Big Signal)");
        logicVotes.push({ logic: 'Neural', vote: 'big', weight: 25 * this.weights.neural });
      } else if (nnOutput < 0.4) {
        scores.small += 25 * this.weights.neural;
        reasons.push("Neural Net (Small Signal)");
        logicVotes.push({ logic: 'Neural', vote: 'small', weight: 25 * this.weights.neural });
      }

      // ===== NEW LOGIC 20: QUANTUM PROBABILITY =====
      const quantumRandom = Math.random();
      const quantumBias = (bigCount10 / 10) * 0.3 + (1 - smallCount10 / 10) * 0.3 + (streak / 10) * 0.4;
      
      if (quantumRandom < quantumBias) {
        scores.big += 15 * this.weights.quantum;
        reasons.push("Quantum (Big Probability)");
        logicVotes.push({ logic: 'Quantum', vote: 'big', weight: 15 * this.weights.quantum });
      } else {
        scores.small += 15 * this.weights.quantum;
        reasons.push("Quantum (Small Probability)");
        logicVotes.push({ logic: 'Quantum', vote: 'small', weight: 15 * this.weights.quantum });
      }

      // ===== NEW LOGIC 21: CHAOS THEORY =====
      const lyapunov = Math.log(Math.abs(timeSeriesScore) + 1) / Math.log(10);
      if (lyapunov > 0.5) {
        // Chaotic system - expect reversal
        const reverse = last.size === 'big' ? 'small' : 'big';
        scores[reverse] += 20 * this.weights.chaos;
        reasons.push("Chaos Theory (Reversal)");
        logicVotes.push({ logic: 'Chaos', vote: reverse, weight: 20 * this.weights.chaos });
      }

      // ===== NEW LOGIC 22: ENTROPY BASED =====
      const bigEntropy = - (bigCount10/10) * Math.log2(bigCount10/10 + 0.01);
      const smallEntropy = - (smallCount10/10) * Math.log2(smallCount10/10 + 0.01);
      const totalEntropy = bigEntropy + smallEntropy;
      
      if (totalEntropy > 0.9) {
        // High entropy - unpredictable, follow momentum
        scores[last.size] += 15 * this.weights.entropy;
        reasons.push("High Entropy (Follow Last)");
        logicVotes.push({ logic: 'Entropy', vote: last.size, weight: 15 * this.weights.entropy });
      } else {
        // Low entropy - predictable, bet against trend
        const reverse = last.size === 'big' ? 'small' : 'big';
        scores[reverse] += 15 * this.weights.entropy;
        reasons.push("Low Entropy (Anti-trend)");
        logicVotes.push({ logic: 'Entropy', vote: reverse, weight: 15 * this.weights.entropy });
      }

      // ===== FINAL CALCULATION =====
      const totalScore = scores.big + scores.small;
      let prediction = 'big';
      let confidence = 50;

      if (totalScore > 0) {
        const bigPct = (scores.big / totalScore) * 100;
        if (bigPct > 50) { 
          prediction = 'big'; 
          confidence = bigPct; 
        } else { 
          prediction = 'small'; 
          confidence = 100 - bigPct; 
        }
      }

      // Boost confidence if many logics agree
      const agreement = logicVotes.filter(v => v.vote === prediction).length / logicVotes.length;
      confidence = confidence * (0.7 + 0.3 * agreement);
      
      // Ensure confidence is in reasonable range
      confidence = Math.min(98, Math.max(55, Math.floor(confidence)));
      
      // Get primary reasoning
      const topLogic = logicVotes.sort((a, b) => b.weight - a.weight)[0];
      const primaryReason = topLogic ? `${topLogic.logic} (${Math.round(topLogic.weight)} pts)` : "Ensemble Analysis";
      
      // Store confidence for history
      this.confidenceHistory.push(confidence);
      if (this.confidenceHistory.length > 20) this.confidenceHistory.shift();
      
      return { 
        prediction, 
        confidence, 
        reasoning: primaryReason,
        fullReasoning: reasons.slice(0, 3).join(' + '),
        mode: this.currentMode,
        gameState: this.gameState,
        scores: scores,
        logicCount: logicVotes.length,
        agreement: Math.round(agreement * 100)
      };
    }
  }

  // Initialize Nova Brain
  const novaBrain = new NovaPredictionBrain();

  // ===== ENHANCED QUANTUM ENGINE =====
  class QuantumEngine {
    predict(history) {
      if (history.length < 5) return { digit: Math.floor(Math.random() * 10), size: "BIG", confidence: 30 };
      
      const N = history.length;
      const occ = Array(10).fill(0);
      const lastIndex = Array(10).fill(-1);
      const gaps = Array(10).fill(0);
      
      history.forEach((num, i) => {
        occ[num]++;
        lastIndex[num] = i;
      });
      
      for (let i = 0; i < 10; i++) {
        gaps[i] = lastIndex[i] === -1 ? N : (N - 1 - lastIndex[i]);
      }
      
      // Advanced scoring
      let scores = [];
      for (let num = 0; num < 10; num++) {
        let score = 0;
        
        // Frequency score (lower is better)
        let freqScore = 1 - (occ[num] / N);
        
        // Gap score (higher is better)
        let gapScore = gaps[num] / N;
        
        // Recent trend (last 5)
        let recentScore = 0;
        for (let i = 0; i < Math.min(5, N); i++) {
          if (history[i] === num) recentScore += (5 - i) * 2;
        }
        
        // Neighbor influence
        let neighborScore = 0;
        if (num > 0 && occ[num-1] > 0) neighborScore += 0.5;
        if (num < 9 && occ[num+1] > 0) neighborScore += 0.5;
        
        // Cold number bonus
        let coldBonus = gaps[num] > N * 0.3 ? 1.5 : 0;
        
        score = freqScore * 30 + gapScore * 30 + recentScore + neighborScore * 10 + coldBonus * 10;
        
        scores.push({ num, score });
      }
      
      scores.sort((a, b) => b.score - a.score);
      
      // Dynamic confidence based on score difference
      const scoreDiff = scores[0].score - scores[1].score;
      const confidence = Math.min(95, Math.max(50, 50 + scoreDiff));
      
      return {
        digit: scores[0].num,
        size: scores[0].num >= 5 ? "BIG" : "SMALL",
        confidence: confidence,
        scores: scores.slice(0, 3)
      };
    }
  }

  // ===== ULTRA HYBRID ENGINE (All Logics Combined) =====
  class UltraHybridEngine {
    constructor() {
      this.quantum = new QuantumEngine();
      this.novaBrain = novaBrain;
      
      // Dynamic weights based on game state
      this.baseWeights = {
        quantum: 3,
        nova: 7
      };
    }
    
    predict(history) {
      if (history.length < 5) {
        return {
          status: "INSUFFICIENT_DATA",
          digit: Math.floor(Math.random() * 10),
          size: Math.random() > 0.5 ? "BIG" : "SMALL",
          confidence: 50,
          mode: "FALLBACK"
        };
      }
      
      let votes = Array(10).fill(0);
      let engineResults = {};
      
      // Quantum Engine
      let quantumResult = this.quantum.predict(history);
      engineResults.quantum = quantumResult;
      
      // Nova Brain (22 Logics)
      const novaHistory = history.map(num => ({
        number: num,
        size: num >= 5 ? 'big' : 'small',
        color: (num === 0) ? 'red' : ((num % 2 === 0) ? 'red' : 'green'),
        value: num
      }));
      
      const originalHistory = novaBrain.gameHistory;
      novaBrain.gameHistory = novaHistory;
      const novaDecision = novaBrain.analyze();
      novaBrain.gameHistory = originalHistory;
      
      engineResults.nova = novaDecision;
      
      // Convert Nova prediction to digit
      let novaDigit;
      if (novaDecision.prediction === 'big') {
        // Choose best big digit based on quantum and recent history
        const bigDigits = [5,6,7,8,9];
        let bestBig = 7;
        let bestScore = -1;
        
        for (let d of bigDigits) {
          let score = 0;
          // Quantum agreement
          if (quantumResult.digit === d) score += 50;
          // Recent appearance
          const lastIdx = history.findIndex(n => n === d);
          if (lastIdx !== -1) score += (20 - lastIdx) * 2;
          // Frequency
          const freq = history.filter(n => n === d).length;
          score -= freq * 5;
          
          if (score > bestScore) {
            bestScore = score;
            bestBig = d;
          }
        }
        novaDigit = bestBig;
      } else {
        // Choose best small digit
        const smallDigits = [0,1,2,3,4];
        let bestSmall = 2;
        let bestScore = -1;
        
        for (let d of smallDigits) {
          let score = 0;
          if (quantumResult.digit === d) score += 50;
          const lastIdx = history.findIndex(n => n === d);
          if (lastIdx !== -1) score += (20 - lastIdx) * 2;
          const freq = history.filter(n => n === d).length;
          score -= freq * 5;
          
          if (score > bestScore) {
            bestScore = score;
            bestSmall = d;
          }
        }
        novaDigit = bestSmall;
      }
      
      // Dynamic weighting based on confidence
      let quantumWeight = this.baseWeights.quantum;
      let novaWeight = this.baseWeights.nova;
      
      if (quantumResult.confidence > 80) quantumWeight += 2;
      if (novaDecision.confidence > 80) novaWeight += 3;
      if (novaDecision.gameState === 'trending') novaWeight += 1;
      if (novaDecision.gameState === 'volatile') quantumWeight += 1;
      
      // Cast votes
      votes[quantumResult.digit] += quantumWeight;
      votes[novaDigit] += novaWeight;
      
      // Add some votes for neighboring digits (safety)
      if (novaDigit > 0) votes[novaDigit - 1] += 0.5;
      if (novaDigit < 9) votes[novaDigit + 1] += 0.5;
      
      // Final decision
      let maxVotes = Math.max(...votes);
      let finalDigit = votes.indexOf(maxVotes);
      let finalSize = finalDigit >= 5 ? "BIG" : "SMALL";
      
      // Confidence calculation
      const totalVotes = votes.reduce((a, b) => a + b, 0);
      let confidence = (maxVotes / totalVotes) * 100;
      confidence = Math.min(98, Math.max(55, confidence));
      
      // Determine mode
      let mode = "ULTRA";
      if (novaDecision.mode === 'aggressive') mode = "AGGRESSIVE";
      else if (novaDecision.mode === 'cautious') mode = "CAUTIOUS";
      if (novaDecision.gameState === 'volatile') mode = "VOLATILE";
      if (novaDecision.gameState === 'trending') mode = "TRENDING";
      
      return {
        status: "SUCCESS",
        digit: finalDigit,
        size: finalSize,
        confidence: confidence.toFixed(1),
        mode: mode,
        emotion: novaDecision.mode,
        gameState: novaDecision.gameState,
        reasoning: novaDecision.fullReasoning || novaDecision.reasoning,
        logicCount: novaDecision.logicCount,
        agreement: novaDecision.agreement,
        quantumDigit: quantumResult.digit,
        quantumConfidence: quantumResult.confidence,
        novaPrediction: novaDecision.prediction,
        novaConfidence: novaDecision.confidence
      };
    }
    
    recordBetOutcome(period, prediction, actualResult, won) {
      novaBrain.recordBetOutcome(period, prediction, actualResult, won);
    }
    
    addHistory(period, number) {
      novaBrain.addHistory(period, number);
    }
  }

  // ===== STATE =====
  let predHistory = [];
  let last100 = [];
  let consecutiveW = 0, consecutiveL = 0;
  let tgActive = false, botToken = '', channelId = '';
  let lastPredPeriod = '';
  let currentPeriod = '';
  let fetchBusy = false;
  let lastPrediction = null;
  
  // Betting state - FIXED 3-LEVEL SYSTEM
  let isAutoOn = false;
  let currentBetAmount = 0;
  let baseBet = 10;
  let lossStreak = 0;
  let winStreak = 0;
  let maxLevel = 3;
  let targetAmount = null;
  let initialBalance = 0;
  let confirmedPeriods = new Set();
  let pendingBets = {};
  let betInProgress = false;
  let balanceCheckInterval = null;
  let lastTimerValue = '00:00';
  let currentLevel = 1;

  // Bet amounts for 3 levels
  const LEVEL_BETS = {
    1: 10,
    2: 20,
    3: 40
  };

  // Initialize Ultra Engine
  const ultraEngine = new UltraHybridEngine();

  const HISTORY_STORAGE_KEY = 'ultra_prediction_history';

  // ===== LOAD HISTORY =====
  function loadHistory() {
    try {
      const saved = localStorage.getItem(HISTORY_STORAGE_KEY);
      if (saved) {
        predHistory = JSON.parse(saved);
        if (predHistory.length > 0) {
          const lastCompleted = predHistory.find(p => p.status !== 'Pending');
          if (lastCompleted) {
            if (lastCompleted.status === 'Win') {
              consecutiveW = 1;
              consecutiveL = 0;
              lossStreak = 0;
              currentLevel = 1;
            } else if (lastCompleted.status === 'Loss') {
              consecutiveW = 0;
              consecutiveL = 1;
              lossStreak = 1;
              currentLevel = 2;
            }
          }
        }
      }
    } catch (e) {
      console.error('Error loading history:', e);
    }
  }

  // ===== SAVE HISTORY =====
  function saveHistory() {
    try {
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(predHistory));
    } catch (e) {
      console.error('Error saving history:', e);
    }
  }

  // ===== HELPER FUNCTIONS =====
  function getBigSmall(n) { return n >= 5 ? 'Big' : 'Small'; }
  function getShortP(p) { return p && p.slice ? p.slice(-4) : p; }

  function getColor(num) {
    if ([1, 3, 7, 9].includes(num)) return 'linear-gradient(135deg,#10b981,#059669)';
    if ([2, 4, 6, 8].includes(num)) return 'linear-gradient(135deg,#ef4444,#dc2626)';
    return 'linear-gradient(135deg,#8b5cf6,#6d28d9)';
  }

  // ===== TOAST =====
  function toast(msg, ms = 2600) {
    const el = document.getElementById('toast');
    if (!el) return;
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(el._t);
    el._t = setTimeout(() => el.classList.remove('show'), ms);
  }

  // ===== PERIOD & TIMER =====
  function calcPeriod() {
    const PERIOD_MS = 30000;
    const IST_OFFSET_MS = 19800000;

    const now = Date.now();
    const istDate = new Date(now + IST_OFFSET_MS);

    const year = istDate.getUTCFullYear();
    const month = String(istDate.getUTCMonth() + 1).padStart(2, '0');
    const day = String(istDate.getUTCDate()).padStart(2, '0');
    const hours = istDate.getUTCHours();
    const minutes = istDate.getUTCMinutes();
    const seconds = istDate.getUTCSeconds();
    const milliseconds = istDate.getUTCMilliseconds();

    const msSinceMidnight = (hours * 3600 + minutes * 60 + seconds) * 1000 + milliseconds;
    const adjustedMs = msSinceMidnight - IST_OFFSET_MS;
    const safeAdjustedMs = adjustedMs >= 0 ? adjustedMs : adjustedMs + 86400000;

    const periodNo = Math.floor(safeAdjustedMs / PERIOD_MS) + 1;
    const remainMs = PERIOD_MS - (safeAdjustedMs % PERIOD_MS);
    const remainSec = Math.ceil(remainMs / 1000);

    const fullPeriod = `${year}${month}${day}100005${String(10000 + periodNo).slice(-4)}`;

    return { fullPeriod, remainSec, remainMs };
  }

  let lastRefreshSec = null;

  function refreshTimer() {
    try {
      const p = calcPeriod();
      const badge = document.getElementById('timerBadge');
      const ring = document.getElementById('timerRingFg');
      const dispEl = document.getElementById('periodDisplay');

      if (dispEl) dispEl.textContent = p.fullPeriod;

      const ratio = p.remainMs / 30000;
      const circ = 2 * Math.PI * 26;
      if (ring) {
        ring.setAttribute('stroke-dasharray', `${(ratio * circ).toFixed(3)} ${circ.toFixed(3)}`);
        ring.className = 'timer-ring-fg' + (p.remainSec <= 5 ? ' urgent' : '');
      }
      if (badge) {
        badge.textContent = p.remainSec;
        badge.className = 'timer-number' + (p.remainSec <= 5 ? ' urgent' : '');
      }

      if (p.fullPeriod !== currentPeriod) {
        currentPeriod = p.fullPeriod;
        lastRefreshSec = null;
        if (!fetchBusy) fetchData();
      }

      if (p.remainSec === 1 && lastRefreshSec !== 1) {
        lastRefreshSec = 1;
        if (!fetchBusy) setTimeout(() => fetchData(), 200);
      }

    } catch (e) {
      console.error('Error in refreshTimer:', e);
    }
  }

  // ===== TELEGRAM FUNCTIONS =====
  async function tgMsg(text) {
    if (!tgActive || !botToken || !channelId) return;
    
    try {
      const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
      await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          chat_id: channelId, 
          text: text, 
          parse_mode: 'HTML' 
        })
      });
    } catch (error) {
      console.error('Telegram error:', error);
    }
  }
  
  async function tgSticker(id) {
    if (!tgActive || !botToken || !channelId) return;
    
    try {
      const url = `https://api.telegram.org/bot${botToken}/sendSticker`;
      await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          chat_id: channelId, 
          sticker: id 
        })
      });
    } catch (error) {
      console.error('Telegram sticker error:', error);
    }
  }
  
  async function sendWinStickers() {
    await tgSticker(WIN_S.first);
    await tgSticker(WIN_S.medium[0]);
    await tgSticker(WIN_S.last);
  }
  
  async function sendLossSticker() { 
    await tgSticker(LOSS_S[0]); 
  }

  // ===== UI FUNCTIONS =====
  function showNovaToast(title, description, type = 'prediction', amount = null) {
    const toast = document.getElementById('nova-toast');
    if (!toast) return;
    
    let icon = 'fa-chart-line';
    if (type === 'win') icon = 'fa-trophy';
    if (type === 'loss') icon = 'fa-xmark';
    if (type === 'mode') icon = 'fa-bolt';
    if (type === 'success') icon = 'fa-check-circle';
    if (type === 'error') icon = 'fa-circle-exclamation';
    
    toast.innerHTML = `
      <div class="toast-section">
        <i class="fa-solid ${icon}"></i>
        <span class="toast-title">${title}</span>
      </div>
      <span class="toast-separator">|</span>
      <div class="toast-section">
        <span class="toast-description">${description}</span>
      </div>
      ${amount !== null ? `
        <span class="toast-separator">|</span>
        <div class="toast-section">
          <span class="toast-amount">${amount > 0 ? '+' : ''}${formatMoney(amount)}</span>
        </div>
      ` : ''}
    `;
    
    toast.className = '';
    toast.classList.add('show', `toast-${type}`);
    setTimeout(() => { toast.classList.remove('show'); }, 3000);
  }

  function formatMoney(amount) {
    if (amount === null || amount === undefined || isNaN(amount)) return '₹0.00';
    return '₹' + parseFloat(amount).toFixed(2);
  }

  function getCurrentBalance() {
    const selectors = [
      '.Wallet__C-balance-l1', '.wallet-balance', '.balance-amount', 
      '[class*="balance"]', '[class*="wallet"]', '.user-balance', '#balance', '.amount-display'
    ];
    for (let selector of selectors) {
      const el = document.querySelector(selector);
      if (el) {
        const text = el.innerText || el.textContent;
        const cleanText = text.replace(/[^\d.]/g, '');
        const val = parseFloat(cleanText);
        if (!isNaN(val) && val > 0) return val;
      }
    }
    return null;
  }

  function calculateBetAmount() {
    if (lossStreak === 0) {
      currentLevel = 1;
      return LEVEL_BETS[1];
    } else if (lossStreak === 1) {
      currentLevel = 2;
      return LEVEL_BETS[2];
    } else if (lossStreak >= 2) {
      currentLevel = 3;
      return LEVEL_BETS[3];
    }
    return LEVEL_BETS[1];
  }

  function checkBalanceSufficiency() {
    const balance = getCurrentBalance();
    if (!balance) return false;
    
    const totalRequired = LEVEL_BETS[1] + LEVEL_BETS[2] + LEVEL_BETS[3];
    const requiredWithBuffer = totalRequired * 1.2;
    
    const warningEl = document.getElementById('nova-balance-warning');
    const startBtn = document.getElementById('nova-start-btn');
    
    if (balance < requiredWithBuffer) {
      if (warningEl) warningEl.classList.add('show');
      if (startBtn) startBtn.disabled = true;
      return false;
    } else {
      if (warningEl) warningEl.classList.remove('show');
      if (startBtn) startBtn.disabled = false;
      return true;
    }
  }

  function extractTimerFromDivStructure() {
    try {
      const timerContainer = document.querySelector('.TimeLeft__C-time');
      if (!timerContainer) return null;
      const divs = timerContainer.querySelectorAll('div');
      if (divs.length >= 5) {
        return `${divs[0].textContent.trim()}${divs[1].textContent.trim()}:${divs[3].textContent.trim()}${divs[4].textContent.trim()}`;
      }
    } catch (e) {}
    return null;
  }

  async function placeBet(type, amount, period) {
    if (betInProgress) return false;
    
    const currentBal = getCurrentBalance();
    if (!currentBal || currentBal < amount) {
      showNovaToast('ERROR', 'Insufficient balance', 'error');
      toggleAuto(false);
      return false;
    }
    
    betInProgress = true;
    const selector = type === 'big' ? '.Betting__C-foot-b' : '.Betting__C-foot-s';
    const btn = document.querySelector(selector);
    if (!btn) {
      showNovaToast('ERROR', 'Button not found', 'error');
      betInProgress = false;
      return false;
    }
    
    btn.click();
    await sleep(800);

    const input = document.querySelector('.multiplier-section input[type="number"]');
    if (input) {
      input.focus();
      input.value = '';
      input.value = amount;
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new Event('change', { bubbles: true }));
      input.blur();
    }
    await sleep(800);

    let confirmBtn = null;
    const allBtns = Array.from(document.querySelectorAll('button'));
    
    for (const b of allBtns) {
      const text = b.innerText.trim();
      if (text.includes(amount.toString()) || text.includes('Confirm') || text.includes('确认')) {
        confirmBtn = b;
        break;
      }
    }

    if (confirmBtn) {
      confirmBtn.click();
      await sleep(500);
      const rightBtn = document.querySelector('.Betting__C-popup-foot .van-button--default');
      if (rightBtn) rightBtn.click();

      showNovaToast('BET', `${type.toUpperCase()} | L${currentLevel} | ${formatMoney(amount)}`, 'prediction', amount);
      betInProgress = false;
      return true;
    } else {
      showNovaToast('ERROR', 'Confirm button missing', 'error');
      betInProgress = false;
      return false;
    }
  }

  const sleep = ms => new Promise(r => setTimeout(r, ms));

  function toggleAuto(state) {
    isAutoOn = state;
    const startBtn = document.getElementById('nova-start-btn');
    const stopBtn = document.getElementById('nova-stop-btn');
    
    if (state) {
      const balance = getCurrentBalance();
      if (!balance || balance <= 0) {
        showNovaToast('ERROR', 'Cannot read balance', 'error');
        return;
      }
      
      if (!checkBalanceSufficiency()) {
        showNovaToast('ERROR', 'Insufficient balance', 'error');
        return;
      }
      
      initialBalance = balance;
      lossStreak = 0;
      currentLevel = 1;
      currentBetAmount = LEVEL_BETS[1];
      
      const targetInput = document.getElementById('nova-target-input');
      if (targetInput) {
        const targetValue = parseFloat(targetInput.value);
        if (targetValue && !isNaN(targetValue) && targetValue > balance) {
          targetAmount = targetValue;
        } else {
          targetAmount = null;
        }
      }
      
      if (startBtn) startBtn.style.opacity = '1';
      if (stopBtn) stopBtn.style.opacity = '0.5';
      
      updateBetDisplay();
      updateTargetDisplay();
      
      confirmedPeriods.clear();
      
      showNovaToast('STARTED', `3-Level System Active`, 'mode');
      
      if (tgActive) {
        tgMsg(
          `⚛️ <b>🚀 NOVA ENGINE STARTED</b>\n\n` +
          `💰 Balance: ${formatMoney(balance)}\n` +
          `📊 Level 1: ${formatMoney(LEVEL_BETS[1])}\n` +
          `🤖 22 Logics Active`
        );
      }
      
      startBalanceMonitoring();
    } else {
      if (startBtn) startBtn.style.opacity = '0.5';
      if (stopBtn) stopBtn.style.opacity = '1';
      showNovaToast('STOPPED', 'Nova Engine stopped', 'mode');
      
      if (tgActive) {
        tgMsg(`⚛️ <b>🛑 NOVA ENGINE STOPPED</b>`);
      }
      
      if (balanceCheckInterval) clearInterval(balanceCheckInterval);
    }
  }

  function startBalanceMonitoring() {
    if (balanceCheckInterval) clearInterval(balanceCheckInterval);
    balanceCheckInterval = setInterval(() => {
      const balance = getCurrentBalance();
      const balanceEl = document.getElementById('nova-balance-display');
      if (balance !== null && balanceEl) {
        balanceEl.textContent = formatMoney(balance);
        if (isAutoOn) {
          checkBalanceSufficiency();
          if (balance < currentBetAmount) {
            toggleAuto(false);
          }
        }
      }
    }, 1000);
  }

  function updateBetDisplay() {
    const betEl = document.getElementById('nova-bet-display');
    const levelEl = document.getElementById('nova-level-display');
    
    if (betEl) betEl.value = currentBetAmount || LEVEL_BETS[1];
    if (levelEl) {
      levelEl.textContent = `Level ${currentLevel}/3`;
      levelEl.style.color = currentLevel === 3 ? '#ef4444' : (currentLevel === 2 ? '#f59e0b' : '#10b981');
    }
  }

  function updateTargetDisplay() {
    const targetDisplay = document.getElementById('nova-target-display');
    const targetInput = document.getElementById('nova-target-input');
    if (targetAmount && targetDisplay) {
      targetDisplay.textContent = formatMoney(targetAmount);
      if (targetInput) targetInput.value = targetAmount;
    } else if (targetDisplay) {
      targetDisplay.textContent = 'Not set';
    }
  }

  function checkTargetReached() {
    if (!targetAmount) return false;
    const currentBal = getCurrentBalance();
    if (!currentBal) return false;
    if (currentBal >= targetAmount) {
      showNovaToast('SUCCESS', 'Target reached!', 'success');
      
      if (tgActive) {
        tgMsg(`⚛️ <b>🎯 TARGET REACHED!</b>\n\nProfit: ${formatMoney(currentBal - initialBalance)}`);
      }
      
      toggleAuto(false);
      return true;
    }
    return false;
  }

  async function fetchLatestResult() {
    try {
      const res = await fetch('https://draw.ar-lottery01.com/WinGo/WinGo_30S/GetHistoryIssuePage.json?pageNo=1&pageSize=1');
      const data = await res.json();
      if (data.code === 0 && data.data && data.data.list && data.data.list.length > 0) {
        const latest = data.data.list[0];
        const number = parseInt(latest.number);
        return {
          period: latest.issueNumber,
          number: number,
          result: number >= 5 ? 'big' : 'small'
        };
      }
    } catch (e) {}
    return null;
  }

  let lastCheckedPeriod = '';

  async function checkResults() {
    if (checkTargetReached()) return;
    
    const latest = await fetchLatestResult();
    if (!latest) return;
    if (latest.period === lastCheckedPeriod) return;

    ultraEngine.addHistory(latest.period, latest.number);
    lastCheckedPeriod = latest.period;

    if (pendingBets[latest.period]) {
      const bet = pendingBets[latest.period];
      const win = latest.result === bet.prediction;
      
      ultraEngine.recordBetOutcome(latest.period, bet.prediction, latest.result, win);

      if (win) {
        consecutiveW++;
        consecutiveL = 0;
        lossStreak = 0;
        currentLevel = 1;
        currentBetAmount = LEVEL_BETS[1];
        
        updateStats('win', bet.amount);
        addNovaHistory(latest.period, bet.prediction, 'win');
        showNovaToast('WIN', `Reset to Level 1`, 'win', bet.amount);
        
        if (tgActive) {
          await tgMsg(
            `⚛️ <b>✅ WIN!</b>\n\n` +
            `Period: ${latest.period}\n` +
            `Result: ${latest.result.toUpperCase()} (${latest.number})\n` +
            `Win: ${formatMoney(bet.amount)}\n` +
            `Next: Level 1 - ${formatMoney(LEVEL_BETS[1])}`
          );
          if (document.getElementById('toggleWinSticker')?.checked) {
            await sendWinStickers();
          }
        }
      } else {
        consecutiveL++;
        consecutiveW = 0;
        lossStreak++;
        
        if (lossStreak >= 3) {
          lossStreak = 3;
          currentLevel = 3;
          currentBetAmount = LEVEL_BETS[3];
        } else {
          currentLevel = lossStreak + 1;
          currentBetAmount = LEVEL_BETS[currentLevel];
        }
        
        updateStats('loss', bet.amount);
        addNovaHistory(latest.period, bet.prediction, 'loss');
        showNovaToast('LOSS', `Now Level ${currentLevel}/3`, 'loss', -bet.amount);
        
        if (tgActive) {
          await tgMsg(
            `⚛️ <b>❌ LOSS</b>\n\n` +
            `Period: ${latest.period}\n` +
            `Result: ${latest.result.toUpperCase()} (${latest.number})\n` +
            `Loss: ${formatMoney(bet.amount)}\n` +
            `Next: Level ${currentLevel} - ${formatMoney(currentBetAmount)}`
          );
          if (document.getElementById('toggleLossSticker')?.checked) {
            await sendLossSticker();
          }
        }
      }

      delete pendingBets[latest.period];
      updateBetDisplay();
      updateTargetDisplay();
      checkBalanceSufficiency();
    }
  }

  function updateStats(type, amount) {
    const statsTotal = document.getElementById('nova-stat-total');
    const statsWins = document.getElementById('nova-stat-wins');
    const statsLosses = document.getElementById('nova-stat-losses');
    const statsProfit = document.getElementById('nova-stat-profit');
    
    if (statsTotal) statsTotal.textContent = parseInt(statsTotal.textContent || '0') + 1;
    
    if (type === 'win') {
      if (statsWins) statsWins.textContent = parseInt(statsWins.textContent || '0') + 1;
      if (statsProfit) {
        const current = parseFloat(statsProfit.textContent.replace(/[^\d.-]/g, '') || '0');
        statsProfit.textContent = formatMoney(current + amount);
      }
    } else {
      if (statsLosses) statsLosses.textContent = parseInt(statsLosses.textContent || '0') + 1;
      if (statsProfit) {
        const current = parseFloat(statsProfit.textContent.replace(/[^\d.-]/g, '') || '0');
        statsProfit.textContent = formatMoney(current - amount);
      }
    }
  }

  function addNovaHistory(period, prediction, result) {
    const container = document.getElementById('nova-history-container');
    if (!container) return;
    
    if (container.children[0]?.innerText === "Waiting for data..." || 
        container.children[0]?.innerText === "No bets placed") {
      container.innerHTML = '';
    }
    
    const div = document.createElement('div');
    div.className = 'nova-history-item';
    div.innerHTML = `
      <span class="nova-history-period">${period.slice(-8)}</span>
      <span class="nova-history-prediction">${prediction.toUpperCase()}</span>
      <span class="nova-history-result ${result === 'win' ? 'history-win' : 'history-loss'}">${result.toUpperCase()}</span>
    `;
    
    container.prepend(div);
    if(container.children.length > 20) {
      container.removeChild(container.lastChild);
    }
  }

  async function handleNewPeriod(periodId) {
    if (!periodId || periodId === currentPeriod) return;
    
    currentPeriod = periodId;
    
    const periodEl = document.getElementById('nova-period-display');
    if (periodEl) {
      periodEl.innerText = periodId.slice(-8);
    }

    if (confirmedPeriods.has(periodId)) return;
    if (!isAutoOn || betInProgress) return;

    await sleep(2500);
    if (confirmedPeriods.has(periodId)) return;
    if (checkTargetReached()) return;

    const numbers = last100.map(item => item.number);
    const aiDecision = ultraEngine.predict(numbers);
    
    // Update UI
    const emotionEl = document.getElementById('nova-emotion-display');
    const confidenceEl = document.getElementById('nova-confidence-display');
    const gameStateEl = document.getElementById('nova-gamestate-display');
    
    if (emotionEl) {
      emotionEl.textContent = aiDecision.emotion?.toUpperCase() || 'NEUTRAL';
      emotionEl.style.color = aiDecision.emotion === 'aggressive' ? '#ef4444' : 
                             aiDecision.emotion === 'cautious' ? '#f59e0b' : '#10b981';
    }
    
    if (confidenceEl) {
      confidenceEl.innerText = aiDecision.confidence + '%';
    }
    
    if (gameStateEl) {
      gameStateEl.textContent = aiDecision.gameState?.toUpperCase() || 'ANALYZING';
    }
    
    showNovaToast('ANALYSIS', `${aiDecision.reasoning} (${aiDecision.agreement}% agree)`, 'mode');
    
    const success = await placeBet(aiDecision.size.toLowerCase(), currentBetAmount, periodId);

    if (success) {
      confirmedPeriods.add(periodId);
      pendingBets[periodId] = {
        prediction: aiDecision.size.toLowerCase(),
        amount: currentBetAmount,
        confidence: aiDecision.confidence,
        level: currentLevel
      };
      
      if (tgActive) {
        await tgMsg(
          `⚛️ <b>🔮 NOVA PREDICTION</b>\n\n` +
          `Period: <code>${periodId}</code>\n` +
          `Size: <b>${aiDecision.size}</b>\n` +
          `Digit: <b>${aiDecision.digit}</b>\n` +
          `Confidence: <b>${aiDecision.confidence}%</b>\n` +
          `Mode: ${aiDecision.mode}\n` +
          `Game State: ${aiDecision.gameState}\n` +
          `Logic: ${aiDecision.logicCount} active\n` +
          `Agreement: ${aiDecision.agreement}%\n` +
          `Level: ${currentLevel}/3 | ${formatMoney(currentBetAmount)}\n` +
          `Reason: ${aiDecision.reasoning}`
        );
      }
    }
  }

  function updateRealTimeData() {
    const balEl = document.querySelector('.Wallet__C-balance-l1');
    const balanceEl = document.getElementById('nova-balance-display');
    if (balEl && balanceEl) {
      const raw = balEl.innerText.replace(/[^\d.]/g, '');
      const val = parseFloat(raw);
      if (!isNaN(val)) balanceEl.innerText = formatMoney(val);
    }

    const periodEl = document.querySelector('.TimeLeft__C-id');
    if (periodEl && periodEl.innerText && periodEl.innerText.trim()) {
      const periodText = periodEl.innerText.trim();
      if (periodText !== currentPeriod) {
        handleNewPeriod(periodText);
      }
    }
  }

  async function autoLoop() {
    if (!isAutoOn) return;
    updateRealTimeData();
    await checkResults();
  }

  // ===== DATA FETCH =====
  async function fetchData() {
    if (fetchBusy) return;
    fetchBusy = true;
    const icon = document.getElementById('refreshIcon');
    if (icon) icon.classList.add('spinning');

    try {
      let list = [];
      try {
        const r = await fetch(HISTORY_API + '?t=' + Date.now());
        if (r.ok) list = (await r.json())?.data?.list || [];
      } catch (_) { }
      
      if (!list.length) {
        try {
          const r2 = await fetch(BACKUP_API);
          list = (await r2.json())?.data?.list || [];
        } catch (_) { }
      }
      
      if (!list.length) {
        fetchBusy = false;
        if (icon) icon.classList.remove('spinning');
        return;
      }

      last100 = list.slice(0, 100)
        .map(item => ({ period: item.issueNumber || item.period, number: parseInt(item.number || item.num || 0) }))
        .filter(i => !isNaN(i.number));

      const numbers = last100.map(item => item.number);
      
      last100.slice(0, 50).forEach(item => {
        ultraEngine.addHistory(item.period, item.number);
      });
      
      let result = ultraEngine.predict(numbers);
      
      if (result.status !== "SUCCESS") {
        fetchBusy = false;
        if (icon) icon.classList.remove('spinning');
        return;
      }

      lastPrediction = result;

      renderPredictionHero(
        result.size === "BIG" ? 'Big' : 'Small', 
        result.digit, 
        parseFloat(result.confidence), 
        `${result.mode} (${result.logicCount} logics)`
      );
      
      renderServerTab(result);
      renderDistChart(last100.slice(0, 10).map(i => i.number >= 5 ? 'B' : 'S'), last100.slice(0, 10).map(i => i.number));

      const pd = calcPeriod();
      if (pd.fullPeriod !== lastPredPeriod) {
        lastPredPeriod = pd.fullPeriod;
        
        const newPred = {
          period: pd.fullPeriod,
          predictedSize: result.size === "BIG" ? 'Big' : 'Small',
          predictedNumber: result.digit,
          actual: '--', 
          actualNum: '--', 
          status: 'Pending',
          level: currentLevel,
          betAmount: currentBetAmount,
          logic: `${result.mode} (${result.logicCount}L)`,
          conf: result.confidence,
          timestamp: Date.now(),
          emotion: result.emotion,
          gameState: result.gameState,
          reasoning: result.reasoning,
          agreement: result.agreement
        };

        predHistory.unshift(newPred);
        
        if (predHistory.length > 100) {
          predHistory = predHistory.slice(0, 100);
        }
        
        saveHistory();
      }

      let changed = false;
      predHistory.forEach(ph => {
        if (ph.status !== 'Pending') return;
        const match = last100.find(h =>
          h.period === ph.period ||
          getShortP(h.period) === getShortP(ph.period)
        );
        if (!match) return;
        
        ph.actual = getBigSmall(match.number);
        ph.actualNum = match.number;
        ph.status = ph.predictedSize === ph.actual ? 'Win' : 'Loss';
        changed = true;
      });

      if (changed) {
        saveHistory();
      }

      renderAll();

    } catch (e) {
      console.warn('Fetch error:', e);
    } finally {
      fetchBusy = false;
      if (icon) icon.classList.remove('spinning');
    }
  }

  // ===== UI RENDERS =====
  function renderPredictionHero(size, num, conf, logic) {
    const sizeEl = document.getElementById('predSizeText');
    const numEl = document.getElementById('predNumText');
    const confBar = document.getElementById('confBar');
    const confTxt = document.getElementById('confText');
    const logicEl = document.getElementById('predLogicLabel');

    if (!sizeEl) return;

    sizeEl.textContent = size.toUpperCase();
    sizeEl.className = 'pred-size ' + (size === 'Big' ? 'big-text' : 'small-text');
    numEl.textContent = num;
    confBar.style.width = conf + '%';
    confTxt.textContent = `CONFIDENCE: ${conf.toFixed(1)}%`;
    logicEl.textContent = logic || 'NOVA ENGINE';
  }

  function setMiniRing(id, ratio) {
    const el = document.getElementById(id);
    if (el) el.setAttribute('stroke-dasharray', `${(ratio * CIRC_MINI).toFixed(2)} ${CIRC_MINI.toFixed(2)}`);
  }

  function renderStats() {
    const completed = predHistory.filter(p => p.status !== 'Pending');
    const wins = predHistory.filter(p => p.status === 'Win').length;
    const losses = completed.length - wins;
    const total = completed.length;
    const acc = total > 0 ? (wins / total * 100).toFixed(1) : '0.0';

    document.getElementById('cardPass').textContent = wins;
    document.getElementById('cardFail').textContent = losses;
    document.getElementById('cardAccuracy').textContent = acc + '%';
    document.getElementById('cardBets').textContent = total;

    setMiniRing('donutPass', total > 0 ? wins / total : 0);
    setMiniRing('donutFail', total > 0 ? losses / total : 0);
    setMiniRing('donutAcc', total > 0 ? wins / total : 0);
    setMiniRing('donutBets', Math.min(total / 20, 1));

    document.getElementById('mgLevel').textContent = `L${currentLevel}/3`;
    document.getElementById('mgBet').textContent = `₹${currentBetAmount}`;
    
    document.querySelectorAll('.mg-dot').forEach((d, i) => d.classList.toggle('active', i < currentLevel));
  }

  function renderServerTab(result) {
    const alertTxt = document.getElementById('alertText');
    if (alertTxt) {
      alertTxt.textContent = `⚛️ NOVA ENGINE — ${result.logicCount} Logics Active`;
      alertTxt.style.color = '#8b5cf6';
    }

    const ni = document.getElementById('niranjanLogicItems');
    if (ni) {
      ni.innerHTML = `
        <div class="logic-item"><span class="logic-name">System</span><span class="logic-value">NOVA v4.0</span></div>
        <div class="logic-item"><span class="logic-name">Mode</span><span class="logic-value">${result.mode}</span></div>
        <div class="logic-item"><span class="logic-name">Game State</span><span class="logic-value">${result.gameState}</span></div>
        <div class="logic-item"><span class="logic-name">Emotion</span><span class="logic-value">${result.emotion}</span></div>
        <div class="logic-item"><span class="logic-name">Logics</span><span class="logic-value">${result.logicCount}</span></div>
        <div class="logic-item"><span class="logic-name">Agreement</span><span class="logic-value">${result.agreement}%</span></div>
        <div class="logic-item"><span class="logic-name">Reasoning</span><span class="logic-value">${result.reasoning}</span></div>
      `;
    }

    const vi = document.getElementById('v52LogicItems');
    if (vi) {
      vi.innerHTML = `
        <div class="logic-item"><span class="logic-name">Prediction</span><span class="logic-value">${result.size}</span></div>
        <div class="logic-item"><span class="logic-name">Digit</span><span class="logic-value">${result.digit}</span></div>
        <div class="logic-item"><span class="logic-name">Confidence</span><span class="logic-value">${result.confidence}%</span></div>
        <div class="logic-item"><span class="logic-name">Quantum</span><span class="logic-value">${result.quantumDigit}</span></div>
      `;
    }

    const pc = document.getElementById('patternCards');
    if (pc) {
      pc.innerHTML = `
        <div class="pattern-card">✅ 22 LOGICS ACTIVE</div>
        <div class="pattern-card">⚛️ GAME STATE: ${result.gameState}</div>
        <div class="pattern-card">📊 LEVEL ${currentLevel}/3</div>
      `;
    }
  }

  function renderDistChart(last10BS, last10Nums) {
    const chart = document.getElementById('distChart');
    if (!chart) return;
    const bigCnt = last10BS.filter(x => x === 'B').length;
    const smlCnt = 10 - bigCnt;
    
    chart.innerHTML = `
      <div class="dist-bar-row">
        <span class="dist-bar-label">BIG</span>
        <div class="dist-bar-track"><div class="dist-bar-fill" style="width:${bigCnt * 10}%"></div></div>
        <span class="dist-bar-val">${bigCnt}/10</span>
      </div>
      <div class="dist-bar-row">
        <span class="dist-bar-label">SMALL</span>
        <div class="dist-bar-track"><div class="dist-bar-fill" style="width:${smlCnt * 10}%"></div></div>
        <span class="dist-bar-val">${smlCnt}/10</span>
      </div>
      <div style="margin-top:10px;font-size:0.68rem">${last10Nums.join(' ')}</div>
    `;
  }

  function renderAll() {
    renderStats();
    renderRecentBallsWithAnimation();
    renderHistorySummary();
    renderHistoryListWithAnimation();
  }

  function renderRecentBallsWithAnimation() {
    const container = document.getElementById('recentBalls');
    if (!container) return;
    
    const items = last100.slice(0, 10);
    if (!items.length) {
      container.innerHTML = '<div style="padding:10px">Loading...</div>';
      return;
    }
    
    const html = items.map(item => {
      const bg = getColor(item.number);
      const s = getBigSmall(item.number).charAt(0);
      return `<div class="result-ball" style="background:${bg}">${item.number}<span class="rb-label">${s}</span></div>`;
    }).join('');
    
    container.innerHTML = html;
  }

  function renderHistorySummary() {
    const el = document.getElementById('historySummary');
    const completed = predHistory.filter(p => p.status !== 'Pending');
    const wins = completed.filter(p => p.status === 'Win').length;
    const losses = completed.length - wins;
    const acc = completed.length > 0 ? (wins / completed.length * 100).toFixed(1) : '0.0';
    const streak = consecutiveW > 0 ? consecutiveW : -consecutiveL;
    
    el.innerHTML = `
      <div class="hs-chip"><span class="hs-val" style="color:#10b981">${wins}</span><span class="hs-lbl">WINS</span></div>
      <div class="hs-chip"><span class="hs-val" style="color:#ef4444">${losses}</span><span class="hs-lbl">LOSSES</span></div>
      <div class="hs-chip"><span class="hs-val" style="color:#8b5cf6">${acc}%</span><span class="hs-lbl">ACC</span></div>
      <div class="hs-chip"><span class="hs-val" style="color:${streak >= 0 ? '#10b981' : '#ef4444'}">${streak >= 0 ? '+' : ''}${streak}</span><span class="hs-lbl">STRK</span></div>
    `;
  }

  function renderHistoryListWithAnimation() {
    const container = document.getElementById('historyList');
    if (!container) return;
    
    if (!predHistory.length) {
      container.innerHTML = '<div class="no-history">No predictions yet</div>';
      return;
    }
    
    const html = predHistory.slice(0, 40).map((p, idx) => {
      const cls = p.status === 'Win' ? 'win-item' : p.status === 'Loss' ? 'loss-item' : 'pending-item';
      const icon = p.status === 'Win' ? '✅' : p.status === 'Loss' ? '❌' : '⏳';
      const col = p.predictedSize === 'Big' ? '#6c63ff' : '#06b6d4';
      
      return `<div class="history-item ${cls}">
        <div class="hi-left">
          <span class="hi-period">#${p.period.slice(-8)}</span>
          <span class="hi-pred" style="color:${col}">${p.predictedSize} → ${p.predictedNumber}</span>
          <span class="hi-meta">L${p.level}/3 | ₹${p.betAmount} | ${p.logic}</span>
        </div>
        <span class="hi-status">${icon}</span>
      </div>`;
    }).join('');
    
    container.innerHTML = html;
  }

  // ===== NAVIGATION =====
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function () {
      document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
      document.querySelectorAll('.tab-page').forEach(p => p.classList.remove('active'));
      this.classList.add('active');
      const pg = document.getElementById(this.dataset.page);
      if (pg) pg.classList.add('active');
    });
  });

  // ===== CLEAR HISTORY =====
  document.getElementById('clearHistoryBtn').addEventListener('click', () => {
    if (!confirm('Clear history?')) return;
    predHistory = [];
    consecutiveL = 0; consecutiveW = 0; lossStreak = 0;
    currentLevel = 1;
    currentBetAmount = LEVEL_BETS[1];
    lastPredPeriod = '';
    saveHistory();
    renderAll();
    updateBetDisplay();
    toast('History cleared');
  });

  // ===== REFRESH BUTTON =====
  const refreshBtn = document.getElementById('refreshBtn');
  if (refreshBtn) refreshBtn.addEventListener('click', () => { fetchData(); toast('Refreshing...'); });

  // ===== TELEGRAM SESSION =====
  document.getElementById('startSession').addEventListener('click', async () => {
    botToken = document.getElementById('botToken').value.trim();
    channelId = document.getElementById('channelId').value.trim();
    
    if (!botToken || !channelId) { 
      toast('Enter bot token and channel ID'); 
      return; 
    }
    
    try {
      const testUrl = `https://api.telegram.org/bot${botToken}/getMe`;
      const testResponse = await fetch(testUrl);
      const testData = await testResponse.json();
      
      if (!testData.ok) {
        toast('Invalid bot token');
        return;
      }
      
      const testMsgUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
      await fetch(testMsgUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          chat_id: channelId, 
          text: '⚛️ <b>NOVA ENGINE</b>\n\n✅ Connected Successfully!', 
          parse_mode: 'HTML' 
        })
      });
      
      tgActive = true;
      document.getElementById('startSession').disabled = true;
      document.getElementById('stopSession').disabled = false;
      document.getElementById('tgDot').className = 'tg-status-dot active';
      document.getElementById('tgStatusTitle').textContent = '🟢 Bot Active';
      document.getElementById('tgStatusSub').textContent = 'Sending to ' + channelId;
      
      toast('Telegram connected!');
      
    } catch (error) {
      toast('Connection failed');
    }
  });
  
  document.getElementById('stopSession').addEventListener('click', () => {
    if (tgActive) {
      tgMsg('⚛️🛑 <b>SESSION STOPPED</b>');
    }
    tgActive = false;
    document.getElementById('startSession').disabled = false;
    document.getElementById('stopSession').disabled = true;
    document.getElementById('tgDot').className = 'tg-status-dot inactive';
    document.getElementById('tgStatusTitle').textContent = 'Bot Inactive';
    toast('Session stopped');
  });

  // ===== NOVA UI INIT =====
  function initNovaUI() {
    if (!document.getElementById('nova-toast')) {
      const toast = document.createElement('div');
      toast.id = 'nova-toast';
      document.body.appendChild(toast);
    }
  }

  // ===== INIT =====
  function init() {
    initNovaUI();
    loadHistory();
    fetchData();
    
    setTimeout(() => {
      const startBtn = document.getElementById('nova-start-btn');
      const stopBtn = document.getElementById('nova-stop-btn');
      const targetInput = document.getElementById('nova-target-input');
      
      if (startBtn) startBtn.addEventListener('click', () => toggleAuto(true));
      if (stopBtn) stopBtn.addEventListener('click', () => toggleAuto(false));
      
      if (targetInput) {
        targetInput.addEventListener('change', function() {
          const value = parseFloat(this.value);
          const balance = getCurrentBalance();
          if (value && !isNaN(value) && value > (balance || 0)) {
            targetAmount = value;
            updateTargetDisplay();
          } else {
            targetAmount = null;
            updateTargetDisplay();
          }
        });
      }
      
      const openStats = document.getElementById('nova-open-stats');
      const popup = document.getElementById('nova-stats-popup');
      const overlay = document.getElementById('nova-popup-overlay');
      
      if (openStats && popup && overlay) {
        openStats.onclick = () => {
          popup.classList.add('active');
          overlay.classList.add('active');
          
          const statsTotal = document.getElementById('nova-stat-total');
          const statsWins = document.getElementById('nova-stat-wins');
          const statsLosses = document.getElementById('nova-stat-losses');
          const statsProfit = document.getElementById('nova-stat-profit');
          
          if (statsTotal) statsTotal.textContent = predHistory.filter(p => p.status !== 'Pending').length;
          if (statsWins) statsWins.textContent = predHistory.filter(p => p.status === 'Win').length;
          if (statsLosses) statsLosses.textContent = predHistory.filter(p => p.status === 'Loss').length;
          
          const profit = predHistory.reduce((acc, p) => {
            if (p.status === 'Win') return acc + p.betAmount;
            if (p.status === 'Loss') return acc - p.betAmount;
            return acc;
          }, 0);
          if (statsProfit) statsProfit.textContent = formatMoney(profit);
        };
        
        document.getElementById('nova-close-stats').onclick = () => {
          popup.classList.remove('active');
          overlay.classList.remove('active');
        };
        overlay.onclick = () => {
          popup.classList.remove('active');
          overlay.classList.remove('active');
        };
      }
    }, 1000);
    
    function startTimerLoop() {
      const now = Date.now();
      const delay = 250 - (now % 250);
      refreshTimer();
      setTimeout(startTimerLoop, delay);
    }
    startTimerLoop();
    
    setInterval(() => {
      if (!fetchBusy && predHistory.length > 0) {
        fetchData();
      }
    }, 8000);
    
    setInterval(() => {
      if (isAutoOn) autoLoop();
      else updateRealTimeData();
    }, 100);
    
    startBalanceMonitoring();
    
    console.log('NOVA Engine v4.0 - 22 Logics Active');
  }

  init();
})();
