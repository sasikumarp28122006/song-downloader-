/* ===== DATA: replace with your licensed songs (see About page) ===== */
const H="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-";
const SONGS=[
{id:1,title:"Nilavu Naalil",movie:"Demo Album Vol.1",artist:"Tamil Beats Studio",cats:["Love","Melody"],added:"2026-10-20",plays:980,src:H+"1.mp3",dl:true,hue:270},
{id:2,title:"Kaatru Vaasam",movie:"Demo Album Vol.1",artist:"Demo Artist A",cats:["Melody"],added:"2026-10-18",plays:760,src:H+"2.mp3",dl:true,hue:200},
{id:3,title:"Marina Marai",movie:"Beach Road",artist:"Demo Artist B",cats:["Tamil Hits"],added:"2026-10-15",plays:1500,src:H+"3.mp3",dl:true,hue:310},
{id:4,title:"Thunai Neeye",movie:"Demo Album Vol.2",artist:"Demo Artist C",cats:["Love"],added:"2026-10-12",plays:640,src:H+"4.mp3",dl:true,hue:340},
{id:5,title:"Veera Theme",movie:"Warrior BGM Pack",artist:"Tamil Beats Studio",cats:["BGM"],added:"2026-10-10",plays:420,src:H+"5.mp3",dl:true,hue:20},
{id:6,title:"Mazhai Mugil",movie:"Rainy Days",artist:"Demo Artist A",cats:["Melody","Love"],added:"2026-10-08",plays:1120,src:H+"6.mp3",dl:true,hue:190},
{id:7,title:"Kuthu Kondattam",movie:"Festival Beats",artist:"Demo Artist D",cats:["Tamil Hits"],added:"2026-10-05",plays:1750,src:H+"7.mp3",dl:true,hue:45},
{id:8,title:"Iravu Kavithai",movie:"Demo Album Vol.2",artist:"Demo Artist B",cats:["Love","Melody"],added:"2026-09-30",plays:890,src:H+"8.mp3",dl:true,hue:250},
{id:9,title:"Chase Scene",movie:"Warrior BGM Pack",artist:"Tamil Beats Studio",cats:["BGM"],added:"2026-09-26",plays:510,src:H+"9.mp3",dl:true,hue:0},
{id:10,title:"Pongal Pozhuthu",movie:"Festival Beats",artist:"Demo Artist D",cats:["Tamil Hits"],added:"2026-09-20",plays:1330,src:H+"10.mp3",dl:true,hue:30},
{id:11,title:"Anbe Anbe",movie:"Heartstrings",artist:"Demo Artist C",cats:["Love"],added:"2026-09-14",plays:720,src:H+"11.mp3",dl:true,hue:320},
{id:12,title:"Sample Film Song (licensed)",movie:"Example Movie",artist:"Example Artist",cats:["Tamil Hits","Melody"],added:"2026-10-21",plays:2000,src:"",dl:false,store:"https://www.jiosaavn.com",hue:160}
];
const CATS=["Latest","Trending","Tamil Hits","Melody","Love","BGM"];
const SECTIONS=[["Latest Songs","Latest"],["Trending Songs","Trending"],["Tamil Hits","Tamil Hits"],["Melody Songs","Melody"],["Love Songs","Love"],["BGM","BGM"]];

