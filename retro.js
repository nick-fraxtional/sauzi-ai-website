/* ============================================================
   Sauzi.ai — Retro build runtime (vanilla, no framework)
   Ports the dc-runtime mockup logic to plain JS + DOM.
   Custom elements <retro-header>/<retro-footer> + game engines.
   ============================================================ */
(function () {
  'use strict';

  /* ---------------------------------------------------------
     Shared data (snapped from the mockup logic)
  --------------------------------------------------------- */
  const QA = [
    ["WHAT'S OUR REPEAT PURCHASE RATE BY CHANNEL?", '> 28.4% this month, up from 24.1%. Email-acquired customers lead at 36.2% vs 21.8% paid social.'],
    ['WHICH SKUS GO OUT OF STOCK IN 30 DAYS?', '> 6 SKUs below 4 weeks of cover. SKU-2213 reorders Thursday or it stocks out on the 12th.'],
    ['WHAT IS CLTV BY ACQUISITION COHORT?', '> Sep email cohort at $214 CLTV, 3.1x CAC. Paid social cohort at $96, 1.2x CAC.'],
    ['WHY DID SUBSCRIPTION CHURN MOVE LAST WEEK?', '> Churn +1.8pts, concentrated in Recharge subscribers on the 60-day plan after the price change.']
  ];
  const TET_LAYERS = [
    { name: 'SOURCES',   sub: 'Shopify · Recharge · Klaviyo' },
    { name: 'ETL',       sub: 'Fivetran pipelines' },
    { name: 'WAREHOUSE', sub: 'Snowflake configured' },
    { name: 'MODELS',    sub: 'dim / fact · semantic layer' },
    { name: 'AGENTS',    sub: 'Claude connected' }
  ];
  const TET_SEQ = [[3, 2, 5], [4, 4, 2], [5, 5], [2, 3, 5], [6, 4]];
  const SNK_SOURCES = ['SHOPIFY', 'RECHARGE', 'KLAVIYO', 'META ADS', 'MAGENTO', 'NETSUITE', 'GOOGLE ADS', 'MAILCHIMP'];
  const RM_SOURCES = ['SHOPIFY', 'MAGENTO', 'RECHARGE', 'KLAVIYO', 'MAILCHIMP', 'META ADS', 'GOOGLE ADS', 'NETSUITE', 'AMAZON', 'GORGIAS'];

  const pip = (n, of) => '▮'.repeat(Math.max(0, n)) + '▯'.repeat(Math.max(0, of - n));
  const pad = (n, w) => String(n).padStart(w, '0');
  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  /* =========================================================
     Header / footer custom elements
  ========================================================= */
  const NAV = [
    ['index.html', 'HOME'],
    ['how-it-works.html', 'HOW IT WORKS'],
    ['playbooks.html', 'PLAYBOOKS'],
    ['why-sauzi.html', 'WHY SAUZI'],
    ['blog.html', 'BLOG']
  ];

  class RetroHeader extends HTMLElement {
    connectedCallback() {
      const active = (this.getAttribute('active') || '').toLowerCase();
      const tag = this.getAttribute('tag') || 'TAKING CLIENTS';
      const links = NAV.map(([href, label]) => {
        const on = href === active ? ' is-active' : '';
        return `<a href="${href}" class="rt-nav__link${on}">${label}</a>`;
      }).join('');
      this.innerHTML = `
      <nav class="rt-nav">
        <a href="index.html"><img class="rt-nav__logo" src="brand/data-rally-lockup-reverse.png" alt="sauzi.ai"></a>
        <button class="rt-nav__burger" aria-label="Menu">▣</button>
        <div class="rt-nav__links">${links}</div>
        <span class="rt-nav__tag">${tag}</span>
      </nav>`;
      const burger = $('.rt-nav__burger', this);
      const menu = $('.rt-nav__links', this);
      burger.addEventListener('click', () => menu.classList.toggle('is-open'));
    }
  }

  class RetroFooter extends HTMLElement {
    connectedCallback() {
      const hint = this.getAttribute('hint') ||
        '<span>◀▶ SELECT</span><span>A: START</span><span>B: BACK</span>';
      this.innerHTML = `<footer class="rt-foot">${hint}<span>© 2026 SAUZI.AI</span></footer>`;
    }
  }

  customElements.define('retro-header', RetroHeader);
  customElements.define('retro-footer', RetroFooter);

  /* =========================================================
     PONG — Query Ranger returns tough data questions
  ========================================================= */
  function initPong() {
    const cv = $('#pong'); if (!cv) return;
    const els = {
      answers: $('#pong-answers'), tickets: $('#pong-tickets'),
      feed: $('#pong-feed'), question: $('#pong-question'),
      mode: $('#pong-mode'), hint: $('#pong-hint'),
      start: $('#pong-start'), reset: $('#pong-reset'),
      overlay: $('#pong-overlay')
    };
    const W = 592, H = 250;
    cv.width = W * 2; cv.height = H * 2;
    const ctx = cv.getContext('2d');
    ctx.setTransform(2, 0, 0, 2, 0, 0);
    ctx.imageSmoothingEnabled = false;

    const S = { attract: true, answers: 0, tickets: 0, qi: 0, feed: els.feed ? els.feed.textContent : '', target: null };
    let py = H / 2 - 32, ay = H / 2 - 32, bx, by, vx, vy;
    const speed = 4.2, diff = 0.14;

    function serve(dir) { bx = W / 2 - 6; by = H / 2 - 6; vx = speed * dir; vy = (Math.random() * 3 - 1.5) || 1.2; }
    function sync() {
      if (els.answers) els.answers.textContent = pad(S.answers, 2);
      if (els.tickets) els.tickets.textContent = pad(S.tickets, 2);
      if (els.feed) els.feed.textContent = S.feed;
      if (els.question) els.question.textContent = QA[S.qi][0];
      if (els.mode) els.mode.textContent = S.attract ? 'READY' : 'IN PLAY';
      if (els.hint) els.hint.textContent = S.attract ? 'PRESS START TO PLAY AS QUERY RANGER' : 'MOUSE MOVES YOUR PADDLE';
    }
    function court(idle) {
      ctx.fillStyle = '#F1EDE4'; ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = '#9C948A';
      for (let y = 8; y < H - 8; y += 20) ctx.fillRect(W / 2 - 3, y, 6, 10);
      ctx.fillStyle = '#5C564F';
      ctx.fillRect(0, 0, W, 4); ctx.fillRect(0, H - 4, W, 4);
      ctx.fillStyle = '#191816';
      ctx.fillRect(18, Math.round(py), 12, 64);
      ctx.fillRect(W - 30, Math.round(ay), 12, 64);
      if (idle) return;
      ctx.fillStyle = '#B6542E'; ctx.fillRect(Math.round(bx - vx * 2), Math.round(by - vy * 2), 8, 8);
      ctx.fillStyle = '#F4A300'; ctx.fillRect(Math.round(bx), Math.round(by), 12, 12);
    }
    function loop() {
      requestAnimationFrame(loop);
      if (S.attract) { court(true); return; }
      const sp = Math.hypot(vx, vy) || 1; vx = vx / sp * speed; vy = vy / sp * speed;
      const goal = S.target == null ? by - 26 : S.target;
      py += (goal - py) * 0.28;
      ay += (by - 26 - ay) * diff;
      py = Math.max(6, Math.min(H - 70, py));
      ay = Math.max(6, Math.min(H - 70, ay));
      bx += vx; by += vy;
      if (by < 6) { by = 6; vy *= -1; }
      if (by > H - 18) { by = H - 18; vy *= -1; }
      if (vx < 0 && bx < 34 && bx > 18 && by + 12 > py && by < py + 64) {
        vx *= -1; vy += (by - (py + 26)) * 0.06;
        S.answers++; S.feed = QA[S.qi][1]; sync();
      }
      if (vx > 0 && bx > W - 40 && bx < W - 22 && by + 12 > ay && by < ay + 64) {
        vx *= -1; vy += (by - (ay + 26)) * 0.06;
        S.qi = (S.qi + 1) % QA.length; sync();
      }
      if (bx < -14) { S.tickets++; S.feed = '> UNANSWERED. This one becomes a ticket — four business days in the analyst queue.'; sync(); serve(1); }
      if (bx > W + 14) serve(-1);
      court(false);
    }
    cv.addEventListener('pointermove', (e) => {
      const r = cv.getBoundingClientRect();
      S.target = (e.clientY - r.top) * (H / r.height) - 32;
    });
    if (els.start) els.start.addEventListener('click', () => {
      S.target = null; py = H / 2 - 32; ay = H / 2 - 32; serve(1);
      S.attract = false; S.answers = 0; S.tickets = 0; S.qi = 0;
      S.feed = '> Court live. You are Query Ranger. Return each question to answer it — miss and it becomes a ticket.'; sync();
      if (els.overlay) els.overlay.style.display = 'none';
    });
    if (els.reset) els.reset.addEventListener('click', () => {
      S.target = null; py = H / 2 - 32; ay = H / 2 - 32;
      S.attract = true; S.answers = 0; S.tickets = 0; S.qi = 0;
      S.feed = "> Press start. Every question your team can't answer today becomes a rally."; sync();
      if (els.overlay) els.overlay.style.display = 'flex';
    });
    serve(1); sync(); loop();
  }

  /* =========================================================
     TETRIS — the data stack builds itself, bottom up
  ========================================================= */
  function initTetris() {
    const cv = $('#tetris'); if (!cv) return;
    const layerEl = $('#tet-layer'), msgEl = $('#tet-msg'), legendEl = $('#tet-legend');
    const C = 22, COLS = 10, ROWS = 12;
    cv.width = COLS * C * 2; cv.height = ROWS * C * 2;
    const ctx = cv.getContext('2d');
    ctx.setTransform(2, 0, 0, 2, 0, 0); ctx.imageSmoothingEnabled = false;
    const t = { filled: [], layer: 0, part: 0, piece: null, hold: 0, fast: false, done: false };

    function renderLegend(active) {
      if (!legendEl) return;
      legendEl.innerHTML = TET_LAYERS.map((l, i) => l).slice().reverse().map((l) => {
        const idx = TET_LAYERS.indexOf(l);
        const on = idx < active;
        const tone = on ? 'var(--ink)' : 'var(--muted)';
        return `<div class="tet-leg">
          <span style="font:700 13px var(--disp);color:${tone}">${on ? '■' : '□'}</span>
          <div><div style="font:700 11px var(--disp);color:${tone}">${l.name}</div>
          <div style="font:400 14px var(--text);color:var(--muted);margin-top:3px">${l.sub}</div></div>
        </div>`;
      }).join('');
    }
    function status(layer, msg) {
      if (layerEl) layerEl.textContent = pad(layer, 2);
      if (msgEl) msgEl.textContent = msg;
      renderLegend(layer);
    }
    function spawn() {
      const seq = TET_SEQ[t.layer % TET_SEQ.length];
      const w = seq[t.part];
      const x = seq.slice(0, t.part).reduce((a, b) => a + b, 0);
      t.piece = { x, w, y: -1.2 }; t.fast = false;
    }
    cv.addEventListener('pointerdown', () => { t.fast = true; });
    function loop() {
      requestAnimationFrame(loop);
      const target = ROWS - 1 - t.layer;
      if (t.hold > 0) { t.hold -= 1; }
      else if (t.piece) {
        t.piece.y += (t.fast ? 0.34 : 0.085);
        if (t.piece.y >= target) {
          t.filled.push({ row: target, x: t.piece.x, w: t.piece.w, layer: t.layer });
          const seq = TET_SEQ[t.layer % TET_SEQ.length];
          t.part += 1;
          if (t.part >= seq.length) {
            t.part = 0; t.layer += 1; t.hold = 34;
            if (t.layer >= 5) {
              status(5, 'STACK COMPLETE — AGENTS ONLINE. Plain-English questions answered in seconds.');
              t.hold = 150; t.piece = null; t.done = true;
            } else {
              status(t.layer, TET_LAYERS[t.layer - 1].name + ' LOCKED IN. ' + TET_LAYERS[t.layer].name + ' next.');
              spawn();
            }
          } else spawn();
        }
      } else if (t.done && t.hold <= 0) {
        t.filled = []; t.layer = 0; t.part = 0; t.done = false;
        status(0, 'Every layer sits on the one below it. Skip a row and the stack collapses.');
        spawn();
      }
      // draw
      ctx.fillStyle = '#FFFFFF'; ctx.fillRect(0, 0, COLS * C, ROWS * C);
      ctx.fillStyle = '#E8E2D8';
      for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) ctx.fillRect(c * C + C / 2 - 1, r * C + C / 2 - 1, 2, 2);
      for (const b of t.filled) {
        ctx.fillStyle = b.layer % 2 ? '#B6542E' : '#F4A300';
        ctx.fillRect(b.x * C + 1, b.row * C + 1, b.w * C - 2, C - 2);
        ctx.fillStyle = '#191816';
        for (let i = 0; i <= b.w; i++) ctx.fillRect(b.x * C + i * C - 1, b.row * C + 1, 2, C - 2);
        ctx.fillRect(b.x * C + 1, b.row * C - 1, b.w * C - 2, 2);
      }
      if (t.piece) {
        const y = Math.round(t.piece.y * C);
        ctx.fillStyle = '#191816'; ctx.fillRect(t.piece.x * C + 1, y + 1, t.piece.w * C - 2, C - 2);
        ctx.fillStyle = '#F4A300';
        for (let i = 0; i <= t.piece.w; i++) ctx.fillRect(t.piece.x * C + i * C - 1, y + 1, 2, C - 2);
      }
      ctx.fillStyle = '#191816';
      ctx.fillRect(0, 0, COLS * C, 3); ctx.fillRect(0, ROWS * C - 3, COLS * C, 3);
      ctx.fillRect(0, 0, 3, ROWS * C); ctx.fillRect(COLS * C - 3, 0, 3, ROWS * C);
    }
    status(0, 'Every layer sits on the one below it. Skip a row and the stack collapses.');
    spawn(); loop();
  }

  /* =========================================================
     SNAKE — one pipeline collecting scattered sources
  ========================================================= */
  function initSnake() {
    const cv = $('#snake'); if (!cv) return;
    const scoreEl = $('#snk-score'), lenEl = $('#snk-len'), modeEl = $('#snk-mode'),
          msgEl = $('#snk-msg'), gotEl = $('#snk-got');
    const C = 18, COLS = 20, ROWS = 12;
    cv.width = COLS * C * 2; cv.height = ROWS * C * 2;
    const ctx = cv.getContext('2d');
    ctx.setTransform(2, 0, 0, 2, 0, 0); ctx.imageSmoothingEnabled = false;
    let s, score = 0, got = [], auto = true, fi = 0;

    function reset() { s = { body: [[4, 6], [3, 6], [2, 6]], d: [1, 0], next: null }; s.food = food(); }
    function food() {
      let p;
      do { p = [2 + Math.floor(Math.random() * (COLS - 4)), 1 + Math.floor(Math.random() * (ROWS - 2))]; }
      while (s.body.some(b => b[0] === p[0] && b[1] === p[1]));
      return p;
    }
    function safe(p) {
      if (p[0] < 0 || p[1] < 0 || p[0] >= COLS || p[1] >= ROWS) return false;
      return !s.body.slice(0, -1).some(b => b[0] === p[0] && b[1] === p[1]);
    }
    function sync(msg) {
      if (scoreEl) scoreEl.textContent = pad(score, 2);
      if (lenEl) lenEl.textContent = pad(3 + score, 2);
      if (modeEl) modeEl.textContent = auto ? 'AUTOPILOT' : 'PLAYER 1';
      if (msg && msgEl) msgEl.textContent = msg;
      if (gotEl) gotEl.innerHTML = got.map(g =>
        `<span style="border:2px solid var(--rust);padding:5px 8px;font:400 10px var(--disp);color:var(--ink);background:#fff">${g}</span>`).join('');
    }
    cv.setAttribute('tabindex', '0');
    cv.addEventListener('pointerdown', () => cv.focus());
    cv.addEventListener('keydown', (e) => {
      const k = { ArrowUp: [0, -1], ArrowDown: [0, 1], ArrowLeft: [-1, 0], ArrowRight: [1, 0] }[e.key];
      if (!k) return;
      e.preventDefault(); auto = false;
      if (k[0] !== -s.d[0] || k[1] !== -s.d[1]) s.next = k;
      sync();
    });
    function tick() {
      if (auto) {
        const opts = [[1, 0], [-1, 0], [0, 1], [0, -1]]
          .filter(d => d[0] !== -s.d[0] || d[1] !== -s.d[1])
          .filter(d => safe([s.body[0][0] + d[0], s.body[0][1] + d[1]]))
          .sort((a, b) => {
            const da = Math.abs(s.body[0][0] + a[0] - s.food[0]) + Math.abs(s.body[0][1] + a[1] - s.food[1]);
            const db = Math.abs(s.body[0][0] + b[0] - s.food[0]) + Math.abs(s.body[0][1] + b[1] - s.food[1]);
            return da - db;
          });
        if (opts.length) s.d = opts[0];
      } else if (s.next) { s.d = s.next; s.next = null; }
      const h = [s.body[0][0] + s.d[0], s.body[0][1] + s.d[1]];
      if (!safe(h)) {
        score = 0; got = []; reset();
        sync('SILO COLLISION — the pipeline crossed itself. Sources scattered again.');
      } else {
        s.body.unshift(h);
        if (h[0] === s.food[0] && h[1] === s.food[1]) {
          const label = SNK_SOURCES[fi % SNK_SOURCES.length]; fi++;
          s.food = food(); score++; got = [...got, label].slice(-8);
          sync(label + ' connected. ' + score + ' sources now feeding one warehouse.');
        } else s.body.pop();
      }
      // draw
      ctx.fillStyle = '#FFFFFF'; ctx.fillRect(0, 0, COLS * C, ROWS * C);
      ctx.fillStyle = '#E8E2D8';
      for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) ctx.fillRect(c * C + C / 2 - 1, r * C + C / 2 - 1, 2, 2);
      ctx.fillStyle = '#B6542E'; ctx.fillRect(s.food[0] * C + 3, s.food[1] * C + 3, C - 6, C - 6);
      ctx.fillStyle = '#FFFFFF'; ctx.fillRect(s.food[0] * C + 7, s.food[1] * C + 7, C - 14, C - 14);
      s.body.forEach((seg, i) => {
        ctx.fillStyle = i === 0 ? '#191816' : (i % 2 ? '#F4A300' : '#C77F00');
        ctx.fillRect(seg[0] * C + 1, seg[1] * C + 1, C - 2, C - 2);
      });
      ctx.fillStyle = '#191816';
      ctx.fillRect(0, 0, COLS * C, 3); ctx.fillRect(0, ROWS * C - 3, COLS * C, 3);
      ctx.fillRect(0, 0, 3, ROWS * C); ctx.fillRect(COLS * C - 3, 0, 3, ROWS * C);
    }
    reset(); sync(); setInterval(tick, 118);
  }

  /* =========================================================
     READINESS MAP — toggle stack, score + route recompute
  ========================================================= */
  function initReadiness() {
    const root = $('#readiness'); if (!root) return;
    const st = { src: [0, 2, 3], etl: false, wh: false, model: false, agent: false };
    const CAPS = [
      { key: 'etl',   label: 'ETL / ELT PLATFORM',   hint: 'Fivetran, Airbyte, custom jobs' },
      { key: 'wh',    label: 'DATA WAREHOUSE',        hint: 'Snowflake, BigQuery, Redshift' },
      { key: 'model', label: 'SEMANTIC / DBT MODELS', hint: 'dim + fact tables, metric definitions' },
      { key: 'agent', label: 'AI TOOLS CONNECTED',    hint: 'Claude, Cowork, NL query layer' }
    ];
    const srcWrap = $('#rm-sources', root), capWrap = $('#rm-caps', root);
    const el = (id) => $('#' + id, root);

    function compute() {
      const src = st.src.length;
      const score = Math.round(Math.min(src, 6) / 6 * 10 + (st.etl ? 20 : 0) + (st.wh ? 25 : 0) + (st.model ? 30 : 0) + (st.agent ? 15 : 0));
      let start = 'PHASE 1 — FOUNDATION', route;
      if (!st.wh || !st.etl) { start = 'PHASE 1 — FOUNDATION'; route = ['Build or repair pipelines from every source', 'Stand up and configure the warehouse', 'Model dimensions and facts for AI', 'Connect the agents']; }
      else if (!st.model) { start = 'PHASE 2 — STRUCTURING'; route = ['Audit and rebuild the semantic layer', 'Design medallion architecture', 'Connect the agents']; }
      else if (!st.agent) { start = 'PHASE 3 — AI CONNECTION'; route = ['Connect Claude / Cowork to the warehouse', 'Stand up natural-language querying', 'Enable automated anomaly detection']; }
      else { start = 'TUNING'; route = ['Extend coverage to remaining sources', 'Harden anomaly detection and monitoring', 'Train the team on what is running']; }
      const gauges = [
        { name: 'PHASE 1 FOUNDATION', pips: pip((st.etl ? 1 : 0) + (st.wh ? 1 : 0) + (src > 0 ? 1 : 0), 3), state: (st.etl && st.wh && src > 0) ? 'CLEAR' : 'INCOMPLETE' },
        { name: 'PHASE 2 STRUCTURING', pips: pip(st.model ? 3 : 0, 3), state: st.model ? 'CLEAR' : 'INCOMPLETE' },
        { name: 'PHASE 3 AI CONNECTION', pips: pip(st.agent ? 3 : 0, 3), state: st.agent ? 'CLEAR' : 'LOCKED' }
      ];
      return { src, score, start, route, gauges };
    }
    function render() {
      // sources
      srcWrap.innerHTML = RM_SOURCES.map((n, i) => {
        const on = st.src.includes(i);
        return `<span data-i="${i}" style="cursor:pointer;border:3px solid var(--ink);padding:9px 12px;font:400 12px var(--disp);background:${on ? 'var(--ink)' : '#fff'};color:${on ? 'var(--cream)' : 'var(--ink)'}">${on ? '■' : '□'} ${n}</span>`;
      }).join('');
      // caps
      capWrap.innerHTML = CAPS.map(c => {
        const on = st[c.key];
        return `<div data-k="${c.key}" style="cursor:pointer;display:flex;align-items:center;justify-content:space-between;gap:14px;padding:14px;border:3px solid var(--muted);margin-bottom:10px;background:var(--panel-2)">
          <div><div style="font:700 12px var(--disp);color:var(--ink)">${c.label}</div>
          <div style="font:400 15px var(--text);color:var(--body);margin-top:4px">${c.hint}</div></div>
          <span style="font:700 13px var(--disp);color:var(--rust)">${on ? '[YES]' : '[ NO ]'}</span></div>`;
      }).join('');
      const r = compute();
      el('rm-count').textContent = pad(r.src, 2);
      el('rm-score').textContent = pad(r.score, 3);
      el('rm-bar').textContent = pip(Math.round(r.score / 10), 10);
      el('rm-start').textContent = r.start;
      el('rm-gauges').innerHTML = r.gauges.map(g =>
        `<div style="display:flex;align-items:center;justify-content:space-between;gap:12px;padding:11px 0;border-bottom:2px dotted var(--muted-2)">
          <span style="font:400 11px var(--disp);color:var(--ink)">${g.name}</span>
          <span style="display:flex;align-items:center;gap:12px">
            <span style="font:400 14px var(--disp);color:var(--rust);letter-spacing:2px">${g.pips}</span>
            <span style="font:400 10px var(--disp);color:var(--muted);width:82px;text-align:right">${g.state}</span></span></div>`).join('');
      el('rm-route').innerHTML = r.route.map((t, i) =>
        `<div style="display:flex;align-items:flex-start;gap:12px;padding:8px 0">
          <span style="font:700 12px var(--disp);color:var(--rust);margin-top:3px">${pad(i + 1, 2)}</span>
          <span style="font:400 17px var(--text);color:var(--body)">${t}</span></div>`).join('');
    }
    srcWrap.addEventListener('click', (e) => {
      const t = e.target.closest('[data-i]'); if (!t) return;
      const i = +t.dataset.i;
      st.src = st.src.includes(i) ? st.src.filter(x => x !== i) : [...st.src, i];
      render();
    });
    capWrap.addEventListener('click', (e) => {
      const t = e.target.closest('[data-k]'); if (!t) return;
      st[t.dataset.k] = !st[t.dataset.k]; render();
    });
    render();
  }

  /* =========================================================
     SUBMISSION FORM — live registration card + confirmation
  ========================================================= */
  const FORM_STAGES = [
    { label: 'NO WAREHOUSE YET', hint: 'Data lives in the platforms and spreadsheets', card: 'PHASE 1 — FOUNDATION' },
    { label: 'WAREHOUSE, NO MODELS', hint: 'Data lands somewhere but nothing is structured', card: 'PHASE 2 — STRUCTURING' },
    { label: 'MODELED, NO AGENTS', hint: 'dim/fact tables exist, no AI connected', card: 'PHASE 3 — AI CONNECTION' },
    { label: 'NOT SURE', hint: "That's a normal answer. We'll work it out on the call.", card: 'TO BE SCANNED' }
  ];
  function initForm() {
    const root = $('#regform'); if (!root) return;
    const st = { name: '', email: '', co: '', q: '', stage: null, src: [], submitted: false };
    const el = (id) => $('#' + id, root);
    const stageWrap = el('f-stages'), srcWrap = el('f-srcs');

    function ready() { return st.name.trim() && st.email.trim() && st.stage !== null; }
    function done() {
      return [st.name, st.email, st.co].filter(v => v && v.trim().length > 1).length
        + (st.stage !== null ? 1 : 0) + (st.src.length ? 1 : 0) + (st.q.trim().length > 3 ? 1 : 0);
    }
    function renderStages() {
      stageWrap.innerHTML = FORM_STAGES.map((s, i) => {
        const on = st.stage === i;
        return `<div data-i="${i}" class="rt-tile" style="display:flex;gap:11px;padding:14px;border-color:${on ? 'var(--ink)' : 'var(--muted)'};background:${on ? 'var(--panel-2)' : '#fff'}">
          <span style="font:700 13px var(--disp);color:var(--rust);margin-top:1px">${on ? '◉' : '○'}</span>
          <div><div style="font:700 11px var(--disp);color:var(--ink)">${s.label}</div>
          <div style="font:400 14px var(--text);color:var(--muted);margin-top:5px">${s.hint}</div></div></div>`;
      }).join('');
    }
    function renderSrcs() {
      srcWrap.innerHTML = RM_SOURCES.map((n, i) => {
        const on = st.src.includes(i);
        return `<span data-i="${i}" style="cursor:pointer;border:3px solid var(--ink);padding:9px 12px;font:400 12px var(--disp);background:${on ? 'var(--ink)' : '#fff'};color:${on ? 'var(--cream)' : 'var(--ink)'}">${on ? '■' : '□'} ${n}</span>`;
      }).join('');
    }
    function renderCard() {
      el('f-step').textContent = 'FIELD ' + pad(done(), 2) + ' / 06';
      el('f-pips').textContent = pip(done(), 6);
      const val = (v) => v && v.trim() ? v.trim() : '—';
      el('c-name').textContent = val(st.name);
      el('c-email').textContent = val(st.email);
      el('c-co').textContent = val(st.co);
      el('c-stage').textContent = st.stage === null ? '—' : FORM_STAGES[st.stage].card;
      el('c-src').textContent = st.src.length ? st.src.map(i => RM_SOURCES[i]).join(' · ') : '—';
      el('c-q').textContent = val(st.q);
      const btn = el('f-submit');
      btn.textContent = ready() ? '▶ START THE SCAN' : 'FILL NAME, EMAIL, STAGE';
      btn.style.background = ready() ? 'var(--ink)' : 'var(--muted)';
      // confirmation echoes
      const setTxt = (id, v) => { const n = el(id); if (n) n.textContent = v; };
      setTxt('k-name', val(st.name)); setTxt('k-co', val(st.co));
      setTxt('k-stage', st.stage === null ? '—' : FORM_STAGES[st.stage].card);
      setTxt('k-email', val(st.email));
    }
    function showState() {
      el('f-live').style.display = st.submitted ? 'none' : 'block';
      el('f-done').style.display = st.submitted ? 'block' : 'none';
    }
    // field bindings
    [['name', 'i-name'], ['email', 'i-email'], ['co', 'i-co'], ['q', 'i-q']].forEach(([k, id]) => {
      const n = el(id); if (!n) return;
      n.addEventListener('input', () => { st[k] = n.value; renderCard(); });
    });
    stageWrap.addEventListener('click', (e) => {
      const t = e.target.closest('[data-i]'); if (!t) return;
      st.stage = +t.dataset.i; renderStages(); renderCard();
    });
    srcWrap.addEventListener('click', (e) => {
      const t = e.target.closest('[data-i]'); if (!t) return;
      const i = +t.dataset.i;
      st.src = st.src.includes(i) ? st.src.filter(x => x !== i) : [...st.src, i];
      renderSrcs(); renderCard();
    });
    // Same Make webhook the classic index.html form posts to. Keys map to
    // the existing Make scenario (fullName/email/role/company/industry); the
    // extra retro fields are included so no captured info is dropped.
    const WEBHOOK_URL = 'https://hook.us2.make.com/50v4vpsrkfcxljo1e017w0uv16s3323c';
    let submitting = false;
    async function submitForm() {
      if (!ready() || submitting) return;
      submitting = true;
      const btn = el('f-submit');
      btn.textContent = 'SENDING…';
      btn.style.background = 'var(--muted)';
      const payload = {
        timestamp: new Date().toISOString(),
        fullName: st.name.trim(),
        email: st.email.trim(),
        company: st.co.trim(),
        role: '',
        industry: '',
        stage: st.stage === null ? '' : FORM_STAGES[st.stage].card,
        dataSources: st.src.map(i => RM_SOURCES[i]).join(', '),
        firstQuestion: st.q.trim(),
        source: 'retro/form.html'
      };
      try {
        await fetch(WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        st.submitted = true; renderCard(); showState();
      } catch (e) {
        console.error('Form submit failed:', e);
        btn.textContent = 'SUBMIT FAILED — RETRY';
        btn.style.background = 'var(--rust)';
      } finally {
        submitting = false;
      }
    }
    el('f-submit').addEventListener('click', submitForm);
    const editBtn = el('f-edit');
    if (editBtn) editBtn.addEventListener('click', () => { st.submitted = false; showState(); });
    renderStages(); renderSrcs(); renderCard(); showState();
  }

  /* =========================================================
     HOW IT WORKS — world-map level select
  ========================================================= */
  const LEVELS = {
    1: { name: 'PHASE 1: FOUNDATION', status: 'START HERE', body: "We connect your data sources, build or repair your pipelines, and get clean data flowing into your warehouse. You can't deploy AI on a leaky pipe — so we fix the pipe first.",
         items: ['ETL/ELT Pipeline Buildout', 'Pipeline Repair & Optimization', 'Warehouse Setup & Migration'],
         tools: ['FIVETRAN', 'SNOWFLAKE', 'BIGQUERY', 'SHOPIFY', 'RECHARGE'],
         clear: 'Clean data flowing reliably into a configured warehouse.' },
    2: { name: 'PHASE 2: STRUCTURING', status: 'MOST SKIP THIS', body: 'We build the dimension and fact tables AI agents need to reason about your business. Most implementations skip this step — and fail because of it.',
         items: ['Semantic Layer Modeling', 'AI-Ready Data Structuring', 'Medallion Architecture Design'],
         tools: ['DBT', 'SEMANTIC LAYER', 'MEDALLION', 'DIM/FACT'],
         clear: 'A single source of truth an agent can reason about.' },
    3: { name: 'PHASE 3: AI CONNECTION', status: 'AGENTS ONLINE', body: 'Connect your structured warehouse to AI tools. Your team asks questions in plain English and gets answers in seconds — no ticket queue.',
         items: ['Claude / Cowork Connection', 'Natural Language Query Interface', 'Automated Anomaly Detection'],
         tools: ['CLAUDE', 'COWORK', 'NL QUERY', 'ANOMALY WATCH'],
         clear: 'Plain-English questions answered in seconds, 24/7.' }
  };
  function initLevels() {
    const root = $('#levels'); if (!root) return;
    const el = (id) => $('#' + id, root);
    let cur = 1;
    function render() {
      const L = LEVELS[cur];
      $$('.lvl-node', root).forEach(n => n.classList.toggle('is-on', +n.dataset.level === cur));
      el('lvl-num').textContent = cur;
      el('lvl-status').textContent = L.status;
      el('lvl-name').textContent = L.name;
      el('lvl-body').textContent = L.body;
      el('lvl-items').innerHTML = L.items.map(i =>
        `<div style="display:flex;gap:10px;padding:7px 0"><span style="color:var(--rust);font:700 12px var(--disp)">▸</span><span style="font:400 16px var(--text);color:var(--body)">${i}</span></div>`).join('');
      el('lvl-tools').innerHTML = L.tools.map(t =>
        `<span class="rt-tag rt-tag--grey">${t}</span>`).join('');
      el('lvl-clear').textContent = L.clear;
    }
    $$('.lvl-node', root).forEach(n => n.addEventListener('click', () => { cur = +n.dataset.level; render(); }));
    render();
  }

  /* =========================================================
     PLAYBOOKS — cartridge select + stack scanner
  ========================================================= */
  const PBS = {
    A: { body: "Your data is split across Shopify, Recharge, and your email platform — no single source of truth. Reports live in spreadsheets. There's no warehouse. We build one and connect AI agents to it.",
         flow: [['SOURCES', 'SHOPIFY / RECHARGE / KLAVIYO'], ['ETL', 'FIVETRAN'], ['WAREHOUSE', 'SNOWFLAKE (NEW)'], ['MODELS', 'DBT DIM/FACT'], ['AGENT', 'CLAUDE']],
         steps: ['Stand up Snowflake; configure schemas and access', 'Connect Shopify, Recharge, Klaviyo, ad platforms via ETL', 'Build dimension and fact tables for customer, order, subscription', 'Connect AI agents and hand over documentation'] },
    B: { body: 'You have a warehouse and data is flowing — but your dbt models are inconsistent, there’s no unified customer view, and AI queries are unreliable. We build the structure and connect the AI.',
         flow: [['SOURCES', 'KLAVIYO / ADS'], ['ETL', 'FIVETRAN (EXISTING)'], ['WAREHOUSE', 'SNOWFLAKE'], ['MODELS', 'DBT REPAIR'], ['AGENT', 'CLAUDE']],
         steps: ['Audit existing dbt models — fix broken refs and schema drift', 'Connect any missing sources (Klaviyo, ad platforms)', 'Rebuild the semantic layer around a unified customer view', 'Connect AI tools to your structured Snowflake warehouse'] },
    C: { body: "You're running Shopify, Recharge, Mailchimp, and Magento — and they don't talk to each other. A customer who buys on two channels shows up as two different people. We unify everything, build the warehouse, and connect the AI agents.",
         flow: [['SOURCES', 'SHOPIFY / MAGENTO / MAILCHIMP'], ['ETL', 'FIVETRAN'], ['WAREHOUSE', 'SNOWFLAKE'], ['MODELS', 'IDENTITY RESOLUTION'], ['AGENT', 'CLAUDE']],
         steps: ['Map every channel’s customer and order schema', 'Build identity resolution so one buyer is one record', 'Unify DTC and wholesale into shared fact tables', 'Connect AI agents across the unified layer'] }
  };
  function initPlaybooks() {
    const root = $('#playbooks'); if (!root) return;
    const el = (id) => $('#' + id, root);
    let cur = 'A';
    function render() {
      const P = PBS[cur];
      $$('.cart', root).forEach(c => c.classList.toggle('is-on', c.dataset.pb === cur));
      el('pb-id').textContent = cur;
      el('pb-body').textContent = P.body;
      el('pb-flow').innerHTML = P.flow.map((f, i) =>
        `<div style="display:flex;align-items:center;gap:8px">
          <div style="border:3px solid var(--ink);background:${i === P.flow.length - 1 ? 'var(--amber)' : '#fff'};padding:10px 12px;min-width:0">
            <div style="font:400 9px var(--disp);color:var(--muted)">${f[0]}</div>
            <div style="font:700 11px var(--disp);color:var(--ink);margin-top:4px">${f[1]}</div></div>
          ${i < P.flow.length - 1 ? '<span style="color:var(--rust);font:700 16px var(--disp)">▸</span>' : ''}</div>`).join('');
      el('pb-steps').innerHTML = P.steps.map(s =>
        `<div style="display:flex;gap:10px;padding:8px 0"><span style="color:var(--rust);font:700 12px var(--disp)">▸</span><span style="font:400 16px var(--text);color:var(--body)">${s}</span></div>`).join('');
    }
    $$('.cart', root).forEach(c => c.addEventListener('click', () => { cur = c.dataset.pb; render(); }));

    // stack scanner
    const scan = { wh: null, etl: null };
    function scanText() {
      const { wh, etl } = scan;
      if (wh === false) return 'No warehouse yet — that’s Playbook A. We stand up Snowflake, wire your sources, and model for AI.';
      if (wh === true && etl === false) return 'Warehouse but no ETL — we can integrate a platform like Fivetran, then structure what lands.';
      if (wh === true && etl === true) return 'Both in place — that’s Playbook B. We audit the models, fix the structure, and connect the agents.';
      return 'Answer both to get a routing recommendation.';
    }
    function renderScan() {
      el('sc-wh').textContent = scan.wh === null ? '' : (scan.wh ? '[YES]' : '[NO]');
      el('sc-etl').textContent = scan.etl === null ? '' : (scan.etl ? '[YES]' : '[NO]');
      el('sc-result').textContent = scanText();
    }
    $$('[data-scan]', root).forEach(b => b.addEventListener('click', () => {
      scan[b.dataset.scan] = b.dataset.val === 'yes'; renderScan();
    }));
    render(); renderScan();
  }

  /* =========================================================
     BLOG — save-file select
  ========================================================= */
  const POSTS = [
    { title: "WE'RE GOING ALL IN ON AI DATA ANALYSTS", tag: 'AI STRATEGY', date: '2026.08.04', read: '4 MIN', file: 'blog-ai-data-analysts.html',
      body: 'For the past year, Sauzi has been in the trenches: fixing broken pipelines, cleaning messy data, building scalable infrastructure for fast-moving companies. Good work. Important work.' },
    { title: 'PLANNING AN AI PROJECT? ASK THESE 5 QUESTIONS FIRST.', tag: 'AI READINESS', date: '2026.07.22', read: '4 MIN', file: 'blog-planning-ai-project.html',
      body: 'Every executive wants to implement AI right now. The pressure from the board is real, and the competitive landscape demands it. But before you invest in shiny new AI tooling, ask five questions first.' },
    { title: 'DATA TEAMS LOOK VERY DIFFERENT THAN THEY DID 5 YEARS AGO', tag: 'TEAM BUILDING', date: '2026.07.09', read: '4 MIN', file: 'blog-data-teams.html',
      body: 'The modern data team has fundamentally transformed in just a half-decade. The roles, the tooling, and the expectations have all moved.' },
    { title: "THE DATA TEAM OF 2030 WON'T LOOK LIKE THE DATA TEAM OF 2020", tag: 'DATA STRATEGY', date: '2026.06.25', read: '4 MIN', file: 'blog-data-team-impact.html',
      body: "The data team of 2030 won't look like the data team of 2020. Fewer dashboard builders, more people designing the systems AI agents run on." },
    { title: "CULTURE TAKES TIME. DATA DOESN'T HAVE TO.", tag: 'DATA STRATEGY', date: '2026.06.11', read: '3 MIN', file: 'blog-ai-data-culture.html',
      body: '90% of companies say data and culture are the biggest barriers to AI. Culture takes years — but the data barrier you can start clearing this quarter.' },
    { title: 'MONDAY METRICS: RETENTION RATE', tag: 'MONDAY METRICS', date: '2026.05.28', read: '3 MIN', file: 'blog-monday-metrics-retention.html',
      body: "Retention is the metric that separates growing companies from leaky buckets. But if you're only tracking a single retention number, you're missing the story entirely." },
    { title: 'MONDAY METRICS: CLTV', tag: 'DATA ENGINEERING', date: '2026.05.14', read: '3 MIN', file: 'blog-monday-metrics-cltv.html',
      body: 'Customer Lifetime Value might be the most important metric most companies get wrong. Not because the math is hard — because the data behind it is a mess.' },
    { title: 'MONDAY METRICS: WEEKS OF COVER', tag: 'MONDAY METRICS', date: '2026.04.30', read: '3 MIN', file: 'blog-monday-metrics-weeks-of-cover.html',
      body: "If you sell physical products, Weeks of Cover is the metric that determines whether you're growing or firefighting. Get it right and you never run out of your best-sellers." }
  ];
  function initBlog() {
    const root = $('#blogindex'); if (!root) return;
    const el = (id) => $('#' + id, root);
    let cur = 0;
    const listWrap = el('bl-list');
    listWrap.innerHTML = POSTS.map((p, i) =>
      `<div class="bl-row" data-i="${i}" style="cursor:pointer;display:flex;gap:14px;padding:18px 22px;border-bottom:2px dotted var(--muted-2)">
        <span class="bl-mark" style="font:700 14px var(--disp);color:var(--rust);width:14px">${i === 0 ? '▸' : ' '}</span>
        <div style="flex:1;min-width:0">
          <div style="display:flex;gap:12px;font:400 10px var(--disp);color:var(--muted);margin-bottom:8px">
            <span>FILE ${pad(i + 1, 2)}</span><span>${p.date}</span><span>${p.read}</span></div>
          <div style="font:700 14px/1.5 var(--disp);color:var(--ink)">${p.title}</div>
          <div style="margin-top:10px"><span class="rt-tag">${p.tag}</span></div>
        </div></div>`).join('');
    function render() {
      const p = POSTS[cur];
      $$('.bl-row', root).forEach(r => {
        const on = +r.dataset.i === cur;
        r.style.background = on ? 'var(--panel-2)' : '#fff';
        $('.bl-mark', r).textContent = on ? '▸' : ' ';
      });
      el('bl-n').textContent = pad(cur + 1, 2);
      el('bl-read').textContent = p.read;
      el('bl-tag').textContent = p.tag;
      el('bl-date').textContent = p.date;
      el('bl-title').textContent = p.title;
      el('bl-body').textContent = p.body;
      el('bl-open').setAttribute('href', p.file);
    }
    listWrap.addEventListener('click', (e) => {
      const r = e.target.closest('.bl-row'); if (!r) return;
      cur = +r.dataset.i; render();
    });
    render();
  }

  /* ---------------------------------------------------------
     Boot everything present on the page
  --------------------------------------------------------- */
  function boot() {
    initPong(); initTetris(); initSnake();
    initReadiness(); initForm(); initLevels(); initPlaybooks(); initBlog();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
