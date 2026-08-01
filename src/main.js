/* ==========================================================================
   PREFECTURAL CAPITAL CONCENTRATION GAME ENGINE
   ========================================================================== */

import { PREFECTURES_DATA } from './data.js';
import { soundManager } from './sound.js';

// Game State
let currentPairCount = 6;
let cards = [];
let flippedCards = [];
let matchedPairsCount = 0;
let movesCount = 0;
let comboCount = 0;
let maxComboCount = 0;

let timerInterval = null;
let timerSeconds = 0;
let isTimerRunning = false;
let isBoardLocked = false;

// DOM Element References
const gameBoard = document.getElementById('game-board');
const timerDisplay = document.getElementById('timer-display');
const movesDisplay = document.getElementById('moves-display');
const pairsDisplay = document.getElementById('pairs-display');
const comboBox = document.getElementById('combo-box');
const comboDisplay = document.getElementById('combo-display');

const diffBtns = document.querySelectorAll('.diff-btn');
const restartBtn = document.getElementById('restart-btn');
const soundBtn = document.getElementById('sound-btn');

// Modals
const matchModal = document.getElementById('match-modal');
const matchNextBtn = document.getElementById('match-next-btn');

const winModal = document.getElementById('win-modal');
const winRestartBtn = document.getElementById('win-restart-btn');
const winGalleryBtn = document.getElementById('win-gallery-btn');

const galleryModal = document.getElementById('gallery-modal');
const galleryBtn = document.getElementById('gallery-btn');
const galleryClose = document.getElementById('gallery-close');
const galleryGrid = document.getElementById('gallery-grid');
const gallerySearch = document.getElementById('gallery-search');

// Initialization
document.addEventListener('DOMContentLoaded', () => {
  initEvents();
  initGallery();
  startNewGame();
});

function initEvents() {
  diffBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      diffBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentPairCount = parseInt(btn.getAttribute('data-count'));
      startNewGame();
    });
  });

  restartBtn.addEventListener('click', () => startNewGame());

  soundBtn.addEventListener('click', () => {
    soundManager.enabled = !soundManager.enabled;
    soundBtn.classList.toggle('active', soundManager.enabled);
    soundBtn.querySelector('.label').textContent = soundManager.enabled ? '効果音' : '消音';
  });

  matchNextBtn.addEventListener('click', () => {
    matchModal.classList.remove('active');
  });

  winRestartBtn.addEventListener('click', () => {
    winModal.classList.remove('active');
    startNewGame();
  });

  winGalleryBtn.addEventListener('click', () => {
    winModal.classList.remove('active');
    openGalleryModal();
  });

  galleryBtn.addEventListener('click', () => openGalleryModal());
  galleryClose.addEventListener('click', () => galleryModal.classList.remove('active'));
}

/* --------------------------------------------------------------------------
   Game Flow & Board Generation
   -------------------------------------------------------------------------- */
function startNewGame() {
  resetTimer();
  matchedPairsCount = 0;
  movesCount = 0;
  comboCount = 0;
  maxComboCount = 0;
  flippedCards = [];
  isBoardLocked = false;

  updateDashboardUI();

  // Pick random subset of prefectures
  const shuffledData = [...PREFECTURES_DATA].sort(() => 0.5 - Math.random());
  const selectedPrefectures = shuffledData.slice(0, currentPairCount);

  // Create pairs (1 prefecture card, 1 capital card)
  cards = [];
  selectedPrefectures.forEach(item => {
    cards.push({
      id: `${item.id}-pref`,
      pairId: item.id,
      type: 'pref',
      name: item.pref,
      reading: item.readingPref,
      symbol: '🗺️',
      data: item
    });
    cards.push({
      id: `${item.id}-cap`,
      pairId: item.id,
      type: 'cap',
      name: item.capital,
      reading: item.readingCap,
      symbol: item.symbol || '📍',
      data: item
    });
  });

  // Fisher-Yates Shuffle
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }

  // Update Board Grid Class
  gameBoard.className = `game-board grid-${currentPairCount}`;
  gameBoard.innerHTML = '';

  // Render Card Elements
  cards.forEach((card, index) => {
    const cardEl = document.createElement('div');
    cardEl.className = 'card-item';
    cardEl.setAttribute('data-index', index);

    cardEl.innerHTML = `
      <div class="card-face card-back">
        <div class="card-back-pattern">❓</div>
      </div>
      <div class="card-face card-front ${card.type === 'pref' ? 'pref-card' : 'cap-card'}">
        <span class="card-badge">${card.type === 'pref' ? '都道府県' : '県庁所在地'}</span>
        <span class="card-reading">${card.reading}</span>
        <h3 class="card-name">${card.name}</h3>
        <span class="card-symbol">${card.symbol}</span>
      </div>
    `;

    cardEl.addEventListener('click', () => handleCardClick(cardEl, index));
    gameBoard.appendChild(cardEl);
  });
}

