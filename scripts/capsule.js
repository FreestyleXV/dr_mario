export default class Capsule{
    constructor(type, color = Math.round(Math.random()*2+1)){
        if(type == "virus"){
            this.x = Math.round((Math.random()*7)+2)
            this.y = Math.round((Math.random()*9)+10)
            this.waiting = false
        }
        else{
            if(type == "left"){this.x = 15}
            else{this.x = 16}
            this.y = 1;
            this.waiting = true
        }
        this.type = type;
        this.color = color;
        this.html = document.createElement("div");
        this.html.classList.add(`capsule`, `${this.type}${this.color}`);
    }

    moveCapsule(x, y){
        this.x+=x;
        this.y+=y;
    }

    orphan(){
        this.html.classList.replace(`${this.type}${this.color}`, `dot${this.color}`)
        this.type="dot";
    }

    popped(){
        this.html.classList.replace(`${this.type}${this.color}`, `${this.type=="virus"?"x":"o"}${this.color}`)
        this.type=(this.type=="virus")?"x":"o";
    }
}