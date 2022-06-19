import Capsule from "./capsule.js"

export default class Pill{
    constructor(){
        this.capsule1 = new Capsule("left");
        this.capsule2 = new Capsule("right");
    }

    movePill(x, y){
        this.capsule1.moveCapsule(x, y)
        this.capsule2.moveCapsule(x, y)
    }

    rotatePill(side){
        this.capsule1.html.classList.remove(`${this.capsule1.type}${this.capsule1.color}`)
        this.capsule2.html.classList.remove(`${this.capsule2.type}${this.capsule2.color}`)
        if(side=="left"){
            switch(this.capsule1.type){
                case "left":
                    this.capsule1.type="down";
                    this.capsule2.type="up";
                    this.capsule2.moveCapsule(-1, -1);
                    break;
                case "down":
                    this.capsule1.type="right";
                    this.capsule2.type="left";
                    this.capsule1.moveCapsule(1, 0);
                    this.capsule2.moveCapsule(0, 1);
                    break;
                case "right":
                    this.capsule1.type="up";
                    this.capsule2.type="down";
                    this.capsule1.moveCapsule(-1, -1);
                    break;
                case "up":
                    this.capsule1.type="left";
                    this.capsule2.type="right";
                    this.capsule1.moveCapsule(0, 1);
                    this.capsule2.moveCapsule(1, 0);
                    break;
            }
        }
        else{
            switch(this.capsule1.type){
                case "left":
                    this.capsule1.type="up";
                    this.capsule2.type="down";
                    this.capsule1.moveCapsule(0, -1);
                    this.capsule2.moveCapsule(-1, 0);
                    break;
                case "up":
                    this.capsule1.type="right";
                    this.capsule2.type="left";
                    this.capsule1.moveCapsule(1, 1);
                    break;
                case "right":
                    this.capsule1.type="down";
                    this.capsule2.type="up";
                    this.capsule1.moveCapsule(-1, 0);
                    this.capsule2.moveCapsule(0, -1);
                    break;
                case "down":
                    this.capsule1.type="left";
                    this.capsule2.type="right";
                    this.capsule2.moveCapsule(1, 1);
                    break;
            }
        }
        this.capsule1.html.classList.add(`${this.capsule1.type}${this.capsule1.color}`)
        this.capsule2.html.classList.add(`${this.capsule2.type}${this.capsule2.color}`)
    }
}