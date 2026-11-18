// ========== DOM 元素引用 ==========
const startBtn = document.getElementById('start-btn');
const scoreEl = document.getElementById('score');
const timerEl = document.getElementById('timer');
const guideText = document.getElementById('guide-text');
const gameArea = document.getElementById('game-area');

// ========== 游戏常量与状态 ==========
const GAME_DURATION = 120; // 游戏总时长（秒）
const BALL_COUNT = 3;      // 同屏小球数量
const BALL_MIN_SIZE = 40;  // 小球最小直径（px）
const BALL_MAX_SIZE = 70;  // 小球最大直径（px）
const WARN_SECONDS = 10;   // 剩余多少秒开始红色闪烁

let gameState = 'idle';               // 游戏状态：idle 未开始 / playing 进行中 / over 已结束
let remainingSeconds = GAME_DURATION; // 剩余秒数
let timerId = null;                   // 倒计时定时器 id
let score = 0;                        // 当前分数（允许为负）

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

// 更新分数并同步到顶部信息栏（点球 +2 / 点空白 -1）
function updateScore(delta) {
  score += delta;
  scoreEl.textContent = score;
}

// 在点击位置生成飘字提示：加分绿色 +2，扣分红字 -1，向上飘动并渐隐
function showFloatText(text, clientX, clientY, type) {
  const tip = document.createElement('span');
  tip.className = `float-text ${type}`;
  tip.textContent = text;

  // 用视口坐标减去游戏区偏移，换算成相对游戏区的定位坐标
  const areaRect = gameArea.getBoundingClientRect();
  tip.style.left = `${clientX - areaRect.left}px`;
  tip.style.top = `${clientY - areaRect.top}px`;

  gameArea.appendChild(tip);
  // 动画结束后从 DOM 移除，避免节点堆积
  tip.addEventListener('animationend', () => tip.remove());
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

  // 点中球：阻断冒泡（避免触发游戏区空白扣分），得分 +2，球消失并在新位置补充
  ball.addEventListener('click', (e) => {
    e.stopPropagation();
    if (gameState !== 'playing') return;

    updateScore(2);
    showFloatText('+2', e.clientX, e.clientY, 'plus');
    ball.remove();
    spawnBall();
  });

  gameArea.appendChild(ball);
}

// 清除游戏区内全部小球（开局重置与游戏结束时使用）
function clearBalls() {
  gameArea.querySelectorAll('.ball').forEach((ball) => ball.remove());
}

// ========== 游戏主流程 ==========
// 开始一局游戏：重置分数与倒计时、清空旧球、生成初始球并启动计时
function startGame() {
  gameState = 'playing';
  score = 0;
  scoreEl.textContent = '0';

  startBtn.disabled = true;             // 禁用按钮，防止重复开局
  guideText.classList.add('hidden');    // 隐藏引导文字
  timerEl.classList.remove('warning');  // 清除上一局的闪烁状态

  clearBalls();                         // 清理可能残留的小球
  remainingSeconds = GAME_DURATION;     // 重置剩余时间
  timerEl.textContent = formatTime(remainingSeconds);

  // 生成初始小球
  for (let i = 0; i < BALL_COUNT; i++) {
    spawnBall();
  }

  // 每秒触发一次倒计时（重开前先清掉旧定时器，避免叠加加速）
  clearInterval(timerId);
  timerId = setInterval(tick, 1000);
}

// 点击开始按钮：开局或重开
startBtn.addEventListener('click', startGame);

// 点击游戏区空白：扣 1 分并飘红字（点球时被 stopPropagation 拦下，不会触发这里）
gameArea.addEventListener('click', (e) => {
  if (gameState !== 'playing') return;

  updateScore(-1);
  showFloatText('-1', e.clientX, e.clientY, 'minus');
});

// 倒计时每次触发：减 1 秒并刷新显示；最后 10 秒切入红色闪烁
function tick() {
  remainingSeconds--;
  timerEl.textContent = formatTime(remainingSeconds);

  if (remainingSeconds <= WARN_SECONDS) {
    timerEl.classList.add('warning');
  }

  if (remainingSeconds <= 0) {
    endGame();
  }
}

// 游戏结束：停止计时、清空小球、显示最终得分并恢复开始按钮
function endGame() {
  clearInterval(timerId);
  gameState = 'over';

  clearBalls();
  timerEl.classList.remove('warning');

  guideText.textContent = `时间到！最终得分 ${score}`;
  guideText.classList.remove('hidden');

  startBtn.disabled = false;            // 恢复按钮，允许再开一局
}
