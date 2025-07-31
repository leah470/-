const span = document.querySelector('#userDetails>h4>span'); //שליפת התגית 
const userDetails = sessionStorage.getItem('userDetails'); //שליפת פרטי המשתמש מטפס ההרשמה
const user = JSON.parse(userDetails);
const level = document.querySelector('#userDetails>h5>span');
const pointsElement = document.querySelector('#points h3');

let cuontPoints = 100;
let countClick = 0;

if (!userDetails) { //בדיקה האם הוכנסו נתוני משתמש אחרת הפמיה לדף הכניסה
    location.href = './login.html';
}
span.innerHTML = user.userName; //הצגה 
level.innerHTML = user.level;
pointsElement.innerHTML = cuontPoints;

// קריאת ajax לפי רמות
if (user.level == 1) { //רמה 1
    $.ajax({
        url: './mat.json', //פניה לקובץ הג'יסון המתאים לרמה המבוקשת
        success: (data) => {
            random(data, 10); //שליחה לפעולה שתבחר לוח אקראי
        },
        error: (error) => {
            alert('אירעה שגיאה במהלך שליפת הנתונים');
        }
    });
} else {
    if (user.level == 2) { //רמה 2
        $.ajax({
            url: './mat2.json',
            success: (data) => {
                random(data, 4);
            },
            error: (error) => {
                alert('אירעה שגיאה במהלך שליפת הנתונים');
            }
        });
    } else { //רמה 3
        $.ajax({
            url: './mat3.json',
            success: (data) => {
                random(data, 1);
            },
            error: (error) => {
                alert('אירעה שגיאה במהלך שליפת הנתונים');
            }
        });
    }
}

const board = document.getElementById("game-board"); //שליפת הדיב של לוח המשחק
const rows = 10;
const cols = 10;

function random(data, count) { //מקבלת מערך מהג'סון ןמגרילה לוח  
    const randomBoard = Math.floor(Math.random() * count);
    createBoard(data[randomBoard]); //שןלחת את הלוח המוגרל ליצרת לוח משחק
}

function createBoard(data) { //המשחק!!!!

    const flag = false;
    for (let row = 0; row < rows; row++) { //יצירת הלוח
        for (let col = 0; col < cols; col++) {

            const cell = document.createElement("div"); // הוספת תא למטריצה והגדרת פרטיו
            cell.classList.add("cell");
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.dataset.clicked = "false";
            board.appendChild(cell);

            cell.addEventListener("click", () => { //במצב של בחירת מיקום

                if (cell.dataset.clicked === "false" && countdownInterval) { //אם המקום עדיין לא נלחץ והטיימר פועל
                    const isPredefined = data.predefinedCells.find(cellData =>
                        cellData[0] == cell.dataset.col && cellData[1] == cell.dataset.row); //בדיקה האם במיקום יש צוללת

                    if (isPredefined) { //אם המיקום צוללת
                        cell.style.backgroundColor = "#000000";
                        countClick++; //ספירת חלקי הצוללת שנמצאו

                        //  עבור הרמה הנוכחית בדיקה האם נמצאו כל חלקי הצוללות או נגמרו הפצצות הפעלת פונקצית גמר משחק
                        if (data.level === 1) {

                            if (countClick == 17) {
                                setTimeout(() => endGame(("נותרו לך" + (cuontPoints) + "פצצות" + "  " + "נצחת תוך" + (60 - seconds) + " שניות"), cuontPoints, seconds, true), 100); // הצג הודעה אחרי עיכוב קטן
                            }

                            if (cuontPoints <= 0) {
                                setTimeout(() => endGame(("נגמרו לך הפצצות:("), cuontPoints, seconds, false),
                                    1000);
                            }
                            cuontPoints = cuontPoints + 50; //הוספת הפצצות
                            pointsElement.innerHTML = cuontPoints; //הצגתם

                        }

                        if (data.level === 2) {

                            if (countClick == 14) {
                                setTimeout(() => endGame(("נותרו לך" + (cuontPoints) + "פצצות" + "  " + "נצחת תוך" + (60 - seconds) + " שניות"), cuontPoints, seconds, true), 100); // הצג הודעה אחרי עיכוב קטן
                            }

                            if (cuontPoints <= 0) {
                                setTimeout(() => endGame(("נגמרו לך הפצצות:("), cuontPoints, seconds, false),
                                    1000);
                            }

                            cuontPoints = cuontPoints + 100; //הוספת הפצצות
                            pointsElement.innerHTML = cuontPoints; //הצגתם

                        }

                        if (data.level === 3) {

                            if (countClick == 10) {
                                setTimeout(() => endGame(("נותרו לך" + (cuontPoints) + "פצצות" + "  " + "נצחת תוך" + (60 - seconds) + " שניות"), cuontPoints, seconds, true), 100); // הצג הודעה אחרי עיכוב קטן

                            }

                            if (cuontPoints <= 0) {
                                setTimeout(() => endGame(("נגמרו לך הפצצות:("), cuontPoints, seconds, false),
                                    1000);
                            }
                            console.log(cuontPoints);
                            cuontPoints = cuontPoints + 150; //הוספת הפצצות
                            pointsElement.innerHTML = cuontPoints; //הצגתם

                        }
                    } else {
                        cell.style.backgroundColor = "#f6f6f6ff"; //אם המקום לא צוללת
                        // cell.style.border = "#f6f6f6ff";

                        cuontPoints = cuontPoints - 15; //הפחתת הפצצות
                        pointsElement.innerHTML = cuontPoints; //הצגתם

                        if (cuontPoints <= 0) {
                            setTimeout(() => endGame(("נגמרו לך הפצצות:("), cuontPoints, seconds, false),
                                1000);

                        }
                    }
                    cell.dataset.clicked = "true"; //סימון שהמקום הנכחי כבר נבחר


                }
            });
        }
    }
}
let seconds = 60;
let countdownInterval;

