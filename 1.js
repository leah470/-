const Try = document.querySelector('#A');
const userDetails = sessionStorage.getItem('userDetails');
const user = JSON.parse(userDetails);
console.log(user);
Try.innerHTML = user.countTry;

if (!userDetails) { //בדיקה האם הוכנסו נתוני משתמש אחרת הפמיה לדף הכניסה
    location.href = './login.html';
}

const Win = document.querySelector('#B');
Win.innerHTML = user.countWin;


const p = document.querySelector('#C');
p.innerHTML = user.pWin;

const max = document.querySelector('#E');
max.innerHTML = user.maxCuontPoints;


const min = document.querySelector('#D');
min.innerHTML = user.minSeconds;