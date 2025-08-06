// Troca das seções por clique nos botões
const buttons = document.querySelectorAll('.nav-btn');
const sections = document.querySelectorAll('.content-section');

buttons.forEach((btn) => {
  btn.addEventListener('click', () => {
    if(btn.classList.contains('active')) {
      return;
    }

    // Remove active de todos
    buttons.forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
      b.setAttribute('tabindex', '-1');
    });
    sections.forEach(s => s.classList.remove('active'));

    // Ativa o clicado
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');
    btn.setAttribute('tabindex', '0');
    btn.focus();

    const target = btn.getAttribute('data-target');
    const section = document.getElementById(target);
    if(section) {
      section.classList.add('active');
      section.focus();
    }
  });
});

// Controle de fonte - aumenta, diminui e reseta
const btnAumentar = document.getElementById('btnAumentarFonte');
const btnDiminuir = document.getElementById('btnDiminuirFonte');
const btnResetar = document.getElementById('btnResetarFonte');

const root = document.documentElement;
const minFontSize = 12;
const maxFontSize = 24;
const step = 2;

function getFontSize() {
  const fontSizeValue = getComputedStyle(root).getPropertyValue('--font-size-base').trim();
  return parseInt(fontSizeValue.replace('px', ''), 10);
}

function setFontSize(size) {
  root.style.setProperty('--font-size-base', size + 'px');
  root.style.fontSize = size + 'px'; // para garantir escalabilidade
}

btnAumentar.addEventListener('click', () => {
  let currentSize = getFontSize();
  if (currentSize < maxFontSize) {
    const newSize = currentSize + step;
    setFontSize(newSize);
  }
});

btnDiminuir.addEventListener('click', () => {
  let currentSize = getFontSize();
  if (currentSize > minFontSize) {
    const newSize = currentSize - step;
    setFontSize(newSize);
  }
});

btnResetar.addEventListener('click', () => {
  setFontSize(16);
});

// Modo escuro toggle
const darkModeBtn = document.getElementById('toggleDarkMode');
darkModeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');

  // Atualiza aria-pressed e ícone
  const pressed = darkModeBtn.getAttribute('aria-pressed') === 'true';
  darkModeBtn.setAttribute('aria-pressed', (!pressed).toString());
  darkModeBtn.textContent = !pressed ? '☀️' : '🌙';
});
