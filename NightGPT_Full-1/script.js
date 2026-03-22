const chat = document.getElementById("chat");
const video = document.getElementById("videoPlayer");
const menu = document.getElementById("menu");

let roastMode = false;
let fakeConfidenceMode = true;
let gaslightMode = true;
let argumentMode = true;
let rareEventChance = 0.01;

const boom = new Audio("assets/vineboom.mp3");
boom.volume = 0.25;

const roasts = ["💀 obvious","😭 bruh","google exists","you serious?"];
const confidenceStarts = ["Obviously, ","Everyone knows that ","It's common knowledge that ","Literally anyone can tell you ","No debate, "];
const confidenceEnds = [" no debate."," it's just facts."," look it up."," trust me."," everyone agrees."];

const fakeFacts = [
  "Penguins can fly but only at night",
  "Humans used to have tails until 1890",
  "WiFi was invented during a pizza experiment",
  "Bananas are naturally radioactive",
  "Cats secretly run the internet"
];

function addMessage(type,text){
  let msg = document.createElement("div");
  msg.className = type;
  msg.innerText = text;
  chat.appendChild(msg);
  chat.scrollTop = chat.scrollHeight;
}

function getRoast(size="small"){
  return roasts[Math.floor(Math.random()*roasts.length)];
}

function fakeConfidence(text){
  let start = confidenceStarts[Math.floor(Math.random()*confidenceStarts.length)];
  let end = confidenceEnds[Math.floor(Math.random()*confidenceEnds.length)];
  return start + text + end;
}

function distort(text){
  fakeFacts.forEach(f=>{ if(Math.random()<0.1) text += " | " + f; });
  return text;
}

function rareEvent(){
  if(Math.random()<rareEventChance){
    jumpscare("assets/freddy.png",600);
    addMessage("ai","You weren’t supposed to see that.");
  }
}

function jumpscare(src,duration=600){
  let img = document.createElement("img");
  img.src = src;
  img.style.width = "200px";
  chat.appendChild(img);
  setTimeout(()=>img.remove(),duration);
}

function sendMessage(){
  let input = document.getElementById("user-input");
  let msg = input.value.trim();
  if(!msg) return;

  addMessage("user",msg);
  boom.currentTime=0; boom.play();
  rareEvent();

  let reply = "";
  if(roastMode){
    reply = getRoast();
  } else {
    reply = "This is the obvious answer";
    if(fakeConfidenceMode) reply = fakeConfidence(reply);
    if(gaslightMode) reply = distort(reply);
    if(argumentMode && msg.length>2) reply += " | Actually, that’s wrong 😭";
    reply += "\n\n" + getRoast();
  }
  addMessage("ai",reply);
  input.value="";
}

document.getElementById("sendBtn").addEventListener("click",sendMessage);
document.getElementById("user-input").addEventListener("keydown",e=>{if(e.key==="Enter") sendMessage();});
document.getElementById("plusBtn").addEventListener("click",()=>{menu.style.display = menu.style.display==="flex"?"none":"flex";});

function toggleRoast(){
  roastMode = !roastMode;
  document.getElementById("loading").style.display="block";
  document.getElementById("loading").innerText = roastMode ? "🔥 are u scared" : "🌙 loading";
  setTimeout(()=>document.getElementById("loading").style.display="none",1500);
}

function newChat(){ chat.innerHTML=""; }
function uploadFile(){ document.getElementById("fileInput").click(); }
function handleFile(files){ addMessage("ai","File uploaded: "+files[0].name); }