function startCountdown() { //ספירה דקה לאחור
    if (countdownInterval) return; //אםנהטימר כבר הופעל

    countdownInterval = setInterval(() => { //הפעלת הטיימר
        if (seconds <= 0) {
            clearInterval(countdownInterval);
            countdownInterval = null;
            setTimeout(() => endGame(("הזמן נגמר"), cuontPoints, seconds, false),
                1000);
            return;
        }
        seconds--;
        updateCountdownDisplay();
    }, 1000);
}

function updateCountdownDisplay() { //הצגת הטיימר
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    document.getElementById('countdown').innerText =
        String(minutes).padStart(2, '0') + ':' +
        String(secs).padStart(2, '0');
}

function endGame(mesege, cuontPoints, seconds, flag) { //סיום המשחק
    user.countTry++; //ספירת נסיונות משחק
    clearInterval(countdownInterval); // עצור את הספירה
    countdownInterval = null;

    if (flag) { //אם ניצח
        user.countWin++; //ספירת נצחונות

        //בדיקת שבירת שאים בנקודות ובזמן והצגת הודעה מתאימה ועדכון השיאים
        if (cuontPoints > user.maxCuontPoints && (60 - seconds) < user.minSeconds) {
            user.maxCuontPoints = cuontPoints;
            user.minSeconds = (60 - seconds);
            mesege += " " + "  !!!!!! שברת שיאים חדשים";


        } else {

            if (cuontPoints > user.maxCuontPoints) {
                mesege += " " + "  !!!! שברת שיא חדש";
                user.maxCuontPoints = cuontPoints;

            } else {

                if ((60 - seconds) < user.minSeconds) {
                    mesege += " " + "  !!!! שברת שיא חדש";
                    user.minSeconds = (60 - seconds)
                }
            }
        }

    }
    user.pWin = user.countWin / user.countTry * 100; //אחוז נצחונות
    console.log(user);
    sessionStorage.setItem('userDetails', JSON.stringify(user)); //עדכון פרטי המשחק של המשתמש
    setTimeout(() => clearInterval(countdownInterval), 1000)
    countdownInterval = null;

    //הצגת הודעה על סיום משחק
    const endGameDiv = document.getElementById('endGame');
    endGameDiv.querySelector('h1').innerText = mesege;
    endGameDiv.style.display = 'block';


}