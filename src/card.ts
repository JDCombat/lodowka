let i = 0
export default class Card{
    id:number
    text:string
    element:HTMLDivElement
    width:number = 200
    height:number = 200
    x:number = 0
    y:number = 0

    offsetX:number = 0
    offsetY:number = 0


    static active:boolean = false
    static activeElement: Card | null


    constructor(){
        this.id = i++
        this.text = "Placeholder"
        this.element = document.createElement("div")
        console.log(this.element.getBoundingClientRect().width);
        this.element.innerText = this.text
        this.element.classList.add("card")
        this.element.style.zIndex = `${this.id}`
        this.resize(this.width, this.height)

        this.element.onmousedown = (e) =>{
            Card.active = true
            this.offsetX = e.offsetX
            this.offsetY = e.offsetY
            console.log(this.offsetX, this.offsetY);
            

            Card.activeElement = this
        }
        this.element.onmouseup = () =>{
            Card.active = false
            this.offsetX = 0
            this.offsetY = 0
            Card.activeElement = null
        }

        document.querySelector("#app")!.append(this.element)
    }
    resize(width:number, height:number){
        this.width = width
        this.height = height
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