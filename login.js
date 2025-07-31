const form = document.forms['login'];

const login = (event) => {
    event.preventDefault();
    const user = {
        userName: form['userName'].value,
        password: form['password'].value,
        level: form['level'].value,
        maxCuontPoints: 0,
        minSeconds: 60,
        countTry:-1,
        countWin:0 ,
        pWin:0    //   date: new Date().toString()
    };
    validate(user);

    const userString = JSON.stringify(user);
    sessionStorage.setItem('userDetails', userString)
    // בדיקת תקינות בשרת
    // location.href = './game.html';
    window.location.replace('./game.html');    //אולי להחליף חזרה לשורה הקודמת....
}

form.addEventListener('submit', login);


function validate(user) {
    // המשך בדיקת תקינות
    if (user.userName && user.password)
        return;
    alert('יש להכניס נתונים תקינים.')
    // :אחרי שהבדיקה נכשלה
    window.location.href = './login.html';
}

