const advice = document.getElementById("advice");
const qr = document.getElementById("qr");
const qr_text = document.getElementById("qr-text");
const advice_number = document.getElementById("advice-number");
const time = document.getElementById("time")
const date = document.getElementById("date")
const ticket = document.getElementById("ticket")

fetch('https://api.adviceslip.com/advice').then(Response => Response.json()).then(data => {
    advice_number.innerHTML = `Advice Number: ${data.slip.id}`
    advice.innerHTML = data.slip.advice;
    qr_text.innerHTML = `Advice Number: ${data.slip.id}`
    qr.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&https://api.qrserver.com/v1/create-qr-code/?size=150x150&bgcolor=333533&color=ffd100&data=https://api.adviceslip.com/advice/${data.slip.id}`
})
const ct = new Date;

let hh = ct.getHours();
if (hh <= 10)
    hh = '0' + hh;
let mm = ct.getMinutes();
if (mm <= 10)
    mm = '0' + mm;
let ss = ct.getSeconds();
if (ss <= 10)
    ss = '0' + ss;

let DD = ct.getDate();
if (DD <= 10)
    DD = '0' + DD;

let MM = ct.getMonth();
MM = MM + 1;
if (MM <= 10)
    MM = '0' + MM;

const YY = ct.getFullYear();

time.innerHTML = `${hh}:${mm}:${ss}`;
date.innerHTML = `${DD}-${MM}-${YY}`
let details = navigator.userAgent;

let regexp = /android|iphone|kindle|ipad/i;
let isMobileDevice = regexp.test(details);

if (isMobileDevice) {
    ticket.style.transform = 'rotate(90deg)'
} else {
    const angle = Math.floor(Math.random() * (30 - -30 + 1) + -30);
    ticket.style.transform = `rotate(${angle}deg)`
}

//created by pratyush with ♡