function handleCardClick(cardEl, index) {
  if (isBoardLocked) return;
  if (cardEl.classList.contains('flipped') || cardEl.classList.contains('matched')) return;

  // Start timer on first move
  if (!isTimerRunning) {
    startTimer();
  }

  soundManager.playFlip();
  cardEl.classList.add('flipped');
  flippedCards.push({ el: cardEl, data: cards[index] });

  if (flippedCards.length === 2) {
    movesCount++;
    updateDashboardUI();
    checkMatch();
  }
}

function checkMatch() {
  isBoardLocked = true;
  const [card1, card2] = flippedCards;

  if (card1.data.pairId === card2.data.pairId) {
    // MATCH FOUND!
    soundManager.playMatch();
    comboCount++;
    if (comboCount > maxComboCount) maxComboCount = comboCount;

    card1.el.classList.add('matched');
    card2.el.classList.add('matched');

    matchedPairsCount++;
    updateDashboardUI();

    // Show Match Celebratory Toast/Modal
    showMatchPopup(card1.data.data);

    flippedCards = [];
    isBoardLocked = false;

    // Check Victory
    if (matchedPairsCount === currentPairCount) {
      setTimeout(() => triggerVictory(), 800);
    }
  } else {
    // MISMATCH
    soundManager.playMismatch();
    comboCount = 0;
    updateDashboardUI();

    setTimeout(() => {
      card1.el.classList.remove('flipped');
      card2.el.classList.remove('flipped');
      flippedCards = [];
      isBoardLocked = false;
    }, 900);
  }
}

/* --------------------------------------------------------------------------
   UI Updates & Timer
   -------------------------------------------------------------------------- */
function updateDashboardUI() {
  movesDisplay.textContent = `${movesCount} 回`;
  pairsDisplay.textContent = `${matchedPairsCount} / ${currentPairCount}`;

  if (comboCount >= 2) {
    comboBox.classList.add('active');
    comboDisplay.textContent = `連鎖 x${comboCount} 🔥`;
  } else {
    comboBox.classList.remove('active');
    comboDisplay.textContent = `連鎖 0`;
  }
}

function startTimer() {
  isTimerRunning = true;
  timerSeconds = 0;
  timerInterval = setInterval(() => {
    timerSeconds++;
    const mins = String(Math.floor(timerSeconds / 60)).padStart(2, '0');
    const secs = String(timerSeconds % 60).padStart(2, '0');
    timerDisplay.textContent = `${mins}:${secs}`;
  }, 1000);
}

function resetTimer() {
  clearInterval(timerInterval);
  isTimerRunning = false;
  timerSeconds = 0;
  timerDisplay.textContent = '00:00';
}

/* --------------------------------------------------------------------------
   Popups & Victory Handling
   -------------------------------------------------------------------------- */
function showMatchPopup(prefData) {
  document.getElementById('match-pref-name').textContent = prefData.pref;
  document.getElementById('match-pref-reading').textContent = prefData.readingPref;
  document.getElementById('match-cap-name').textContent = prefData.capital;
  document.getElementById('match-cap-reading').textContent = prefData.readingCap;
  document.getElementById('match-tip-text').textContent = prefData.tip;

  matchModal.classList.add('active');
}

