import Fridge from "./Fridge"

let i = 0
export default class Card{
    id:number
    text:string
    element:HTMLDivElement
    resizeButton:HTMLButtonElement
    deleteButton:HTMLButtonElement
    width:number = 200
    height:number = 200
    x:number = 0
    y:number = 0

    offsetX:number = 0
    offsetY:number = 0


    static active:boolean = false
    static activeElement: Card | null
    static event: "move" | "resize" | "none" = "none"


    constructor(){
        this.id = i++
        this.text = "Placeholder gfdgfdsg dsfgfsd gfs dg ds gfds gdsgfd sgfhhfgdh fggfhdgfh ghfddfgh gghfgfhd dfhgg fdhdfg hghfdgd"

        this.element = document.createElement("div")
        console.log(this.element.getBoundingClientRect().width);
        this.element.innerText = this.text
        this.element.classList.add("card")
        this.element.style.zIndex = `${this.id}`

        this.resizeButton = document.createElement("button")
        this.resizeButton.classList.add("resize")
        this.element.append(this.resizeButton)

        this.deleteButton = document.createElement("button")
        this.deleteButton.innerText = "X"
        this.deleteButton.classList.add("delete")

        this.element.append(this.deleteButton)
        this.deleteButton.onclick = () =>{
            this.element.remove()
            Fridge.arr = Fridge.arr.filter(card => card.id !== this.id)
            Fridge.update(Fridge.run)
        }


        this.x = 0
        this.y = 0
        this.resize(this.width, this.height)

        this.element.onmousedown = (e) =>{
            this.element.style.cursor = "grabbing"
            Card.active = true
            this.offsetX = e.offsetX
            this.offsetY = e.offsetY
            
            this.element.style.zIndex = `${i++}`

            Card.activeElement = this
            Card.event = "move"

            if((e.target as HTMLElement).classList.contains("resize")){
                Card.event = "resize"
            }
        }

        // this.element.oncontextmenu = (e) =>{
        //     e.preventDefault()
        //     const newCard = new Card()
        //     newCard.x = this.x + 20
        //     newCard.y = this.y + 20
        //     newCard.text = this.text
        //     newCard.resize(this.width, this.height)
        //     Fridge.arr.push(newCard)
        //     Card.activeElement = newCard
        // }

        this.element.onmouseup = () =>{
            this.element.style.cursor = "grab"
            Card.active = false
            this.offsetX = 0
            this.offsetY = 0
            Card.activeElement = null
            Card.event = "none"
        }

        document.querySelector("#app")!.append(this.element)
    }
    resize(width:number, height:number){
        if(width < 100){
            width = 100
        }
        if(height < 100){
            height = 100
        }else{
            this.width = width
            this.height = height
        }
        this.element.style.width = `${width}px`
        this.element.style.height = `${height}px`
    }
    move(e:MouseEvent){

        this.x=e.clientX - this.offsetX
        this.y=e.clientY - this.offsetY
        this.element.style.left = `${this.x}px`
        this.element.style.top = `${this.y}px`

    }
}