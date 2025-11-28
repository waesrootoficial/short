let money = parseInt(localStorage.getItem('money'))||0;
let cars = parseInt(localStorage.getItem('cars'))||0;
let moneyPerClick = parseInt(localStorage.getItem('moneyPerClick'))||1;
let autoMoney = parseInt(localStorage.getItem('autoMoney'))||0;
let upgrades = JSON.parse(localStorage.getItem('upgrades'))||{turbo:0,nitro:0,motor:0,llantas:0,suspension:0,escape:0,pintura:0,aero:0};

const clicker=document.getElementById('clicker');
const main=document.getElementById('main');
const moneyEl=document.getElementById('money');
const moneyPerClickEl=document.getElementById('moneyPerClick');
const autoMoneyEl=document.getElementById('autoMoney');
const carsEl=document.getElementById('cars');

function updateStats(){
    moneyEl.textContent=money;
    moneyPerClickEl.textContent=moneyPerClick;
    autoMoneyEl.textContent=autoMoney;
    carsEl.textContent=cars;
    for(let key in upgrades){
        let span=document.getElementById('count-'+key);
        if(span) span.textContent=upgrades[key];
    }
    updateCarVisual();
}

function updateCarVisual(){
    if(upgrades.motor>=5){ clicker.style.filter='hue-rotate(180deg) saturate(150%)'; }
    else if(upgrades.turbo>=5){ clicker.style.filter='hue-rotate(90deg) saturate(120%)'; }
    else{ clicker.style.filter='none'; }
}

function createParticle(x,y,type='default'){
    const p=document.createElement('div');
    p.classList.add('particle');
    const angle=Math.random()*2*Math.PI;
    const distance=50+Math.random()*30;
    const colors={'default':['#00ffff','#ff00ff','#ffff00','#ff4500','#00ff00','#ff69b4'],'fire':['#ff4500','#ff6347','#ff0000','#ff8c00'],'smoke':['#888','#bbb','#555']};
    let colorArr=colors[type]||colors.default;
    p.style.background=colorArr[Math.floor(Math.random()*colorArr.length)];
    p.style.left=x+'px';
    p.style.top=y+'px';
    p.style.setProperty('--x',Math.cos(angle)*distance+'px');
    p.style.setProperty('--y',Math.sin(angle)*distance+'px');
    main.appendChild(p);
    setTimeout(()=>p.remove(),800);
}

clicker.addEventListener('click', ()=>{
    money+=moneyPerClick; cars+=1;
    clicker.style.transform='scale(1.2)';
    clicker.style.boxShadow='0 0 30px #00ffff,0 0 15px #ff00ff';
    setTimeout(()=>{clicker.style.transform='scale(1)'; clicker.style.boxShadow='none';},100);
    const rect=clicker.getBoundingClientRect();
    const mainRect=main.getBoundingClientRect();
    const x=rect.left-mainRect.left+rect.width/2-6;
    const y=rect.top-mainRect.top+rect.height/2-6;

    let type='default';
    if(upgrades.nitro>=3) type='fire';
    if(upgrades.suspension>=3) type='smoke';
    for(let i=0;i<25;i++) createParticle(x,y,type);
    updateStats();
    save();
});

function buyUpgrade(name,clickBonus,autoBonus,price){
    if(money>=price){
        money-=price;
        moneyPerClick+=clickBonus;
        autoMoney+=autoBonus;
        upgrades[name]++;
        updateStats();
        save();
    }
}

setInterval(()=>{ money+=autoMoney; updateStats(); save(); },1000);

function save(){
    localStorage.setItem('money',money);
    localStorage.setItem('cars',cars);
    localStorage.setItem('moneyPerClick',moneyPerClick);
    localStorage.setItem('autoMoney',autoMoney);
    localStorage.setItem('upgrades',JSON.stringify(upgrades));
}

updateStats();
