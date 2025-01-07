import Card from "./Card"
export default class Fridge{
    static arr: Card[] = []
    static runLabel:HTMLDivElement
    static countLabel:HTMLDivElement
    
    static run:number = 0

    public name: string;

    constructor(name:string, run?:number, ){
        this.name = name
        Fridge.run = run ?? 0

    }



    start(app:HTMLDivElement){


        Fridge.runLabel = document.createElement("h2")
        Fridge.countLabel = document.createElement("h2")
        Fridge.runLabel.innerText = "Run: 0"
        Fridge.countLabel.innerText = "Count: 0"

        const button = document.createElement("button")



        button.innerText = "Buttą"

        const addCard = async () =>{
            const newCard = new Card(this.name)
            
            await fetch("http://localhost/lodowka/insert.php", {
                method: "post",
                body: JSON.stringify(newCard)
            })

            Fridge.arr.push(newCard)
            Fridge.run+=1
            Fridge.update(Fridge.run)
        }

        button.onclick = addCard

        
        document.body.onmousemove = (e) =>{
        
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
        console.log(Fridge.arr);
        
        Fridge.runLabel.innerText = `Run: ${run}`
        Fridge.countLabel.innerText = `Count: ${Fridge.arr.length}`
    }
}