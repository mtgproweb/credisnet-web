(function(){
  'use strict';

  if (window.__credisAssistantLoaded) return;
  window.__credisAssistantLoaded = true;

  var WHATSAPP_URL = 'https://wa.me/541122845514?text=%C2%A1Hola!%20Vi%20la%20Web%20sobre%20pr%C3%A9stamos%20y%20me%20gustar%C3%ADa%20obtener%20m%C3%A1s%20informaci%C3%B3n.%20%C2%A1Muchas%20Gracias!';
  var STORAGE_KEY = 'credisMascotPositionV1';
  var reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function trackEvent(name, params){
    try {
      if (typeof window.gtag === 'function') {
        window.gtag('event', name, params || {});
      }
    } catch (_) {}
  }

  function clamp(n, min, max){
    return Math.min(Math.max(n, min), max);
  }

  function randomBetween(min, max){
    return min + Math.random() * (max - min);
  }

  function mascotSvg(prefix){
    return '' +
      '<svg class="credis-svg" viewBox="0 0 100 100" role="img" aria-hidden="true" focusable="false">' +
        '<defs>' +
          '<linearGradient id="' + prefix + '-body" x1="20%" y1="10%" x2="78%" y2="92%">' +
            '<stop offset="0%" stop-color="#5EFC8D"/>' +
            '<stop offset="34%" stop-color="#17D764"/>' +
            '<stop offset="70%" stop-color="#00C853"/>' +
            '<stop offset="100%" stop-color="#009624"/>' +
          '</linearGradient>' +
          '<radialGradient id="' + prefix + '-shine" cx="36%" cy="18%" r="55%">' +
            '<stop offset="0%" stop-color="#ffffff" stop-opacity=".52"/>' +
            '<stop offset="34%" stop-color="#ffffff" stop-opacity=".12"/>' +
            '<stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>' +
          '</radialGradient>' +
          '<filter id="' + prefix + '-shadow" x="-25%" y="-25%" width="150%" height="160%">' +
            '<feDropShadow dx="0" dy="5" stdDeviation="3.2" flood-color="#001126" flood-opacity=".42"/>' +
          '</filter>' +
        '</defs>' +
        '<g filter="url(#' + prefix + '-shadow)">' +
          '<path d="M50 7 C57 7 60 27 65 31 C70 35 90 30 94 36 C98 43 79 54 77 60 C75 66 86 83 82 88 C77 94 60 79 53 78 C46 78 28 94 23 88 C18 83 29 66 27 60 C25 54 6 43 10 36 C14 30 34 35 39 31 C44 27 43 7 50 7 Z" fill="url(#' + prefix + '-body)" stroke="#10244B" stroke-width="6.4" stroke-linejoin="round"/>' +
          '<path d="M50 10 C56 10 59 28 64 33 C68 36 85 33 90 37" fill="none" stroke="url(#' + prefix + '-shine)" stroke-width="3.2" stroke-linecap="round" opacity=".7"/>' +
        '</g>' +
        '<g class="credis-brow credis-brow-left"><path d="M31.5 37.5 Q38 32.8 44 36" fill="none" stroke="#10244B" stroke-width="4.1" stroke-linecap="round"/></g>' +
        '<g class="credis-brow credis-brow-right"><path d="M57 36 Q63 32.5 69.5 37.2" fill="none" stroke="#10244B" stroke-width="4.1" stroke-linecap="round"/></g>' +
        '<g class="credis-eye credis-eye-left">' +
          '<ellipse cx="39.7" cy="47.7" rx="8.4" ry="11.4" fill="#fff" stroke="#D8E1EE" stroke-width="1.1"/>' +
          '<g class="credis-pupil"><ellipse cx="41.1" cy="50.3" rx="4.8" ry="6.9" fill="#08162D"/><ellipse cx="42.7" cy="47.4" rx="1.65" ry="2.15" fill="#fff"/></g>' +
        '</g>' +
        '<g class="credis-eye credis-eye-right">' +
          '<ellipse cx="60.3" cy="47.7" rx="8.4" ry="11.4" fill="#fff" stroke="#D8E1EE" stroke-width="1.1"/>' +
          '<g class="credis-pupil"><ellipse cx="61.8" cy="50.3" rx="4.8" ry="6.9" fill="#08162D"/><ellipse cx="63.3" cy="47.4" rx="1.65" ry="2.15" fill="#fff"/></g>' +
        '</g>' +
        '<g class="credis-smile">' +
          '<path d="M34 60.5 Q49.5 72.3 65.5 59.2" fill="none" stroke="#10244B" stroke-width="4.8" stroke-linecap="round"/>' +
          '<path d="M60.1 57.1 L66 59.1 L63.2 64.4" fill="none" stroke="#10244B" stroke-width="4.4" stroke-linecap="round" stroke-linejoin="round"/>' +
        '</g>' +
        '<g class="credis-sparkle credis-sparkle-a" transform="translate(8 22)"><path d="M0 -4.4 L1.4 -1.4 L4.4 0 L1.4 1.4 L0 4.4 L-1.4 1.4 L-4.4 0 L-1.4 -1.4 Z" fill="#5EFC8D"/></g>' +
        '<g class="credis-sparkle credis-sparkle-b" transform="translate(91 22)"><path d="M0 -3.4 L1.1 -1.1 L3.4 0 L1.1 1.1 L0 3.4 L-1.1 1.1 L-3.4 0 L-1.1 -1.1 Z" fill="#ffffff"/></g>' +
      '</svg>';
  }

  function buildAssistant(){
    if (document.getElementById('credis-assistant-root')) return;

    var root = document.createElement('div');
    root.id = 'credis-assistant-root';
    root.innerHTML = '' +
      '<button class="credis-mascot" type="button" aria-label="Abrir Credis. Podés arrastrarlo por la pantalla." aria-haspopup="dialog" aria-expanded="false" data-edge="right">' +
        '<span class="credis-hit-ring" aria-hidden="true"></span>' +
        '<span class="credis-character-wrap">' + mascotSvg('credis-main') + '</span>' +
      '</button>' +
      '<div class="credis-bubble" aria-hidden="true" data-edge="right"></div>' +
      '<div class="credis-backdrop" aria-hidden="true"></div>' +
      '<section class="credis-panel" role="dialog" aria-modal="true" aria-labelledby="credis-panel-title" aria-hidden="true">' +
        '<div class="credis-panel-header">' +
          '<div class="credis-mini-avatar" aria-hidden="true">' + mascotSvg('credis-mini') + '</div>' +
          '<div class="credis-panel-heading">' +
            '<div class="credis-panel-title" id="credis-panel-title">Hola, soy Credis 👋</div>' +
            '<div class="credis-panel-subtitle">Estoy por acá para ayudarte.</div>' +
          '</div>' +
          '<button class="credis-close" type="button" aria-label="Cerrar Credis">×</button>' +
        '</div>' +
        '<div class="credis-panel-body">' +
          '<p class="credis-intro">Elegí una opción y te cuento rápido.</p>' +
          '<div class="credis-questions">' +
            '<div class="credis-question-group">' +
              '<button class="credis-question" type="button" aria-expanded="false" data-question="disponible">' +
                '<span class="credis-question-icon">💰</span>' +
                '<span class="credis-question-text">¿Cuánto tengo disponible?</span>' +
                '<span class="credis-question-chevron">›</span>' +
              '</button>' +
              '<div class="credis-answer" data-answer="disponible">' +
                '<p>Tu disponible depende del margen que tengas para descuento de haberes. Te lo confirmamos por WhatsApp.</p>' +
                '<a class="credis-wa-inline" href="' + WHATSAPP_URL + '" target="_blank" rel="noopener noreferrer"><span>💬</span> Consultar mi disponible</a>' +
              '</div>' +
            '</div>' +
            '<div class="credis-question-group">' +
              '<button class="credis-question" type="button" aria-expanded="false" data-question="funciona">' +
                '<span class="credis-question-icon">⚡</span>' +
                '<span class="credis-question-text">¿Cómo funciona?</span>' +
                '<span class="credis-question-chevron">›</span>' +
              '</button>' +
              '<div class="credis-answer" data-answer="funciona">' +
                '<p>Es un préstamo con cuotas que se descuentan directamente de tus haberes, según tu línea disponible.</p>' +
                '<a class="credis-wa-inline" href="' + WHATSAPP_URL + '" target="_blank" rel="noopener noreferrer"><span>💬</span> Quiero saber más</a>' +
              '</div>' +
            '</div>' +
            '<div class="credis-question-group">' +
              '<button class="credis-question" type="button" aria-expanded="false" data-question="solicitar">' +
                '<span class="credis-question-icon">🚀</span>' +
                '<span class="credis-question-text">Quiero solicitar mi préstamo</span>' +
                '<span class="credis-question-chevron">›</span>' +
              '</button>' +
              '<div class="credis-answer" data-answer="solicitar">' +
                '<p>¡Genial! Un asesor de Credisnet te ayuda a verificar tu disponible y avanzar con la solicitud.</p>' +
                '<a class="credis-wa-inline" href="' + WHATSAPP_URL + '" target="_blank" rel="noopener noreferrer"><span>💬</span> Solicitar por WhatsApp</a>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="credis-panel-footer">' +
          '<a class="credis-wa-main" href="' + WHATSAPP_URL + '" target="_blank" rel="noopener noreferrer"><span class="credis-wa-icon">💬</span> Hablar con un asesor por WhatsApp</a>' +
          '<div class="credis-fine-print">Atención personalizada · Credisnet</div>' +
        '</div>' +
      '</section>';

    document.body.appendChild(root);
    document.body.classList.add('credis-assistant-ready');

    var mascot = root.querySelector('.credis-mascot');
    var bubble = root.querySelector('.credis-bubble');
    var backdrop = root.querySelector('.credis-backdrop');
    var panel = root.querySelector('.credis-panel');
    var closeButton = root.querySelector('.credis-close');
    var questionButtons = root.querySelectorAll('.credis-question');
    var whatsappLinks = root.querySelectorAll('.credis-wa-inline, .credis-wa-main');

    var state = {
      x: 0,
      y: 0,
      edge: 'right',
      dragging: false,
      moved: false,
      panelOpen: false,
      pointerId: null,
      startX: 0,
      startY: 0,
      originX: 0,
      originY: 0,
      lastX: 0,
      lastY: 0,
      idleTimer: null,
      bubbleTimer: null,
      bubbleHideTimer: null,
      tapTimer: null,
      previousBodyOverflow: ''
    };

    function getSize(){
      var r = mascot.getBoundingClientRect();
      return r.width || (window.innerWidth <= 700 ? 52 : 58);
    }

    function setPosition(x, y, animate){
      state.x = x;
      state.y = y;
      mascot.style.setProperty('--credis-x', Math.round(x) + 'px');
      mascot.style.setProperty('--credis-y', Math.round(y) + 'px');
      if (animate) {
        mascot.classList.add('is-snapping');
        clearTimeout(state.tapTimer);
        state.tapTimer = setTimeout(function(){ mascot.classList.remove('is-snapping'); }, 560);
      }
      positionBubble();
    }

    function savePosition(){
      try {
        var size = getSize();
        var maxY = Math.max(1, window.innerHeight - size);
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          edge: state.edge,
          yRatio: clamp(state.y / maxY, 0, 1)
        }));
      } catch (_) {}
    }

    function restorePosition(){
      var size = getSize();
      var edge = 'right';
      var yRatio = .64;
      try {
        var saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
        if (saved && (saved.edge === 'left' || saved.edge === 'right')) edge = saved.edge;
        if (saved && typeof saved.yRatio === 'number') yRatio = clamp(saved.yRatio, .08, .88);
      } catch (_) {}
      state.edge = edge;
      mascot.setAttribute('data-edge', edge);
      var peek = 10;
      var x = edge === 'left' ? -peek : window.innerWidth - size + peek;
      var y = clamp((window.innerHeight - size) * yRatio, 12, window.innerHeight - size - 12);
      setPosition(x, y, false);
    }

    function snapToEdge(){
      var size = getSize();
      var center = state.x + size / 2;
      state.edge = center < window.innerWidth / 2 ? 'left' : 'right';
      mascot.setAttribute('data-edge', state.edge);
      bubble.setAttribute('data-edge', state.edge);
      var peek = 10;
      var x = state.edge === 'left' ? -peek : window.innerWidth - size + peek;
      var y = clamp(state.y, 10, window.innerHeight - size - 10);
      setPosition(x, y, true);
      savePosition();
    }

    function setGaze(x, y, curious){
      mascot.style.setProperty('--credis-eye-x', clamp(x, -2.4, 2.4).toFixed(2) + 'px');
      mascot.style.setProperty('--credis-eye-y', clamp(y, -1.6, 1.6).toFixed(2) + 'px');
      mascot.classList.toggle('is-curious', !!curious);
    }

    function blink(){
      if (state.dragging || state.panelOpen) return;
      mascot.classList.add('is-blinking');
      setTimeout(function(){
        mascot.classList.remove('is-blinking');
        if (Math.random() < .16 && !reducedMotion) {
          setTimeout(function(){
            mascot.classList.add('is-blinking');
            setTimeout(function(){ mascot.classList.remove('is-blinking'); }, 105);
          }, 150);
        }
      }, 115);
    }

    function idleAction(){
      if (state.dragging || state.panelOpen) {
        scheduleIdle();
        return;
      }

      var r = Math.random();
      if (r < .34) {
        blink();
      } else if (r < .68) {
        var direction = Math.random() < .5 ? -1 : 1;
        setGaze(2.1 * direction, randomBetween(-.45, .75), true);
        setTimeout(function(){ setGaze(0, 0, false); }, randomBetween(900, 1600));
      } else if (r < .87) {
        setGaze(0, -1.05, true);
        setTimeout(function(){ setGaze(0, 0, false); }, randomBetween(700, 1300));
      } else {
        mascot.classList.add('is-happy');
        setTimeout(function(){ mascot.classList.remove('is-happy'); }, 850);
      }
      scheduleIdle();
    }

    function scheduleIdle(){
      clearTimeout(state.idleTimer);
      if (reducedMotion) return;
      state.idleTimer = setTimeout(idleAction, randomBetween(3400, 7200));
    }

    var bubblePhrases = [
      '¡Hola! 👋',
      '¿Te ayudo? 😊',
      '¿Vemos tu disponible? 👀',
      'Estoy por acá ✨',
      'Psst… si querés, te llevo a WhatsApp 😊'
    ];

    function positionBubble(){
      if (!bubble.classList.contains('is-visible')) return;
      var rect = mascot.getBoundingClientRect();
      var bw = bubble.offsetWidth;
      var bh = bubble.offsetHeight;
      var gap = 12;
      var left;
      if (state.edge === 'right') {
        left = rect.left - bw - gap;
      } else {
        left = rect.right + gap;
      }
      left = clamp(left, 10, window.innerWidth - bw - 10);
      var top = clamp(rect.top + rect.height / 2 - bh / 2, 10, window.innerHeight - bh - 10);
      bubble.style.left = Math.round(left) + 'px';
      bubble.style.top = Math.round(top) + 'px';
      bubble.setAttribute('data-edge', state.edge);
    }

    function hideBubble(){
      clearTimeout(state.bubbleHideTimer);
      bubble.classList.remove('is-visible');
      bubble.setAttribute('aria-hidden', 'true');
    }

    function showBubble(){
      if (state.panelOpen || state.dragging || document.hidden) {
        scheduleBubble();
        return;
      }
      var text = bubblePhrases[Math.floor(Math.random() * bubblePhrases.length)];
      bubble.textContent = text;
      bubble.style.visibility = 'hidden';
      bubble.classList.add('is-visible');
      bubble.setAttribute('aria-hidden', 'false');
      positionBubble();
      bubble.style.visibility = '';
      clearTimeout(state.bubbleHideTimer);
      state.bubbleHideTimer = setTimeout(hideBubble, 3600);
      scheduleBubble();
    }

    function scheduleBubble(first){
      clearTimeout(state.bubbleTimer);
      if (reducedMotion) return;
      state.bubbleTimer = setTimeout(showBubble, first ? 6500 : randomBetween(22000, 36000));
    }

    function closeAnswers(){
      questionButtons.forEach(function(btn){ btn.setAttribute('aria-expanded', 'false'); });
      root.querySelectorAll('.credis-answer').forEach(function(ans){ ans.classList.remove('is-open'); });
    }

    function openPanel(){
      if (state.panelOpen) return;
      state.panelOpen = true;
      hideBubble();
      mascot.setAttribute('aria-expanded', 'true');
      mascot.classList.add('is-tapped', 'is-happy');
      setTimeout(function(){ mascot.classList.remove('is-tapped'); }, 420);
      backdrop.classList.add('is-open');
      panel.classList.add('is-open');
      backdrop.setAttribute('aria-hidden', 'false');
      panel.setAttribute('aria-hidden', 'false');
      if (window.innerWidth <= 700) {
        state.previousBodyOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
      }
      setTimeout(function(){ closeButton.focus({preventScroll:true}); }, 180);
      trackEvent('credis_open', { page_path: window.location.pathname });
    }

    function closePanel(){
      if (!state.panelOpen) return;
      state.panelOpen = false;
      mascot.setAttribute('aria-expanded', 'false');
      mascot.classList.remove('is-happy');
      backdrop.classList.remove('is-open');
      panel.classList.remove('is-open');
      backdrop.setAttribute('aria-hidden', 'true');
      panel.setAttribute('aria-hidden', 'true');
      if (window.innerWidth <= 700) document.body.style.overflow = state.previousBodyOverflow || '';
      closeAnswers();
      try { mascot.focus({preventScroll:true}); } catch (_) {}
      scheduleIdle();
      scheduleBubble(false);
    }

    function pointerDown(e){
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      if (state.panelOpen) return;
      state.pointerId = e.pointerId;
      state.startX = e.clientX;
      state.startY = e.clientY;
      state.originX = state.x;
      state.originY = state.y;
      state.lastX = e.clientX;
      state.lastY = e.clientY;
      state.moved = false;
      state.dragging = false;
      mascot.setPointerCapture && mascot.setPointerCapture(e.pointerId);
      hideBubble();
    }

    function pointerMove(e){
      if (state.pointerId !== e.pointerId) return;
      var dx = e.clientX - state.startX;
      var dy = e.clientY - state.startY;
      var distance = Math.sqrt(dx * dx + dy * dy);
      if (!state.dragging && distance > 6) {
        state.dragging = true;
        state.moved = true;
        mascot.classList.add('is-dragging');
        mascot.classList.remove('is-snapping');
        trackEvent('credis_drag_start', { page_path: window.location.pathname });
      }
      if (!state.dragging) return;

      e.preventDefault();
      var size = getSize();
      var x = clamp(state.originX + dx, -10, window.innerWidth - size + 10);
      var y = clamp(state.originY + dy, 6, window.innerHeight - size - 6);
      var vx = e.clientX - state.lastX;
      var vy = e.clientY - state.lastY;
      var tilt = clamp(vx * .9, -12, 12);
      mascot.style.setProperty('--credis-drag-tilt', tilt.toFixed(1) + 'deg');
      setGaze(clamp(vx * .22, -2.3, 2.3), clamp(vy * .15, -1.4, 1.4), false);
      setPosition(x, y, false);
      state.lastX = e.clientX;
      state.lastY = e.clientY;
    }

    function pointerUp(e){
      if (state.pointerId !== e.pointerId) return;
      try { mascot.releasePointerCapture && mascot.releasePointerCapture(e.pointerId); } catch (_) {}
      state.pointerId = null;

      if (state.dragging) {
        state.dragging = false;
        mascot.classList.remove('is-dragging');
        setGaze(0, 0, false);
        snapToEdge();
        trackEvent('credis_drag_end', { edge: state.edge, page_path: window.location.pathname });
      } else if (!state.moved) {
        openPanel();
      }
      state.moved = false;
    }

    mascot.addEventListener('pointerdown', pointerDown);
    mascot.addEventListener('pointermove', pointerMove);
    mascot.addEventListener('pointerup', pointerUp);
    mascot.addEventListener('pointercancel', pointerUp);
    mascot.addEventListener('click', function(e){ e.preventDefault(); });

    if (window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      window.addEventListener('pointermove', function(e){
        if (state.dragging || state.panelOpen || state.pointerId !== null) return;
        var rect = mascot.getBoundingClientRect();
        var cx = rect.left + rect.width / 2;
        var cy = rect.top + rect.height / 2;
        var dx = e.clientX - cx;
        var dy = e.clientY - cy;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 260) {
          var nx = dx / Math.max(dist, 1);
          var ny = dy / Math.max(dist, 1);
          var strength = 1 - clamp((dist - 50) / 210, 0, 1) * .35;
          setGaze(nx * 2.25 * strength, ny * 1.35 * strength, dist < 155);
        } else if (!mascot.classList.contains('is-curious')) {
          setGaze(0, 0, false);
        }
      }, {passive:true});
    }

    closeButton.addEventListener('click', closePanel);
    backdrop.addEventListener('click', closePanel);
    document.addEventListener('keydown', function(e){
      if (e.key === 'Escape' && state.panelOpen) closePanel();
    });

    questionButtons.forEach(function(btn){
      btn.addEventListener('click', function(){
        var key = btn.getAttribute('data-question');
        var wasOpen = btn.getAttribute('aria-expanded') === 'true';
        closeAnswers();
        if (!wasOpen) {
          btn.setAttribute('aria-expanded', 'true');
          var answer = root.querySelector('.credis-answer[data-answer="' + key + '"]');
          if (answer) answer.classList.add('is-open');
          trackEvent('credis_question', { question: key, page_path: window.location.pathname });
        }
      });
    });

    whatsappLinks.forEach(function(link){
      link.addEventListener('click', function(){
        trackEvent('credis_whatsapp', { page_path: window.location.pathname });
        setTimeout(closePanel, 120);
      });
    });

    window.addEventListener('resize', function(){
      var size = getSize();
      var peek = 10;
      var x = state.edge === 'left' ? -peek : window.innerWidth - size + peek;
      var y = clamp(state.y, 10, window.innerHeight - size - 10);
      setPosition(x, y, false);
      savePosition();
    }, {passive:true});

    document.addEventListener('visibilitychange', function(){
      if (document.hidden) {
        hideBubble();
      } else {
        scheduleIdle();
        scheduleBubble(false);
      }
    });

    restorePosition();
    scheduleIdle();
    scheduleBubble(true);
  }

  function init(){
    buildAssistant();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, {once:true});
  } else {
    init();
  }
})();
