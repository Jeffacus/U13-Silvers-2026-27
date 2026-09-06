const D = window.WUFC_DATA;
const app = document.getElementById('app');
const tabs = [...document.querySelectorAll('.tab')];

function playerByName(name){ return D.squad.find(p => p.name === name || p.short === name) || null; }
function label(name){ const p = playerByName(name); return p ? p.short : (name || '—'); }
function safePhoto(p){ return p && p.photo ? p.photo : ''; }

function calcStats(){
  const out = Object.fromEntries(D.squad.map(p => [p.name, {...p, apps:0, starts:0, goals:0, assists:0, gA:0, potm:0, pp:0, captain:0}]));
  D.matches.forEach(m=>{
    m.starters.forEach(n=>{if(out[n]){out[n].apps++;out[n].starts++;}});
    m.subs.forEach(n=>{if(out[n]) out[n].apps++;});
    m.goals.forEach(g=>{if(out[g.scorer]) out[g.scorer].goals++; if(g.assister && out[g.assister]) out[g.assister].assists++;});
    if(out[m.potm]) out[m.potm].potm++;
    if(out[m.playersPlayer]) out[m.playersPlayer].pp++;
    if(out[m.captain]) out[m.captain].captain++;
  });
  Object.values(out).forEach(p=>p.gA=p.goals+p.assists);
  return Object.values(out);
}
function historicalFor(name){
  return (D.historical && D.historical[name]) || {apps:0,starts:0,goals:0,assists:0,potm:0,pp:0,cleanSheets:0};
}
function teamStats(){
  const played=D.matches.length;
  const won=D.matches.filter(m=>m.gf>m.ga).length;
  const draw=D.matches.filter(m=>m.gf===m.ga).length;
  const lost=D.matches.filter(m=>m.gf<m.ga).length;
  const gf=D.matches.reduce((s,m)=>s+m.gf,0), ga=D.matches.reduce((s,m)=>s+m.ga,0);
  const clean=D.matches.filter(m=>m.cleanSheet).length;
  const home=D.matches.filter(m=>m.venue==='Home'), away=D.matches.filter(m=>m.venue==='Away');
  const rec=arr=>({p:arr.length,w:arr.filter(m=>m.gf>m.ga).length,d:arr.filter(m=>m.gf===m.ga).length,l:arr.filter(m=>m.gf<m.ga).length});
  return {played,won,draw,lost,gf,ga,gd:gf-ga,winPct:played?Math.round(won/played*100):0,clean,cleanPct:played?Math.round(clean/played*100):0,home:rec(home),away:rec(away)};
}
function nav(view){
  tabs.forEach(t=>t.classList.toggle('active',t.dataset.view===view));
  ({home:renderHome,matches:renderMatches,players:renderPlayers,stats:renderStats,table:renderTable}[view]||renderHome)();
  window.scrollTo({top:0,behavior:'smooth'});
}
tabs.forEach(t=>t.addEventListener('click',()=>nav(t.dataset.view)));

