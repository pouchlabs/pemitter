# pemitter

A blazing fast eventemitter for all js runtimes

## Installation

```bash
bun add @pouchlab/emitter
```

## Usage

```typescript
import { Pemitter } from '@pouchlab/emitter';


const em = new Pemitter()

//once listener
em.once("chat",function cb(ev){
    console.log("once",ev.data.get("h")())
})
//turns off listeners  for current event
em.off("*") 
//listener
em.on("chat",(ev)=>{ 
 console.log("off",ev)
})
em.on("chat",(ev)=>{
    console.log("w",ev)
})
em.on("*",(ev)=>{
    console.log("w2h",ev)
}) 

//emitter
em.emit("chat",new Map().set("h",()=>{console.log("bb")}))   



```

## Contributing

Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for contribution guidelines.

## License

MIT
