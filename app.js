const D = window.WUFC_DATA;
const app = document.getElementById('app');
const tabs = [...document.querySelectorAll('.tab')];

function playerByName(name){ return D.squad.find(p => p.name === name || p.short === name) || null; }
function label(name){ const p = playerByName(name); return p ? p.short : (name || '—'); }
function safePhoto(p){ return p && p.photo ? p.photo : ''; }

// Opposition crest mapping. Team names and crest filenames are deliberately independent.
const CLUB_CRESTS = {
  'Bedlington FC U13 Malaga': 'assets/clubs/bedlington-fc.png',
  'Ponteland United Juniors U13 Rockets': 'assets/clubs/ponteland-united.png',
  'Killingworth F.C. U13 Blues': 'assets/clubs/killingworth-fc.png',
  'Killingworth F.C. U13 Reds': 'assets/clubs/killingworth-fc.png',
  'North Shields Juniors U13 Blacks': 'assets/clubs/north-shields.jpeg',
  'Blakelaw Football Club U13 Roma': 'assets/clubs/blakelaw.jpeg',
  'Cramlington Blue Star FC U13 Milan': 'assets/clubs/cramlington-blue-star.jpeg',
  'Cramlington Town Juniors U13 Cramlington': 'assets/clubs/cramlington-town-juniors.jpeg',
  'Red Row Raptors U13 Red Row Raptors u13s': 'assets/clubs/red-row-raptors.jpeg',
  'Red Row Raptors': 'assets/clubs/red-row-raptors.jpeg',
  'Berwick Rangers Community Academy U13 Be': 'assets/clubs/berwick.rangers.jpeg'
};

const NORTH_SHIELDS_PREVIEW = {
  opponent: 'North Shields Juniors U13 Blacks',
  shortOpponent: 'NORTH SHIELDS JUNIORS U13 BLACKS',
  date: '2026-09-13',
  time: '09:30',
  venue: 'Home',
  competition: 'NFL U13 Division 10',
  facebook: 'https://www.facebook.com/share/r/1DbJdNLtgK/?mibextid=wwXIfr',
  lineupImage: 'assets/matches/north-shields/lineup.jpeg',
  starters: ['Johnny','Kyran','Kane','Ewan','Joseph','Freddie','Jake','Oliver','Charlie'],
  bench: ['Blake','Theo','Ollie','Yusuf'],
  unavailable: [],
  paragraphs: [
    `Two away games, four points, five goals scored and just one conceded. Now, finally, the Silvers are coming home for the first time in 2026/27. Sunday brings the first home game of the new season, the first chance to pull on the famous black and white, and another opportunity to extend a strong unbeaten run that stretches back into the promotion-winning end to last season.`,
    `North Shields will provide another proper test. The sides met twice last season, sharing a win apiece, and both games were fiercely competitive. There is no expectation of an easy morning at Valley View, but the opening week has shown that this group is ready to compete in the new division.`,
    `<h3>👕 OLLIE IS BACK</h3>One of the biggest stories of the morning is the return of <b>Ollie Anderson</b>. After missing the opening two games with a wrist injury, the injury is now fully healed and Ollie is ready to make his first appearance of the season. He is currently sitting on <b>39 Silvers appearances</b>, so a cameo on Sunday could bring the 40 Club into view.`,
    `<h3>🧤 JOHNNY</h3>Johnny remains in goal after two excellent performances to open the season. He kept a clean sheet at Cramlington and produced a string of outstanding saves at Blakelaw to earn <b>Player of the Match</b>. Another assured performance could make it a very good opening week for the goalkeeper.`,
    `<h3>🛡️ KYRAN • KANE • EWAN</h3>Kyran keeps his place at right-back after an encouraging first start. <b>Kane</b> remains at centre-back after taking <b>Players' Player in both opening games</b>. Ewan comes in at left-back, his most familiar position, giving the back three a slightly different balance while rewarding the progress he showed in midweek.`,
    `<h3>⚡ JOSEPH • FREDDIE • JAKE • OLIVER</h3>Joseph continues on the right after helping create Oliver's opener at Blakelaw. Captain Freddie and Jake continue in the middle after two hardworking performances. On the left, <b>Oliver</b> arrives with <b>two goals and two assists</b> from the opening week, including goal number 21 at Blakelaw.`,
    `<h3>🎯 CHARLIE</h3>Charlie leads the line again after two goals at Cramlington and a battling appearance at Blakelaw despite taking a painful knock. He starts Sunday on <b>29 Silvers goals</b>, with number 30 now just one away.`,
    `<h3>💪 A STRONG BENCH</h3>The bench is now as strong as it has been all season: <b>Blake, Theo, Ollie and Yusuf</b>. That depth is exactly what the coaches hoped the larger squad would provide — not because previous starters have done anything wrong, but because everyone deserves a chance to contribute.`,
    `<h3>🏠 HOME AT LAST</h3>Sunday is about more than simply another fixture. It is the first time this season the players get to walk out at Valley View and wear the black and white in front of their home support. Coach Jeff's message is simple: keep doing the things you know are right, keep listening, keep working for each other, and the performance will take care of itself.`,
    `<b>GAME THREE /// HOME AT LAST.</b><br><br>There is a long season ahead, but this is another chance to take a step forward. <b>UP THE HOPE ///</b>`
  ]
};

const RED_ROW_NEXT = {
  opponent: 'Red Row Raptors',
  shortOpponent: 'RED ROW RAPTORS',
  date: '2026-09-20',
  time: '09:30',
  venue: 'Home',
  competition: 'Sunday U13 Presidents Cup — Second Round',
  facebook: 'https://www.facebook.com/share/r/14p5mPWS7ok/?mibextid=wwXIfr',
  lineupImage: 'assets/matches/red-row/lineup.jpeg',
  starters: ['Johnny','Kyran','Kane','Theo','Yusuf','Jake','Ollie','Oliver','Charlie'],
  bench: ['Blake','Ewan','Joseph'],
  unavailable: ['Freddie'],
  paragraphs: [
    `Three league games unbeaten. Seven points from nine. An eight-game unbeaten run stretching back into the final stages of last season. But now the league takes a back seat for a week — it is time for cup football. And for the first time this season, the Silvers have a <b>home cup tie at Valley View</b>.`,
    `<h3>👀 A FAMILIAR OPPONENT</h3>Red Row Raptors are certainly no strangers to Westerhope. Last season, Red Row edged a competitive game <b>3–2</b> when the Silvers travelled to them. When they came to Valley View later in the campaign, however, Westerhope produced a memorable <b>6–1 victory</b> during the promotion run. Different season, different competition, different circumstances — but the same two teams, with a place in the next round at stake.`,
    `<h3>🧤 JOHNNY</h3>Johnny starts again after an excellent opening three games. Now on <b>42 Silvers appearances</b>, he has already produced several important saves this season and will need to stay alert in a cup tie where one moment can change everything.`,
    `<h3>🛡️ KYRAN • KANE • THEO</h3>Kyran continues at right-back. Kane anchors the defence after being voted <b>Players’ Player in all three league games</b>. Theo starts on the left after an excellent Player of the Match performance against North Shields.`,
    `<h3>⚡ YUSUF • JAKE • OLLIE • OLIVER</h3>With <b>Freddie unavailable</b> this week, Ollie Anderson returns to the starting XI after making his <b>40th Silvers appearance</b> last weekend — and marking it with an assist. Jake continues alongside him, Yusuf starts on the right and Oliver keeps his place on the left after an excellent opening to the campaign.`,
    `<h3>⚽ CHARLIE</h3>Charlie leads the line after reaching <b>31 career Silvers goals</b> against North Shields, including his milestone 30th. He gets another chance to lead the attack in a cup tie where the next goal could be crucial.`,
    `<h3>💪 STRONG OPTIONS</h3>The bench gives the coaches plenty to work with: <b>Blake, Ewan and Joseph</b>. All three have already shown they can make a positive impact, giving the Silvers valuable options as the game develops.`,
    `<h3>🧠 THE MESSAGE</h3>Both coaches have worked the boys hard this week. The message is simple: <b>work rate, discipline, communication, bravery and togetherness.</b> If a challenge is lost, win the next one. If a chance is missed, look for the next one. And when the opportunity arrives, take it.`,
    `<h3>🏠 VALLEY VIEW • BLACK & WHITE • CUP DAY</h3>This is the Silvers’ <b>first home cup outing of 2026/27</b>. The memories of last season are there, but so is the opportunity to write a new chapter. Sunday starts 0–0, and both teams will be looking for the same thing: a place in the next round.`,
    `<b>MATCHDAY 04 ///</b><br><br>Sunday morning. 09:30. Valley View. First home cup tie of the season. <b>UP THE HOPE ///</b>`
  ]
};


const BERWICK_NEXT = {
  opponent: 'Berwick Rangers Community Academy U13 Be',
  shortOpponent: 'BERWICK RANGERS COMMUNITY ACADEMY U13',
  date: '2026-09-27',
  time: 'TBC',
  venue: 'Away',
  competition: 'Cup — details TBC',
  facebook: '',
  lineupImage: '',
  starters: [],
  bench: [],
  unavailable: [],
  paragraphs: [
    `The Silvers head north next weekend for their longest trip of the season, with another cup challenge waiting in Berwick. The competition details and kick-off time will be confirmed in due course.`,
    `<b>MATCHDAY 05 ///</b><br><br>More details to follow. <b>UP THE HOPE ///</b>`
  ]
};

const NORTH_SHIELDS_FULLTIME_VIDEO = 'https://www.facebook.com/share/r/1D57M5jrQt/?mibextid=wwXIfr';

const BLAKELAW_PREVIEW = {
  opponent: 'Blakelaw Football Club U13 Roma',
  shortOpponent: 'BLAKELAW FC U13 ROMA',
  date: '2026-09-08',
  time: '18:00',
  venue: 'Away',
  competition: 'NFL U13 Division 10',
  facebook: 'https://www.facebook.com/share/r/1HfQn7ypMg/?mibextid=wwXIfr',
  lineupImage: 'assets/matches/blakelaw/lineup.jpeg',
  starters: ['Johnny','Kyran','Kane','Theo','Joseph','Freddie','Jake','Oliver','Charlie'],
  bench: ['Ewan','Yusuf','Blake'],
  unavailable: ['Ollie'],
  paragraphs: [
    `There hasn't been much time to enjoy the first one. After beginning life in their new division with an excellent <b>4–0 away victory at Cramlington Blue Star Milan on Sunday</b>, tomorrow night the U13 Silvers are back on the road. <b>Game Two.</b> And another very different challenge.`,
    `Sunday gave the boys plenty to be proud of. Four goals. A clean sheet. Three points. But more importantly, <b>every single player contributed.</b> The attitude, determination, resilience and togetherness were exactly what coaches <b>Jeff Stubbs and Stephen Anderson</b> had asked for before kick-off. Tomorrow, we need it all again. Because <b>Sunday's result counts for absolutely nothing once the whistle blows at Blakelaw.</b>`,
    `<h3>⚔️ ANOTHER PROPER TEST</h3>We know enough about Blakelaw to know there will be <b>no easy game tomorrow night</b>. They reached the semi-final of a cup competition last season and, although they've started this campaign with defeat against Bedlington, that result certainly won't have us underestimating them.`,
    `And Silvers supporters know Bedlington rather well… last season's champions, our nemesis, and the team who eventually finished <b>just one agonising point ahead of Westerhope</b> in the race for the title. So there isn't a huge amount we're going to read into Blakelaw's opening result. Instead, tomorrow gives us another opportunity to find out a little more about <b>ourselves</b> at this new level.`,
    `Can we compete physically again? Can we keep the ball when we're under pressure? Can we create chances? Can we show the same positivity when things don't go our way? And can we produce Sunday's work rate all over again? <b>We'll find out.</b>`,
    `<h3>🔄 SQUAD STRENGTH</h3>There will be changes to the starting nine tomorrow. <b>Nobody who started at Cramlington has lost their place because they did anything wrong.</b> Quite the opposite. Everybody performed so well that the coaches now have the opportunity — and responsibility — to give other members of the squad the same chance to show what they can do from the first whistle. This season is going to need <b>every player</b>.`,
    `<h3>🧤 JOHNNY</h3><b>Johnny</b> continues in goal after an excellent and mature performance on Sunday. Two important saves. One clean sheet. Tomorrow's target? <b>Make it two.</b>`,
    `<h3>🛡️ KYRAN • KANE • THEO</h3>There's a first Silvers start for <b>Kyran</b> at right-back. Sunday was his competitive debut and, after a few understandable early nerves, his attitude shone through. His head never dropped, he kept competing and he grew into the game. Tomorrow he gets his reward: <b>a first start for the Silvers.</b>`,
    `Alongside him, <b>Kane</b> continues in the centre following an outstanding defensive display and his <b>Players' Player of the Match</b> award. On the left is <b>Theo</b>, fresh from an excellent opening-day performance and <b>Player of the Match</b>. Sunday's two award winners plus a player making his first start — plenty to look forward to.`,
    `<h3>⚡ JOSEPH • FREDDIE • JAKE • OLIVER</h3>After causing plenty of problems when introduced on Sunday, <b>Joseph earns a start</b> on the right. In the middle, <b>captain Freddie and Jake go again</b>. Freddie produced a genuine captain's performance, while Jake bossed large parts of the midfield and celebrated his <b>40th Silvers appearance</b> by scoring the opening goal of the season.`,
    `On the left, <b>Oliver</b> will be looking to continue an outstanding start: <b>1 goal, 2 assists and 3 goal contributions</b> on Sunday. His goal was Silvers goal number <b>20</b>, while those assists took him to <b>10 and then 11 career assists</b>. Twenty goals. Eleven assists. Thirty-one goal contributions. And apparently the goal was a cross. <b>We're still not having it.</b> 😂🚀`,
    `<h3>🎯 CHARLIE</h3>Leading the line again is <b>Charlie</b>. Two goals on opening day, but perhaps even more encouraging was his attitude when the chances weren't going in. Keep running. Keep competing. Forget the last opportunity. Look for the next one. Charlie currently sits on <b>29 Silvers goals</b>. The next one? <b>NUMBER 30.</b> 👀`,
    `<h3>💪 OPTIONS FROM THE BENCH</h3><b>Ewan, Yusuf and Blake</b> provide three strong options from the bench. Ewan adapted brilliantly at left-back on Sunday, Yusuf caused problems down the right, and Blake showed one of our favourite development moments by losing one physical challenge and attacking the next one even harder and winning it. All three will have a part to play.`,
    `We're unfortunately still without <b>Ollie</b>, who remains sidelined for the next few weeks. Another milestone waits when he returns: <b>39 Silvers appearances</b>. The next one will be #40.`,
    `<h3>🌙 MIDWEEK FOOTBALL</h3>A full day at school. Then straight into football. Different routines. Different energy levels. A Tuesday night away from home. That's another challenge in itself. The boys will need to switch on quickly.`,
    `<b>Sunday was excellent. But Sunday has gone.</b> Tomorrow starts <b>0–0</b>. No goals. No clean sheet. No three points. Nothing is carried over. If we want another performance like Cramlington, <b>we have to earn it all over again.</b>`,
    `Bring the attitude. Bring the work rate. Bring the courage. Bring the belief. <b>Play for each other.</b> Jeff and Stephen simply want to see that same commitment again — another positive performance and another opportunity to give the parents and supporters something to be proud of.`,
    `<b>GAME TWO /// LET'S GO.</b><br><br>🟡⚫ <b>UP THE HOPE ///</b>`
  ]
};


