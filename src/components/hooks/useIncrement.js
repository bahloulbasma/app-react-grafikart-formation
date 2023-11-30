import { useState } from "react"

export function useIncrement({base =0 , max = Infinity, min = Infinity }){
    const [compteur, setCompteur]=useState(0)
    return {
        count:compteur,
        increment: ()=>{ setCompteur(v => v < max ? v + 1: v)},
        decrement: ()=>{setCompteur(v=> v> min ? v - 1: v)}
    }
        

  }