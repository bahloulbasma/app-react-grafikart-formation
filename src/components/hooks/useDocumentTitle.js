import { useEffect,useRef } from "react"

export function useDocumentTitle(title){

    const refTitle = useRef(document.title)
    useEffect(() => {
       
        return ()=>{
            document.title = refTitle.current
        }
    
    }, [])
    useEffect(() => {
        document.title = title ? title : refTitle.current
    
    }, [title])

}