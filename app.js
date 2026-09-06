const D = window.WUFC_DATA;
const app = document.getElementById('app');
const tabs = [...document.querySelectorAll('.tab')];

function calcStats(){
  const out = Object.fromEntries(D.squad.map(p => [p.name, {
    ...p, apps:0, starts:0, goals:0, assists:0, gA:0, potm:0, pp:0, captain:0
  }]));
  D.matches.forEach(m => {
    m.starters.forEach(n => { if(out[n]) {out[n].apps++; out[n].starts++;} });
    m.subs.forEach(n => { if(out[n]) out[n].apps++; });
    m.goals.forEach(g => {
      if(out[g.scorer]) out[g.scorer].goals++;
      if(g.assister && out[g.assister]) out[g.assister].assists++;
    });
    if(out[m.potm]) out[m.potm].potm++;
    if(out[m.playersPlayer]) out[m.playersPlayer].pp++;
    if(out[m.captain]) out[m.captain].captain++;
  });
  Object.values(out).forEach(p => p.gA = p.goals + p.assists);
  return Object.values(out);
}

function teamStats(){
  const played = D.matches.length;
  const won = D.matches.filter(m=>m.gf>m.ga).length;
  const draw = D.matches.filter(m=>m.gf===m.ga).length;
  const lost = D.matches.filter(m=>m.gf<m.ga).length;
  const gf = D.matches.reduce((s,m)=>s+m.gf,0), ga=D.matches.reduce((s,m)=>s+m.ga,0);
  const home=D.matches.filter(m=>m.venue==='Home'), away=D.matches.filter(m=>m.venue==='Away');
  const pct=n=>played ? Math.round(n/played*100) : 0;
  const recordSet = arr => ({p:arr.length,w:arr.filter(m=>m.gf>m.ga).length,d:arr.filter(m=>m.gf===m.ga).length,l:arr.filter(m=>m.gf<m.ga).length});
  return {played,won,draw,lost,gf,ga,gd:gf-ga,winPct:pct(won), clean:D.matches.filter(m=>m.cleanSheet).length, home:recordSet(home),away:recordSet(away)};
}

function nav(view){
  tabs.forEach(t=>t.classList.toggle('active', t.dataset.view===view));
  const renderers={home:renderHome,matches:renderMatches,players:renderPlayers,stats:renderStats,table:renderTable};
  renderers[view]();
  window.scrollTo({top:0,behavior:'smooth'});
}

tabs.forEach(t=>t.addEventListener('click',()=>nav(t.dataset.view)));

