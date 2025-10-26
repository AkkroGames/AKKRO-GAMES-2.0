// ===== ADMIN ABUSE SYSTEM =====
let abuseTimer = null;
let eventTimer = null;
let abuseTimeLeft = 600; // 10 minutes
let nextEventIn = 120; // 2 minutes
let currentEvent = null;
let isAbuseActive = false;

const abuseEvents = [
  {
    id: 'disco',
    name: '💃 ДИСКО-РЕЖИМ! 🕺',
    description: 'Сайт превратился в дискотеку! Цвета меняются как сумасшедшие!',
    execute: startDiscoMode,
    duration: 30000,
    end: endDiscoMode
  },
  {
    id: 'diamonds5',
    name: '💎 АЛМАЗНЫЙ ДОЖДЬ!',
    description: 'Вы получаете +5 алмазов! Бонус за выживание!',
    execute: giveDiamonds5,
    duration: 5000
  },
  {
    id: 'glitch',
    name: '🔄 ГЛИЧ-АТАКА!',
    description: 'Интерфейс глючит! Ничего не понимаю!',
    execute: startGlitchMode,
    duration: 25000,
    end: endGlitchMode
  },
  {
    id: 'diamonds3', 
    name: '✨ БОНУСНЫЕ АЛМАЗЫ!',
    description: 'Еще +3 алмаза в вашу коллекцию!',
    execute: giveDiamonds3,
    duration: 5000
  },
  {
    id: 'shake',
    name: '🌪️ ЗЕМЛЕТРЯСЕНИЕ!',
    description: 'Сайт трясется! Держитесь крепче!',
    execute: startShakeMode,
    duration: 20000,
    end: endShakeMode
  },
  {
    id: 'everything',
    name: '💥 ВСЁ СРАЗУ! АПОКАЛИПСИС!',
    description: 'ВСЕ ИВЕНТЫ ОДНОВРЕМЕННО! ВЫЖИВИТЕ ЛИ ВЫ?!',
    execute: startEverythingEvent,
    duration: 40000,
    end: endEverythingEvent
  }
];

// ===== DIAMONDS SYSTEM =====
function getDiamonds() {
  return Number(localStorage.getItem('akkro_diamonds') || 0);
}

function setDiamonds(val) {
  localStorage.setItem('akkro_diamonds', String(val));
  updateDiamondDisplay();
  // Сохраняем в localStorage при каждом изменении
  localStorage.setItem('akkro_last_update', new Date().toISOString());
}

function updateDiamondDisplay() {
  const diamonds = getDiamonds();
  document.getElementById('diamond-counter').textContent = `💎 ${diamonds}`;
}

function addDiamonds(amount) {
  const current = getDiamonds();
  const newAmount = current + amount;
  setDiamonds(newAmount);
  return newAmount;
}

// ===== GAMES SYSTEM =====
const games = [
  { 
    title: "Space Runner", 
    path: "#", 
    version: "v1.2.5",
    description: "Run across space platforms and collect stars in this exciting arcade",
    icon: "🚀",
    available: true
  },
  { 
    title: "Cube Adventure", 
    path: "#", 
    version: "v2.0.1",
    description: "Solve puzzles and explore the mysterious cubic world",
    icon: "🎮",
    available: true
  },
  { 
    title: "Puzzle Master", 
    path: "#", 
    version: "v1.8.3",
    description: "Test your puzzle-solving skills in a space setting",
    icon: "🧩",
    available: true
  }
];

function renderGames() {
  const gamesList = document.getElementById('games-list');
  gamesList.innerHTML = games.map(game => `
    <div class="game-card">
      <div class="game-icon">${game.icon}</div>
      <div class="game-title">${game.title}</div>
      <div class="game-description">${game.description}</div>
      <div class="game-meta">
        <div class="game-version">${game.version}</div>
      </div>
      <button class="play-btn" onclick="playGame('${game.title}')">Play Now</button>
    </div>
  `).join('');
}

function playGame(gameName) {
  showNotification(`🚀 Запуск игры: ${gameName}`, 'info');
}

// ===== EVENT FUNCTIONS =====
function startDiscoMode() {
  document.body.classList.add('disco-mode');
  showNotification('💃 ДИСКО-РЕЖИМ АКТИВИРОВАН! 🕺', 'disco');
}

function endDiscoMode() {
  document.body.classList.remove('disco-mode');
}

function startGlitchMode() {
  document.body.classList.add('glitch-mode');
  showNotification('🔄 ГЛИЧ-АТАКА НАЧАЛАСЬ!', 'glitch');
}

