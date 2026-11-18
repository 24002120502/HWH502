// ========== DOM 元素引用 ==========
const startBtn = document.getElementById('start-btn');
const timerEl = document.getElementById('timer');
const guideText = document.getElementById('guide-text');
const gameArea = document.getElementById('game-area');

// ========== 游戏常量与状态 ==========
const GAME_DURATION = 120; // 游戏总时长（秒）
const BALL_COUNT = 3;      // 同屏小球数量
const BALL_MIN_SIZE = 40;  // 小球最小直径（px）
const BALL_MAX_SIZE = 70;  // 小球最大直径（px）

let gameState = 'idle';               // 游戏状态：idle 未开始 / playing 进行中 / over 已结束
let remainingSeconds = GAME_DURATION; // 剩余秒数
let timerId = null;                   // 倒计时定时器 id

// ========== 工具函数 ==========
// 生成 [min, max] 范围内的随机整数
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 将秒数格式化为 mm:ss（如 65 → "01:05"）
function formatTime(totalSeconds) {
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  return `${minutes}:${seconds}`;
}

// ========== 小球生成与销毁 ==========
// 在游戏区随机位置生成一个小球（直径随机、位置保证完整显示）
function spawnBall() {
  const ball = document.createElement('div');
  ball.className = 'ball';

  const size = randomInt(BALL_MIN_SIZE, BALL_MAX_SIZE);
  const areaRect = gameArea.getBoundingClientRect();
  // 减去球直径，保证球不会超出右边界和底边界；窗口过小时兜底为 0
  const maxX = Math.max(0, areaRect.width - size);
  const maxY = Math.max(0, areaRect.height - size);

  ball.style.width = `${size}px`;
  ball.style.height = `${size}px`;
  ball.style.left = `${randomInt(0, maxX)}px`;
  ball.style.top = `${randomInt(0, maxY)}px`;

  // 点中球：阻断冒泡（避免触发游戏区空白扣分），球消失并在新随机位置补充
  ball.addEventListener('click', (e) => {
    e.stopPropagation();
    ball.remove();
    spawnBall();
  });

  gameArea.appendChild(ball);
}

// 清除游戏区内全部小球
function clearBalls() {
  gameArea.querySelectorAll('.ball').forEach((ball) => ball.remove());
}

// ========== 游戏主流程 ==========
// 点击开始：启动一局游戏
startBtn.addEventListener('click', () => {
  gameState = 'playing';
  startBtn.disabled = true;             // 禁用按钮，防止重复开局
  guideText.classList.add('hidden');    // 隐藏引导文字
  remainingSeconds = GAME_DURATION;     // 重置剩余时间
  timerEl.textContent = formatTime(remainingSeconds);

  // 生成初始小球
  for (let i = 0; i < BALL_COUNT; i++) {
    spawnBall();
  }

  // 每秒触发一次倒计时
  timerId = setInterval(tick, 1000);
});

// 倒计时每次触发：减 1 秒并刷新显示
function tick() {
  remainingSeconds--;
  timerEl.textContent = formatTime(remainingSeconds);

  if (remainingSeconds <= 0) {
    endGame();
  }
}

// 游戏结束：停止计时、清空小球、显示结束提示
function endGame() {
  clearInterval(timerId);
  gameState = 'over';
  clearBalls();
  guideText.textContent = '时间到！';
  guideText.classList.remove('hidden');
}