function renderHome(){
  const s=teamStats(), ps=calcStats();
  const topScorer=[...ps].sort((a,b)=>b.goals-a.goals || a.name.localeCompare(b.name))[0];
  const topAssist=[...ps].sort((a,b)=>b.assists-a.assists)[0];
  const topGA=[...ps].sort((a,b)=>b.gA-a.gA)[0];
  const last=D.matches[D.matches.length-1];
  const next={opponent:last.next,date:last.nextDate};
  app.innerHTML=`
    <section class="hero-kpis card">
      <div class="eyebrow">${D.season} SEASON</div>
      <div class="kpis"><div><b>P</b><strong>${s.played}</strong></div><div><b>W</b><strong>${s.won}</strong></div><div><b>D</b><strong>${s.draw}</strong></div><div><b>L</b><strong>${s.lost}</strong></div><div><b>GF</b><strong>${s.gf}</strong></div><div><b>GA</b><strong>${s.ga}</strong></div><div><b>GD</b><strong>${s.gd>=0?'+':''}${s.gd}</strong></div></div>
    </section>
    <section class="two-col">
      <article class="card result-card"><div class="section-head"><span>LATEST RESULT</span><small>${prettyDate(last.date)}</small></div><div class="matchup"><div class="team"><div class="crest-badge opponent-mark">CB</div><b>${last.shortOpponent}</b></div><div class="score">${last.gf} <span>-</span> ${last.ga}<small>HT ${last.htFor}-${last.htAgainst}</small></div><div class="team"><img src="assets/club-badge.png" class="mini-crest" alt="Westerhope badge"><b>WESTERHOPE<br>UNITED</b></div></div><div class="win-banner">✓ ${last.headline.toUpperCase()}</div></article>
      <article class="card next-card"><div class="section-head"><span>NEXT MATCH</span><small>${prettyDate(next.date)}</small></div><div class="next-title"><b>${next.opponent.toUpperCase()}</b><span>V</span><b>WESTERHOPE<br>UNITED</b></div><div class="next-meta">📍 AWAY &nbsp; • &nbsp; ${prettyDateLong(next.date)} &nbsp; • &nbsp; KICK-OFF TBC</div><button class="cta" onclick="nav('matches')">MATCH PREVIEW →</button></article>
    </section>
    <section class="card"><div class="section-head"><span>KEY STATS</span><small>AFTER ${s.played} GAME${s.played===1?'':'S'}</small></div><div class="stat-grid">
      ${metricCard('⚽','TOP SCORER',topScorer?.name||'—',topScorer?.goals||0)}
      ${metricCard('🎯','ASSIST LEADER',topAssist?.name||'—',topAssist?.assists||0)}
      ${metricCard('📈','GOAL CONTRIBUTIONS',topGA?.name||'—',topGA?.gA||0)}
      ${metricCard('🧤','CLEAN SHEETS','Johnny',s.clean)}
    </div></section>
    <section class="two-col">
      <article class="card"><div class="section-head"><span>CURRENT FORM</span></div><div class="form-row">${D.matches.slice(-5).map(m=>`<span class="form ${m.gf>m.ga?'w':m.gf===m.ga?'d':'l'}">${m.gf>m.ga?'W':m.gf===m.ga?'D':'L'}</span>`).join('')}</div></article>
      <article class="card"><div class="section-head"><span>DID YOU KNOW?</span></div><div class="didyou"><div class="bulb">💡</div><p>Charlie has scored <b>${ps.find(p=>p.name==='Charlie')?.goals||0} goals</b> in his first appearance of the 2026/27 season.</p></div></article>
    </section>
    <section class="card quote"><span class="slash">///</span><b>MORE THAN A TEAM. A COMMUNITY.</b><span class="slash">///</span></section>
  `;
}

function metricCard(icon,label,name,value){return `<div class="metric"><div class="metric-icon">${icon}</div><small>${label}</small><b>${name}</b><strong>${value}</strong></div>`;}

function renderMatches(){
  app.innerHTML=`<section><div class="page-title">MATCHES <span>///</span></div>${D.matches.slice().reverse().map(m=>matchCard(m)).join('')}</section>`;
}
function matchCard(m){
  return `<article class="card match-card"><div class="section-head"><span>${m.venue.toUpperCase()} • ${m.competition.toUpperCase()}</span><small>${prettyDate(m.date)}</small></div><div class="match-large"><div><b>${m.shortOpponent}</b></div><strong>${m.gf}–${m.ga}</strong><div><b>WESTERHOPE UNITED</b></div></div><div class="match-badges"><span>HT ${m.htFor}-${m.htAgainst}</span><span>🏆 POTM ${m.potm}</span><span>🏆 PP ${m.playersPlayer}</span><span>🧤 CLEAN SHEET</span></div><div class="goals-list">${m.goals.map(g=>`<div><b>${g.minute}'</b> ${g.scorer} ${g.assister?`<span>(${g.assister})</span>`:''}</div>`).join('')}</div><details><summary>READ MATCH REPORT</summary><p>${m.report}</p><div class="report-note">Photos can be added to this match later via <code>assets/matches/${m.id}/</code>.</div></details></article>`;
}

