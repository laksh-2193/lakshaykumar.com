export type ModelKey = 'claude' | 'gpt' | 'deepseek' | 'google';

export const modelNames: Record<ModelKey, string> = {
  claude: 'Claude',
  gpt: 'GPT',
  deepseek: 'DeepSeek',
  google: 'Gemini / Gemma',
};

// Final results of the trading experiment, straight from the write-up.
export const arena = [
  { agent: 'ClaudeTrader', model: 'Claude Sonnet 4.6', final: 10526, ret: 5.26, note: 'Sold into overbought signals early, locked in gains, and re-entered on dips.' },
  { agent: 'DeepSeekPro', model: 'DeepSeek v3.5', final: 10498, ret: 4.98, note: 'Rode momentum hard and finished $28 short.' },
  { agent: 'GemmaBot', model: 'Gemma 4', final: 10000, ret: 0, note: 'Never placed a single trade. All cash for all 20 rounds.' },
  { agent: 'GPTQuant', model: 'GPT-5.4', final: 9977, ret: -0.23, note: 'Over-analysed every RSI reading and second-guessed itself into a loss.' },
];
