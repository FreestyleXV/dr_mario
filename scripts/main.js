import Pill from "./pill.js"
import Capsule from "./capsule.js"

let boardCapsules = [];
let colors=[2,1,3]
let virusx = [];
let virusy = [];
for(let p = 0; p < 4; p++){
    let virus;
    do{virus = new Capsule("virus", colors[p%3])}
    while(virusx.includes(virus.x) && virusy.includes(virus.y))
    virusx.push(virus.x)
    virusy.push(virus.y)
    boardCapsules.push(virus)
}
let scoreboard = document.getElementById("scoreboard")
let levelboard = document.getElementById("levelboard")
let mainboard;
let pill;
let waitingPill = new Pill();
let viruses = 4;
let startFalling = false;
let falling = false;
let downing = false;
let createPill = false;
let fallPill = false;
let virusMgPositions = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18];
let virusMgPositionIndex = 0;
let gameboard = document.createElement("div");
gameboard.setAttribute("id", "gameboard")
document.body.appendChild(gameboard)
boardCapsules.push(waitingPill.capsule1)
boardCapsules.push(waitingPill.capsule2)
boardCapsules.forEach(capsule => {
    gameboard.appendChild(capsule.html)
})
let throwPill = true;
let startThrow = true;

function compare(a, b){
    if(a.y < b.y){
        return -1
    }
    if(a.y > b.y){
        return 1
    }
    if(a.y == b.y){
        if(a.x < b.x){
            return -1
        }
        if(a.x > b.x){
            return 1
        }
    }
    return 0
}
function anticompare(a, b){
    if(a.x < b.x){
        return -1
    }
    if(a.x > b.x){
        return 1
    }
    if(a.x == b.x){
        if(a.y < b.y){
            return -1
        }
        if(a.y > b.y){
            return 1
        }
    }
    return 0
}
let scoreArray = [0,0,0,0,0,0,0]
if(!localStorage.getItem("highscore")){
    localStorage.setItem("highscore", "0000000")
}
let highscore = localStorage.getItem("highscore")
let highscoreboard = document.createElement("div")
scoreboard.appendChild(highscoreboard)
for(let i=0; i<7; i++){
    let cipher = document.createElement("div")
    cipher.classList.add("capsule")
    cipher.style.top="10vw"
    cipher.style.left=`${2.5*i+10}vw`
    cipher.style.backgroundImage=`url('../img/cyfry/${highscore[i]}.png')`
    highscoreboard.appendChild(cipher)
}
let scoreNumber = document.createElement("div")
scoreboard.appendChild(scoreNumber)
for(let i=0; i<7; i++){
    let cipher = document.createElement("div")
    cipher.classList.add("capsule")
    cipher.setAttribute("id", `${i}`)
    cipher.style.top="17.5vw"
    cipher.style.left=`${2.5*i+10}vw`
    cipher.style.backgroundImage=`url('../img/cyfry/${scoreArray[i]}.png')`
    scoreNumber.appendChild(cipher)
}
let virusNumber = document.createElement("div");
virusNumber.classList.add("capsule");
virusNumber.setAttribute("id","virusnumber");
virusNumber.style.backgroundImage=`url("../img/cyfry/${viruses}.png")`
virusNumber.style.top="25vw";
virusNumber.style.left="20vw"
levelboard.appendChild(virusNumber)
function boardUpdate(){
    mainboard = [
        ["1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1"],
        ["1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1"],
        ["1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1"],
        ["1", "1", "1", "1", "1", "0", "0", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1"],
        ["1", "1", "0", "0", "0", "0", "0", "0", "0", "0", "1", "1", "1", "1", "1", "1", "1", "1"],
        ["1", "1", "0", "0", "0", "0", "0", "0", "0", "0", "1", "1", "1", "1", "1", "1", "1", "1"],
        ["1", "1", "0", "0", "0", "0", "0", "0", "0", "0", "1", "1", "1", "1", "1", "1", "1", "1"],
        ["1", "1", "0", "0", "0", "0", "0", "0", "0", "0", "1", "1", "1", "1", "1", "1", "1", "1"],
        ["1", "1", "0", "0", "0", "0", "0", "0", "0", "0", "1", "1", "1", "1", "1", "1", "1", "1"],
        ["1", "1", "0", "0", "0", "0", "0", "0", "0", "0", "1", "1", "1", "1", "1", "1", "1", "1"],
        ["1", "1", "0", "0", "0", "0", "0", "0", "0", "0", "1", "1", "1", "1", "1", "1", "1", "1"],
        ["1", "1", "0", "0", "0", "0", "0", "0", "0", "0", "1", "1", "1", "1", "1", "1", "1", "1"],
        ["1", "1", "0", "0", "0", "0", "0", "0", "0", "0", "1", "1", "1", "1", "1", "1", "1", "1"],
        ["1", "1", "0", "0", "0", "0", "0", "0", "0", "0", "1", "1", "1", "1", "1", "1", "1", "1"],
        ["1", "1", "0", "0", "0", "0", "0", "0", "0", "0", "1", "1", "1", "1", "1", "1", "1", "1"],
        ["1", "1", "0", "0", "0", "0", "0", "0", "0", "0", "1", "1", "1", "1", "1", "1", "1", "1"],
        ["1", "1", "0", "0", "0", "0", "0", "0", "0", "0", "1", "1", "1", "1", "1", "1", "1", "1"],
        ["1", "1", "0", "0", "0", "0", "0", "0", "0", "0", "1", "1", "1", "1", "1", "1", "1", "1"],
        ["1", "1", "0", "0", "0", "0", "0", "0", "0", "0", "1", "1", "1", "1", "1", "1", "1", "1"],
        ["1", "1", "0", "0", "0", "0", "0", "0", "0", "0", "1", "1", "1", "1", "1", "1", "1", "1"],
        ["1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1"],
    ];
    while(gameboard.firstChild){
        gameboard.removeChild(gameboard.lastChild)
    }
    viruses=0
    boardCapsules.forEach(capsule => {
        if(capsule.type=="virus"){viruses++}
        gameboard.appendChild(capsule.html)
        if(!capsule.waiting){mainboard[capsule.y][capsule.x]=capsule.color;}
        capsule.html.style.top=`${4.76*capsule.y}%`;
        capsule.html.style.left=`${8.33*capsule.x}%`;
    });
    virusNumber.style.backgroundImage=`url('../img/cyfry/${viruses}.png')`;
    if(viruses==0){
        clearInterval(gameInterval);
        let sc = document.getElementById("sc");
        sc.style.display="initial";
        if(parseInt(scoreArray.join("")) > parseInt(localStorage.getItem("highscore"))){
            localStorage.setItem("highscore", `${scoreArray.join("")}`)
        }
    }
    
}
boardUpdate()


let movingInterval = "none";
let movingIntervalTimeout;
function canMove(x, y){
    mainboard[pill.capsule1.y][pill.capsule1.x]="0";
    mainboard[pill.capsule2.y][pill.capsule2.x]="0";
    if(x==0){
        if(mainboard[pill.capsule1.y+y][pill.capsule1.x] != "0" || mainboard[pill.capsule2.y+y][pill.capsule2.x] != "0"){
            return false;
        }
    }
    else if(y==0){
        if(mainboard[pill.capsule1.y][pill.capsule1.x+x] != "0" || mainboard[pill.capsule2.y][pill.capsule2.x+x] != "0"){
            return false
        }
    }
    return true
}
function move(x, y){
    if(canMove(x, y)){
        pill.movePill(x, y);
        boardUpdate()
    }
}


function canRotate(side){
    mainboard[pill.capsule1.y][pill.capsule1.x]="0";
    mainboard[pill.capsule2.y][pill.capsule2.x]="0";
    if(side=="left"){
        switch(pill.capsule1.type){
            case "left":
                if(mainboard[pill.capsule2.y-1][pill.capsule2.x-1] != "0"){return false}
                break;
            case "down":
                if(mainboard[pill.capsule1.y][pill.capsule1.x+1] != "0" || mainboard[pill.capsule2.y+1][pill.capsule2.x] != "0"){
                    if(pill.capsule1.x+1 == 10){
                        pill.movePill(-1, 0)
                        return true}
                    return false
                }
                break;
            case "right":
                if(mainboard[pill.capsule1.y-1][pill.capsule1.x-1] != "0"){return false}
                break;
            case "up":
                if(mainboard[pill.capsule1.y+1][pill.capsule1.x] != "0" || mainboard[pill.capsule2.y][pill.capsule2.x+1] != "0"){
                    if(pill.capsule1.x+1 == 10){
                        pill.movePill(-1, 0)
                        return true}
                    return false
                }
                break;
        }
    }
    else{
        switch(pill.capsule1.type){
            case "left":
                if(mainboard[pill.capsule1.y-1][pill.capsule1.x] != "0" || mainboard[pill.capsule2.y][pill.capsule2.x-1] != "0"){
                    return false
                }
                break;
            case "up":
                if(mainboard[pill.capsule1.y+1][pill.capsule1.x+1] != "0"){
                    if(pill.capsule1.x+1 == 10){
                        pill.movePill(-1, 0)
                        return true}
                    return false
                }
                break;
            case "right":
                if(mainboard[pill.capsule1.y][pill.capsule1.x-1] != "0" || mainboard[pill.capsule2.y-1][pill.capsule2.x] != "0"){return false}
                break;
            case "down":
                if(mainboard[pill.capsule2.y+1][pill.capsule2.x+1] != "0"){
                    if(pill.capsule1.x+1 == 10){
                        pill.movePill(-1, 0)
                        return true}
                    return false
                }
                break;
        }
    }
    return true
}
function rotate(side){
    if(canRotate(side)){
        pill.rotatePill(side);
        boardUpdate();
    }
}

let timesPopped;
function popping(){
    // let popColor;
    // let popSide = 0;
    // let popMain = 0;
    // let popped = 0;
    // let popArray = [];
    let deleting = [];
    timesPopped = 0
    for(let i=0;i<2;i++){
        let popColor;
        let popped=0;
        let popSide = 0;
        let popMain = 0;
        let popArray = [];
        boardCapsules.sort(i==0?compare:anticompare)
        boardCapsules.forEach(capsule => {
            if(capsule.color==popColor && (i==0?(capsule.y==popSide && capsule.x==popMain+1):(capsule.x==popSide && capsule.y==popMain+1))){
                popMain++;
                popped++;
                popArray.push(capsule)
            }
            else{
                if(popped>=4){
                    popArray.forEach(el=> {
                        deleting.push(el)
                    });
                }
                popColor = capsule.color
                popMain = i==0?capsule.x:capsule.y;
                popSide = i==0?capsule.y:capsule.x;
                popped = 1;
                popArray = [capsule]
            }
        });
        if(popped>=4){
            popArray.forEach(el=> {
                if(!deleting.includes(el)){deleting.push(el)}
            });
        }
    }
    
    deleting.forEach(capsule => {
        timesPopped++
        let capsuleTemp;
        switch(capsule.type){
            case"virus":
                scoreArray[4]+=1
                for(let k = 0; k < 7; k++){
                    let cipherTemp = document.getElementById(`${k}`)
                    cipherTemp.style.backgroundImage=`url("../img/cyfry/${scoreArray[k]}.png")`
                }
                capsule.popped()
                mainboard[capsule.y][capsule.x]=="0";
                break;
            case"left":
                capsuleTemp = boardCapsules.find(el => el.x==capsule.x+1 && el.y==capsule.y);
                if(!deleting.includes(capsuleTemp)){capsuleTemp.orphan()}
                capsule.popped()
                mainboard[capsule.y][capsule.x]=="0";
                break;
            case"down":
                capsuleTemp = boardCapsules.find(el => el.x==capsule.x && el.y==capsule.y-1);
                if(!deleting.includes(capsuleTemp)){capsuleTemp.orphan()}
                capsule.popped()
                mainboard[capsule.y][capsule.x]=="0";
                break;
            case"right":
                capsuleTemp = boardCapsules.find(el => el.x==capsule.x-1 && el.y==capsule.y);
                if(!deleting.includes(capsuleTemp)){capsuleTemp.orphan()}
                capsule.popped()
                mainboard[capsule.y][capsule.x]=="0";
                break;
            case"up":
                capsuleTemp = boardCapsules.find(el => el.x==capsule.x && el.y==capsule.y+1);
                if(!deleting.includes(capsuleTemp)){capsuleTemp.orphan()}
                capsule.popped()
                mainboard[capsule.y][capsule.x]=="0";
                break;
            default:
                capsule.popped();
                mainboard[capsule.y][capsule.x]=="0";
                break;
        }
        setTimeout(()=>{
            if(capsule.x != 16 && capsule.y != 1){
                if(!capsule.waiting){boardCapsules.splice(boardCapsules.indexOf(capsule), 1);}
            }
            boardUpdate();
            if(viruses==0){
                clearInterval(gameInterval);
                let sc = document.getElementById("sc");
                sc.style.display="initial";
                if(parseInt(scoreArray.join("")) > parseInt(localStorage.getItem("highscore"))){
                    localStorage.setItem("highscore", `${scoreArray.join("")}`)
                    }
            }
        },10)
    });
    if(timesPopped>0){startFalling=true}
    else{
        throwPill=true;startThrow=true;
    }
    // timesPopped>0?startFalling=true:throwPill=true;startThrow=true;

}


document.body.addEventListener("keydown", function(e){
    if(fallPill){
        e.preventDefault();
        if (e.code == "ArrowLeft" || e.code == "KeyA") {
            if(!downing){
                movingInterval = "none";
                clearTimeout(movingIntervalTimeout)
                move(-1, 0)
                movingIntervalTimeout = window.setTimeout(function(){movingInterval = "left";},100)
            }
        } else if (e.code == "ArrowRight" || e.code == "KeyD") {
            if(!downing){
                movingInterval = "none";
                clearTimeout(movingIntervalTimeout)
                move(1, 0)
                movingIntervalTimeout = window.setTimeout(function(){movingInterval = "right";},100)
            }
        } else if (e.code == "ArrowDown" || e.code == "KeyS") {
            downing = true;
            movingInterval = "down";
        } else if (e.code == "ArrowUp" || e.code == "KeyW") {
            if(!downing){
                rotate("left")
            }
        } else if (e.code == "ShiftLeft" || e.code == "ShiftRight") {
            if(!downing){
                rotate("right")
            }
        }
    }
})
document.body.addEventListener("keyup", function(e){
    if(e.code != "ArrowDown" && e.code != "KeyS"){
        e.preventDefault()
        if(!downing){
            movingInterval = "none";
            clearTimeout(movingIntervalTimeout)
        }
    }
})

let mariohand = document.getElementById("mariohand")
let timer = 0
let timerTemp;
let gameInterval = window.setInterval(function(){
    if(createPill){
        movingInterval = "none"
        if(boardCapsules.find(el => el.y == 4 && (el.x==5||el.x==6))){
            clearInterval(gameInterval)
            let go = document.getElementById("go");
            let goDr = document.getElementById("mariodead")
            go.style.display="initial";
            goDr.style.display="initial";
            for(let a = 1; a<4; a++){
                document.getElementById(`virusmg${a}`).style.backgroundImage=`url(../img/lupa/${a}/dead.png)`;
            }
            if(parseInt(scoreArray.join("")) > parseInt(localStorage.getItem("highscore"))){
                localStorage.setItem("highscore", `${scoreArray.join("")}`)
            }
        }
        else{
            pill = waitingPill;
            pill.capsule1.waiting=false;
            pill.capsule2.waiting=false;
            waitingPill = new Pill();
            gameboard.appendChild(waitingPill.capsule1.html)
            gameboard.appendChild(waitingPill.capsule2.html)
            boardCapsules.push(waitingPill.capsule1)
            boardCapsules.push(waitingPill.capsule2)
            boardUpdate()
            createPill = false;
            fallPill = true;
        }
    }
    if(throwPill){
        // if(!boardCapsules.includes(waitingPill.capsule2)){boardCapsules.push(waitingPill.capsule2);}
        if(startThrow){
            timerTemp = 0;
            startThrow = false;
        }
        if(timerTemp==1){waitingPill.rotatePill("left")}
        if(timerTemp==2){waitingPill.rotatePill("left");waitingPill.movePill(-1,-1)}
        if(timerTemp==3){waitingPill.rotatePill("left")}
        if(timerTemp==4){waitingPill.rotatePill("left");waitingPill.movePill(-1,-1);mariohand.classList.replace("handup", "handmid")}
        if(timerTemp==5){waitingPill.rotatePill("left")}
        if(timerTemp==6){waitingPill.rotatePill("left");waitingPill.movePill(-1, 0)}
        if(timerTemp==7){waitingPill.rotatePill("left");mariohand.classList.replace("handmid", "handdown")}
        if(timerTemp==8){waitingPill.rotatePill("left");waitingPill.movePill(-1, 0)}
        if(timerTemp==9){waitingPill.rotatePill("left")}
        if(timerTemp==10){waitingPill.rotatePill("left");waitingPill.movePill(-1, 0)}
        if(timerTemp==11){waitingPill.rotatePill("left")}
        if(timerTemp==12){waitingPill.rotatePill("left");waitingPill.movePill(-1, 0)}
        if(timerTemp==13){waitingPill.rotatePill("left")}
        if(timerTemp==14){waitingPill.rotatePill("left");waitingPill.movePill(-1, 0)}
        if(timerTemp==15){waitingPill.rotatePill("left")}
        if(timerTemp==16){waitingPill.rotatePill("left");waitingPill.movePill(-1, 0)}
        if(timerTemp==17){waitingPill.rotatePill("left")}
        if(timerTemp==18){waitingPill.rotatePill("left");waitingPill.movePill(-1, 1)}
        if(timerTemp==19){waitingPill.rotatePill("left")}
        if(timerTemp==20){waitingPill.rotatePill("left");waitingPill.movePill(-1, 0)}
        if(timerTemp==21){waitingPill.movePill(0, 1)}
        if(timerTemp==22){waitingPill.movePill(0, 1)}
        if(timerTemp==23){waitingPill.movePill(0, 1);mariohand.classList.replace("handdown", "handup");}
        if(timerTemp>=24){throwPill=false;createPill=true;}
        timerTemp++
        boardUpdate();
    }
    if(fallPill && timer == 20){
        if(!canMove(0, 1)){
            fallPill = false;
            popping();
        }
        else{
            pill.movePill(0, 1)
            boardUpdate()
        }
    }
    if(fallPill){
        switch(movingInterval){
            case "left":
                timer%4==0?move(-1, 0):false
                break
            case "right":
                timer%4==0?move(1, 0):false
                break
            case "down":
                move(0, 1)
                if(!canMove(0, 1)){
                    movingInterval = "none";
                    downing=false;
                    fallPill = false;
                    popping();
                }
                break
        }
    }
    if(falling){
        boardUpdate()
        let falled = 0;
        // for(let i = 19; i >= 4; i--){
        //     for(let j = 9; j >= 2; j--){
        //         let capsuleTemp;
        //         if(capsuleTemp = boardCapsules.find(el => el.x==j && el.y==i)){
        //             if((capsuleTemp.type=="dot" && mainboard[i+1][j]=="0") || (capsuleTemp.type=="left" && mainboard[i+1][j]=="0" && mainboard[i+1][j+1]=="0") || (capsuleTemp.type=="right" && mainboard[i+1][j]=="0" && mainboard[i+1][j-1]=="0") || (capsuleTemp.type=="up" && mainboard[i+1][j]=="0") || (capsuleTemp.type=="down" && mainboard[i+1][j]=="0")){
        //                 capsuleTemp.moveCapsule(0, 1)
        //                 falled++;
        //             }
        //         }
        //     }
        // }
        boardCapsules.forEach(ell => {
            // if(!ell.waiting){
                if((ell.type=="dot" && mainboard[ell.y+1][ell.x]=="0") || (ell.type=="left" && mainboard[ell.y+1][ell.x]=="0" && mainboard[ell.y+1][ell.x+1]=="0") || (ell.type=="right" && mainboard[ell.y+1][ell.x]=="0" && mainboard[ell.y+1][ell.x-1]=="0") || (ell.type=="up" && mainboard[ell.y+2][ell.x]=="0") || (ell.type=="down" && mainboard[ell.y+1][ell.x]=="0")){
                    ell.moveCapsule(0, 1)
                    falled++;
                }
            // }
        })
        boardUpdate()
        if(falled==0){
            startFalling=false;
            falling=false;
            popping()
            if(!boardCapsules.includes(waitingPill.capsule2)){boardCapsules.push(waitingPill.capsule2);}
        }
    }
    if(startFalling){
        falling=true;
    }
    if(timer==20){
        for(let a = 1; a<4; a++){
            let virusMg = document.getElementById(`virusmg${a}`)
            virusMg.classList.replace(`v${virusMgPositions[virusMgPositionIndex]}`, `v${virusMgPositions[virusMgPositionIndex+1]}`)
            virusMgPositionIndex +=6
        }
    virusMgPositionIndex = 0
    virusMgPositions.push(virusMgPositions.shift())
    }
    timer == 20 ? timer = 0 : timer ++
}, 25)