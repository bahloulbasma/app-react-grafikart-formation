

import { useEffect, useState } from "react";


const useFetch = (url,options = {}) => {

    const [loading,setLoading]=useState(true)
    const [data,setData]=useState(null)
    const [errors,setErrors]=useState(null)
    useEffect(() => {
        fetch(url,{
            ...options,
            headers: {
                'Accept':'application/json',
                ...options.headers
            },
        })
        .then(res =>
            res.json()
            )
        .then(data =>{
         setData(data)
         setLoading(false)
         setErrors('')   

        })
        .catch((e)=>{
            setErrors(e)
        })
        .finally(()=>{
            setLoading(false)
        })
        return ()=> console.log("cleanup");
    }, [])
  return {loading,data,errors }
}
 
export default useFetch;