/* ===== helpers ===== */
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const store={get(k,d){try{return JSON.parse(localStorage.getItem(k))??d}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
let favs=store.get("tb_favs",[]),recent=store.get("tb_recent",[]);
const byId=id=>SONGS.find(s=>s.id==id);
const esc=t=>String(t).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const grad=h=>`linear-gradient(135deg,hsl(${h} 75% 40%),hsl(${(h+70)%360} 90% 55%))`;
const fmt=t=>isFinite(t)?Math.floor(t/60)+":"+String(Math.floor(t%60)).padStart(2,"0"):"0:00";
const list=c=>c==="Latest"?[...SONGS].sort((a,b)=>b.added.localeCompare(a.added)):c==="Trending"?[...SONGS].sort((a,b)=>b.plays-a.plays):SONGS.filter(s=>s.cats.includes(c));
let tt;function toast(msg,type="",spin=false,ms=3200){const t=$("#toast");t.className=type;t.innerHTML=(spin?'<span class="spin"></span>':"")+esc(msg);t.hidden=false;clearTimeout(tt);if(ms)tt=setTimeout(()=>t.hidden=true,ms)}

function card(s){
const fav=favs.includes(s.id);
return `<article class="card ${cur&&cur.id==s.id?"now":""}" data-id="${s.id}">
<div class="cover" style="background:${grad(s.hue)}">🎵<b>${s.dl?"Free download":"Official link"}</b></div>
<h3 title="${esc(s.title)}">${esc(s.title)}</h3><p>${esc(s.movie)}</p><p>${esc(s.artist)}</p>
<div class="acts">
${s.src?`<button class="play" data-a="play">▶ Play</button><button data-a="prev15" title="Play a 15-second preview">Preview</button>`:`<button data-a="store" class="play">Listen</button>`}
<button class="dl" data-a="${s.dl?"dl":"store"}">${s.dl?"⬇ Download":"Get official ↗"}</button>
<button class="icon fav ${fav?"on":""}" data-a="fav" aria-label="Favourite" aria-pressed="${fav}">${fav?"♥":"♡"}</button>
<button class="icon" data-a="share" aria-label="Share">⤴</button>
</div></article>`}

/* ===== render ===== */
function renderHome(){
let h="";
const block=(t,items,more)=>items.length?`<section class="blk"><h2>${t}${more?`<a href="#categories">All categories</a>`:""}</h2><div class="row">${items.map(card).join("")}</div></section>`:"";
h+=block("Recently Played",recent.map(byId).filter(Boolean).slice(0,10));
h+=block("Favourite Songs",favs.map(byId).filter(Boolean));
h+=block("Recently Added",list("Latest").slice(0,5));
SECTIONS.forEach(([t,c])=>{if(c!=="Latest")h+=block(t,list(c).slice(0,10))});
$("#sections").innerHTML=h}
function renderCats(){
$("#catGrid").innerHTML=CATS.map((c,i)=>`<button class="cat" data-cat="${c}" style="background:${grad(i*55+260)}">${c}<small>${list(c).length} songs</small></button>`).join("")}

let activeCat="All";
function renderChips(){$("#chips").innerHTML=["All",...CATS.slice(2)].map(c=>`<button class="chip ${c===activeCat?"on":""}" data-chip="${c}" aria-pressed="${c===activeCat}">${c}</button>`).join("")}
function renderSearch(){
const q=$("#q").value.trim().toLowerCase(),sort=$("#sort").value;
let r=SONGS.filter(s=>(activeCat==="All"||s.cats.includes(activeCat))&&(!q||[s.title,s.movie,s.artist,s.cats.join(" ")].join(" ").toLowerCase().includes(q)));
const score=s=>(s.title.toLowerCase().startsWith(q)?3:0)+(s.title.toLowerCase().includes(q)?2:0)+(s.artist.toLowerCase().includes(q)?1:0);
if(sort==="new")r.sort((a,b)=>b.added.localeCompare(a.added));else if(sort==="pop")r.sort((a,b)=>b.plays-a.plays);else if(sort==="az")r.sort((a,b)=>a.title.localeCompare(b.title));else if(q)r.sort((a,b)=>score(b)-score(a));
$("#count").textContent=r.length+(r.length===1?" song":" songs");
$("#results").innerHTML=r.length?r.map(card).join(""):`<div class="empty" style="grid-column:1/-1"><big>🎧</big><strong>No songs found${q?` for “${esc($("#q").value.trim())}”`:""}</strong><p style="margin-top:6px">Check the spelling, try a movie or artist name, or clear the category filter.</p></div>`}

/* ===== routing ===== */
function route(){
const v=(location.hash||"#home").slice(1);const view=["home","search","categories","about"].includes(v)?v:"home";
$$("[data-view]").forEach(e=>e.hidden=e.dataset.view!==view);
$$("[data-nav]").forEach(a=>a.classList.toggle("on",a.dataset.nav===view));
if(view==="home")renderHome();if(view==="search"){renderChips();renderSearch()}
document.title=({home:"Tamil Beats – Your Tamil Music World",search:"Search Tamil songs – Tamil Beats",categories:"Categories – Tamil Beats",about:"About – Tamil Beats"})[view];scrollTo(0,0)}
addEventListener("hashchange",route);

/* ===== player ===== */
const au=new Audio();au.preload="none";au.volume=.8;let cur=null,queue=[],previewEnd=null;
function play(id,preview=false){
const s=byId(id);if(!s||!s.src)return;
if(cur&&cur.id==s.id&&!preview&&previewEnd===null){au.paused?au.play():au.pause();return}
cur=s;previewEnd=preview?15:null;au.src=s.src;
au.play().catch(()=>toast("Could not play this track. Check your connection.","err"));
$("#pt").textContent=s.title+(preview?" (preview)":"");$("#pa").textContent=s.movie+" · "+s.artist;$("#pcv").style.background=grad(s.hue);
recent=[s.id,...recent.filter(x=>x!=s.id)].slice(0,12);store.set("tb_recent",recent);s.plays++;
queue=$$("[data-view]:not([hidden]) .card").map(c=>+c.dataset.id).filter(i=>byId(i).src);
$$(".card").forEach(c=>c.classList.toggle("now",c.dataset.id==s.id))}
function step(d){if(!cur)return;const l=queue.length?queue:SONGS.filter(s=>s.src).map(s=>s.id);let i=l.indexOf(cur.id);play(l[(i+d+l.length)%l.length])}
$("#pp").onclick=()=>cur?(au.paused?au.play():au.pause()):play(SONGS[0].id);
$("#prev").onclick=()=>step(-1);$("#next").onclick=()=>step(1);
au.onplay=()=>{$("#pp").textContent="⏸";$("#pp").setAttribute("aria-label","Pause")};
au.onpause=()=>{$("#pp").textContent="▶";$("#pp").setAttribute("aria-label","Play")};
au.onended=()=>step(1);
au.onwaiting=()=>$("#pt").dataset.w=1;
au.ontimeupdate=()=>{if(previewEnd&&au.currentTime>=previewEnd){au.pause();previewEnd=null;toast("Preview finished. Press play for the full song.")}
const d=au.duration;$("#cur").textContent=fmt(au.currentTime);if(isFinite(d)){$("#dur").textContent=fmt(d);const p=au.currentTime/d*100;$("#seek").value=p;$("#seek").style.setProperty("--p",p+"%")}};
$("#seek").oninput=e=>{if(isFinite(au.duration)){au.currentTime=e.target.value/100*au.duration;previewEnd=null}};
$("#vol").oninput=e=>{au.volume=e.target.value;e.target.style.setProperty("--p",e.target.value*100+"%")};
$("#vol").style.setProperty("--p","80%");
au.onerror=()=>{if(au.src)toast("This audio file failed to load.","err")};

/* ===== actions ===== */
async function download(s,btn){
if(!s.dl||!s.src){toast("Download is not available for this track.","err");return}
const old=btn.innerHTML;btn.disabled=true;btn.innerHTML='<span class="spin"></span> Preparing';toast("Preparing “"+s.title+"”…","",true,0);
try{const r=await fetch(s.src);if(!r.ok)throw 0;const b=await r.blob();const u=URL.createObjectURL(b);
const a=document.createElement("a");a.href=u;a.download=s.title.replace(/[^\w\- ]+/g,"").trim().replace(/ +/g,"-")+".mp3";document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),4000);
toast("Downloaded “"+s.title+"”","ok")}
catch(e){try{const a=document.createElement("a");a.href=s.src;a.download="";a.target="_blank";a.rel="noopener";document.body.appendChild(a);a.click();a.remove();toast("Download started in a new tab.","ok")}catch(_){toast("Download failed. Check your connection and try again.","err")}}
finally{btn.disabled=false;btn.innerHTML=old}}
async function share(s){
const url=location.href.split("#")[0]+"#search",text=`Listen to “${s.title}” on Tamil Beats`;
try{if(navigator.share){await navigator.share({title:s.title,text,url})}else{await navigator.clipboard.writeText(text+" – "+url);toast("Link copied to clipboard","ok")}}catch(e){if(e.name!=="AbortError")toast("Sharing is not available on this device.","err")}}

