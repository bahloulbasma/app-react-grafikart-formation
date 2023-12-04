import { useParams } from "react-router-dom"

export function Single (){
     const {id} = useParams()
 return (
    <div>
        details blog {id}
    </div>
 )
}