// Matchday 02 result — added after the final whistle at Blakelaw.
// Kept in app.js so we preserve the established data.js/history/table baseline.
if (D.matches && !D.matches.some(m => m.id === 'm2')) {
  if (D.matches[0] && D.matches[0].id === 'm1') D.matches[0].date = '2026-09-06';
  D.matches.push({
    id: 'm2',
    date: '2026-09-08',
    competition: 'NFL U13 Division 10',
    venue: 'Away',
    opponent: 'Blakelaw Football Club U13 Roma',
    shortOpponent: 'Blakelaw FC U13 Roma',
    gf: 1, ga: 1, htFor: 1, htAgainst: 1,
    captain: 'Freddie Cowan',
    potm: 'Johnny Collinson',
    playersPlayer: 'Kane Rogerson',
    cleanSheet: false,
    starters: ['Johnny Collinson','Kyran Archbold','Kane Rogerson','Theo Demosthenous','Joseph Winwood','Freddie Cowan','Jake Armstrong','Oliver Stubbs','Charlie Mulligan'],
    subs: ['Ewan Dodds','Yusuf Syed Ubaidur Rahman','Blake Smith'],
    goals: [{minute:4, scorer:'Oliver Stubbs', assister:'Joseph Winwood'}],
    headline: 'A hard-fought point.',
    next: 'North Shields Juniors U13 Blacks',
    nextDate: '2026-09-13',
    nextTime: '09:30',
    nextVenue: 'Valley View',
    nextHome: true,
    report: [
      `Sometimes you arrive at a football pitch and know immediately that you are going to have to adapt. Tonight was definitely one of those nights. The Silvers arrived at Blakelaw for their first midweek fixture of the season on a high following Sunday's excellent <b>4–0 victory at Cramlington</b>.`,
      `During the warm-up it quickly became apparent that this would be a very different test. The wind was absolutely howling, while the pitch was one of the most undulating surfaces this group has played on, with a huge drop from one side to the other and long grass helping the ball hold up. Pretty football was never going to be easy. <b>Adaptability, physicality and graft were going to matter.</b>`,
      `<h3>🏅 A FIRST START FOR KYRAN</h3>After making his competitive debut on Sunday and growing brilliantly into the game, <b>Kyran Archbold made his first start for the Silvers</b> at right-back. Joseph was also rewarded with a start on the right after impressing from the bench against Cramlington. Nobody had lost a place because they had performed badly; the coaches wanted to use the strength of the squad and give players who had earned their opportunity a chance from the first whistle.`,
      `The starting nine was Johnny in goal; Kyran, Kane and Theo in defence; Joseph, captain Freddie, Jake and Oliver across midfield; and Charlie leading the line. Ewan, Yusuf and Blake provided the options from the bench, while Ollie remained unavailable through injury and stays on 39 Silvers appearances.`,
      `<h3>⚽ 4' | BLAKELAW 0–1 WESTERHOPE | OLIVER</h3>Westerhope kicked off with the gale behind them. Four minutes in, <b>Jake won possession in midfield</b> and played an excellent ball between Blakelaw's centre-back and left-back into Joseph. Joseph drove a powerful effort across goal; the keeper produced a fantastic save but could not hold it. Arriving from the left, <b>Oliver took one touch and lashed the rebound underneath the goalkeeper.</b>`,
      `After reaching his 20th Silvers goal on Sunday, Oliver did not wait long for <b>goal number 21</b>. Joseph's effort created the chance and is recorded as the assist. Two games, two goals for Oliver and a flying start to the new season.`,
      `<h3>⚔️ A PROPER BATTLE</h3>From there it became exactly the competitive game expected. Freddie and Jake battled for everything in midfield, while attacks down both sides were repeatedly snuffed out. At times Westerhope were a little too eager to use the wind, with long passes becoming hit-and-hope balls that travelled through to the Blakelaw goalkeeper rather than allowing the Silvers to build possession.`,
      `On 15 minutes the ball broke to Joseph, whose effort flew just over the bar. Westerhope were creating chances, but an earlier incident had already forced a change: Charlie, chasing down the Blakelaw defence, blocked a clearance and the ball ricocheted painfully into his thumb. He tried to continue but eventually had to come off. Joseph moved centrally and <b>Yusuf</b> entered on the right, and the enforced reshuffle unsettled the Silvers for a spell.`,
      `A long goal kick was then not dealt with cleanly and Blakelaw capitalised to make it <b>1–1</b>. Importantly, no heads dropped.`,
      `<h3>😱 HOW DID THAT STAY OUT?</h3>On 24 minutes Oliver's throw found Theo, who returned the ball before making a superb run into the box. Oliver found him again and Theo produced an acrobatic effort that looked destined for goal, only for Blakelaw to somehow clear it off the line. Ewan was also introduced as both sides continued to change personnel and search for an advantage.`,
      `<b>HALF-TIME: BLAKELAW 1–1 WESTERHOPE.</b> The Silvers had opportunities to go in ahead, but now faced the bigger challenge: the entire second half directly into the gale.`,
      `<h3>🌬️ SECOND HALF | DIG IN</h3>Blakelaw immediately tried to exploit the conditions with long, booming balls over the top. Kane, Kyran, Theo and Ewan had to stay switched on, attacking headers, making clearances and getting bodies in the way. Sometimes it was pretty; sometimes absolutely not. But it was effective.`,
      `<h3>🧤 JOHNNY WAS OUTSTANDING</h3>The opening ten minutes of the second half brought Blakelaw's strongest spell, and Johnny kept answering every question. Save after save, some leaving everyone wondering quite how he had kept the ball out. His alertness, bravery, positioning and maturity were exceptional. At the other end Theo produced another fantastic strike, only to be denied by an equally impressive save from the Blakelaw goalkeeper.`,
      `<h3>🧱 SILVERS DIG DEEP</h3>As the half progressed, this became a game about competing. Kane was immense again, attacking a barrage of corners and putting his body on the line. Freddie made important interceptions at the front post. Theo kept battling, Ewan worked hard after being introduced and Kyran gave everything on his first start until understandably beginning to tire late on.`,
      `When Kyran's work was done, <b>Blake stepped in</b> and made another encouraging contribution, immediately trying to stop the danger high up the pitch and cutting out long balls before they could become attacks.`,
      `<h3>💪 GETTING PHYSICAL</h3>There were signs throughout the team that the Silvers are beginning to understand the physical demands of their new division. Oliver was putting himself about more than we might have seen last season, conceding a few free kicks but showing a greater willingness to compete. Kane continued to set the standard and others are beginning to follow.`,
      `The contest also left a few walking wounded. Joseph took a painful knock around the face and nose, Kane was caught and stamped on during another challenge, Freddie finished with a knock, and Charlie's thumb had already caused his first-half withdrawal. Definitely a night where the first question afterwards was: <b>“Everybody still in one piece?”</b> 😂`,
      `<h3>⚽ CHARLIE RETURNS</h3>Charlie was not finished. Despite the problem with his hand, he wanted another go and returned to the action. A long ball came towards Oliver and his first touch was absolutely beautiful, killing the ball before playing inside to Charlie. Charlie drove at Blakelaw's defence, where their number 14 — an outstanding centre-back who would have been our pick as Blakelaw's standout player — read the situation superbly and halted his progress.`,
      `The ball broke to Jake, who played down the channel towards Joseph. Joseph moved it inside to Yusuf, who took a touch and struck, but the effort went over. Another opportunity gone, and perhaps a moment that summed up the evening: the chances were there, but Westerhope could not quite take enough of them.`,
      `<h3>⏱️ FULL TIME | BLAKELAW 1–1 WESTERHOPE</h3>A point, and probably on balance the right result. But the reaction afterwards was interesting. <b>Last season, we probably lose that game.</b> The conditions, the physical battle, losing Charlie during the first half, playing into a gale, long balls and corners raining down — there were plenty of opportunities for the Silvers to lose control. They did not.`,
      `And perhaps the biggest sign of progress was that the boys seemed <b>disappointed they had not won it</b>. Last season perhaps we are delighted simply to survive that second half and come away with something. Tonight there was a feeling that, had we taken our first-half chances, all three points were there. That is not arrogance. <b>That is growing belief.</b>`,
      `<h3>🏆 PLAYER OF THE MATCH — JOHNNY</h3>Absolutely outstanding. When Westerhope needed him, Johnny was there. Save after save in difficult conditions, excellent concentration and some genuinely superb goalkeeping. After keeping a clean sheet on his 40th Silvers appearance on Sunday, appearance <b>#41</b> produced another huge performance. Thoroughly deserved.`,
      `<h3>🏆 PLAYERS' PLAYER — KANE</h3>Two games. <b>Two Players' Player awards.</b> Another beast of a defensive performance: headers, interceptions, starting attacks, putting his body on the line, getting hurt, getting back up and going again. That is exactly the mentality we want as part of the <b>Silvers DNA</b>.`,
      `<h3>👏 EVERYBODY CONTRIBUTED</h3>Johnny was outstanding. Kyran competed brilliantly on his first start. Kane produced another enormous defensive performance. Theo defended strongly and came incredibly close to scoring. Freddie put in another huge captain's shift. Jake battled throughout and kept looking for the pass to unlock Blakelaw. Joseph earned his start, created the opening goal and kept causing problems despite a nasty knock. Oliver scored career goal #21 and showed another step forward physically. Charlie was forced off but showed his determination by returning. Yusuf worked the right-hand side and came close to finding a winner. Ewan once again adapted when introduced and helped deal with the second-half pressure. Blake came in late and aggressively stopped danger before it developed. Ollie remained unavailable but very much part of the squad.`,
      `<h3>📊 TWO GAMES IN</h3><b>Played 2 • Won 1 • Drawn 1 • Lost 0 • Goals For 5 • Goals Against 1 • Four points from six.</b> Not a bad start to life in the new division, but plenty to learn, plenty to improve and plenty more to come.`,
      `Next up: <b>North Shields on Sunday.</b> Another test, another opportunity and another chance to see what these boys can do.`,
      `Thank you to all the parents and supporters who came along in ridiculous conditions, and a special thank you to <b>Dave for running the line</b>. The boys grafted, competed and refused to buckle. Perhaps most importantly, they came away disappointed with a point. That tells us something.`,
      `<b>UP THE HOPE ///</b>`
    ],
    development: [
      {player:'Kyran Archbold', text:'First Silvers start and competed brilliantly at right-back until tiring late in a demanding game.'},
      {player:'Johnny Collinson', text:'Outstanding concentration and a series of crucial saves in the second half earned Player of the Match.'},
      {player:'Kane Rogerson', text:'Set the physical standard again with headers, interceptions and blocks; Players’ Player for the second game running.'},
      {player:'Blake Smith', text:'Entered late and defended proactively, stopping long balls and danger higher up the pitch.'},
      {player:'Oliver Stubbs', text:'Scored career goal #21 and showed growing confidence in the physical side of the game.'},
      {player:'Charlie Mulligan', text:'Returned after a painful thumb injury and immediately wanted to attack the defence again.'}
    ],
    gallery: []
  });
}