function renderHome(){
  const s=teamStats(), ps=calcStats(), last=D.matches[D.matches.length-1];
  const topScorer=[...ps].sort((a,b)=>b.goals-a.goals||a.short.localeCompare(b.short))[0];
  const topAssist=[...ps].sort((a,b)=>b.assists-a.assists||a.short.localeCompare(b.short))[0];
  const topGA=[...ps].sort((a,b)=>b.gA-a.gA||a.short.localeCompare(b.short))[0];
  const charlie=ps.find(p=>p.short==='Charlie');
  app.innerHTML=`
    <section class="hero-kpis card"><div class="eyebrow">${D.season} SEASON</div><div class="kpis">${[['P',s.played],['W',s.won],['D',s.draw],['L',s.lost],['GF',s.gf],['GA',s.ga],['GD',s.gd>=0?'+'+s.gd:s.gd]].map(x=>`<div><b>${x[0]}</b><strong>${x[1]}</strong></div>`).join('')}</div></section>
    <section class="two-col">
      <article class="card result-card"><div class="section-head"><span>LATEST RESULT</span><small>${prettyDate(last.date)}</small></div><div class="matchup"><div class="team"><div class="crest-badge opponent-mark">CB</div><b>${last.shortOpponent}</b></div><div class="score"><div>0 <span>-</span> ${last.gf}</div><small>HT ${last.htAgainst}-${last.htFor}</small></div><div class="team"><img src="assets/club-badge.png?v=5" class="mini-crest" alt="Westerhope badge"><b>WESTERHOPE<br>UNITED</b></div></div><div class="win-banner">✓ ${last.headline.toUpperCase()}</div><button class="text-link" onclick="openMatch('${last.id}')">VIEW MATCH →</button></article>
      <article class="card next-card"><div class="section-head"><span>NEXT MATCH</span><small>${prettyDate(last.nextDate)}</small></div><div class="next-title"><b>${last.next.toUpperCase()}</b><span>V</span><b>WESTERHOPE<br>UNITED</b></div><div class="next-meta">📍 AWAY &nbsp; • &nbsp; ${prettyDateLong(last.nextDate)} &nbsp; • &nbsp; KICK-OFF TBC</div><button class="cta" onclick="nav('matches')">MATCHES →</button></article>
    </section>
    <section class="card"><div class="section-head"><span>KEY STATS</span><small>AFTER ${s.played} GAME${s.played===1?'':'S'}</small></div><div class="stat-grid">${metricCard('⚽','TOP SCORER',topScorer?.short||'—',topScorer?.goals||0)}${metricCard('🎯','ASSIST LEADER',topAssist?.short||'—',topAssist?.assists||0)}${metricCard('📈','GOAL CONTRIBUTIONS',topGA?.short||'—',topGA?.gA||0)}${metricCard('🧤','CLEAN SHEETS','Team',s.clean)}</div></section>
    <section class="two-col"><article class="card"><div class="section-head"><span>CURRENT FORM</span></div><div class="form-row">${D.matches.slice(-5).map(m=>`<span class="form ${m.gf>m.ga?'w':m.gf===m.ga?'d':'l'}">${m.gf>m.ga?'W':m.gf===m.ga?'D':'L'}</span>`).join('')}</div></article><article class="card"><div class="section-head"><span>DID YOU KNOW?</span></div><div class="didyou"><div class="bulb">💡</div><p>${charlie?.short||'Charlie'} has scored <b>${charlie?.goals||0}</b> goal${(charlie?.goals||0)===1?'':'s'} in the opening match of the 2026/27 season.</p></div></article></section>
    <section class="card quote"><span class="slash">///</span><b>MORE THAN A TEAM. A COMMUNITY.</b><span class="slash">///</span></section>`;
}
function metricCard(icon,label,name,value){return `<div class="metric"><div class="metric-icon">${icon}</div><small>${label}</small><b>${name}</b><strong>${value}</strong></div>`;}

