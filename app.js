// 1. Крестики-нолики Начало. Создайте веб-приложение, в котором есть двумерный массив 3 на 3 поля, заполненный буквами "Х" и "О". Выведите его в консоль
function isStart() {
    let arr = [],
        row = document.querySelectorAll("tr");

    for(let i = 0; i < 3; i++) {
        let secondArr = [];
        for(let j = 0; j < 3; j++) {
            if(Math.floor(Math.random() * 2) == 0) {
                secondArr[j] = "O";
            } else {
                secondArr[j] = "X";
            }
        }

        arr[i] = secondArr;
    }
    
    for(let i = 0; i < 3; i++) {
        for(let j = 0; j < 3; j++) {
            row[i].children[j].innerHTML = arr[i][j];
        }
    }

}

//2. Создайте веб-приложение, в котором есть двумерный массив карт 13 на 4(4 масти карт от 2 до туза). Выведите в консоль случайную карту из массива используя Math.random()
function randomCard() {
    let obj = {
        arr: [2, 3, 4, 5, 6, 7, 8, 9, 10, "В", "Д", "K", "T"],
        lear:   function(a) {
                    switch(a) {
                        case 0:
                            return "&spades;"; //piki
                        case 1:
                            return "&clubs;"; //trefi
                        case 2:
                            return "&hearts;"; //chervi
                        case 3:
                            return "&diams;"; //buba
                        default:
                            return "Error";    
                    }
                },
        colorCard: function(b) {
            if(b == 1) {
                return " - Red.";
            } else {
                return " - Black.";
            }
        },
        result: document.querySelector(".resultCards") 
    };

    obj.result.innerHTML = obj.lear(Math.floor(Math.random() * 4)) + obj.arr[Math.floor(Math.random() * 13)] + obj.colorCard(Math.floor(Math.random() * 2));
}

/*
3. Соревнования по бегу. Создайте веб-приложение, в котором пользователь вводит фамилии 6 спортсменов и время трех забегов. 
Вывести в консоль фамилию самого медленного и самого быстрого спортсмена. Сформировать и вывести общую таблицу забегов.
*/
function setSportsmen() {
    let DOMInputs = document.querySelectorAll("input"),
        reg = /[A-Za-zА-Яа-яЁё-\s]/g,
        obj = {
            fio: "",
            results: []
        },
        dataError = document.querySelector(".resultChamp"),
        amountSport = document.querySelector("#amountSportsmen");

    if(DOMInputs[0].value.length > 3 && reg.test(DOMInputs[0].value) &&
       DOMInputs[1].value > 0 && DOMInputs[2].value > 0 && DOMInputs[3].value > 0) {
        obj.fio = DOMInputs[0].value;

        for(let i = 1; i < 4; i++) {
            obj.results.push(DOMInputs[i].value);
        }
       
        sportsmenArr.push(obj);
        dataError.innerHTML = "";

        for(let j = 0; j < 4; j++) {
            DOMInputs[j].value = "";
        }

        amountSport.innerHTML = "Количество спортсменов в базе: " + sportsmenArr.length;
    } else {
        dataError.innerHTML = "Ошибка вo введенных данных!";
    }
}

function getSportsmen() {
    let newTable = document.createElement("table"),
        result = document.querySelector(".resultChamp"),
        parentElement = document.querySelector("#myId"),
        arrMaxResults = [],
        arrMinResults = [],
        bestMan = 0,
        badMan = 0,
        oldTable = document.querySelector("#myTable");

    if(oldTable !== null) {
        parentElement.removeChild(oldTable);
    }
    

    for(let i = 0; i < sportsmenArr.length; i++) {
        arrMaxResults.push(Math.max.apply(null, sportsmenArr[i].results));
        arrMinResults.push(Math.min.apply(null, sportsmenArr[i].results));
    }

    bestMan = Math.max.apply(null, arrMaxResults);
    badMan = Math.min.apply(null, arrMinResults);
    
    result.innerHTML = "Лучший: " + sportsmenArr[arrMaxResults.indexOf(bestMan)].fio + " - " + bestMan + ". " + "Худший: " + sportsmenArr[arrMinResults.indexOf(badMan)].fio + " - " + badMan + ".";

    for(let j = 0; j < sportsmenArr.length; j++) {
        let newTr = document.createElement("tr");
        for(let k = 0; k < 4; k++) {
            let newTd = document.createElement("td");
            if(k == 0) {
                newTd.innerHTML = sportsmenArr[j].fio;
            } else {
                newTd.innerHTML = sportsmenArr[j].results[(k - 1)];
            }
            newTr.appendChild(newTd);
        }
        newTable.appendChild(newTr);
    }

    newTable.id = "myTable";
    parentElement.appendChild(newTable);
}


let btnStart = document.querySelector("#btnStart"),
    btnCards = document.querySelector("#btnCards"),
    btnSetSportsmen = document.querySelector("#btnSetSportsmen"),
    btnGetSportsmen = document.querySelector("#btnGetSportsmen");

btnStart.addEventListener("click", isStart);
btnCards.addEventListener("click", randomCard);
btnSetSportsmen.addEventListener("click", setSportsmen);
btnGetSportsmen.addEventListener("click", getSportsmen);