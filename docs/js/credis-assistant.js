
(function () {
  'use strict';

  var WHATSAPP_URL = 'https://wa.me/541122845514?text=%C2%A1Hola!%20Vi%20la%20Web%20sobre%20pr%C3%A9stamos%20y%20me%20gustar%C3%ADa%20obtener%20m%C3%A1s%20informaci%C3%B3n.%20%C2%A1Muchas%20Gracias!';
  var STORAGE_KEY = 'credis-mascot-position-v2';
  var reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var scriptEl = document.currentScript || (function(){ var s=document.getElementsByTagName('script'); return s[s.length-1]; })();
  var FULL_IMG = new URL('../img/credis/credis-full.png', scriptEl.src).href;
  var PEEK_IMG = new URL('../img/credis/credis-peek.png', scriptEl.src).href;

  function whatsappIcon() {
    return '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M19.11 17.21c-.47-.24-2.79-1.38-3.22-1.54-.43-.16-.74-.24-1.06.24-.31.47-1.22 1.54-1.49 1.86-.27.31-.55.35-1.02.12-.47-.24-1.98-.73-3.77-2.33-1.39-1.24-2.33-2.78-2.6-3.25-.27-.47-.03-.73.21-.96.21-.21.47-.55.71-.82.24-.27.31-.47.47-.78.16-.31.08-.59-.04-.82-.12-.24-1.06-2.55-1.45-3.49-.38-.92-.77-.8-1.06-.81h-.9c-.31 0-.82.12-1.25.59-.43.47-1.65 1.61-1.65 3.92 0 2.31 1.69 4.55 1.92 4.86.24.31 3.32 5.07 8.04 7.11 1.12.48 2 .77 2.68.98 1.13.36 2.15.31 2.96.19.9-.13 2.79-1.14 3.18-2.24.39-1.1.39-2.04.27-2.24-.12-.2-.43-.31-.9-.55Z"/><path d="M16.02 2.67c-7.35 0-13.33 5.97-13.33 13.31 0 2.35.62 4.65 1.78 6.67L2.58 29.57l7.08-1.86a13.32 13.32 0 0 0 6.36 1.62h.01c7.35 0 13.33-5.97 13.33-13.31 0-3.56-1.39-6.9-3.91-9.42a13.24 13.24 0 0 0-9.43-3.93Zm0 24.41h-.01c-1.97 0-3.9-.53-5.58-1.53l-.4-.24-4.2 1.1 1.12-4.09-.26-.42a11.05 11.05 0 0 1-1.7-5.92c0-6.09 4.95-11.04 11.05-11.04 2.95 0 5.73 1.15 7.82 3.24a10.96 10.96 0 0 1 3.23 7.82c-.01 6.09-4.96 11.04-11.07 11.04Z"/></svg>';
  }

  function init() {
    if (document.getElementById('credis-assistant')) return;

    var root = document.createElement('div');
    root.id = 'credis-assistant';
    root.className = 'side-right';
    root.innerHTML =
      '<button class="credis-mascot side-right" type="button" aria-label="Abrir a Credis, asistente de Credisnet" aria-haspopup="dialog" aria-expanded="false">' +
        '<span class="credis-figure">' +
          '<img class="credis-fullimg" src="' + FULL_IMG + '" alt="" aria-hidden="true">' +
          '<img class="credis-peekimg" src="' + PEEK_IMG + '" alt="" aria-hidden="true">' +
        '</span>' +
        '<span class="credis-speech" aria-hidden="true"></span>' +
      '</button>' +
      '<div class="credis-backdrop" aria-hidden="true"></div>' +
      '<section class="credis-panel" role="dialog" aria-modal="true" aria-labelledby="credis-title" aria-hidden="true">' +
        '<div class="credis-panel-head">' +
          '<div class="credis-mini"><img src="' + FULL_IMG + '" alt="" aria-hidden="true"></div>' +
          '<div class="credis-title-wrap"><div class="credis-kicker">Asistente Credisnet</div><h2 class="credis-title" id="credis-title">Hola, soy Credis 👋</h2></div>' +
          '<button class="credis-close" type="button" aria-label="Cerrar Credis">×</button>' +
        '</div>' +
        '<p class="credis-intro"><strong>Estoy por acá para ayudarte.</strong><br>Elegí una opción y te orientamos rápido.</p>' +
        '<div class="credis-options">' +
          '<button class="credis-option" type="button" data-key="monto"><span>💰</span>¿Cuánto puedo solicitar?</button>' +
          '<button class="credis-option" type="button" data-key="funciona"><span>⚡</span>¿Cómo funciona?</button>' +
          '<button class="credis-option" type="button" data-key="solicitar"><span>🚀</span>Quiero solicitar mi préstamo</button>' +
        '</div>' +
        '<div class="credis-answer" aria-live="polite">' +
          '<h3 class="credis-answer-title"></h3><p class="credis-answer-text"></p>' +
          '<a class="credis-wa credis-answer-wa" href="' + WHATSAPP_URL + '" target="_blank" rel="noopener noreferrer">' + whatsappIcon() + 'Continuar por WhatsApp</a>' +
        '</div>' +
        '<a class="credis-wa credis-direct" href="' + WHATSAPP_URL + '" target="_blank" rel="noopener noreferrer">' + whatsappIcon() + 'Hablar con un asesor</a>' +
        '<p class="credis-note">La atención continúa por WhatsApp con un asesor de Credisnet.</p>' +
      '</section>';
    document.body.appendChild(root);

    var mascot = root.querySelector('.credis-mascot');
    var speech = root.querySelector('.credis-speech');
    var panel = root.querySelector('.credis-panel');
    var backdrop = root.querySelector('.credis-backdrop');
    var closeBtn = root.querySelector('.credis-close');
    var answerBox = root.querySelector('.credis-answer');
    var answerTitle = root.querySelector('.credis-answer-title');
    var answerText = root.querySelector('.credis-answer-text');
    var optionButtons = root.querySelectorAll('.credis-option');
    var waButtons = root.querySelectorAll('.credis-wa');

    var answers = {
      monto: {
        title: 'Tu disponible depende de tu línea',
        text: 'El monto se define por la línea que te corresponde y por el margen disponible en tus haberes. Por WhatsApp te confirmamos cuánto tenés disponible.'
      },
      funciona: {
        title: 'Es por descuento de haberes',
        text: 'Las cuotas se descuentan directamente de tus haberes. Si tenés margen disponible, un asesor puede ayudarte a avanzar con la solicitud.'
      },
      solicitar: {
        title: '¡Perfecto!',
        text: 'Escribinos por WhatsApp y un asesor de Credisnet te ayuda a consultar tu disponible y continuar con la solicitud.'
      }
    };

    var state = {
      side: 'right', topRatio: 0.58, dragging: false, moved: false,
      pointerId: null, startX: 0, startY: 0, startLeft: 0, startTop: 0,
      panelOpen: false, bubbleTimer: null, peekTimer: null, wakeTimer: null
    };

    function viewport() { return { w: window.innerWidth, h: window.innerHeight }; }
    function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }
    function bottomSafe() { return document.getElementById('wa-float') ? 92 : 22; }
    function topSafe() { return window.innerWidth <= 640 ? 76 : 90; }

    function savePosition() {
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ side: state.side, topRatio: state.topRatio })); } catch (e) {}
    }
    function loadPosition() {
      try {
        var saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
        if (saved && (saved.side === 'left' || saved.side === 'right') && typeof saved.topRatio === 'number') {
          state.side = saved.side;
          state.topRatio = clamp(saved.topRatio, 0.15, 0.84);
        }
      } catch (e) {}
    }
    function setSideClass() {
      root.classList.toggle('side-left', state.side === 'left');
      root.classList.toggle('side-right', state.side === 'right');
      mascot.classList.toggle('side-left', state.side === 'left');
      mascot.classList.toggle('side-right', state.side === 'right');
    }
    function positionFromState(animate) {
      var vp = viewport();
      var size = mascot.offsetHeight || 56;
      var minY = topSafe();
      var maxY = Math.max(minY, vp.h - size - bottomSafe());
      var y = clamp(state.topRatio * vp.h, minY, maxY);
      var x = state.side === 'left' ? 4 : vp.w - (mascot.offsetWidth || 56) - 4;
      if (!animate) mascot.style.transition = 'none';
      mascot.style.left = x + 'px';
      mascot.style.top = y + 'px';
      setSideClass();
      if (!animate) requestAnimationFrame(function () { mascot.style.transition = ''; });
    }
    function snapToEdge(x, y, animate) {
      var vp = viewport();
      var size = mascot.offsetHeight || 56;
      state.side = (x + (mascot.offsetWidth || 56) / 2) < vp.w / 2 ? 'left' : 'right';
      var minY = topSafe();
      var maxY = Math.max(minY, vp.h - size - bottomSafe());
      var clampedY = clamp(y, minY, maxY);
      state.topRatio = clamp(clampedY / vp.h, 0.1, 0.9);
      savePosition();
      positionFromState(animate !== false);
      mascot.classList.add('is-happy');
      setTimeout(function () { mascot.classList.remove('is-happy'); }, 600);
      wakeUp();
    }

    function hideSpeech() { speech.classList.remove('is-visible'); }
    var messages = ['¡Hola! 👋', '¿Necesitás una mano?', 'Estoy por acá 😄', '¿Querés consultar tu disponible? 👀'];
    function speechLoop(first) {
      if (reducedMotion) return;
      clearTimeout(state.bubbleTimer);
      state.bubbleTimer = setTimeout(function () {
        if (!state.dragging && !state.panelOpen && !document.hidden && !mascot.classList.contains('is-peeking')) {
          speech.textContent = messages[Math.floor(Math.random() * messages.length)];
          speech.classList.add('is-visible');
          setTimeout(hideSpeech, 3600);
        }
        speechLoop(false);
      }, first ? 8000 : 16000 + Math.random() * 12000);
    }

    function schedulePeek() {
      clearTimeout(state.peekTimer);
      if (state.dragging || state.panelOpen || document.hidden) return;
      state.peekTimer = setTimeout(function () {
        mascot.classList.add('is-peeking');
        hideSpeech();
      }, reducedMotion ? 9000 : 5200);
    }
    function wakeUp() {
      clearTimeout(state.peekTimer);
      if (mascot.classList.contains('is-peeking')) {
        mascot.classList.remove('is-peeking');
        mascot.classList.add('is-waking');
        clearTimeout(state.wakeTimer);
        state.wakeTimer = setTimeout(function () { mascot.classList.remove('is-waking'); }, 450);
      }
      schedulePeek();
    }

    function openPanel() {
      hideSpeech();
      mascot.classList.remove('is-peeking');
      state.panelOpen = true;
      root.classList.add('is-open');
      panel.setAttribute('aria-hidden', 'false');
      mascot.setAttribute('aria-expanded', 'true');
      mascot.classList.add('is-happy');
      setTimeout(function () { mascot.classList.remove('is-happy'); }, 600);
      setTimeout(function () { closeBtn.focus({ preventScroll: true }); }, 80);
    }
    function closePanel(returnFocus) {
      state.panelOpen = false;
      root.classList.remove('is-open');
      panel.setAttribute('aria-hidden', 'true');
      mascot.setAttribute('aria-expanded', 'false');
      if (returnFocus !== false) mascot.focus({ preventScroll: true });
      schedulePeek();
    }

    optionButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        wakeUp();
        var answer = answers[this.getAttribute('data-key')];
        if (!answer) return;
        answerTitle.textContent = answer.title;
        answerText.textContent = answer.text;
        answerBox.classList.add('is-visible');
      });
    });
    waButtons.forEach(function (link) {
      link.addEventListener('click', function () {
        setTimeout(function () { closePanel(false); }, 80);
      });
    });
    closeBtn.addEventListener('click', function () { closePanel(true); });
    backdrop.addEventListener('click', function () { closePanel(true); });
    document.addEventListener('keydown', function (e) {
      if (state.panelOpen && e.key === 'Escape') closePanel(true);
      else if (!state.panelOpen) wakeUp();
    });

    mascot.addEventListener('pointerdown', function (e) {
      if (state.panelOpen) return;
      hideSpeech();
      wakeUp();
      state.dragging = true;
      state.moved = false;
      state.pointerId = e.pointerId;
      state.startX = e.clientX;
      state.startY = e.clientY;
      state.startLeft = parseFloat(mascot.style.left) || mascot.getBoundingClientRect().left;
      state.startTop = parseFloat(mascot.style.top) || mascot.getBoundingClientRect().top;
      mascot.classList.add('is-dragging');
      mascot.classList.remove('is-peeking');
      try { mascot.setPointerCapture(e.pointerId); } catch (err) {}
    });
    mascot.addEventListener('pointermove', function (e) {
      if (!state.dragging || e.pointerId !== state.pointerId) return;
      var dx = e.clientX - state.startX;
      var dy = e.clientY - state.startY;
      if (Math.abs(dx) + Math.abs(dy) > 7) state.moved = true;
      if (!state.moved) return;
      var vp = viewport();
      var width = mascot.offsetWidth || 56;
      var height = mascot.offsetHeight || 56;
      mascot.style.left = clamp(state.startLeft + dx, 0, vp.w - width) + 'px';
      mascot.style.top = clamp(state.startTop + dy, topSafe(), vp.h - height - bottomSafe()) + 'px';
    });
    function endDrag(e) {
      if (!state.dragging || (e.pointerId != null && e.pointerId !== state.pointerId)) return;
      state.dragging = false;
      mascot.classList.remove('is-dragging');
      try { mascot.releasePointerCapture(state.pointerId); } catch (err) {}
      var rect = mascot.getBoundingClientRect();
      if (state.moved) snapToEdge(rect.left, rect.top, true);
      else openPanel();
      state.pointerId = null;
    }
    mascot.addEventListener('pointerup', endDrag);
    mascot.addEventListener('pointercancel', endDrag);

    function wakeOnActivity(e) {
      if (state.dragging || state.panelOpen || document.hidden) return;
      if (e && e.pointerType === 'touch' && e.type === 'pointermove') return;
      wakeUp();
    }
    document.addEventListener('pointermove', wakeOnActivity, { passive: true });
    document.addEventListener('scroll', wakeOnActivity, { passive: true });
    document.addEventListener('touchstart', wakeOnActivity, { passive: true });
    document.addEventListener('click', wakeOnActivity, { passive: true });
    document.addEventListener('visibilitychange', function () {
      if (!document.hidden && !state.panelOpen) wakeUp();
    });
    window.addEventListener('resize', function () { positionFromState(false); });

    loadPosition();
    positionFromState(false);
    speechLoop(true);
    schedulePeek();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
