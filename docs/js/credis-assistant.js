(function () {
  'use strict';

  var WHATSAPP_URL = 'https://wa.me/541122845514?text=%C2%A1Hola!%20Vi%20la%20Web%20sobre%20pr%C3%A9stamos%20y%20me%20gustar%C3%ADa%20obtener%20m%C3%A1s%20informaci%C3%B3n.%20%C2%A1Muchas%20Gracias!';
  var STORAGE_KEY = 'credis-mascot-position-v1';
  var reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function starSVG() {
    return '' +
      '<svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">' +
        '<defs>' +
          '<linearGradient id="credisBody" x1="18%" y1="5%" x2="82%" y2="95%">' +
            '<stop offset="0" stop-color="#5EFC8D"/><stop offset=".42" stop-color="#00C853"/><stop offset="1" stop-color="#009624"/>' +
          '</linearGradient>' +
          '<linearGradient id="credisEdge" x1="0" y1="0" x2="1" y2="1">' +
            '<stop offset="0" stop-color="#1E3A6E"/><stop offset="1" stop-color="#07152D"/>' +
          '</linearGradient>' +
          '<radialGradient id="credisShine" cx="30%" cy="20%" r="55%">' +
            '<stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset="1" stop-color="#fff" stop-opacity="0"/>' +
          '</radialGradient>' +
          '<filter id="credisShadow" x="-30%" y="-30%" width="160%" height="180%">' +
            '<feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#001022" flood-opacity=".45"/>' +
          '</filter>' +
        '</defs>' +
        '<g filter="url(#credisShadow)">' +
          '<path d="M32 3.7c4.2 0 6.1 11.1 9.2 13.3 3.2 2.3 14.5-1.2 16.1 2.7 1.6 3.9-8 10.3-9.2 14.1-1.2 3.8 5.5 13.5 2.2 16-3.3 2.4-12.5-4.9-16.5-4.9S18.9 52.2 15.6 49.8c-3.3-2.4 3.4-12.2 2.2-16-1.2-3.8-10.8-10.2-9.2-14.1 1.6-3.9 12.9-.4 16.1-2.7C27.9 14.8 27.8 3.7 32 3.7Z" fill="url(#credisEdge)"/>' +
          '<path d="M32 6.5c3.4 0 5.3 10.1 8 12.1 2.7 2 13.1-1.1 14.4 2.1 1.3 3.2-7.7 9-8.7 12.2-1.1 3.2 5 12.2 2.2 14.2-2.7 2-11.2-4.5-14.6-4.5s-11.9 6.5-14.6 4.5c-2.8-2 3.3-11 2.2-14.2-1-3.2-10-9-8.7-12.2 1.3-3.2 11.7-.1 14.4-2.1 2.7-2 4.6-12.1 8-12.1Z" fill="url(#credisBody)"/>' +
          '<path d="M19.5 18.5c5.5-7.4 13.4-9.1 21.4-5.6" fill="none" stroke="url(#credisShine)" stroke-width="4.2" stroke-linecap="round" opacity=".42"/>' +
        '</g>' +
        '<path class="credis-brow credis-brow-left" d="M20.2 25.2q4.2-3.8 8.3-.5" fill="none" stroke="#0F2040" stroke-width="2.4" stroke-linecap="round"/>' +
        '<path class="credis-brow credis-brow-right" d="M36.5 24.7q4.4-3.2 8.2.8" fill="none" stroke="#0F2040" stroke-width="2.4" stroke-linecap="round"/>' +
        '<g class="credis-eye credis-eye-left"><ellipse cx="25" cy="31.2" rx="5.3" ry="7.2" fill="#fff"/><ellipse cx="25" cy="31.2" rx="5.3" ry="7.2" fill="none" stroke="#d8e4ef" stroke-width=".8"/></g>' +
        '<g class="credis-eye credis-eye-right"><ellipse cx="39.5" cy="31.2" rx="5.3" ry="7.2" fill="#fff"/><ellipse cx="39.5" cy="31.2" rx="5.3" ry="7.2" fill="none" stroke="#d8e4ef" stroke-width=".8"/></g>' +
        '<g class="credis-pupils"><ellipse cx="25.4" cy="32" rx="2.9" ry="4.3" fill="#07152d"/><ellipse cx="39.9" cy="32" rx="2.9" ry="4.3" fill="#07152d"/><circle cx="24.4" cy="30.6" r="1" fill="#fff"/><circle cx="38.9" cy="30.6" r="1" fill="#fff"/></g>' +
        '<path d="M20.3 39.4Q31.4 49.4 43.8 38.2" fill="none" stroke="#0F2040" stroke-width="3.2" stroke-linecap="round"/>' +
        '<path d="M42.4 35.7l4.4.4-2 4" fill="none" stroke="#0F2040" stroke-width="2.7" stroke-linecap="round" stroke-linejoin="round"/>' +
      '</svg>';
  }

  function whatsappIcon() {
    return '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M19.11 17.21c-.47-.24-2.79-1.38-3.22-1.54-.43-.16-.74-.24-1.06.24-.31.47-1.22 1.54-1.49 1.86-.27.31-.55.35-1.02.12-.47-.24-1.98-.73-3.77-2.33-1.39-1.24-2.33-2.78-2.6-3.25-.27-.47-.03-.73.21-.96.21-.21.47-.55.71-.82.24-.27.31-.47.47-.78.16-.31.08-.59-.04-.82-.12-.24-1.06-2.55-1.45-3.49-.38-.92-.77-.8-1.06-.81h-.9c-.31 0-.82.12-1.25.59-.43.47-1.65 1.61-1.65 3.92 0 2.31 1.69 4.55 1.92 4.86.24.31 3.32 5.07 8.04 7.11 1.12.48 2 .77 2.68.98 1.13.36 2.15.31 2.96.19.9-.13 2.79-1.14 3.18-2.24.39-1.1.39-2.04.27-2.24-.12-.2-.43-.31-.9-.55Z"/><path d="M16.02 2.67c-7.35 0-13.33 5.97-13.33 13.31 0 2.35.62 4.65 1.78 6.67L2.58 29.57l7.08-1.86a13.32 13.32 0 0 0 6.36 1.62h.01c7.35 0 13.33-5.97 13.33-13.31 0-3.56-1.39-6.9-3.91-9.42a13.24 13.24 0 0 0-9.43-3.93Zm0 24.41h-.01c-1.97 0-3.9-.53-5.58-1.53l-.4-.24-4.2 1.1 1.12-4.09-.26-.42a11.05 11.05 0 0 1-1.7-5.92c0-6.09 4.95-11.04 11.05-11.04 2.95 0 5.73 1.15 7.82 3.24a10.96 10.96 0 0 1 3.23 7.82c-.01 6.09-4.96 11.04-11.07 11.04Z"/></svg>';
  }

  function init() {
    if (document.getElementById('credis-assistant')) return;

    var root = document.createElement('div');
    root.id = 'credis-assistant';
    root.className = 'side-right';
    root.innerHTML =
      '<button class="credis-mascot" type="button" aria-label="Abrir a Credis, asistente de Credisnet" aria-haspopup="dialog" aria-expanded="false">' +
        '<span class="credis-shell">' + starSVG() + '</span>' +
        '<span class="credis-speech" aria-hidden="true"></span>' +
      '</button>' +
      '<div class="credis-backdrop" aria-hidden="true"></div>' +
      '<section class="credis-panel" role="dialog" aria-modal="true" aria-labelledby="credis-title" aria-hidden="true">' +
        '<div class="credis-panel-head">' +
          '<div class="credis-mini">' + starSVG() + '</div>' +
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
    var pupils = mascot.querySelector('.credis-pupils');
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
      lastPointerAt: 0, panelOpen: false, bubbleTimer: null,
      blinkTimer: null, glanceTimer: null, wanderTimer: null
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
    }
    function positionFromState(animate) {
      var vp = viewport();
      var size = mascot.offsetWidth || 54;
      var minY = topSafe();
      var maxY = Math.max(minY, vp.h - size - bottomSafe());
      var y = clamp(state.topRatio * vp.h, minY, maxY);
      var peek = Math.round(size * 0.18);
      var x = state.side === 'left' ? -peek : vp.w - size + peek;
      if (!animate) mascot.style.transition = 'none';
      mascot.style.left = x + 'px';
      mascot.style.top = y + 'px';
      setSideClass();
      if (!animate) requestAnimationFrame(function () { mascot.style.transition = ''; });
    }
    function snapToEdge(x, y, animate) {
      var vp = viewport();
      var size = mascot.offsetWidth || 54;
      state.side = (x + size / 2) < vp.w / 2 ? 'left' : 'right';
      var minY = topSafe();
      var maxY = Math.max(minY, vp.h - size - bottomSafe());
      var clampedY = clamp(y, minY, maxY);
      state.topRatio = clamp(clampedY / vp.h, 0.1, 0.9);
      savePosition();
      positionFromState(animate !== false);
      mascot.classList.add('is-happy');
      setTimeout(function () { mascot.classList.remove('is-happy'); }, 600);
    }

    function setLook(dx, dy) {
      dx = clamp(dx, -1.8, 1.8);
      dy = clamp(dy, -1.25, 1.25);
      pupils.setAttribute('transform', 'translate(' + dx.toFixed(2) + ' ' + dy.toFixed(2) + ')');
    }
    function lookFront() { setLook(0, 0); }

    function blinkLoop() {
      if (reducedMotion) return;
      clearTimeout(state.blinkTimer);
      state.blinkTimer = setTimeout(function () {
        if (!state.dragging) {
          mascot.classList.add('is-blinking');
          setTimeout(function () { mascot.classList.remove('is-blinking'); }, 125);
        }
        blinkLoop();
      }, 2800 + Math.random() * 4200);
    }
    function glanceLoop() {
      if (reducedMotion) return;
      clearTimeout(state.glanceTimer);
      state.glanceTimer = setTimeout(function () {
        if (!state.dragging && !state.panelOpen && Date.now() - state.lastPointerAt > 2800) {
          mascot.classList.add('is-curious');
          var dirs = [[-1.55, -0.2], [1.55, -0.15], [0, -0.9], [0, 0]];
          var d = dirs[Math.floor(Math.random() * dirs.length)];
          setLook(d[0], d[1]);
          setTimeout(function () { mascot.classList.remove('is-curious'); lookFront(); }, 1100 + Math.random() * 700);
        }
        glanceLoop();
      }, 3600 + Math.random() * 5200);
    }
    function wanderLoop() {
      if (reducedMotion) return;
      clearTimeout(state.wanderTimer);
      state.wanderTimer = setTimeout(function () {
        if (!state.dragging && !state.panelOpen) {
          var vp = viewport();
          var nowY = parseFloat(mascot.style.top) || state.topRatio * vp.h;
          snapToEdge(state.side === 'left' ? 0 : vp.w, nowY + (-42 + Math.random() * 84), true);
        }
        wanderLoop();
      }, 18000 + Math.random() * 14000);
    }

    var messages = ['¡Hola! 👋', '¿Necesitás una mano?', 'Estoy por acá 😄', '¿Querés consultar tu disponible? 👀'];
    function hideSpeech() { speech.classList.remove('is-visible'); }
    function speechLoop(first) {
      if (reducedMotion) return;
      clearTimeout(state.bubbleTimer);
      state.bubbleTimer = setTimeout(function () {
        if (!state.dragging && !state.panelOpen && !document.hidden) {
          speech.textContent = messages[Math.floor(Math.random() * messages.length)];
          speech.classList.add('is-visible');
          setTimeout(hideSpeech, 3600);
        }
        speechLoop(false);
      }, first ? 7500 : 15000 + Math.random() * 12000);
    }

    function openPanel() {
      hideSpeech();
      state.panelOpen = true;
      root.classList.add('is-open');
      panel.setAttribute('aria-hidden', 'false');
      mascot.setAttribute('aria-expanded', 'true');
      mascot.classList.add('is-happy');
      lookFront();
      setTimeout(function () { mascot.classList.remove('is-happy'); }, 600);
      setTimeout(function () { closeBtn.focus({ preventScroll: true }); }, 80);
    }
    function closePanel(returnFocus) {
      state.panelOpen = false;
      root.classList.remove('is-open');
      panel.setAttribute('aria-hidden', 'true');
      mascot.setAttribute('aria-expanded', 'false');
      if (returnFocus !== false) mascot.focus({ preventScroll: true });
    }

    optionButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
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
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && state.panelOpen) closePanel(true); });

    mascot.addEventListener('pointerdown', function (e) {
      if (state.panelOpen) return;
      hideSpeech();
      state.dragging = true;
      state.moved = false;
      state.pointerId = e.pointerId;
      state.startX = e.clientX;
      state.startY = e.clientY;
      state.startLeft = parseFloat(mascot.style.left) || mascot.getBoundingClientRect().left;
      state.startTop = parseFloat(mascot.style.top) || mascot.getBoundingClientRect().top;
      mascot.classList.add('is-dragging');
      try { mascot.setPointerCapture(e.pointerId); } catch (err) {}
    });
    mascot.addEventListener('pointermove', function (e) {
      if (!state.dragging || e.pointerId !== state.pointerId) return;
      var dx = e.clientX - state.startX;
      var dy = e.clientY - state.startY;
      if (Math.abs(dx) + Math.abs(dy) > 7) state.moved = true;
      if (!state.moved) return;
      var vp = viewport();
      var size = mascot.offsetWidth || 54;
      mascot.style.left = clamp(state.startLeft + dx, 0, vp.w - size) + 'px';
      mascot.style.top = clamp(state.startTop + dy, topSafe(), vp.h - size - bottomSafe()) + 'px';
      setLook(clamp(dx / 35, -1.6, 1.6), clamp(dy / 55, -1, 1));
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
      lookFront();
    }
    mascot.addEventListener('pointerup', endDrag);
    mascot.addEventListener('pointercancel', endDrag);

    document.addEventListener('pointermove', function (e) {
      if (state.dragging || state.panelOpen || e.pointerType === 'touch') return;
      var rect = mascot.getBoundingClientRect();
      var cx = rect.left + rect.width / 2;
      var cy = rect.top + rect.height / 2;
      var vx = e.clientX - cx;
      var vy = e.clientY - cy;
      var dist = Math.sqrt(vx * vx + vy * vy);
      if (dist < 520) {
        state.lastPointerAt = Date.now();
        setLook(clamp(vx / 145, -1.8, 1.8), clamp(vy / 190, -1.2, 1.2));
      }
    }, { passive: true });

    document.addEventListener('visibilitychange', function () { if (!document.hidden && !state.panelOpen) lookFront(); });
    window.addEventListener('resize', function () { positionFromState(false); });

    loadPosition();
    positionFromState(false);
    blinkLoop();
    glanceLoop();
    wanderLoop();
    speechLoop(true);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