document.addEventListener("click",e=>{
const chip=e.target.closest("[data-chip]");if(chip){activeCat=chip.dataset.chip;renderChips();renderSearch();return}
const cat=e.target.closest("[data-cat]");if(cat){const c=cat.dataset.cat;activeCat=["Latest","Trending"].includes(c)?"All":c;$("#q").value="";$("#sort").value=c==="Latest"?"new":c==="Trending"?"pop":"rel";location.hash="#search";return}
const b=e.target.closest("[data-a]");if(!b)return;
const card=b.closest(".card"),s=byId(card.dataset.id),a=b.dataset.a;
if(a==="play")play(s.id);
else if(a==="prev15")play(s.id,true);
else if(a==="dl")download(s,b);
else if(a==="store"){window.open(s.store,"_blank","noopener");toast("Opening the official platform for this song.")}
else if(a==="fav"){favs=favs.includes(s.id)?favs.filter(x=>x!=s.id):[...favs,s.id];store.set("tb_favs",favs);toast(favs.includes(s.id)?"Added to favourites":"Removed from favourites");
 const home=!$('[data-view="home"]').hidden;home?renderHome():renderSearch()}
else if(a==="share")share(s)});
$("#heroForm").onsubmit=e=>{e.preventDefault();activeCat="All";$("#q").value=$("#heroQ").value;location.hash="#search";setTimeout(()=>$("#q").focus(),50)};
$("#q").addEventListener("input",renderSearch);$("#sort").onchange=renderSearch;
renderCats();route();
