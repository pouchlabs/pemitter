import Pemitter from "./index";

const em = new Pemitter()


// em.once("chat",function cb(ev){
//     console.log("once",ev.data.get("h")())
// })
em.off("*") 
em.on("chat",(ev)=>{ 
 console.log("off",ev)
})
em.on("chat",(ev)=>{
    console.log("w",ev)
})
em.on("*",(ev)=>{
    console.log("w2h",ev)
}) 


em.emit("chat",new Map().set("h",()=>{console.log("bb")}))   


