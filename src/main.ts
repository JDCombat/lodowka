import Card from "./card"
import "./style.css"
const app = document.querySelector<HTMLDivElement>("#app")!

let arr: Card[] = []

const button = document.createElement("button")
button.innerText = "Buttą"
button.onclick = addCard

function addCard(){
  arr.push(new Card())
}
document.body.onmousemove = (e) =>{
  console.log(e.offsetX, e.offsetY);
  
  if(Card.active){
    Card.activeElement?.move(e)
  }
};




app.append(button)