function endGlitchMode() {
  document.body.classList.remove('glitch-mode');
}

function startShakeMode() {
  document.body.classList.add('shake-mode');
  showNotification('🌪️ САЙТ ТРЯСЕТСЯ! ДЕРЖИТЕСЬ!', 'shake');
}

function endShakeMode() {
  document.body.classList.remove('shake-mode');
}

function giveDiamonds5() {
  const newBalance = addDiamonds(5);
  showNotification(`🎉 +5 АЛМАЗОВ! Теперь у вас: ${newBalance} 💎`, 'diamonds');
}

function giveDiamonds3() {
  const newBalance = addDiamonds(3);
  showNotification(`✨ +3 АЛМАЗА! Теперь у вас: ${newBalance} 💎`, 'diamonds');
}

function startEverythingEvent() {
  document.body.classList.add('disco-mode', 'glitch-mode', 'shake-mode');
  const newBalance = addDiamonds(8); // 5 + 3
  showNotification(`💥 АПОКАЛИПСИС! +8 АЛМАЗОВ! Баланс: ${newBalance} 💎`, 'apocalypse');
}

function endEverythingEvent() {
  document.body.classList.remove('disco-mode', 'glitch-mode', 'shake-mode');
}

// ===== NOTIFICATION SYSTEM =====
function showEventNotification(message) {
  const notification = document.getElementById('event-notification');
  notification.textContent = message;
  notification.style.display = 'block';
  
  setTimeout(() => {
    notification.style.display = 'none';
  }, 4000);
}

function showNotification(message, type = 'info') {
  const notification = document.getElementById('global-notification');
  notification.textContent = message;
  notification.style.display = 'block';
  
  // Different colors for different event types
  if (type === 'disco') {
    notification.style.background = 'linear-gradient(45deg, #ff00ff, #00ffff)';
  } else if (type === 'glitch') {
    notification.style.background = 'linear-gradient(45deg, #00ff00, #0000ff)';
  } else if (type === 'shake') {
    notification.style.background = 'linear-gradient(45deg, #ff9900, #ff0000)';
  } else if (type === 'diamonds') {
    notification.style.background = 'linear-gradient(45deg, #22f2ff, #228b22)';
  } else if (type === 'apocalypse') {
    notification.style.background = 'linear-gradient(45deg, #ff0000, #000000)';
  } else {
    notification.style.background = 'linear-gradient(45deg, #8bb6f9, #b6bcfa)';
  }
  
  setTimeout(() => {
    notification.style.display = 'none';
  }, 3000);
}

// ===== ABUSE SYSTEM =====
function startAdminAbuse() {
  if (isAbuseActive) return;
  
  isAbuseActive = true;
  
  // Show the abuse timer
  const abuseTimerElement = document.getElementById('abuse-timer');
  abuseTimerElement.style.display = 'block';
  
  // Show big notification
  showEventNotification('🚨 АДМИН-АБЬЮЗ АКТИВИРОВАН! 🚨\n10 минут до апокалипсиса!');
  
  // Start main timer
  abuseTimer = setInterval(() => {
    abuseTimeLeft--;
    updateTimerDisplay();
    
    // Update next event counter
    nextEventIn--;
    if (nextEventIn <= 0) {
      triggerRandomEvent();
      nextEventIn = 120; // Reset to 2 minutes
    }
    
    // Update next event display
    document.getElementById('next-event').textContent = 
      `Следующий ивент через: ${Math.floor(nextEventIn/60)}:${(nextEventIn%60).toString().padStart(2, '0')}`;
    
    // End abuse when time is up
    if (abuseTimeLeft <= 0) {
      endAdminAbuse();
    }
  }, 1000);
  
  // Trigger first event immediately
  setTimeout(() => {
    triggerRandomEvent();
  }, 5000);
}

