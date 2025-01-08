import Fridge from "./Fridge"
import "./style.css"
const app = document.querySelector<HTMLDivElement>("#app")!

const button = document.querySelector<HTMLButtonElement>("#submit")!
const input = document.querySelector<HTMLInputElement>("#name")!

button!.onclick = async () =>{
    let cook = await fetch("http://localhost/lodowka/index.php?name="+input.value)
    let value = await cook.json()
    
    if(!value){
        let res = await fetch("http://localhost/lodowka/new.php",{
            method: "post",
            body: JSON.stringify({name: input.value})
        })
        
        const f = new Fridge(input.value)
        f.start(app)
    }
    else{
        
        const f = new Fridge(input.value)
        f.start(app)
    }

}
const f = new Fridge("tak")
f.start(app)


