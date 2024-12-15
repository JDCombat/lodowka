import Fridge from "./Fridge"
import "./style.css"
const app = document.querySelector<HTMLDivElement>("#app")!

const f = new Fridge()
f.start(app)
