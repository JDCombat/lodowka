import tinymce from "tinymce"
import Fridge from "./Fridge"

let i = 0
let editing:boolean = false
export default class Card{
    id:number
    text:HTMLDivElement
    element:HTMLDivElement
    resizeButton:HTMLButtonElement
    deleteButton:HTMLButtonElement
    editButton:HTMLButtonElement
    width:number = 200
    height:number = 200
    x:number = 0
    y:number = 0
    fridgeName:string = ""

    offsetX:number = 0
    offsetY:number = 0



    static active:boolean = false
    static activeElement: Card | null
    static event: "move" | "resize" | "none" = "none"


    constructor(name?:string){
        this.id = i++

        this.element = document.createElement("div")
        this.text = document.createElement("div")
        this.text.innerText = "fkhdsffhsdgbhjksa s fghjksg s fgsdahkj"
        this.text.classList.add("innertext")
        this.element.append(this.text)
        this.element.classList.add("card")
        this.element.style.zIndex = `${this.id}`

        this.resizeButton = document.createElement("button")
        this.resizeButton.classList.add("resize")
        this.element.append(this.resizeButton)

        this.deleteButton = document.createElement("button")
        this.deleteButton.innerText = "X"
        this.deleteButton.classList.add("delete")
        this.element.append(this.deleteButton)


        this.editButton = document.createElement("button")
        this.editButton.innerText = "E"
        this.editButton.classList.add("edit")
        this.editButton.onclick = this.edit.bind(this)
        this.element.append(this.editButton)

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

            if((e.target as HTMLDivElement).classList.contains("innertext")){
                this.offsetX = e.offsetX + 20
                this.offsetY = e.offsetY + 20
            }
            else{
                this.offsetX = e.offsetX
                this.offsetY = e.offsetY
            }
            if((e.target as HTMLElement).classList.contains("delete") ||
            (e.target as HTMLElement).classList.contains("edit")
        ){
                return
            }
            
            this.element.style.zIndex = `${i++}`

            Card.activeElement = this
            Card.event = "move"

            if((e.target as HTMLElement).classList.contains("resize")){
                Card.event = "resize"
            }
        }

        document.onmouseup = () =>{
            this.element.style.cursor = "grab"
            Card.active = false
            this.offsetX = 0
            this.offsetY = 0
            Card.activeElement = null
            Card.event = "none"
        }

        this.fridgeName = name ?? ""

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
    edit(){
        if(editing){
            return
        }
        editing = true
        const editor = document.createElement("div")
        editor.id = "editor"
        document.body.append(editor)
        tinymce.init({
            selector: '#editor',
            license_key: 'gpl',
            plugins: "save",
            toolbar: 'undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | ' +
            'bullist numlist outdent indent | link image | preview media fullscreen | ' +
            'forecolor backcolor emoticons | save cancel',
            save_oncancelcallback: () => {
                tinymce.activeEditor?.destroy()
                document.querySelector("#editor")!.remove()
                editing = false
            },
            save_onsavecallback: () =>{
                this.text.innerHTML = tinymce.activeEditor!.getContent()
                tinymce.activeEditor?.destroy()
                document.querySelector("#editor")!.remove()
                editing = false
            },
            branding: false
        }).then(()=>{
            tinymce.activeEditor!.setContent(this.text.innerHTML, { format: "html"})
            const buttons = document.querySelector<HTMLDivElement>('.tox-toolbar__primary[role="group"] > div:last-child')!
            document.querySelector(".tox-statusbar")!.appendChild(buttons)
            buttons.style.position = "absolute"
            buttons.style.right = "10px"
            console.log(buttons.childNodes);
            document.querySelectorAll(".tox-statusbar button").forEach(e=>{
                e.ariaDisabled = "false";
                e.classList.remove("tox-tbtn--disabled")
            })
        })

    }
}