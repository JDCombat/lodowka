import Card from "./Card"
export default class Fridge{
    static arr: Card[] = []
    static runLabel:HTMLDivElement
    static countLabel:HTMLDivElement
    static run:number = 0

    constructor(){
        Fridge.runLabel = document.createElement("h2")
        Fridge.countLabel = document.createElement("h2")
        Fridge.runLabel.innerText = "Run: 0"
        Fridge.countLabel.innerText = "Count: 0"
    }



    start(app:HTMLDivElement){

        const button = document.createElement("button")



        button.innerText = "Buttą"
        button.onclick = addCard

        function addCard(){
            Fridge.arr.push(new Card())
            Fridge.run+=1
            Fridge.update(Fridge.run)
        }

        document.querySelector

        document.body.onmousemove = (e) =>{
        console.log(e.offsetX, e.offsetY, Fridge.arr);
        
        if(Card.active && Card.event === "move"){
            Card.activeElement?.move(e)
        }
        else if(Card.active && Card.event === "resize"){
            Card.activeElement?.resize(e.clientX-Card.activeElement.x+5, e.clientY-Card.activeElement.y+5)
        }
        };



        app.append(button)
        app.append(Fridge.runLabel)
        app.append(Fridge.countLabel)

    }
    static update(run:number){

        Fridge.runLabel.innerText = `Run: ${run}`
        Fridge.countLabel.innerText = `Count: ${Fridge.arr.length}`
    }
}