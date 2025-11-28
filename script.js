// --- VARIABLES ----
let money = +localStorage.money || 0;
let cars = +localStorage.cars || 0;
let perClick = +localStorage.perClick || 1;
let perSecond = +localStorage.perSecond || 0;

let upgrades = JSON.parse(localStorage.upgrades || `{
    "turbo":0,
    "nitro":0,
    "motor":0,
    "neon":0,
    "spoiler":0
}`);

const costs = {
    turbo: 50,
    nitro: 250,
    motor: 500,
    neon: 150,
    spoiler: 400
};

const clicker = document.getElementById("clicker");
const main = document.getElementById("main");

// --- GUARDAR ---
function save() {
    localStorage.money = money;
    localStorage.cars = cars;
    localStorage.perClick = perClick;
    localStorage.perSecond = perSecond;
    localStorage.upgrades = JSON.stringify(upgrades);
}

// --- ACTUALIZAR ---
function update() {
    moneyEl.textContent = money;
    moneyPerClick.textContent = perClick;
    autoMoney.textContent = perSecond;
    carsEl.textContent = cars;

    for (let n in upgrades)
        document.getElementById("cnt-" + n).textContent = upgrades[n];

    save();
}

const moneyEl = document.getElementById("money");
const moneyPerClick = document.getElementById("moneyPerClick");
const autoMoney = document.getElementById("autoMoney");
const carsEl = document.getElementById("cars");

// --- PARTICULAS ---
function particleEffect(x, y, type="default") {
    for (let i = 0; i < 20; i++) {
        const p = document.createElement("div");
        p.className = "particle";

        let colors = ["#0ff","#f0f","#ff0","#0f0"];
        if (type === "fire") colors = ["#f00","#ff6600","#ff3300"];
        if (type === "neon") colors = ["#0ff","#0ff","#0ff"];

        p.style.background = colors[Math.floor(Math.random()*colors.length)];

        const angle = Math.random() * Math.PI * 2;
        const dist = 40 + Math.random()*20;

        p.style.left = x + "px";
        p.style.top = y + "px";

        p.style.setProperty("--x", Math.cos(angle)*dist + "px");
        p.style.setProperty("--y", Math.sin(angle)*dist + "px");

        main.appendChild(p);
        setTimeout(()=> p.remove(), 700);
    }
}

// --- CLICK ---
clicker.addEventListener("click", e => {
    money += perClick;
    cars++;

    const rect = clicker.getBoundingClientRect();
    const mx = rect.left + rect.width/2;
    const my = rect.top + rect.height/2;

    let type = "default";
    if (upgrades.nitro > 0) type = "fire";
    if (upgrades.neon > 0) type = "neon";

    particleEffect(mx, my, type);

    update();
});

// --- AUTO-GENERACIÓN ---
setInterval(()=>{
    money += perSecond;
    update();
},1000);

// --- COMPRAR ---
function buy(item) {
    const price = costs[item];

    if (money < price) return;

    money -= price;
    upgrades[item]++;

    if (item === "turbo") perClick += 1;
    if (item === "nitro") { perClick += 4; perSecond += 1; }
    if (item === "motor") { perClick += 10; perSecond += 3; }
    if (item === "spoiler") perClick += 8;
    if (item === "neon") clicker.style.filter = "drop-shadow(0 0 25px #0ff)";

    update();
}

update();