function triggerVictory() {
  resetTimer();
  soundManager.playVictory();
  launchConfetti();

  const mins = String(Math.floor(timerSeconds / 60)).padStart(2, '0');
  const secs = String(timerSeconds % 60).padStart(2, '0');

  document.getElementById('win-time').textContent = `${mins}:${secs}`;
  document.getElementById('win-moves').textContent = `${movesCount} 回`;
  document.getElementById('win-combo').textContent = `${maxComboCount} 連続`;

  // Calculate Rank
  const rankEl = document.getElementById('win-rank');
  const ratio = movesCount / currentPairCount;

  if (ratio <= 1.5) {
    rankEl.textContent = '🌟 Sランク (神暗記！)';
    rankEl.style.background = 'linear-gradient(135deg, #f59e0b, #d97706)';
  } else if (ratio <= 2.2) {
    rankEl.textContent = '👍 Aランク (合格！)';
    rankEl.style.background = 'linear-gradient(135deg, #10b981, #059669)';
  } else {
    rankEl.textContent = '🔰 Bランク (もう少し！)';
    rankEl.style.background = 'linear-gradient(135deg, #3b82f6, #1d4ed8)';
  }

  winModal.classList.add('active');
}

/* --------------------------------------------------------------------------
   Flashcard Gallery (復習図鑑)
   -------------------------------------------------------------------------- */
function initGallery() {
  renderGallery(PREFECTURES_DATA);

  const chips = document.querySelectorAll('.chip');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      filterGallery();
    });
  });

  gallerySearch.addEventListener('input', () => filterGallery());
}

function filterGallery() {
  const query = gallerySearch.value.trim().toLowerCase();
  const activeChip = document.querySelector('.chip.active');
  const region = activeChip ? activeChip.getAttribute('data-region') : 'all';

  const filtered = PREFECTURES_DATA.filter(item => {
    const matchRegion = region === 'all' || item.region === region;
    const matchQuery = !query || 
      item.pref.includes(query) || 
      item.capital.includes(query) || 
      item.readingPref.includes(query) || 
      item.readingCap.includes(query);
    return matchRegion && matchQuery;
  });

  renderGallery(filtered);
}

function renderGallery(items) {
  galleryGrid.innerHTML = '';

  if (items.length === 0) {
    galleryGrid.innerHTML = '<p style="color: var(--text-dim); grid-column: 1/-1; text-align: center; padding: 2rem;">該当する都道府県が見つかりません</p>';
    return;
  }

  items.forEach(item => {
    const card = document.createElement('div');
    card.className = 'gallery-card';
    card.innerHTML = `
      <div class="gallery-card-header">
        <span style="font-size: 0.7rem; color: var(--accent-gold);">${item.regionLabel}</span>
        <span>${item.symbol || '📍'}</span>
      </div>
      <div class="gallery-pair">
        <span class="pref-txt">${item.pref}</span>
        <span style="color: var(--text-dim); font-size: 0.8rem;">→</span>
        <span class="cap-txt">${item.capital}</span>
      </div>
      <p class="gallery-tip">${item.tip}</p>
    `;
    galleryGrid.appendChild(card);
  });
}

function openGalleryModal() {
  galleryModal.classList.add('active');
}

/* --------------------------------------------------------------------------
   Confetti Explosion Canvas
   -------------------------------------------------------------------------- */
function launchConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const colors = ['#f59e0b', '#38bdf8', '#f43f5e', '#10b981', '#8b5cf6', '#ffffff'];

  for (let i = 0; i < 120; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 14,
      vy: (Math.random() - 0.5) * 14 - 3,
      size: 6 + Math.random() * 8,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: 1,
      rotation: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 10
    });
  }

  let frameCount = 0;
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    frameCount++;

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.2; // Gravity
      p.opacity -= 0.008;
      p.rotation += p.vRot;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = Math.max(p.opacity, 0);
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      ctx.restore();
    });

    if (frameCount < 160) {
      requestAnimationFrame(animate);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  animate();
}
