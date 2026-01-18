// Исправленная версия: сохранение покупок и курсов, корректная покупка, устойчивое восстановление состояния
const API_BASE_URL = window.location.origin;
const CREATOR_WALLET = 'Hx402UniPayCreatorAddress123456789';
const USDC_MINT = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';
const WALLET_STORAGE_KEY = 'uni402_wallet_state';
const LESSONS_STORAGE_KEY = 'uni402_lessons';
const ACCESSES_STORAGE_KEY = 'uni402_accesses';

const appState = { connectedWallet: false, walletAddress: null, currentLesson: null, lessons: [] };
let MOCK_ACCESSES = {};

function initStorage(){
  try{
    const l = localStorage.getItem(LESSONS_STORAGE_KEY);
    appState.lessons = l? JSON.parse(l): (window.MOCK_LESSONS? [...window.MOCK_LESSONS]: []);
    if(!l && window.MOCK_LESSONS) localStorage.setItem(LESSONS_STORAGE_KEY, JSON.stringify(appState.lessons));
    const a = localStorage.getItem(ACCESSES_STORAGE_KEY); MOCK_ACCESSES = a? JSON.parse(a): {};
    const w = localStorage.getItem(WALLET_STORAGE_KEY); if(w){ const s=JSON.parse(w); if(s.connected && s.address) {appState.connectedWallet=true; appState.walletAddress=s.address;} }
  }catch(e){ console.error(e); appState.lessons=[]; MOCK_ACCESSES={}; }
}
function saveLessons(){ localStorage.setItem(LESSONS_STORAGE_KEY, JSON.stringify(appState.lessons)); }
function saveAccesses(){ localStorage.setItem(ACCESSES_STORAGE_KEY, JSON.stringify(MOCK_ACCESSES)); }
function saveWallet(){ localStorage.setItem(WALLET_STORAGE_KEY, JSON.stringify({connected:appState.connectedWallet,address:appState.walletAddress,lastConnected:Date.now()})); }

async function initPhantomWallet(){
  if(!window.solana?.isPhantom){ alert('Установи Phantom'); return; }
  const r = await window.solana.connect(); appState.connectedWallet=true; appState.walletAddress=r.publicKey.toString(); saveWallet(); updateWalletUI();
}
function updateWalletUI(){ document.querySelectorAll('.connect-btn').forEach(b=>{ if(appState.connectedWallet){ b.textContent = appState.walletAddress.slice(0,4)+'...'+appState.walletAddress.slice(-4); b.onclick=disconnectWallet;} else { b.textContent='Connect Wallet'; b.onclick=initPhantomWallet;} }); }
async function disconnectWallet(){ await window.solana?.disconnect?.(); appState.connectedWallet=false; appState.walletAddress=null; localStorage.removeItem(WALLET_STORAGE_KEY); updateWalletUI(); }


async function createLesson(form){
  if(!appState.connectedWallet) throw new Error('Подключи кошелёк');
  const lesson={ id:Date.now().toString(), title:form.title, description:form.description, price:parseFloat(form.price).toFixed(2), content_type:form.content_type, content_data:form.content_data, category:form.category, tags:form.tags, author: appState.walletAddress.slice(0,4)+'...'+appState.walletAddress.slice(-4), authorId:appState.walletAddress, created_at:new Date().toISOString(), purchases:0 };
  appState.lessons.unshift(lesson); saveLessons(); return lesson;
}


async function processPayment(){
  if(!appState.connectedWallet) return alert('Подключи кошелёк');
  const l = appState.currentLesson; if(!l) return;
  const key = appState.walletAddress+'_'+l.id;
  MOCK_ACCESSES[key]={unlocked:true, lessonId:l.id, ts:Date.now()}; saveAccesses();
  l.purchases=(l.purchases||0)+1; saveLessons(); unlockLesson(); alert('Покупка успешна!');
}

function checkLessonAccess(){ if(!appState.currentLesson||!appState.connectedWallet) return; const k=appState.walletAddress+'_'+appState.currentLesson.id; if(MOCK_ACCESSES[k]) unlockLesson(); }
function unlockLesson(){ document.getElementById('locked-content')?.style.setProperty('display','none'); document.getElementById('unlocked-content')?.style.setProperty('display','block'); document.getElementById('lesson-content').innerHTML = appState.currentLesson.content_type==='video'? `<iframe src="${appState.currentLesson.content_data}" style="width:100%;height:400px"></iframe>`: appState.currentLesson.content_data; }

function loadLesson(id){ appState.currentLesson = appState.lessons.find(x=>x.id===id); document.getElementById('lesson-title').textContent=appState.currentLesson.title; document.getElementById('lesson-price').textContent=appState.currentLesson.price+' USDC'; checkLessonAccess(); }

function init(){ initStorage(); updateWalletUI(); if(location.pathname.includes('lesson.html')){ const id=new URLSearchParams(location.search).get('id'); loadLesson(id); document.getElementById('confirm-payment')?.addEventListener('click',processPayment);} if(location.pathname.includes('create.html')){ document.getElementById('lesson-form')?.addEventListener('submit', async e=>{ e.preventDefault(); const f={ title:lessonTitle.value, description:lessonDescription.value, price:lessonPrice.value, content_type:contentType.value, content_data:contentData.value, category:lessonCategory.value, tags:lessonTags.value }; await createLesson(f); location.href='index.html'; }); }}

document.addEventListener('DOMContentLoaded',init);