function renderMatches(){
  app.innerHTML=`<section><div class="page-title">MATCHES <span>///</span></div><div class="match-intro">Every match gets its own record — result, starting nine, substitutes, goals, assists, awards and the full report.</div>${D.matches.slice().reverse().map(matchCard).join('')}</section>`;
}
function scoreLabel(m){ return m.venue==='Home' ? `${m.gf}–${m.ga}` : `${m.ga}–${m.gf}`; }
function matchCard(m){
  const lineup = m.starters.map(n=>`<span class="chip">#${playerByName(n)?.no??''} ${label(n)}</span>`).join('');
  const subs = m.subs.map(n=>`<span class="chip sub">#${playerByName(n)?.no??''} ${label(n)}</span>`).join('');
  return `<article class="card match-card"><div class="section-head"><span>${m.venue.toUpperCase()} • ${m.competition.toUpperCase()}</span><small>${prettyDate(m.date)}</small></div><div class="match-hero"><div class="hero-team"><div class="crest-badge opponent-mark">CB</div><b>${m.shortOpponent}</b></div><div class="match-score"><strong>${scoreLabel(m)}</strong><small>HALF TIME ${m.htAgainst}-${m.htFor}</small></div><div class="hero-team"><img src="assets/club-badge.png?v=5" class="mini-crest" alt="Westerhope badge"><b>WESTERHOPE<br>UNITED</b></div></div>
  <div class="match-flags"><span>🏆 PLAYER OF THE MATCH: <b>${label(m.potm)}</b></span><span>🏆 PLAYERS' PLAYER: <b>${label(m.playersPlayer)}</b></span><span>🧤 CLEAN SHEET</span><span>©️ CAPTAIN: <b>${label(m.captain)}</b></span></div>
  <div class="subheading">GOALS</div><div class="goal-timeline">${m.goals.map(g=>`<div class="goal-row"><strong>${g.minute}'</strong><span class="goal-dot">⚽</span><b>${label(g.scorer)}</b>${g.assister?`<span class="assist">(${label(g.assister)})</span>`:`<span class="assist">No assist recorded</span>`}</div>`).join('')}</div>
  <div class="subheading">STARTING XI</div><div class="chip-row">${lineup}</div>
  <div class="subheading">SUBSTITUTES USED</div><div class="chip-row">${subs}</div>
  <button class="cta wide" onclick="openMatch('${m.id}')">READ FULL MATCH REPORT →</button>
  </article>`;
}
function openMatch(id){
  const m=D.matches.find(x=>x.id===id); if(!m) return;
  app.innerHTML=`<section><button class="back" onclick="nav('matches')">← BACK TO MATCHES</button><article class="card detail-card"><div class="section-head"><span>${m.venue.toUpperCase()} • ${m.competition.toUpperCase()}</span><small>${prettyDate(m.date)}</small></div><div class="detail-title"><div><div class="crest-badge opponent-mark">CB</div><b>${m.shortOpponent}</b></div><div class="match-score"><strong>${scoreLabel(m)}</strong><small>HT ${m.htAgainst}-${m.htFor}</small></div><div><img src="assets/club-badge.png?v=5" class="mini-crest" alt="Westerhope badge"><b>WESTERHOPE<br>UNITED</b></div></div>
  <div class="detail-meta"><span>©️ Captain: <b>${label(m.captain)}</b></span><span>🏆 POTM: <b>${label(m.potm)}</b></span><span>🏆 Players' Player: <b>${label(m.playersPlayer)}</b></span><span>🧤 Clean Sheet</span></div>
  <div class="report-heading">MATCH REPORT</div>${m.report.map(p=>`<p class="report-p">${p}</p>`).join('')}
  <div class="report-heading">GOALS & ASSISTS</div><div class="goal-timeline">${m.goals.map(g=>`<div class="goal-row"><strong>${g.minute}'</strong><span class="goal-dot">⚽</span><b>${label(g.scorer)}</b>${g.assister?`<span class="assist">Assist: ${label(g.assister)}</span>`:`<span class="assist">Assist: —</span>`}</div>`).join('')}</div>
  <div class="report-heading">DEVELOPMENT NOTES</div><div class="dev-list">${m.development.map(x=>`<div class="dev-item"><b>${label(x.player)}</b><p>${x.text}</p></div>`).join('')}</div>
  <div class="report-heading">MATCHDAY PHOTOS</div><div class="gallery-empty">📸 <b>Photos can be added here.</b><br><span>Upload selected images to <code>assets/matches/${m.id}/</code> and we can connect them to this gallery.</span></div>
  <div class="summary-strip"><div><small>FULL TIME</small><b>${scoreLabel(m)}</b></div><div><small>HALF TIME</small><b>${m.htAgainst}-${m.htFor}</b></div><div><small>GOALS</small><b>${m.goals.length}</b></div><div><small>CLEAN SHEET</small><b>YES</b></div></div>
  </article></section>`;
  window.scrollTo({top:0,behavior:'smooth'});
}
window.openMatch=openMatch;

function renderPlayers(){
  const ps=calcStats();
  app.innerHTML=`<section><div class="page-title">SQUAD <span>///</span></div><div class="match-intro">The current Silvers squad, with shirt numbers, photographs and season-to-date stats. Tap a player for their full profile and last-season comparison.</div><div class="player-grid">${ps.map(p=>`<button class="player-card" onclick="showPlayer('${escapeJs(p.name)}')"><div class="player-photo-wrap">${safePhoto(p)?`<img class="player-photo" src="${safePhoto(p)}?v=5" alt="${p.short}" loading="lazy" onerror="photoFail(this)">`:''}<div class="player-placeholder" style="display:${safePhoto(p)?'none':'flex'}"><span>#${p.no}</span></div></div><div class="shirt-num">#${p.no}</div><div class="player-name">${p.short}</div><small>${p.pos} • ${p.apps} APP • ${p.goals} G • ${p.assists} A</small></button>`).join('')}</div></section>`;
}
function photoFail(img){ img.style.display='none'; const ph=img.nextElementSibling; if(ph) ph.style.display='flex'; }
function showPlayer(name){
  const p=calcStats().find(x=>x.name===name); if(!p) return;
  const h=historicalFor(p.name);
  const career={apps:h.apps+p.apps, starts:h.starts+p.starts, goals:h.goals+p.goals, assists:h.assists+p.assists, gA:h.goals+h.assists+p.gA};
  app.innerHTML=`<section><button class="back" onclick="nav('players')">← BACK TO SQUAD</button><article class="card player-profile"><div class="profile-hero"><div class="profile-photo-wrap large">${safePhoto(p)?`<img class="profile-photo" src="${safePhoto(p)}?v=5" alt="${p.short}" onerror="photoFail(this)">`:''}<div class="player-placeholder" style="display:${safePhoto(p)?'none':'flex'}"><span>#${p.no}</span></div></div><div class="profile-top"><div class="profile-num">#${p.no}</div><div><div class="eyebrow">${p.short.toUpperCase()} • WESTERHOPE UNITED</div><h1>${p.name}</h1><p>${p.pos}</p>${p.status!=='Active'?`<span class="status-pill">${p.status.toUpperCase()}</span>`:''}</div></div></div>
  <div class="profile-section-title">2026/27</div><div class="profile-stats">${[['APPEARANCES',p.apps],['STARTS',p.starts],['GOALS',p.goals],['ASSISTS',p.assists],['G+A',p.gA],['POTM',p.potm],['PLAYERS’ PLAYER',p.pp],['CAPTAIN',p.captain]].map(x=>`<div><small>${x[0]}</small><b>${x[1]}</b></div>`).join('')}</div>
  <div class="profile-section-title">2025/26</div><div class="profile-stats">${[['APPEARANCES',h.apps],['STARTS',h.starts],['GOALS',h.goals],['ASSISTS',h.assists],['G+A',h.goals+h.assists],['POTM',h.potm],['PLAYERS’ PLAYER',h.pp],['CLEAN SHEETS',h.cleanSheets]].map(x=>`<div><small>${x[0]}</small><b>${x[1]}</b></div>`).join('')}</div>
  <div class="profile-section-title">CAREER TOTAL</div><div class="profile-stats">${[['APPEARANCES',career.apps],['STARTS',career.starts],['GOALS',career.goals],['ASSISTS',career.assists],['G+A',career.gA]].map(x=>`<div><small>${x[0]}</small><b>${x[1]}</b></div>`).join('')}</div>
  </article></section>`;
}
window.showPlayer=showPlayer;