function updateTimerDisplay() {
  const minutes = Math.floor(abuseTimeLeft / 60);
  const seconds = abuseTimeLeft % 60;
  document.getElementById('timer-time').textContent = 
    `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function triggerRandomEvent() {
  const availableEvents = abuseEvents.filter(event => event.id !== currentEvent?.id);
  const randomEvent = availableEvents[Math.floor(Math.random() * availableEvents.length)];
  
  currentEvent = randomEvent;
  
  // Show event notification
  showEventNotification(randomEvent.description);
  
  // Execute the event
  randomEvent.execute();
  
  // End event after duration
  setTimeout(() => {
    if (randomEvent.end) {
      randomEvent.end();
    }
    currentEvent = null;
    showNotification(`Ивент "${randomEvent.name}" завершен!`);
  }, randomEvent.duration);
}

function endAdminAbuse() {
  clearInterval(abuseTimer);
  if (eventTimer) clearInterval(eventTimer);
  isAbuseActive = false;
  
  // Reset all effects
  document.body.classList.remove('disco-mode', 'glitch-mode', 'shake-mode');
  
  // Show final message
  showEventNotification('⏰ ВРЕМЯ ВЫШЛО! \nВЫ БУДЕТЕ ВЫКИНУТЫ ЧЕРЕЗ 5 СЕКУНД!');
  
  // Hide timer
  setTimeout(() => {
    document.getElementById('abuse-timer').style.display = 'none';
  }, 2000);
  
  // Kick player after 5 seconds
  setTimeout(() => {
    kickPlayer();
  }, 5000);
}

function kickPlayer() {
  // Сохраняем финальный баланс перед киком
  const finalBalance = getDiamonds();
  localStorage.setItem('akkro_final_balance', finalBalance);
  
  document.body.innerHTML = `
    <div style="
      background: linear-gradient(135deg, #1c1c2d 70%, #4c4c65 100%);
      color: #fff;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      text-align: center;
      padding: 2rem;
      font-family: 'Segoe UI', Arial, sans-serif;
    ">
      <div style="font-size: 5em; margin-bottom: 0.5em;">🚪</div>
      <div style="font-size: 4em; font-weight: bold; color: #ff4747; margin-bottom: 0.2em; text-shadow: 0 0 18px #fff7;">
        ВРЕМЯ ВЫШЛО!
      </div>
      <div style="font-size: 1.5em; color: #22f2ff; margin-bottom: 1em; text-shadow: 0 0 10px #22f2ff;">
        Ваш финальный баланс: ${finalBalance} 💎
      </div>
      <div style="font-size: 1.22em; color: #fff; margin-bottom: 1.2em; max-width: 600px; line-height: 1.6;">
        Вы были выкинуты с сайта по истечении таймера админ-абьюза.<br>
        Ваши алмазы сохранены! Страница перезагрузится через 5 секунд...
      </div>
      <button onclick="window.location.reload()" style="
        background: linear-gradient(45deg, #8bb6f9, #b6bcfa);
        color: white;
        padding: 1rem 2rem;
        border: none;
        border-radius: 2em;
        font-size: 1.1rem;
        font-weight: 700;
        cursor: pointer;
      ">Перезагрузить сейчас</button>
    </div>
  `;
  
  setTimeout(() => {
    window.location.reload();
  }, 5000);
}

// ===== INITIALIZATION =====
function initializeSite() {
  renderGames();
  updateDiamondDisplay();
  
  // Показываем текущий баланс при загрузке
  const currentBalance = getDiamonds();
  showNotification(`Добро пожаловать! Ваш баланс: ${currentBalance} 💎`, 'info');
  
  // Start admin abuse after 3 seconds
  setTimeout(() => {
    startAdminAbuse();
  }, 3000);
}

// Initialize when page loads
window.addEventListener('load', () => {
  const loader = document.getElementById('loader-bg');
  const loadingText = document.getElementById('loading-text');
  
  const steps = [
    "Загрузка лунного приключения...",
    "Инициализация игр...",
    "Настройка интерфейса...",
    "Загрузка баланса алмазов...",
    "Почти готово...",
    "АКТИВАЦИЯ АДМИН-АБЬЮЗА! 🚨"
  ];
  
  let currentStep = 0;
  const interval = setInterval(() => {
    if (currentStep < steps.length) {
      loadingText.textContent = steps[currentStep];
      currentStep++;
    } else {
      clearInterval(interval);
      setTimeout(() => {
        loader.classList.add('loaded');
        initializeSite();
      }, 1000);
    }
  }, 600);
});

// Achievement button
document.getElementById('achieve-btn').addEventListener('click', () => {
  const currentBalance = getDiamonds();
  showNotification(`🏆 Достижения\nТекущий баланс: ${currentBalance} 💎`, 'info');
});

// Проверяем сохраненный баланс при загрузке
window.addEventListener('DOMContentLoaded', () => {
  const savedBalance = localStorage.getItem('akkro_diamonds');
  const lastUpdate = localStorage.getItem('akkro_last_update');
  
  if (savedBalance) {
    console.log(`Загружен баланс: ${savedBalance} алмазов`);
    if (lastUpdate) {
      console.log(`Последнее обновление: ${new Date(lastUpdate).toLocaleString()}`);
    }
  }
});