function renderPlayers(){
  const ps=calcStats();
  app.innerHTML=`<section><div class="page-title">SQUAD <span>///</span></div><div class="player-grid">${ps.map(p=>`<button class="player-card" onclick="showPlayer('${escapeJs(p.name)}')"><div class="shirt-num">${p.no}</div><div class="player-name">${p.name}</div><small>${p.pos} • ${p.apps} APP • ${p.goals} G</small></button>`).join('')}</div></section>`;
}
function showPlayer(name){
  const p=calcStats().find(x=>x.name===name); if(!p) return;
  app.innerHTML=`<section><button class="back" onclick="nav('players')">← BACK TO SQUAD</button><article class="card player-profile"><div class="profile-top"><div class="profile-num">#${p.no}</div><div><div class="eyebrow">WESTERHOPE UNITED</div><h1>${p.name}</h1><p>${p.pos}</p></div></div><div class="profile-stats"><div><small>APPEARANCES</small><b>${p.apps}</b></div><div><small>STARTS</small><b>${p.starts}</b></div><div><small>GOALS</small><b>${p.goals}</b></div><div><small>ASSISTS</small><b>${p.assists}</b></div><div><small>G+A</small><b>${p.gA}</b></div><div><small>POTM</small><b>${p.potm}</b></div></div></article></section>`;
}

function renderStats(){
  const ps=calcStats();
  const s=teamStats();
  const goalRank=[...ps].sort((a,b)=>b.goals-a.goals || b.gA-a.gA);
  const assistRank=[...ps].sort((a,b)=>b.assists-a.assists || b.gA-a.gA);
  app.innerHTML=`<section><div class="page-title">STATS <span>///</span></div><article class="card"><div class="section-head"><span>PLAYER LEADERBOARD</span><small>${D.season}</small></div><div class="leader-list">${goalRank.filter(p=>p.apps>0).map((p,i)=>`<div><span class="rank">${i+1}</span><b>#${p.no} ${p.name}</b><span>${p.apps} APP</span><strong>${p.goals} G</strong><strong>${p.assists} A</strong><strong>${p.gA} G+A</strong></div>`).join('')}</div></article><article class="card"><div class="section-head"><span>TEAM SNAPSHOT</span></div><div class="snapshot"><div><small>WIN RATE</small><b>${s.winPct}%</b></div><div><small>CLEAN SHEET RATE</small><b>${s.played?Math.round(s.clean/s.played*100):0}%</b></div><div><small>GOALS / GAME</small><b>${s.played?(s.gf/s.played).toFixed(2):'0.00'}</b></div><div><small>GOALS CONCEDED / GAME</small><b>${s.played?(s.ga/s.played).toFixed(2):'0.00'}</b></div></div></article><article class="card"><div class="section-head"><span>HOME / AWAY</span></div><div class="snapshot"><div><small>HOME WINS</small><b>${s.home.w}/${s.home.p}</b></div><div><small>AWAY WINS</small><b>${s.away.w}/${s.away.p}</b></div><div><small>AWAY WIN RATE</small><b>${s.away.p?Math.round(s.away.w/s.away.p*100):0}%</b></div><div><small>HOME WIN RATE</small><b>${s.home.p?Math.round(s.home.w/s.home.p*100):0}%</b></div></div></article></section>`;
}

function renderTable(){
  const link=D.leagueTableUrl;
  app.innerHTML=`<section><div class="page-title">LEAGUE TABLE <span>///</span></div><article class="card table-card"><h2>OFFICIAL LEAGUE TABLE</h2><p>We'll connect this to the league's official live table once you give us the league-table URL.</p>${link?`<a class="cta link" href="${link}" target="_blank" rel="noopener">OPEN OFFICIAL TABLE →</a>`:'<div class="placeholder">LEAGUE TABLE LINK TO BE ADDED</div>'}</article></section>`;
}

function prettyDate(d){return new Date(d+'T12:00:00').toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'}).toUpperCase();}
function prettyDateLong(d){return new Date(d+'T12:00:00').toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'long',year:'numeric'}).toUpperCase();}
function escapeJs(s){return s.replace(/\\/g,'\\\\').replace(/'/g,"\\'");}

nav('home');
if('serviceWorker' in navigator) window.addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));