function playerMatchHistory(name){
  return D.matches.slice().sort((a,b)=>a.date.localeCompare(b.date)).filter(m=>m.starters.includes(name)||m.subs.includes(name));
}
function playerMatchGoals(name,m){ return m.goals.filter(g=>g.scorer===name).length; }
function playerMatchAssists(name,m){ return m.goals.filter(g=>g.assister===name).length; }
function playerHomeAway(name){
  const hist=playerMatchHistory(name);
  const home=hist.filter(m=>m.venue==='Home'), away=hist.filter(m=>m.venue==='Away');
  const scorerCount=arr=>arr.filter(m=>playerMatchGoals(name,m)>0).length;
  const goals=arr=>arr.reduce((s,m)=>s+playerMatchGoals(name,m),0);
  return {homeApps:home.length,awayApps:away.length,homeScoringApps:scorerCount(home),awayScoringApps:scorerCount(away),homeGoals:goals(home),awayGoals:goals(away)};
}
function recentFormForPlayer(name,n=6){
  const hist=playerMatchHistory(name);
  const recent=hist.slice(-n);
  const goals=recent.reduce((s,m)=>s+playerMatchGoals(name,m),0);
  const assists=recent.reduce((s,m)=>s+playerMatchAssists(name,m),0);
  return {games:recent.length,goals,assists,events:recent.map(m=>({date:m.date,goals:playerMatchGoals(name,m),assists:playerMatchAssists(name,m),opponent:m.shortOpponent})),scoredIn:recent.filter(m=>playerMatchGoals(name,m)>0).length};
}
function playerStreak(name){
  const hist=playerMatchHistory(name);
  let consecutive=0;
  for(let i=hist.length-1;i>=0;i--){ if(playerMatchGoals(name,hist[i])>0) consecutive++; else break; }
  return consecutive;
}
function teamGoalSplits(){
  const first=D.matches.reduce((n,m)=>n+m.goals.filter(g=>g.minute<=30).length,0);
  const second=D.matches.reduce((n,m)=>n+m.goals.filter(g=>g.minute>30).length,0);
  return {first,second,total:first+second};
}
function scorersByVenue(){
  const rows=calcStats().map(p=>({p,...playerHomeAway(p.name)})).filter(x=>x.homeGoals||x.awayGoals).sort((a,b)=>(b.homeGoals+b.awayGoals)-(a.homeGoals+a.awayGoals)||b.p.gA-a.p.gA);
  return rows;
}
function currentHotStreaks(){
  return calcStats().map(p=>({p,form:recentFormForPlayer(p.name,6),streak:playerStreak(p.name)})).filter(x=>x.form.goals>0).sort((a,b)=>b.streak-a.streak||b.form.goals-a.form.goals||b.form.assists-a.form.assists);
}
function pct(a,b){ return b ? Math.round(a/b*100) : 0; }
function renderStats(){
  const ps=calcStats(), s=teamStats(), splits=teamGoalSplits(), venueRows=scorersByVenue(), streaks=currentHotStreaks();
  const rank=[...ps].filter(p=>p.apps>0).sort((a,b)=>b.gA-a.gA||b.goals-a.goals||b.assists-a.assists||a.short.localeCompare(b.short));
  const pairs={};
  D.matches.forEach(m=>m.goals.forEach(g=>{if(g.assister){const key=`${label(g.assister)} → ${label(g.scorer)}`;pairs[key]=(pairs[key]||0)+1;}}));
  const pairRows=Object.entries(pairs).sort((a,b)=>b[1]-a[1]);
  const homeScoreRows=venueRows.map(x=>`<div class="venue-row"><b>${x.p.short}</b><span>${x.homeGoals} home</span><span>${x.awayGoals} away</span><strong>${x.homeGoals+x.awayGoals} total</strong></div>`).join('');
  const streakRows=streaks.slice(0,5).map(x=>`<div class="hot-row"><b>${x.p.short}</b><span>${x.form.goals} goal${x.form.goals===1?'':'s'} in last ${x.form.games} appearance${x.form.games===1?'':'s'}</span>${x.streak>1?`<strong>🔥 ${x.streak} in a row</strong>`:'<strong>• Scored last time out</strong>'}</div>`).join('');
  const cleanPlayers=ps.filter(p=>p.apps>0).map(p=>{const hist=playerMatchHistory(p.name); return {p,count:hist.filter(m=>m.cleanSheet).length};}).sort((a,b)=>b.count-a.count);
  app.innerHTML=`<section>
    <div class="page-title">STATS <span>///</span></div>
    <div class="match-intro">Season-to-date numbers plus the trends that will become more interesting as the matches build up. Form is based on appearances, not minutes.</div>
    <article class="card stat-hero"><div class="section-head"><span>SEASON SNAPSHOT</span><small>${D.season}</small></div><div class="snapshot wide-snapshot">${[['PLAYED',s.played],['WIN %',s.winPct+'%'],['GOALS',s.gf],['CONCEDED',s.ga],['GD',s.gd>=0?'+'+s.gd:s.gd],['CLEAN SHEETS',s.clean],['CLEAN SHEET %',s.cleanPct+'%'],['GOALS / GAME',s.played?(s.gf/s.played).toFixed(2):'0.00']].map(x=>`<div><small>${x[0]}</small><b>${x[1]}</b></div>`).join('')}</div></article>
    <article class="card"><div class="section-head"><span>PLAYER LEADERBOARD</span><small>2026/27</small></div><div class="leader-list"><div class="leader-header"><span>#</span><span>PLAYER</span><span>APP</span><span>G</span><span>A</span><span>G+A</span></div>${rank.map((p,i)=>`<div><span class="rank">${i+1}</span><b>#${p.no} ${p.short}</b><span>${p.apps}</span><strong>${p.goals}</strong><strong>${p.assists}</strong><strong>${p.gA}</strong></div>`).join('')}</div></article>
    <section class="two-col">
      <article class="card"><div class="section-head"><span>HOME / AWAY</span><small>TEAM RECORD</small></div><div class="snapshot">${[['HOME WINS',s.home.w+'/'+s.home.p],['AWAY WINS',s.away.w+'/'+s.away.p],['HOME WIN %',pct(s.home.w,s.home.p)+'%'],['AWAY WIN %',pct(s.away.w,s.away.p)+'%']].map(x=>`<div><small>${x[0]}</small><b>${x[1]}</b></div>`).join('')}</div><div class="mini-note">Home advantage index: ${s.home.p&&s.away.p ? (pct(s.home.w,s.home.p)-pct(s.away.w,s.away.p))+' percentage points' : 'too early to judge'}</div></article>
      <article class="card"><div class="section-head"><span>GOALS BY HALF</span><small>TEAM</small></div><div class="snapshot"><div><small>FIRST HALF</small><b>${splits.first}</b></div><div><small>SECOND HALF</small><b>${splits.second}</b></div><div><small>1ST HALF %</small><b>${pct(splits.first,splits.total)}%</b></div><div><small>2ND HALF %</small><b>${pct(splits.second,splits.total)}%</b></div></div></article>
    </section>
    <article class="card"><div class="section-head"><span>SCORERS — HOME v AWAY</span><small>GOALS</small></div>${homeScoreRows||'<div class="placeholder">No scorers yet.</div>'}</article>
    <section class="two-col">
      <article class="card"><div class="section-head"><span>HOT STREAKS</span><small>LAST 6 APPEARANCES</small></div>${streakRows||'<div class="placeholder">Hot streaks will appear as the season builds.</div>'}<div class="mini-note">A streak is only highlighted strongly once there is a useful run of appearances; one-game stats are shown as a snapshot, not a trend.</div></article>
      <article class="card"><div class="section-head"><span>CLEAN SHEETS</span><small>PLAYER APPEARANCES</small></div>${cleanPlayers.slice(0,7).map(x=>`<div class="hot-row"><b>#${x.p.no} ${x.p.short}</b><span>${x.count} clean sheet${x.count===1?'':'s'} in ${playerMatchHistory(x.p.name).length} appearance${playerMatchHistory(x.p.name).length===1?'':'s'}</span><strong>${pct(x.count,playerMatchHistory(x.p.name).length)}%</strong></div>`).join('')}</article>
    </section>
    <article class="card"><div class="section-head"><span>GOAL COMBINATIONS</span><small>ASSISTER → SCORER</small></div>${pairRows.length?`<div class="combo-list">${pairRows.map(([k,v])=>`<div><b>${k}</b><strong>${v}</strong></div>`).join('')}</div>`:'<div class="placeholder">No recorded combinations yet.</div>'}</article>
    <article class="card"><div class="section-head"><span>STATS WE CAN UNLOCK LATER</span><small>AS THE DATA GROWS</small></div><div class="unlock-grid"><div><b>SCORING STREAKS</b><span>e.g. 4 goals in last 6 appearances</span></div><div><b>HOME SCORING</b><span>e.g. scored in every home appearance</span></div><div><b>PARTNERSHIPS</b><span>e.g. Joseph + Charlie goal/assist link-ups</span></div><div><b>LINEUP RECORD</b><span>e.g. results when Freddie and Jake start together</span></div></div></article>
  </section>`;
}
function renderTable(){
  const link=D.leagueTableUrl;
  app.innerHTML=`<section><div class="page-title">LEAGUE TABLE <span>///</span></div><article class="card table-card"><h2>OFFICIAL LEAGUE TABLE</h2><p>We'll connect this to the official live table when you give us the league-table URL.</p>${link?`<a class="cta link" href="${link}" target="_blank" rel="noopener">OPEN OFFICIAL TABLE →</a>`:'<div class="placeholder">LEAGUE TABLE LINK TO BE ADDED</div>'}</article></section>`;
}
function prettyDate(d){return new Date(d+'T12:00:00').toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'}).toUpperCase();}
function prettyDateLong(d){return new Date(d+'T12:00:00').toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'long',year:'numeric'}).toUpperCase();}
function escapeJs(s){return s.replace(/\\/g,'\\\\').replace(/'/g,"\\'");}
nav('home');