// Matchday 03 result — added after the final whistle at North Shields.
if (D.matches && !D.matches.some(m => m.id === 'm3')) {
  D.matches.push({
    id: 'm3',
    date: '2026-09-13',
    competition: 'NFL U13 Division 10',
    venue: 'Home',
    opponent: 'North Shields Juniors U13 Blacks',
    shortOpponent: 'North Shields Juniors U13 Blacks',
    gf: 3, ga: 1, htFor: 1, htAgainst: 0,
    captain: 'Freddie Cowan',
    potm: 'Theo Demosthenous',
    playersPlayer: 'Kane Rogerson',
    cleanSheet: false,
    starters: ['Johnny Collinson','Kyran Archbold','Kane Rogerson','Ewan Dodds','Joseph Winwood','Jake Armstrong','Freddie Cowan','Oliver Stubbs','Charlie Mulligan'],
    subs: ['Blake Smith','Theo Demosthenous','Ollie Anderson','Yusuf Syed Ubaidur Rahman'],
    goals: [
      {minute:17, scorer:'Charlie Mulligan', assister:'Ollie Anderson'},
      {minute:35, scorer:'Charlie Mulligan', assister:'Oliver Stubbs'},
      {minute:50, scorer:'Joseph Winwood', assister:'Freddie Cowan'}
    ],
    headline: 'First home win. Still unbeaten.',
    next: 'Red Row Raptors',
    nextDate: '2026-09-20',
    nextTime: 'TBC',
    nextVenue: 'Valley View',
    nextHome: true,
    report: [
      `After the gale-force winds and wildly undulating pitch at Blakelaw on Tuesday, Sunday morning was a complete contrast. The sun was out, there was barely any wind and Valley View looked almost perfect as the Silvers arrived for their first home game of the 2026/27 season. After two away matches, four points and an unbeaten start, the boys finally got to pull on the famous black and white in front of the home support.`,
      `There were firsts everywhere. The first home game of the season. The first competitive appearance in the black and white this campaign. And the return of <b>Ollie Anderson</b> after his wrist injury. Ollie came into the game on 39 Silvers appearances, so his return also carried a milestone.`,
      `<h3>⚫⚪ THE STARTING IX</h3>Johnny continued in goal after two strong opening performances. Kyran kept his place at right-back, with Kane in the middle and Ewan returning to his more familiar left-back role. Joseph started on the right, Freddie and Jake continued in central midfield, Oliver was on the left and Charlie led the line. Blake, Theo, Ollie and Yusuf provided the bench options.`,
      `<h3>🔥 FAST START</h3>Westerhope pressed from the first whistle and immediately looked ready for the challenge. In the second minute Charlie broke through, took a touch away from his defender and shot. The North Shields goalkeeper produced an outstanding save, then somehow got across again to push Joseph's follow-up around the post. From the resulting third-minute corner, Joseph whipped in a fast, dipping ball that dropped onto Charlie's head, but the header flew just over.`,
      `The Silvers were winning the ball all over the pitch. Joseph battled down the right, Oliver worked on the left, Ewan and Oliver combined well and Freddie and Jake continued to work hard in midfield. North Shields rarely managed to establish possession deep inside the Westerhope half.`,
      `<h3>🧱 KANE SETS THE TONE</h3>When North Shields finally broke through, Kane once again produced an absolute beast of a tackle just outside the box. He released Kyran, who drove forward and linked with Joseph before the ball was worked back through Freddie and over the top towards Charlie. The pass did not quite get the bounce it needed, but the pattern was clear: win it, move it, attack.`,
      `A North Shields goal kick was headed on to Jake, who found himself in space with nobody close enough to challenge. He brought the ball down and shot wide. Soon afterwards Jake and Charlie combined again to release Joseph, who drove down the line and crossed towards Charlie. Another effort. Another save.`,
      `Then, from another Oliver corner, the Silvers tried something different. Oliver went short to Kyran, who clipped a beautifully arced ball towards Joseph. Joseph met it, but his effort went wide. The chances were beginning to stack up.`,
      `<h3>👕 16' | OLLIE'S RETURN</h3>At sixteen minutes came the moment everyone had been waiting for. <b>Ollie Anderson</b> entered the game for his first appearance of the season — and his <b>40th Silvers appearance</b>.`,
      `<h3>⚽ 17' | WESTERHOPE 1–0 NORTH SHIELDS</h3>It could hardly have been scripted better. Freddie won the ball, moved it to Theo, Theo fed it back inside and Freddie found Ollie. With one touch, Ollie split the North Shields centre-back and right-back and released Charlie. Charlie drove through and drilled the finish under the goalkeeper. <b>1–0.</b>`,
      `For Ollie, almost immediately on his return: <b>40th appearance and an assist.</b> For Charlie, the finish was the milestone we had been watching for. <b>Silvers goal number 30.</b>`,
      `<h3>💨 MORE PRESSURE</h3>North Shields were beginning to tire. A handball on 24 minutes gave Charlie another chance, but his effort sailed over. From the goal kick, Kane fed Ewan, who drove forward and found Ollie. Ollie switched play beautifully to Yusuf, who produced some excellent skill down the wing and delivered a superb cross back towards Jake. Jake touched it and fired over.`,
      `At half-time the feeling was positive but cautious. Westerhope had played an excellent first half and created chance after chance, but they only had one goal to show for it. Everyone knew a second was needed.`,
      `<h3>⚽ 35' | WESTERHOPE 2–0 NORTH SHIELDS</h3>The second goal was another superb piece of football. Theo won the ball and drove forward, Ewan supplied the next pass and Theo released Oliver down the left. Oliver looked up, saw Charlie and produced a pearler of a curling left-footed delivery. Charlie controlled it, took one touch to the edge of the box and then looped a right-foot finish over the goalkeeper into the top corner. <b>2–0.</b>`,
      `Another brace for Charlie. Another assist for Oliver. And another reminder of the partnership that has already started to develop between the two.`,
      `<h3>🔄 THE BENCH MAKES AN IMPACT</h3>Blake came on at right-back while Theo moved further forward onto the left. Twelve minutes into the half Theo drove onto another excellent Ewan pass and forced another save. Joseph followed in, but the North Shields goalkeeper somehow kept that out too. He was having an extraordinary game.`,
      `North Shields did finally break through when the Silvers switched off for a moment and a long ball put their striker clean through. Johnny produced a brilliant save. The rebound looked certain to be tapped in — until Blake arrived. Calm as you like, he cleared the danger.`,
      `That moment said plenty about Blake's development. Last season, perhaps he does not make the recovery or he panics under pressure. Today he was composed, proactive and trusted his own ability to deal with the danger.`,
      `<h3>⚽ 50' | WESTERHOPE 3–0 NORTH SHIELDS</h3>Excellent link-up play between Ollie and Freddie opened the midfield. Freddie took one look and released Joseph. One touch. Then a drilled finish beyond the goalkeeper. <b>3–0.</b>`,
      `<b>Joseph's first goal of the season.</b> After helping create opportunities throughout the morning, he finally got the reward his performance deserved.`,
      `<h3>⚽ 52' | WESTERHOPE 3–1 NORTH SHIELDS</h3>Only two minutes later North Shields responded. A long ball bounced kindly, their striker finished clinically underneath Johnny and suddenly the Silvers had another job to do: manage the game.`,
      `They did. Ewan returned to left-back and began pushing further forward. Theo and Oliver linked well on the left. Charlie moved wider at times. Yusuf continued looking for space and running at defenders. And Blake produced some of his best football yet, making important interceptions and, rather than always going for the long ball, putting his foot on it, taking the sting out of attacks and allowing the team to regroup through Kane and Ewan.`,
      `With six minutes left Ollie was fouled in midfield and stepped up for the free kick himself. His effort bounced off the top of the bar. A goal would have been the perfect ending to an already memorable return.`,
      `With a minute remaining Johnny's long ball was taken down by Theo, who drove towards goal and struck another effort. Again the North Shields goalkeeper produced a fantastic save. He was comfortably their standout performer.`,
      `<h3>🏆 FULL TIME | WESTERHOPE 3–1 NORTH SHIELDS</h3>Three points. The first home win of the season. The first competitive game back in the black and white. And still unbeaten.`,
      `But this was much more than a result. This was a performance built on pressure, movement, resilience and a willingness to keep asking questions.`,
      `<h3>🏆 PLAYER OF THE MATCH — THEO</h3>Theo was excellent again. He covered, drove forward, combined with Ewan and Oliver and repeatedly threatened the North Shields goal. He is maturing game by game and another Player of the Match award was thoroughly deserved.`,
      `<h3>🏆 PLAYERS' PLAYER — KANE</h3>Three games. <b>Three Players' Player awards.</b> Kane has set the standard for the defensive mentality the coaches want the Silvers to develop. Tackles, headers, interceptions and a willingness to put his body on the line — exactly the Silvers DNA.`,
      `<h3>👏 EVERYBODY CONTRIBUTED</h3>Johnny was there when needed and produced a huge save at 3–0. Kyran continued his development at right-back and delivered some excellent balls forward. Kane was a beast at the back once again. Ewan looked completely at home at left-back and supported the attack more and more as the game went on. Joseph scored his first of the season and was a constant threat. Freddie worked tirelessly in midfield and reached a significant career milestone with his assist for Joseph. Jake continued to combine with Freddie and keep the midfield moving. Oliver supplied another assist and remained a constant attacking outlet. Charlie scored another brace and passed 30 career Silvers goals. Blake produced perhaps his best performance for the Silvers yet. Theo earned Player of the Match. Yusuf created space, attacked the wing and supplied dangerous deliveries. Ollie returned from injury, reached 40 appearances and created the opener within a minute of coming on.`,
      `<h3>🏅 MILESTONES</h3><b>Ollie Anderson — 40 Silvers appearances</b>, marked with an immediate assist on his return. <b>Charlie Mulligan — career goal #30, followed by #31.</b> <b>Freddie Cowan — career assist #20</b> with the pass for Joseph's goal. And <b>Kane Rogerson — Players' Player for the third consecutive game.</b>`,
      `<h3>📊 THREE GAMES IN</h3><b>P3 • W2 • D1 • L0 • GF8 • GA2 • GD+6 • 7PTS</b>. The Silvers are unbeaten and, on the current snapshot, sit at the top of the division. Nobody is getting carried away — but seven points from the first nine available in a new division is a fantastic start.`,
      `The coaches are delighted with the direction this group is heading. The boys are learning how to win different types of matches, they are becoming more comfortable with the physical side of the division and, most importantly, they are beginning to believe they belong here.`,
      `Thank you to <b>Van for running the line</b>, to all the parents who helped put the nets up and take them down, and to every supporter who came along and backed the boys.`,
      `Next up is cup football. <b>Red Row Raptors come to Valley View next Sunday for the U13 Presidents Cup Second Round.</b> Kick-off time is still TBC. Red Row will remember last season's 6–1 defeat at Valley View; the Silvers will remember the 3–2 defeat away at Red Row earlier in the campaign. Another chapter is waiting.`,
      `<b>UP THE HOPE ///</b>`
    ],
    development: [
      {player:'Johnny Collinson', text:'Quiet for long spells but absolutely ready when called upon, producing a crucial save at 3–0.'},
      {player:'Blake Smith', text:'Perhaps his best Silvers performance yet, including a calm recovery clearance and mature use of possession.'},
      {player:'Kane Rogerson', text:'Another dominant defensive performance; Players’ Player for the third game running.'},
      {player:'Ewan Dodds', text:'Looked completely at home at left-back and grew increasingly adventurous going forward.'},
      {player:'Theo Demosthenous', text:'Another mature, high-energy performance with defensive work and attacking threat; Player of the Match.'},
      {player:'Freddie Cowan', text:'Tireless midfield work and the perfectly weighted assist for Joseph’s goal brought career assist #20.'},
      {player:'Oliver Stubbs', text:'Another assist, another dangerous display from the left and continued end product.'},
      {player:'Jake Armstrong', text:'Continued to link the midfield and keep the ball moving alongside Freddie.'},
      {player:'Joseph Winwood', text:'Constantly dangerous on the right, created chances early and deservedly scored his first goal of the season.'},
      {player:'Charlie Mulligan', text:'Another brace, reaching career goal #30 and immediately adding #31.'},
      {player:'Kyran Archbold', text:'Another solid start at right-back, combining defensive work with some excellent deliveries forward.'},
      {player:'Yusuf Syed Ubaidur Rahman', text:'Created space, attacked the wing and supplied dangerous deliveries after coming on.'},
      {player:'Ollie Anderson', text:'Returned from injury for his first appearance of the season and his 40th Silvers appearance, then supplied the opening assist almost immediately.'}
    ],
    gallery: []
  });
}

function normaliseTeamName(team){
  return String(team || '')
    .toLowerCase()
    .replace(/&amp;/g,'&')
    .replace(/[^a-z0-9]+/g,' ')
    .replace(/\bfc\b/g,'')
    .replace(/\bfootball club\b/g,'')
    .replace(/\bu13\b/g,'')
    .replace(/\b(?:malaga|rockets|blues|reds|blacks|roma|milan|cramlington|red row raptors u13s|be)\b/g,'')
    .replace(/\s+/g,' ')
    .trim();
}

function crestForTeam(team){
  if(!team) return '';
  if(team === 'Westerhope United U13 Silvers' || team === 'Westerhope United') return 'assets/club-badge.png';
  if(CLUB_CRESTS[team]) return CLUB_CRESTS[team];
  const wanted=normaliseTeamName(team);
  const key=Object.keys(CLUB_CRESTS).find(k=>{
    const nk=normaliseTeamName(k);
    return wanted===nk || wanted.includes(nk) || nk.includes(wanted);
  });
  return key ? CLUB_CRESTS[key] : '';
}

function escapeHtml(value){
  return String(value ?? '').replace(/&/g,'&amp;').replace(/\"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}
function crestImg(team, cls='mini-crest'){
  const src=crestForTeam(team);
  const safeTeam=escapeHtml(team || '');
  if(!src) return '<span class="crest-slot crest-missing" aria-hidden="true">?</span>';
  return `<span class="crest-slot"><img class="${cls}" src="${src}?v=43" alt="${safeTeam}" loading="lazy" onerror="crestFail(this)"></span>`;
}
function crestFail(img){
  const slot=img && img.closest ? img.closest('.crest-slot') : null;
  if(slot) slot.innerHTML='<span class="crest-missing" aria-hidden="true">?</span>';
}
window.crestFail=crestFail;


// League results baseline (official Division 10 results supplied by the user).
// This is intentionally result-driven so the app does not depend on the FA table URL.
const LEAGUE_RESULTS = [
  {date:'2026-09-06', home:'Blakelaw Football Club U13 Roma', away:'Bedlington FC U13 Malaga', hg:1, ag:3},
  {date:'2026-09-06', home:'Cramlington Blue Star FC U13 Milan', away:'Westerhope United U13 Silvers', hg:0, ag:4},
  {date:'2026-09-06', home:'Cramlington Town Juniors U13 Cramlington', away:'Ponteland United Juniors U13 Rockets', hg:1, ag:3},
  {date:'2026-09-06', home:'Killingworth F.C. U13 Blues', away:'North Shields Juniors U13 Blacks', hg:4, ag:4},
  {date:'2026-09-08', home:'Blakelaw Football Club U13 Roma', away:'Westerhope United U13 Silvers', hg:1, ag:1},
  {date:'2026-09-08', home:'Cramlington Blue Star FC U13 Milan', away:'Ponteland United Juniors U13 Rockets', hg:7, ag:0},
  {date:'2026-09-08', home:'Cramlington Town Juniors U13 Cramlington', away:'North Shields Juniors U13 Blacks', hg:4, ag:1},
  {date:'2026-09-08', home:'Killingworth F.C. U13 Blues', away:'Killingworth F.C. U13 Reds', hg:0, ag:1},
  {date:'2026-09-13', home:'Bedlington FC U13 Malaga', away:'Cramlington Blue Star FC U13 Milan', hg:4, ag:1},
  {date:'2026-09-13', home:'Ponteland United Juniors U13 Rockets', away:'Killingworth F.C. U13 Blues', hg:3, ag:2},
  {date:'2026-09-13', home:'Westerhope United U13 Silvers', away:'North Shields Juniors U13 Blacks', hg:3, ag:1}
].sort((a,b)=>a.date.localeCompare(b.date));

const LEAGUE_TEAMS = [
  'Westerhope United U13 Silvers',
  'Bedlington FC U13 Malaga',
  'Ponteland United Juniors U13 Rockets',
  'Cramlington Town Juniors U13 Cramlington',
  'Killingworth F.C. U13 Reds',
  'Cramlington Blue Star FC U13 Milan',
  'Killingworth F.C. U13 Blues',
  'Blakelaw Football Club U13 Roma',
  'North Shields Juniors U13 Blacks'
];
const LEAGUE_TEAM_STYLES = {
  'Westerhope United U13 Silvers':'#ffd500',
  'Bedlington FC U13 Malaga':'#f2c300',
  'Ponteland United Juniors U13 Rockets':'#e53935',
  'Cramlington Town Juniors U13 Cramlington':'#d32f2f',
  'Killingworth F.C. U13 Reds':'#e53935',
  'Cramlington Blue Star FC U13 Milan':'#1e66f5',
  'Killingworth F.C. U13 Blues':'#2563eb',
  'Blakelaw Football Club U13 Roma':'#9ca3af',
  'North Shields Juniors U13 Blacks':'#60a5fa'
};
const LEAGUE_SHORT_NAMES = {
  'Westerhope United U13 Silvers':'Westerhope',
  'Bedlington FC U13 Malaga':'Bedlington',
  'Ponteland United Juniors U13 Rockets':'Ponteland',
  'Cramlington Town Juniors U13 Cramlington':'Cramlington Town',
  'Killingworth F.C. U13 Reds':'Killingworth Reds',
  'Cramlington Blue Star FC U13 Milan':'Cramlington Blue Star',
  'Killingworth F.C. U13 Blues':'Killingworth Blues',
  'Blakelaw Football Club U13 Roma':'Blakelaw',
  'North Shields Juniors U13 Blacks':'North Shields'
};
function leagueTableFromResults(results=LEAGUE_RESULTS){
  const rows=Object.fromEntries(LEAGUE_TEAMS.map(t=>[t,{team:t,p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0,results:[]} ]));
  const ordered=[...results].sort((a,b)=>a.date.localeCompare(b.date));
  ordered.forEach(r=>{
    if(!rows[r.home] || !rows[r.away]) return;
    rows[r.home].p++; rows[r.away].p++;
    rows[r.home].gf+=r.hg; rows[r.home].ga+=r.ag;
    rows[r.away].gf+=r.ag; rows[r.away].ga+=r.hg;
    const hw=r.hg>r.ag;
    if(hw){ rows[r.home].w++; rows[r.home].pts+=3; rows[r.away].l++; }
    else if(r.hg<r.ag){ rows[r.away].w++; rows[r.away].pts+=3; rows[r.home].l++; }
    else { rows[r.home].d++; rows[r.away].d++; rows[r.home].pts++; rows[r.away].pts++; }
    rows[r.home].results.push({date:r.date,opponent:r.away,venue:'Home',gf:r.hg,ga:r.ag});
    rows[r.away].results.push({date:r.date,opponent:r.home,venue:'Away',gf:r.ag,ga:r.hg});
  });
  Object.values(rows).forEach(r=>r.gd=r.gf-r.ga);
  return Object.values(rows).sort((a,b)=>b.pts-a.pts||b.gd-a.gd||b.gf-a.gf||a.team.localeCompare(b.team)).map((r,i)=>({...r,pos:i+1}));
}
function leagueFormSeries(team){
  const own=LEAGUE_RESULTS.filter(r=>r.home===team||r.away===team).sort((a,b)=>a.date.localeCompare(b.date));
  let pts=0; const series=[{game:0,pts:0}];
  const form=[];
  own.forEach(r=>{
    const home=r.home===team; const gf=home?r.hg:r.ag; const ga=home?r.ag:r.hg;
    const result=gf>ga?'W':gf<ga?'L':'D';
    pts += result==='W'?3:result==='D'?1:0;
    series.push({game:series.length,pts});
    form.push(result);
  });
  return {series,form,games:own.length};
}
function leagueFormSummary(team){
  const f=leagueFormSeries(team), last=f.form.slice(-5), last3=last.slice(-3);
  let currentUnbeaten=0, currentWins=0;
  for(let i=f.form.length-1;i>=0;i--){ if(f.form[i]==='L') break; currentUnbeaten++; }
  for(let i=f.form.length-1;i>=0;i--){ if(f.form[i]!=='W') break; currentWins++; }
  const lastPts=last3.reduce((n,x)=>n+(x==='W'?3:x==='D'?1:0),0);
  return {form:last.join(''),last3:last3.join(''),pointsLast3:lastPts,currentUnbeaten,currentWins,games:f.games};
}
function leagueTrackerSvg(){
  const width=980,height=430,pad={l:56,r:24,t:28,b:72};
  const maxGame=Math.max(3,...LEAGUE_TEAMS.map(t=>leagueFormSeries(t).games));
  const maxPts=Math.max(9,...LEAGUE_TEAMS.map(t=>leagueFormSeries(t).series.at(-1).pts));
  const x=g=>pad.l+(g/maxGame)*(width-pad.l-pad.r);
  const y=p=>height-pad.b-(p/maxPts)*(height-pad.t-pad.b);
  const yStep=Math.max(1,Math.ceil(maxPts/6));
  const yTicks=[]; for(let p=0;p<=maxPts;p+=yStep) yTicks.push(p); if(yTicks.at(-1)!==maxPts)yTicks.push(maxPts);
  const grid=yTicks.map(v=>`<line x1="${pad.l}" y1="${y(v)}" x2="${width-pad.r}" y2="${y(v)}" stroke="rgba(255,255,255,.10)"/><text x="${pad.l-10}" y="${y(v)+4}" fill="rgba(255,255,255,.60)" text-anchor="end" font-size="12">${v}</text>`).join('');
  const xTicks=Array.from({length:maxGame+1},(_,g)=>`<line x1="${x(g)}" y1="${pad.t}" x2="${x(g)}" y2="${height-pad.b}" stroke="rgba(255,255,255,.05)"/><text x="${x(g)}" y="${height-pad.b+24}" fill="rgba(255,255,255,.65)" text-anchor="middle" font-size="12">${g===0?'START':'G'+g}</text>`).join('');
  const lines=LEAGUE_TEAMS.map((team,idx)=>{
    const ser=leagueFormSeries(team).series;
    const pts=ser.map(d=>`${x(d.game)},${y(d.pts)}`).join(' ');
    const color=LEAGUE_TEAM_STYLES[team]||'#aaa';
    const sw=team==='Westerhope United U13 Silvers'?4:2.2;
    const opacity=team==='Westerhope United U13 Silvers'?1:.72;
    const crest=crestForTeam(team);
    const final=ser.at(-1);
    const imgSize=team==='Westerhope United U13 Silvers'?34:30;
    const imgX=x(final.game)-imgSize/2;
    const imgY=y(final.pts)-imgSize/2;
    return `<polyline class="league-team-line team-line-${idx}" data-team-index="${idx}" points="${pts}" fill="none" stroke="${color}" stroke-width="${sw}" stroke-linejoin="round" stroke-linecap="round" opacity="${opacity}"/>`+
      ser.slice(1).map(d=>`<circle class="league-team-point team-point-${idx}" data-team-index="${idx}" cx="${x(d.game)}" cy="${y(d.pts)}" r="${team==='Westerhope United U13 Silvers'?5:3.5}" fill="${color}" opacity="${opacity}"/>`).join('')+
      (crest ? `<image class="league-team-crest-end" data-team-index="${idx}" href="${crest}?v=43" x="${imgX}" y="${imgY}" width="${imgSize}" height="${imgSize}" preserveAspectRatio="xMidYMid meet" aria-label="${escapeHtml(LEAGUE_SHORT_NAMES[team]||team)} latest points" style="cursor:pointer"/>` : '');
  }).join('');
  return `<div class="league-chart-wrap"><svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Cumulative league points by games played">${grid}${xTicks}${lines}<text x="${pad.l}" y="15" fill="rgba(255,255,255,.70)" font-size="12" letter-spacing="2">CUMULATIVE POINTS</text><text x="${width/2}" y="${height-16}" fill="rgba(255,255,255,.55)" font-size="11" text-anchor="middle">GAMES PLAYED BY EACH TEAM — LINES STOP WHEN THAT TEAM STOPS PLAYING</text></svg></div>`;
}
function leagueFormGroups(){
  const table=leagueTableFromResults();
  const groups=[];
  table.forEach(r=>{
    let g=groups.find(x=>x.pts===r.pts);
    if(!g){g={pts:r.pts,teams:[]};groups.push(g)}
    g.teams.push(r);
  });
  return `<div class="form-groups">${groups.map((g,gi)=>{
    const teams=g.teams.map(r=>{
      const f=leagueFormSummary(r.team);
      const idx=LEAGUE_TEAMS.indexOf(r.team);
      return `<button class="form-team-pill ${r.team==='Westerhope United U13 Silvers'?'our-team':''}" type="button" data-team-index="${idx}" title="Highlight ${escapeHtml(r.team)} on the graph"><span class="form-pill-crest">${crestImg(r.team,'table-crest')}</span><span class="form-pill-name">${escapeHtml(LEAGUE_SHORT_NAMES[r.team])}</span><span class="form-pill-meta">${r.p} P • ${r.pts/r.p?(r.pts/r.p).toFixed(2):'0.00'} PPG • ${escapeHtml(f.form||'—')}</span></button>`;
    }).join('');
    return `<div class="form-group"><div class="form-group-head"><b>${g.pts} ${g.pts===1?'PT':'PTS'}</b><span>${g.teams.length===1?'':g.teams.length+' teams level'}</span></div><div class="form-group-teams">${teams}</div></div>`;
  }).join('')}</div>`;
}
function wireLeagueTracker(){
  const root=document.querySelector('.league-form-card');
  if(!root) return;
  const svg=root.querySelector('.league-chart-wrap svg');
  const setActive=(idx)=>{
    root.querySelectorAll('[data-team-index]').forEach(el=>{
      const same=String(el.dataset.teamIndex)===String(idx);
      if(el.classList.contains('league-team-line')) el.style.opacity=same?'1':'.12';
      else if(el.classList.contains('league-team-point')) el.style.opacity=same?'1':'.10';
      else if(el.classList.contains('league-team-crest-end')) el.style.opacity=same?'1':'.25';
      else if(el.classList.contains('form-team-pill')) el.classList.toggle('active',same);
    });
  };
  root.querySelectorAll('.form-team-pill').forEach(btn=>btn.addEventListener('click',()=>{
    const idx=Number(btn.dataset.teamIndex);
    const already=btn.classList.contains('active');
    if(already){
      root.querySelectorAll('.league-team-line,.league-team-point,.league-team-crest-end').forEach(el=>el.style.opacity='');
      root.querySelectorAll('.form-team-pill').forEach(el=>el.classList.remove('active'));
    } else setActive(idx);
  }));
  root.querySelectorAll('.league-team-crest-end').forEach(img=>img.addEventListener('click',()=>setActive(Number(img.dataset.teamIndex))));
}


// Matchday 04 result — Red Row Raptors, 2026-09-20.
if (D.matches && !D.matches.some(m => m.id === 'm4')) {
  D.matches.push({
    id: 'm4',
    date: '2026-09-20',
    competition: 'Sunday U13 Presidents Cup — Second Round',
    venue: 'Home',
    opponent: 'Red Row Raptors',
    shortOpponent: 'RED ROW RAPTORS',
    gf: 4, ga: 1, htFor: 2, htAgainst: 0,
    captain: 'Theo Demosthenous',
    potm: 'Theo Demosthenous',
    playersPlayer: 'Jake Armstrong',
    cleanSheet: false,
    starters: ['Johnny Collinson','Kyran Archbold','Kane Rogerson','Theo Demosthenous','Joseph Winwood','Jake Armstrong','Ollie Anderson','Oliver Stubbs','Charlie Mulligan'],
    subs: ['Ewan Dodds','Blake Smith'],
    goals: [
      {minute:13, scorer:'Jake Armstrong', assister:'Theo Demosthenous'},
      {minute:17, scorer:'Oliver Stubbs', assister:'Ollie Anderson'},
      {minute:35, scorer:'Jake Armstrong', assister:'Theo Demosthenous'},
      {minute:50, scorer:'Oliver Stubbs', assister:'Ollie Anderson'}
    ],
    headline: 'Into the next round.',
    next: 'Berwick Rangers Community Academy U13 Be',
    nextDate: '2026-09-27',
    nextTime: 'TBC',
    nextVenue: 'Away',
    nextHome: false,
    report: [
      `There is something different about cup football. One game, one opportunity, one chance to make the next round — and on Sunday the Silvers produced exactly the sort of performance the occasion demanded. After three unbeaten league games and a first home cup tie of the season, Red Row Raptors arrived at Valley View with plenty of history between the sides.`,
      `<h3>⏰ ONE HOUR TO GO</h3>There was a late setback before kick-off when <b>Yusuf</b> was ruled out through illness. That meant <b>Joseph</b> was drafted into the starting XI at short notice. It was an opportunity he grabbed with both hands, bringing energy and attacking intent from the first whistle.`,
      `<h3>⚫⚪ THE STARTING XI</h3>Johnny started in goal, with Kyran, Kane and Theo across the back. Joseph joined Jake, Ollie and Oliver across midfield, with Charlie leading the line. Ewan and Blake provided options from the bench, while Freddie was unavailable this week.`,
      `<h3>🔥 SILVERS SET THE TEMPO</h3>Westerhope began on the front foot. Inside two minutes, <b>Joseph and Charlie</b> pressed Red Row into a corner. Another attack soon followed as Ollie found Joseph, whose shot produced another corner. Theo then won the ball down the left before Oliver drove into the box and tested the goalkeeper, who was already showing that he was going to be a significant factor in the game.`,
      `From another corner Ollie delivered beautifully and Jake's first-time strike went narrowly over. Charlie nearly connected with a loose corner, Jake had another effort over the bar, and then a sequence of headers from Jake, Theo and Ollie somehow failed to make the ball drop inside the Red Row goalmouth. Charlie eventually lashed at it, only to see the effort hit the side netting.`,
      `<h3>🧱 DEFENCE INTO ATTACK</h3>Kane continued doing the important work whenever Red Row threatened, winning challenges and helping the team turn defence into attack. Kyran was disciplined when moving forward, often taking the extra touch before finding Joseph and stretching the play. Ewan and Theo also combined intelligently whenever the shape changed.`,
      `<h3>⚽ 13' | WESTERHOPE 1–0 RED ROW</h3>The breakthrough came from a brilliant team move. Theo played into the channels for Oliver, who chose the team option rather than forcing the dribble. Ollie returned it to Theo, the ball went back towards Oliver and a throw-in followed. Theo took the throw to Oliver, who immediately returned it. Theo then sent a long, deep ball into the box. <b>Jake controlled it perfectly and smashed home.</b>`,
      `<h3>⚽ 17' | WESTERHOPE 2–0 RED ROW</h3>Four minutes later, Ollie dropped deep, won the ball and combined with Jake to create space. He looked up and saw Oliver. A beautifully weighted ball split the defence and Oliver finished emphatically into the corner. <b>2–0.</b>`,
      `The pattern continued. Charlie remained a constant threat behind the last defender and on 20 minutes Jake played an excellent ball between the centre-backs to release him. Charlie shot at the keeper and once again the Red Row goalkeeper saved. Joseph then worked the right side to win another corner, Ollie delivered and Jake's effort was deflected.`,
      `<h3>🏁 HALF-TIME | WESTERHOPE 2–0 RED ROW</h3>It was a superb first-half performance. Red Row had struggled to escape the Westerhope press and the Silvers had created a stream of chances. The only frustration was that the lead was not larger.`,
      `<h3>⚽ 35' | WESTERHOPE 3–0 RED ROW</h3>The second half began with another lesson in patience. Johnny played to Kane, Kane found Blake, Blake recycled to Kane, and the ball moved through Ewan, Jake and Ollie. Theo chased what looked like a lost ball, kept it in and drilled it across the box. <b>Jake arrived unexpectedly and looped the finish over the goalkeeper.</b> <b>3–0.</b>`,
      `<h3>⚽ RED ROW 1–3 WESTERHOPE</h3>Red Row responded almost immediately. A long ball caught the defence slightly static and the Red Row attacker finished underneath Johnny. It was the only time Johnny was really called upon in the game, but the setback did not unsettle the Silvers.`,
      `<h3>💪 CONTROL THE GAME</h3>The coaches continued changing the formation and moving players into different roles. Kyran pushed higher and drove at the opposition. Joseph supported the right side. Ewan was excellent on the left, stretching the pitch and doing exactly what he had been asked to do. Blake settled into his defensive work and helped take the sting out of Red Row attacks rather than simply clearing the ball away.`,
      `There were chances everywhere. Kyran shot over from a loose ball. Ollie fired over. Joseph and Jake saw efforts saved. Oliver tested the goalkeeper again. Charlie did almost everything except score, continuing to run, press and battle despite the ball refusing to fall kindly for him.`,
      `<h3>⚽ 50' | WESTERHOPE 4–1 RED ROW</h3>Ollie won possession in midfield and drove forward. Oliver had tucked inside and was calling for the ball. Ollie found him. Oliver took it onto his right foot and curled a superb effort through the crowd and into the bottom corner. <b>4–1.</b> Two goals for Oliver, two for Jake.`,
      `<h3>🏆 PLAYER OF THE MATCH — THEO</h3>There were plenty of candidates, but the opposition selected <b>Theo</b> after another excellent all-round performance. He won the ball, drove forward, created opportunities and was involved in the move for the third goal. A thoroughly deserved award.`,
      `<h3>🏆 PLAYERS' PLAYER — JAKE</h3>After three successive Players' Player awards for Kane, the boys had a new winner. <b>Jake</b> took the award after scoring twice and producing another huge midfield performance. It was close, but his two goals gave him the edge.`,
      `<h3>👏 EVERYBODY PLAYED THEIR PART</h3><b>Johnny</b> was protected by an excellent defence for most of the afternoon and stayed concentrated when required. <b>Kyran</b> adapted superbly as his role changed. <b>Kane</b> continued to marshal the back line and win the important challenges. <b>Theo</b> produced another outstanding performance. <b>Joseph</b> stepped into the starting XI at short notice and worked tirelessly. <b>Jake</b> scored twice and controlled the midfield. <b>Ollie</b> returned to the starting XI and supplied two assists. <b>Oliver</b> scored twice. <b>Charlie</b> worked relentlessly even though the goal would not come. <b>Ewan</b> was excellent when introduced, especially in stretching the left side. <b>Blake</b> produced another calm and increasingly mature defensive display. <b>Yusuf</b> was unfortunately unavailable through illness. <b>Freddie</b> was unavailable this week but remains an important part of the group.`,
      `<h3>🏆 INTO THE NEXT ROUND</h3>When the final whistle went, the score read <b>Westerhope United 4–1 Red Row Raptors</b>. The Silvers had done everything the coaches had asked: worked hard, stayed disciplined, adapted their shape and played for each other. Most importantly, they had earned their place in the next round of the Presidents Cup.`,
      `That is now <b>four unbeaten this season</b>. The league form has been excellent, but the biggest positive is that the boys continue learning how to win different types of games. This one needed quality, movement, discipline and fitness — and they produced all four.`,
      `<h3>🚌 NEXT UP — BERWICK</h3>Now comes our longest trip of the season. A Berwick side awaits in another cup challenge away from home. The coaches will debrief the performance at Tuesday training, the boys will recover, and then we'll go again.`,
      `A huge thank you to all the parents and supporters who came along, to everyone who helped with the nets and Respect banners, and to <b>Mull for running the line</b>. Another fantastic Sunday morning for the Silvers. <b>UP THE HOPE ///</b>`
    ],
    development: [
      {player:'Johnny Collinson', text:'A quiet afternoon by his standards, but stayed concentrated and dealt with Red Row when called upon.'},
      {player:'Kyran Archbold', text:'Adapted to different roles, defended with discipline and showed confidence when driving forward.'},
      {player:'Kane Rogerson', text:'Another strong defensive display, winning important challenges and helping turn defence into attack.'},
      {player:'Theo Demosthenous', text:'Outstanding all-round performance; Player of the Match after contributing defensively and in attack.'},
      {player:'Joseph Winwood', text:'Stepped into the starting XI at short notice and responded with energy, pressing and attacking intent.'},
      {player:'Jake Armstrong', text:'Two goals, huge midfield work rate and Players’ Player after a superb performance.'},
      {player:'Ollie Anderson', text:'Returned to the starting XI and supplied two assists, showing excellent vision and composure.'},
      {player:'Oliver Stubbs', text:'Two excellent finishes and another dangerous attacking performance from the left and inside.'},
      {player:'Charlie Mulligan', text:'Relentless running and pressing; a frustrating afternoon in front of goal but never stopped working.'},
      {player:'Ewan Dodds', text:'Excellent after coming on, especially in stretching the left side and helping control the game.'},
      {player:'Blake Smith', text:'Calm, mature defending and good decisions in possession when the team needed to take the sting out of attacks.'}
    ]
  });
}

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
function blankHistory(){ return {apps:0,starts:0,goals:0,assists:0,potm:0,pp:0,cleanSheets:0}; }
function historicalFor(name){
  return (D.historical && D.historical[name]) || blankHistory();
}
function historical2024For(name){
  return (D.historical2024_25 && D.historical2024_25[name]) || blankHistory();
}
function careerFor(name,p){
  const h24=historical2024For(name), h25=historicalFor(name);
  return {
    apps:h24.apps+h25.apps+p.apps, starts:h24.starts+h25.starts+p.starts,
    goals:h24.goals+h25.goals+p.goals, assists:h24.assists+h25.assists+p.assists,
    gA:h24.goals+h24.assists+h25.goals+h25.assists+p.gA,
    potm:h24.potm+h25.potm+p.potm, pp:h24.pp+h25.pp+p.pp,
    cleanSheets:h24.cleanSheets+h25.cleanSheets+(p.cleanSheets||0), captain:p.captain
  };
}
function nextMilestone(value, marks){ return marks.find(m=>m>value) || null; }
function playerMilestone(name,p){
  const c=careerFor(name,p);
  const candidates=[];
  const push=(label,value,marks)=>{ const next=nextMilestone(value,marks); if(next) candidates.push({type:label,value,next,diff:next-value}); };
  push('APPEARANCES',c.apps,[10,15,20,25,30,40,50,75,100]);
  push('GOALS',c.goals,[10,15,20,25,30,40,50,75,100]);
  push('ASSISTS',c.assists,[10,15,20,25,30,40,50,75,100]);
  push('GOAL CONTRIBUTIONS',c.gA,[10,25,30,40,50,75,100,125]);
  return candidates.sort((a,b)=>a.diff-b.diff||a.next-b.next)[0] || null;
}
function milestoneWatch(){
  return calcStats().map(p=>({p,m:playerMilestone(p.name,p)})).filter(x=>x.m).sort((a,b)=>a.m.diff-b.m.diff||b.p.gA-a.p.gA||a.p.short.localeCompare(b.p.short));
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
function leagueTeamStats(){
  const rows=LEAGUE_RESULTS.filter(r=>r.home==='Westerhope United U13 Silvers'||r.away==='Westerhope United U13 Silvers');
  const played=rows.length;
  let won=0,draw=0,lost=0,gf=0,ga=0;
  rows.forEach(r=>{
    const home=r.home==='Westerhope United U13 Silvers';
    const f=home?r.hg:r.ag, a=home?r.ag:r.hg;
    gf+=f; ga+=a;
    if(f>a) won++; else if(f===a) draw++; else lost++;
  });
  const home=rows.filter(r=>r.home==='Westerhope United U13 Silvers');
  const away=rows.filter(r=>r.away==='Westerhope United U13 Silvers');
  const rec=arr=>({p:arr.length,w:arr.filter(r=>{const home=r.home==='Westerhope United U13 Silvers'; return (home?r.hg:r.ag)>(home?r.ag:r.hg);}).length,d:arr.filter(r=>{const home=r.home==='Westerhope United U13 Silvers'; return (home?r.hg:r.ag)===(home?r.ag:r.hg);}).length,l:arr.filter(r=>{const home=r.home==='Westerhope United U13 Silvers'; return (home?r.hg:r.ag)<(home?r.ag:r.hg);}).length});
  return {played,won,draw,lost,gf,ga,gd:gf-ga,pts:won*3+draw,winPct:played?Math.round(won/played*100):0,home:rec(home),away:rec(away)};
}
function nav(view){
  tabs.forEach(t=>t.classList.toggle('active',t.dataset.view===view));
  ({home:renderHome,matches:renderMatches,players:renderPlayers,stats:renderStats,table:renderTable}[view]||renderHome)();
  window.scrollTo({top:0,behavior:'smooth'});
}
tabs.forEach(t=>t.addEventListener('click',()=>nav(t.dataset.view)));

function matchHeroPath(m){
  if(!m) return '';
  if(m.id==='m1') return 'assets/matches/cramlington/hero.jpeg';
  if(m.id==='m2') return 'assets/matches/blakelaw/hero.jpeg';
  if(m.id==='m3') return 'assets/matches/north-shields/hero.jpeg';
  if(m.id==='m4') return 'assets/matches/red-row/hero.jpeg';
  return '';
}
function heroMarkup(m, placement){
  const src=matchHeroPath(m);
  if(!src) return `<section class="card latest-hero-placeholder"><div class="latest-hero-overlay"><div class="eyebrow">MATCHDAY ${m?.id==='m3'?'03':'LATEST'} ///</div><strong>${m?.headline||'LATEST MATCH'}</strong><small>Hero photo coming soon</small></div></section>`;
  const labelText = placement==='home' ? 'LATEST MATCH' : 'MATCH HERO';
  return `<section class="card latest-hero-card"><button class="latest-hero-button" type="button" onclick="openMatch('${m.id}')"><img src="${src}?v=43" alt="${m.shortOpponent} match hero"><div class="latest-hero-overlay"><div class="eyebrow">${labelText} ///</div><strong>${m.venue==='Home'?'WESTERHOPE UNITED':' '+m.shortOpponent} ${scoreLabel(m)}</strong><small>${m.venue==='Home'?'WESTERHOPE UNITED v '+m.shortOpponent:m.shortOpponent+' v WESTERHOPE UNITED'} • ${prettyDate(m.date)}</small></div></button></section>`;
}
function renderHome(){
  const s=teamStats(), ls=leagueTeamStats(), ps=calcStats(), last=D.matches[D.matches.length-1];
  const topScorer=[...ps].sort((a,b)=>b.goals-a.goals||a.short.localeCompare(b.short))[0];
  const topAssist=[...ps].sort((a,b)=>b.assists-a.assists||a.short.localeCompare(b.short))[0];
  const topGA=[...ps].sort((a,b)=>b.gA-a.gA||a.short.localeCompare(b.short))[0];
  const charlie=ps.find(p=>p.short==='Charlie');
  const next = last.next;
  const nextCrest = crestImg(next,'mini-crest small');
  const nextTime = last.nextTime || (last.id==='m1' ? BLAKELAW_PREVIEW.time : 'TBC');
  const nextVenue = last.nextVenue || (last.nextHome ? 'Valley View' : 'Away');
  const nextHome = !!last.nextHome;
  const nextPreview = last.next === RED_ROW_NEXT.opponent ? RED_ROW_NEXT : (last.next === NORTH_SHIELDS_PREVIEW.opponent ? NORTH_SHIELDS_PREVIEW : (last.next === BLAKELAW_PREVIEW.opponent ? BLAKELAW_PREVIEW : (last.next === BERWICK_NEXT.opponent ? BERWICK_NEXT : null)));
  const nextActions = nextPreview ? `<div class="home-preview-actions"><button class="cta" onclick="openNextPreview()">READ MATCH PREVIEW →</button>${nextPreview.facebook ? `<a class="secondary-cta" href="${nextPreview.facebook}" target="_blank" rel="noopener">🎬 MATCHDAY VIDEO</a>` : ''}</div>` : `<div class="home-preview-actions"><span class="secondary-cta disabled-link">PREVIEW COMING SOON</span></div>`;
  const nextTeams = nextHome
    ? `<div>${crestImg('Westerhope United','mini-crest small')}<b>WESTERHOPE<br>UNITED</b></div><span>V</span><div>${nextCrest}<b>${last.next.toUpperCase()}</b></div>`
    : `<div>${nextCrest}<b>${last.next.toUpperCase()}</b></div><span>V</span><div>${crestImg('Westerhope United','mini-crest small')}<b>WESTERHOPE<br>UNITED</b></div>`;
  app.innerHTML=`
    <section class="hero-kpis card"><div class="eyebrow">${D.season} SEASON</div><div class="kpis">${[['P',s.played],['W',s.won],['D',s.draw],['L',s.lost],['GF',s.gf],['GA',s.ga],['GD',s.gd>=0?'+'+s.gd:s.gd]].map(x=>`<div><b>${x[0]}</b><strong>${x[1]}</strong></div>`).join('')}</div></section>
    <section class="card league-spotlight"><div class="league-spot-left"><span class="eyebrow">LEAGUE SNAPSHOT</span><strong>${ls.pts} PTS</strong><small>Northumberland Football League • U13 Division 10</small></div><div class="league-spot-stats"><span><b>P</b>${ls.played}</span><span><b>W</b>${ls.won}</span><span><b>GF</b>${ls.gf}</span><span><b>GD</b>${ls.gd>=0?'+'+ls.gd:ls.gd}</span></div><button class="secondary-cta" onclick="nav('table')">VIEW TABLE →</button></section>
    ${heroMarkup(last,'home')}
    <section class="two-col">
      <article class="card result-card"><div class="section-head"><span>LATEST RESULT</span><small>${prettyDate(last.date)}</small></div><div class="matchup"><div class="team">${last.venue==='Home'?crestImg('Westerhope United','mini-crest'):crestImg(last.opponent,'mini-crest')}<b>${last.venue==='Home'?'WESTERHOPE<br>UNITED':last.shortOpponent}</b></div><div class="score"><div>${last.venue==='Home'?last.gf:last.ga} <span>-</span> ${last.venue==='Home'?last.ga:last.gf}</div><small>HT ${last.venue==='Home'?last.htFor:last.htAgainst}-${last.venue==='Home'?last.htAgainst:last.htFor}</small></div><div class="team">${last.venue==='Home'?crestImg(last.opponent,'mini-crest'):crestImg('Westerhope United','mini-crest')}<b>${last.venue==='Home'?last.shortOpponent:'WESTERHOPE<br>UNITED'}</b></div></div><div class="win-banner">✓ ${last.headline.toUpperCase()}</div><button class="text-link" onclick="openMatch('${last.id}')">VIEW MATCH →</button></article>
      <article class="card next-card"><div class="section-head"><span>NEXT MATCH</span><small>${prettyDate(last.nextDate)}</small></div><div class="next-title">${nextTeams}</div><div class="next-meta">📍 ${nextHome ? 'HOME • '+nextVenue : 'AWAY'} &nbsp; • &nbsp; ${prettyDateLong(last.nextDate)} &nbsp; • &nbsp; KICK-OFF ${nextTime}</div>${nextActions}</article>
    </section>
    <section class="card"><div class="section-head"><span>KEY STATS</span><small>AFTER ${s.played} MATCHES • ALL COMPETITIONS</small></div><div class="stat-grid">${metricCard('⚽','TOP SCORER',topScorer?.short||'—',topScorer?.goals||0)}${metricCard('🎯','ASSIST LEADER',topAssist?.short||'—',topAssist?.assists||0)}${metricCard('📈','GOAL CONTRIBUTIONS',topGA?.short||'—',topGA?.gA||0)}${metricCard('🧤','CLEAN SHEETS','Team',s.clean)}</div></section>
    <section class="two-col"><article class="card"><div class="section-head"><span>CURRENT FORM</span><small>ALL COMPETITIONS</small></div><div class="form-row">${D.matches.slice(-5).map(m=>`<span class="form ${m.gf>m.ga?'w':m.gf===m.ga?'d':'l'}">${m.gf>m.ga?'W':m.gf===m.ga?'D':'L'}</span>`).join('')}</div></article><article class="card"><div class="section-head"><span>DID YOU KNOW?</span></div><div class="didyou"><div class="bulb">💡</div><p><b>${ls.pts} league points:</b> the Silvers are unbeaten after ${ls.played} league games, with ${ls.gf} goals scored and ${ls.ga} conceded. Cup matches do not count towards the league table or league points.</p></div></article></section>
    <section class="card"><div class="section-head"><span>MILESTONE WATCH</span><small>CAREER</small></div>${milestoneWatch().slice(0,3).map(x=>`<div class="mile-row"><b>#${x.p.no} ${x.p.short}</b><span>${x.m.next} ${x.m.type.toLowerCase()}</span><strong>${x.m.diff} to go</strong></div>`).join('')}</section>
    <section class="card quote"><span class="slash">///</span><b>MORE THAN A TEAM. A COMMUNITY.</b><span class="slash">///</span></section>`;
}
function metricCard(icon,label,name,value){return `<div class="metric"><div class="metric-icon">${icon}</div><small>${label}</small><b>${name}</b><strong>${value}</strong></div>`;}

function renderMatches(){
  app.innerHTML=`<section><div class="page-title">MATCHES <span>///</span></div><div class="match-intro">Pre-match previews, starting line-ups, results, reports, statistics and matchday photography — all in one season archive.</div>${upcomingMatchCard()}<div class="archive-heading">MATCH ARCHIVE ///</div>${D.matches.slice().reverse().map(matchCard).join('')}</section>`;
}
function upcomingMatchCard(){
  const last = D.matches[D.matches.length-1];
  const p = last?.next === RED_ROW_NEXT.opponent ? RED_ROW_NEXT : (last?.next === NORTH_SHIELDS_PREVIEW.opponent ? NORTH_SHIELDS_PREVIEW : (last?.next === BLAKELAW_PREVIEW.opponent ? BLAKELAW_PREVIEW : (last?.next === BERWICK_NEXT.opponent ? BERWICK_NEXT : RED_ROW_NEXT)));
  const isHome = p.venue==='Home';
  const previewButton = (p.paragraphs && p.paragraphs.length && p !== BERWICK_NEXT) ? `<button class="cta" onclick="openNextPreview()">READ MATCH PREVIEW →</button>` : `<span class="secondary-cta disabled-link">PREVIEW COMING SOON</span>`;
  return `<article class="card match-card upcoming-card"><div class="section-head"><span>UPCOMING • ${p.competition.toUpperCase()}</span><small>${prettyDate(p.date)}</small></div><div class="match-hero"><div class="hero-team">${isHome?crestImg('Westerhope United','mini-crest'):crestImg(p.opponent,'mini-crest')}<b>${isHome?'WESTERHOPE<br>UNITED':p.shortOpponent}</b></div><div class="match-score preview-v"><strong>V</strong><small>${p.time} KO</small></div><div class="hero-team">${isHome?crestImg(p.opponent,'mini-crest'):crestImg('Westerhope United','mini-crest')}<b>${isHome?p.shortOpponent:'WESTERHOPE<br>UNITED'}</b></div></div><div class="upcoming-meta">${isHome?'🏠 HOME':'✈️ AWAY'} &nbsp; • &nbsp; ${prettyDateLong(p.date)} &nbsp; • &nbsp; KICK-OFF ${p.time}${p.venue==='Home'?' &nbsp; • &nbsp; VALLEY VIEW':''}</div><div class="preview-buttons">${previewButton}${p.facebook?`<a class="secondary-cta" href="${p.facebook}" target="_blank" rel="noopener">🎬 MATCHDAY VIDEO</a>`:''}</div></article>`;
}

function openNextPreview(){
  const last = D.matches[D.matches.length-1];
  if(last?.next === BERWICK_NEXT.opponent){ renderPreview(BERWICK_NEXT,'MATCHDAY 05 ///'); return; }
  if(last?.next === RED_ROW_NEXT.opponent || D.matches.some(m=>m.id==='m3')) { renderPreview(RED_ROW_NEXT,'MATCHDAY 04 ///'); return; }
  const p = NORTH_SHIELDS_PREVIEW;
  renderPreview(p,'MATCHDAY 03 ///');
}
function openPreview(){
  const p = BLAKELAW_PREVIEW;
  renderPreview(p,'MATCHDAY 02 ///');
}
function renderPreview(p,matchLabel){
  const dateLong = prettyDateLong(p.date);
  const starters=p.starters.map(n=>`<span class="chip">#${playerByName(n)?.no??''} ${label(n)}</span>`).join('');
  const bench=p.bench.map(n=>`<span class="chip sub">#${playerByName(n)?.no??''} ${label(n)}</span>`).join('');
  const unavailable=p.unavailable?.length ? `<div class="unavailable-note">UNAVAILABLE • ${p.unavailable.map(n=>label(n)).join(' • ')}</div>` : '';
  app.innerHTML=`<section><button class="back" onclick="nav('matches')">← BACK TO MATCHES</button><article class="card detail-card preview-detail"><div class="section-head"><span>MATCH PREVIEW • ${p.competition.toUpperCase()}</span><small>${prettyDate(p.date)}</small></div><div class="detail-title"><div>${crestImg('Westerhope United','mini-crest')}<b>WESTERHOPE<br>UNITED</b></div><div class="match-score preview-v"><strong>V</strong><small>${p.time} KO</small></div><div>${crestImg(p.opponent,'mini-crest')}<b>${p.shortOpponent}</b></div></div><div class="detail-meta"><span>🏠 <b>HOME</b></span><span>📅 <b>${dateLong.toUpperCase()}</b></span><span>⏰ <b>${p.time}</b></span><span>📍 <b>VALLEY VIEW</b></span></div><div class="preview-media"><img src="${p.lineupImage}?v=43" alt="${p.shortOpponent} starting lineup" class="lineup-image" onerror="this.style.display='none'"><div class="mini-note">Starting XI graphic • home shirt lineup</div>${p.facebook ? `<a class="secondary-cta wide" href="${p.facebook}" target="_blank" rel="noopener">🎬 WATCH MATCHDAY POST →</a>` : ""}</div><div class="report-heading">MATCH PREVIEW ///</div>${p.paragraphs.map(x=>`<p class="report-p preview-p">${x}</p>`).join('')}<div class="report-heading">STARTING IX ///</div><div class="chip-row">${starters}</div><div class="report-heading">BENCH ///</div><div class="chip-row">${bench}</div>${unavailable}<div class="preview-footer"><b>${matchLabel}</b><span>${p.shortOpponent} • ${dateLong.toUpperCase()} • ${p.time}</span><strong>UP THE HOPE ///</strong></div></article></section>`;
  window.scrollTo({top:0,behavior:'smooth'});
}
window.openPreview=openPreview;
window.openNextPreview=openNextPreview;
window.renderPreview=renderPreview;
function scoreLabel(m){ return m.venue==='Home' ? `${m.gf}–${m.ga}` : `${m.ga}–${m.gf}`; }
function matchCard(m){
  const lineup = m.starters.map(n=>`<span class="chip">#${playerByName(n)?.no??''} ${label(n)}</span>`).join('');
  const subs = m.subs.map(n=>`<span class="chip sub">#${playerByName(n)?.no??''} ${label(n)}</span>`).join('');
  const leftTeam = m.venue==='Home' ? `<div class="hero-team">${crestImg('Westerhope United','mini-crest')}<b>WESTERHOPE<br>UNITED</b></div>` : `<div class="hero-team">${crestImg(m.opponent,'mini-crest')}<b>${m.shortOpponent}</b></div>`; const rightTeam = m.venue==='Home' ? `<div class="hero-team">${crestImg(m.opponent,'mini-crest')}<b>${m.shortOpponent}</b></div>` : `<div class="hero-team">${crestImg('Westerhope United','mini-crest')}<b>WESTERHOPE<br>UNITED</b></div>`; return `<article class="card match-card"><div class="section-head"><span>${m.venue.toUpperCase()} • ${m.competition.toUpperCase()}</span><small>${prettyDate(m.date)}</small></div><div class="match-hero">${leftTeam}<div class="match-score"><strong>${scoreLabel(m)}</strong><small>HALF TIME ${m.htAgainst}-${m.htFor}</small></div>${rightTeam}</div>
  <div class="match-flags"><span>🏆 PLAYER OF THE MATCH: <b>${label(m.potm)}</b></span><span>🏆 PLAYERS' PLAYER: <b>${label(m.playersPlayer)}</b></span>${m.cleanSheet?`<span>🧤 CLEAN SHEET</span>`:''}<span>©️ CAPTAIN: <b>${label(m.captain)}</b></span></div>
  <div class="subheading">GOALS</div><div class="goal-timeline">${m.goals.map(g=>`<div class="goal-row"><strong>${g.minute}'</strong><span class="goal-dot">⚽</span><b>${label(g.scorer)}</b>${g.assister?`<span class="assist">(${label(g.assister)})</span>`:`<span class="assist">No assist recorded</span>`}</div>`).join('')}</div>
  <div class="subheading">STARTING XI</div><div class="chip-row">${lineup}</div>
  <div class="subheading">SUBSTITUTES USED</div><div class="chip-row">${subs}</div>
  <button class="cta wide" onclick="openMatch('${m.id}')">READ FULL MATCH REPORT →</button>
  </article>`;
}
function galleryPaths(m){
  // Match gallery files are explicit so real file extensions always match GitHub.
  if(m && m.id==='m1') return ['hero.jpeg','01.jpeg', ...Array.from({length:16},(_,i)=>String(i+2).padStart(2,'0')+'.JPG')];
  if(m && m.id==='m2') return ['hero.jpeg', ...Array.from({length:6},(_,i)=>String(i+1).padStart(2,'0')+'.jpeg')];
  if(m && m.id==='m3') return ['hero.jpeg', ...Array.from({length:11},(_,i)=>String(i+1).padStart(2,'0')+'.JPG'), '12.jpg'];
  if(m && m.id==='m4') return ['hero.jpeg','01.jpeg'];
  return [];
}
function renderGallery(m){
  const files=galleryPaths(m);
  if(!files.length) return '<div class="gallery-empty">📸 <b>Matchday photos coming soon.</b></div>';
  const folder=(m && m.id==='m1')?'cramlington':(m && m.id==='m2')?'blakelaw':(m && m.id==='m3')?'north-shields':(m && m.id==='m4')?'red-row':m.id;
  const base=`assets/matches/${folder}/`;
  return `<div class="match-gallery">${files.map((f,i)=>`<button class="gallery-item ${i===0?'gallery-hero':''}" type="button" onclick="openPhoto('${base}${f}','${m.shortOpponent} • ${i===0?'Match Hero':'Matchday Photo'}')"><img src="${base}${f}?v=43" alt="${m.shortOpponent} ${i===0?'match hero':'matchday photo '+(i)}" loading="lazy" onerror="this.closest('.gallery-item').style.display='none'"></button>`).join('')}</div>`;
}
function openPhoto(src,caption){
  let modal=document.getElementById('photo-modal');
  if(!modal){
    modal=document.createElement('div');
    modal.id='photo-modal';
    modal.className='photo-modal';
    modal.innerHTML='<button class="photo-close" aria-label="Close photo">×</button><div class="photo-modal-inner"><img class="photo-modal-img" alt=""><div class="photo-modal-caption"></div></div>';
    document.body.appendChild(modal);
    modal.querySelector('.photo-close').addEventListener('click',()=>modal.classList.remove('open'));
    modal.addEventListener('click',e=>{ if(e.target===modal) modal.classList.remove('open'); });
    document.addEventListener('keydown',e=>{ if(e.key==='Escape') modal.classList.remove('open'); });
  }
  modal.querySelector('.photo-modal-img').src=src+'?v=43';
  modal.querySelector('.photo-modal-caption').textContent=caption||'';
  modal.classList.add('open');
}
window.openPhoto=openPhoto;
function openMatch(id){
  const m=D.matches.find(x=>x.id===id); if(!m) return;
  const detailLeft = m.venue==='Home' ? `<div>${crestImg('Westerhope United','mini-crest')}<b>WESTERHOPE<br>UNITED</b></div>` : `<div>${crestImg(m.opponent,'mini-crest')}<b>${m.shortOpponent}</b></div>`; const detailRight = m.venue==='Home' ? `<div>${crestImg(m.opponent,'mini-crest')}<b>${m.shortOpponent}</b></div>` : `<div>${crestImg('Westerhope United','mini-crest')}<b>WESTERHOPE<br>UNITED</b></div>`; app.innerHTML=`<section><button class="back" onclick="nav('matches')">← BACK TO MATCHES</button><article class="card detail-card"><div class="section-head"><span>${m.venue.toUpperCase()} • ${m.competition.toUpperCase()}</span><small>${prettyDate(m.date)}</small></div>${heroMarkup(m,'match')}<div class="detail-title">${detailLeft}<div class="match-score"><strong>${scoreLabel(m)}</strong><small>HT ${m.htAgainst}-${m.htFor}</small></div>${detailRight}</div>
  <div class="detail-meta"><span>©️ Captain: <b>${label(m.captain)}</b></span><span>🏆 POTM: <b>${label(m.potm)}</b></span><span>🏆 Players' Player: <b>${label(m.playersPlayer)}</b></span>${m.cleanSheet?`<span>🧤 Clean Sheet</span>`:''}</div>
  ${m.id==='m2'?`<div class="report-heading">PRE-MATCH ARCHIVE ///</div><div class="preview-media"><img src="${BLAKELAW_PREVIEW.lineupImage}?v=26" alt="Blakelaw starting lineup" class="lineup-image" onerror="this.style.display='none'"><a class="cta wide" href="${BLAKELAW_PREVIEW.facebook}" target="_blank" rel="noopener">🎬 VIEW PRE-MATCH FACEBOOK POST →</a><button class="secondary-cta wide" onclick="openPreview()">READ ORIGINAL MATCH PREVIEW →</button></div>`:''}${m.id==='m3'?`<div class="report-heading">PRE-MATCH ARCHIVE ///</div><div class="preview-media"><img src="${NORTH_SHIELDS_PREVIEW.lineupImage}?v=43" alt="North Shields starting lineup" class="lineup-image" onerror="this.style.display='none'"><a class="cta wide" href="${NORTH_SHIELDS_PREVIEW.facebook}" target="_blank" rel="noopener">🎬 VIEW PRE-MATCH FACEBOOK POST →</a><button class="secondary-cta wide" onclick="openNextPreview()">READ ORIGINAL MATCH PREVIEW →</button></div>`:''}${m.id==='m4'?`<div class="report-heading">PRE-MATCH ARCHIVE ///</div><div class="preview-media"><img src="${RED_ROW_NEXT.lineupImage}?v=43" alt="Red Row starting lineup" class="lineup-image" onerror="this.style.display='none'"><a class="cta wide" href="${RED_ROW_NEXT.facebook}" target="_blank" rel="noopener">🎬 VIEW PRE-MATCH FACEBOOK POST →</a><button class="secondary-cta wide" onclick="renderPreview(RED_ROW_NEXT,'MATCHDAY 04 ///')">READ ORIGINAL MATCH PREVIEW →</button></div>`:''}${['m2','m3','m4'].includes(m.id)?`<div class="report-heading">FULL-TIME MEDIA ///</div><div class="preview-media"><a class="cta wide" href="${m.id==='m2'?'https://www.facebook.com/share/r/14rFrdhSK2L/?mibextid=wwXIfr':(m.id==='m3'?NORTH_SHIELDS_FULLTIME_VIDEO:'https://www.facebook.com/share/r/1C5tPsoQw8/?mibextid=wwXIfr')}" target="_blank" rel="noopener">🎬 WATCH FULL-TIME / MATCH REPORT VIDEO →</a></div>`:''}<div class="report-heading">MATCH REPORT</div>${m.report.map(p=>`<p class="report-p">${p}</p>`).join('')}
  <div class="report-heading">GOALS & ASSISTS</div><div class="goal-timeline">${m.goals.map(g=>`<div class="goal-row"><strong>${g.minute}'</strong><span class="goal-dot">⚽</span><b>${label(g.scorer)}</b>${g.assister?`<span class="assist">Assist: ${label(g.assister)}</span>`:`<span class="assist">Assist: —</span>`}</div>`).join('')}</div>
  <div class="report-heading">DEVELOPMENT NOTES</div><div class="dev-list">${m.development.map(x=>`<div class="dev-item"><b>${label(x.player)}</b><p>${x.text}</p></div>`).join('')}</div>
  <div class="report-heading">MATCHDAY GALLERY ///</div>${renderGallery(m)}
  <div class="summary-strip"><div><small>FULL TIME</small><b>${scoreLabel(m)}</b></div><div><small>HALF TIME</small><b>${m.htAgainst}-${m.htFor}</b></div><div><small>GOALS</small><b>${m.goals.length}</b></div><div><small>CLEAN SHEET</small><b>${m.cleanSheet?'YES':'NO'}</b></div></div>
  </article></section>`;
  window.scrollTo({top:0,behavior:'smooth'});
}
window.openMatch=openMatch;

function renderPlayers(){
  const ps=calcStats();
  app.innerHTML=`<section><div class="page-title">SQUAD <span>///</span></div><div class="match-intro">The current Silvers squad, with shirt numbers, photographs and season-to-date stats. Tap a player for their full profile, three-season history and career milestones.</div><div class="player-grid">${ps.map(p=>`<button class="player-card" onclick="showPlayer('${escapeJs(p.name)}')"><div class="player-photo-wrap">${safePhoto(p)?`<img class="player-photo" src="${safePhoto(p)}?v=43" alt="${p.short}" loading="lazy" onerror="photoFail(this)">`:''}<div class="player-placeholder" style="display:${safePhoto(p)?'none':'flex'}"><span>#${p.no}</span></div></div><div class="shirt-num">#${p.no}</div><div class="player-name">${p.short}</div><small>${p.pos} • ${p.apps} APP • ${p.goals} G • ${p.assists} A</small></button>`).join('')}</div></section>`;
}
function photoFail(img){ img.style.display='none'; const ph=img.nextElementSibling; if(ph) ph.style.display='flex'; }
function showPlayer(name){
  const p=calcStats().find(x=>x.name===name); if(!p) return;
  const h25=historicalFor(p.name), h24=historical2024For(p.name), career=careerFor(p.name,p), mile=playerMilestone(p.name,p);
  const photo = safePhoto(p) ? `${safePhoto(p)}?v=43` : '';
  const mileHtml = mile ? `<div class="milestone-banner"><b>🏅 NEXT CAREER MILESTONE</b><span>${mile.next} ${mile.type.toLowerCase()} — <strong>${mile.diff}</strong> to go</span></div>` : '';
  app.innerHTML=`<section><button class="back" onclick="nav('players')">← BACK TO SQUAD</button><article class="card player-profile"><div class="profile-hero"><div class="profile-photo-wrap large">${photo?`<img class="profile-photo" src="${photo}" alt="${p.short}" onerror="photoFail(this)">`:''}<div class="player-placeholder" style="display:${photo?'none':'flex'}"><span>#${p.no}</span></div></div><div class="profile-top"><div class="profile-num">#${p.no}</div><div><div class="eyebrow">${p.short.toUpperCase()} • WESTERHOPE UNITED</div><h1>${p.name}</h1><p>${p.pos}</p>${p.status!=='Active'?`<span class="status-pill">${p.status.toUpperCase()}</span>`:''}</div></div></div>
  <div class="profile-section-title">2026/27</div><div class="profile-stats">${[['APPEARANCES',p.apps],['STARTS',p.starts],['GOALS',p.goals],['ASSISTS',p.assists],['G+A',p.gA],['POTM',p.potm],['PLAYERS’ PLAYER',p.pp],['CAPTAIN',p.captain]].map(x=>`<div><small>${x[0]}</small><b>${x[1]}</b></div>`).join('')}</div>
  <div class="profile-section-title">2025/26</div><div class="profile-stats">${[['APPEARANCES',h25.apps],['STARTS',h25.starts],['GOALS',h25.goals],['ASSISTS',h25.assists],['G+A',h25.goals+h25.assists],['POTM',h25.potm],['PLAYERS’ PLAYER',h25.pp],['CLEAN SHEETS',h25.cleanSheets]].map(x=>`<div><small>${x[0]}</small><b>${x[1]}</b></div>`).join('')}</div>
  <div class="profile-section-title">2024/25</div><div class="profile-stats">${[['APPEARANCES',h24.apps],['STARTS',h24.starts],['GOALS',h24.goals],['ASSISTS',h24.assists],['G+A',h24.goals+h24.assists],['POTM',h24.potm],['PLAYERS’ PLAYER',h24.pp],['CLEAN SHEETS',h24.cleanSheets]].map(x=>`<div><small>${x[0]}</small><b>${x[1]}</b></div>`).join('')}</div>
  <div class="profile-section-title">CAREER TOTAL — 3 SEASONS</div><div class="profile-stats">${[['APPEARANCES',career.apps],['STARTS',career.starts],['GOALS',career.goals],['ASSISTS',career.assists],['G+A',career.gA],['POTM',career.potm],['PLAYERS’ PLAYER',career.pp],['CLEAN SHEETS',career.cleanSheets]].map(x=>`<div><small>${x[0]}</small><b>${x[1]}</b></div>`).join('')}</div>${mileHtml}
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
    <article class="card league-form-card"><div class="section-head"><span>LEAGUE FORM ///</span><small>DIVISION 10 • RESULT-DRIVEN</small></div><div class="mini-note"><b>Built from the individual league results we have captured.</b> Teams stop at the number of games they have actually played, so games in hand are not treated as defeats.</div>${leagueTrackerSvg()}${leagueFormGroups()}</article>
    <article class="card stat-hero"><div class="section-head"><span>SEASON SNAPSHOT</span><small>ALL COMPETITIONS • ${D.season}</small></div><div class="snapshot wide-snapshot">${[['PLAYED',s.played],['WIN %',s.winPct+'%'],['GOALS',s.gf],['CONCEDED',s.ga],['GD',s.gd>=0?'+'+s.gd:s.gd],['CLEAN SHEETS',s.clean],['CLEAN SHEET %',s.cleanPct+'%'],['GOALS / GAME',s.played?(s.gf/s.played).toFixed(2):'0.00']].map(x=>`<div><small>${x[0]}</small><b>${x[1]}</b></div>`).join('')}</div></article>
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
    <article class="card"><div class="section-head"><span>CAREER MILESTONE WATCH</span><small>2024/25 → 2026/27</small></div><div class="milestone-list">${milestoneWatch().slice(0,8).map(x=>`<div class="mile-row"><b>#${x.p.no} ${x.p.short}</b><span>${x.m.next} ${x.m.type.toLowerCase()}</span><strong>${x.m.diff} to go</strong></div>`).join('')}</div><div class="mini-note">Career totals combine the 2024/25 and 2025/26 records with the current 2026/27 season. Milestones are the next useful landmark for appearances, goals, assists or goal contributions.</div></article>
    <article class="card"><div class="section-head"><span>STATS WE CAN UNLOCK LATER</span><small>AS THE DATA GROWS</small></div><div class="unlock-grid"><div><b>SCORING STREAKS</b><span>e.g. 4 goals in last 6 appearances</span></div><div><b>HOME SCORING</b><span>e.g. scored in every home appearance</span></div><div><b>PARTNERSHIPS</b><span>e.g. Joseph + Charlie goal/assist link-ups</span></div><div><b>LINEUP RECORD</b><span>e.g. results when Freddie and Jake start together</span></div></div></article>
  </section>`;
  wireLeagueTracker();
}
function renderTable(){
  const rows=leagueTableFromResults().map(r=>`<tr class="${r.team==='Westerhope United U13 Silvers'?'our-team':''}"><td>${r.pos}</td><td><span class="table-team">${crestImg(r.team,'table-crest')}<b>${r.team}</b></span></td><td>${r.p}</td><td>${r.w}</td><td>${r.d}</td><td>${r.l}</td><td><strong>${r.pts}</strong></td></tr>`).join('');
  const fixtures=(D.upcomingFixtures||[]).map((f,i)=>`<div class="fixture-row ${i===0?'next-fixture':''}"><div><b>${prettyDateLong(f.date)}</b><small>${f.time} • ${f.competition}</small></div><div class="fixture-teams"><span>${crestImg(f.home,'table-crest')}<b>${f.home}</b></span><em>V</em><span>${crestImg(f.away,'table-crest')}<b>${f.away}</b></span></div><small class="fixture-venue">${f.venue}</small></div>`).join('');
  const tableUrl = 'https://fulltime.thefa.com/index.html?league=136980506';
  const resultsUrl = 'https://fulltime.thefa.com/results.html?selectedSeason=260632843&selectedFixtureGroupAgeGroup=10&selectedFixtureGroupKey=1_253565231&selectedRelatedFixtureOption=3&selectedDateCode=all&previousSelectedFixtureGroupAgeGroup=10&previousSelectedFixtureGroupKey=&previousSelectedClub=';
  const fixturesUrl = 'https://fulltime.thefa.com/fixtures.html?selectedSeason=260632843&selectedFixtureGroupAgeGroup=10&selectedFixtureGroupKey=1_253565231&selectedDateCode=all&selectedClub=&selectedTeam=&selectedRelatedFixtureOption=3&selectedFixtureDateStatus=&selectedFixtureStatus=&previousSelectedFixtureGroupAgeGroup=10&previousSelectedFixtureGroupKey=2_117640819&previousSelectedClub=&itemsPerPage=25';
  app.innerHTML=`<section><div class="page-title">TABLE <span>///</span></div>
    <article class="card league-form-card"><div class="section-head"><span>LEAGUE FORM ///</span><small>RESULT-DRIVEN • ${LEAGUE_RESULTS.length} RESULTS</small></div><div class="mini-note">Our league tracker is calculated from the individual Division 10 results captured so far — not the unstable FA table page. ${leagueTrackerSvg()}</div></article>
    <article class="card"><div class="section-head"><span>LEAGUE TABLE</span><small>RESULT-DRIVEN • U13 DIVISION 10</small></div>
      <div class="mini-note live-note"><b>Calculated league snapshot:</b> Built from the ${LEAGUE_RESULTS.length} individual Division 10 results captured to date. Use <b>FA FULL-TIME</b> to navigate to the latest official standings; direct division links can change on the FA site.</div>
      <div class="table-scroll"><table class="league-table"><thead><tr><th>POS</th><th>TEAM</th><th>P</th><th>W</th><th>D</th><th>L</th><th>PTS</th></tr></thead><tbody>${rows}</tbody></table></div>
      <div class="table-actions"><a class="cta link" href="${tableUrl}" target="_blank" rel="noopener noreferrer">OPEN FA FULL-TIME →</a><a class="secondary-cta link" href="${resultsUrl}" target="_blank" rel="noopener noreferrer">OFFICIAL RESULTS →</a><a class="secondary-cta link" href="${fixturesUrl}" target="_blank" rel="noopener noreferrer">ALL FIXTURES →</a></div>
    </article>
    <article class="card"><div class="section-head"><span>WHAT'S NEXT</span><small>UPCOMING FIXTURES</small></div>${fixtures}</article>
  </section>`;
  wireLeagueTracker();
}
function prettyDate(d){return new Date(d+'T12:00:00').toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'}).toUpperCase();}
function prettyDateLong(d){return new Date(d+'T12:00:00').toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'long',year:'numeric'}).toUpperCase();}
function escapeJs(s){return s.replace(/\\/g,'\\\\').replace(/'/g,"\\'");}
nav('home');
