import { Suspense } from "react";
import { Await, NavLink, useAsyncValue, useLoaderData } from "react-router-dom";

const Sprints = () => {
   const data = useLoaderData();
   const sprintsData = data.sprints; 
   //console.log(data);
    return ( 
        <>
        <h1>Mes Sprints</h1>
        <Suspense fallback={<div className='spinner-border'>
           <span className='visually-hidden'>
           loading.......
           </span>
           </div>}>
        <Await resolve={sprintsData}>
            {
                 
            (sprintsData)=>(
                
            <SprintList />
                )
            }
        </Await>
        </Suspense>
        </>
     );
}
function SprintList(){
    const dataSprints = useAsyncValue()
    const sprints = dataSprints.sprints
    return <>
    <ul>
                {sprints.map((sp,index) => (
                    <li key={index}>
                       <NavLink to ={sp.slug}>
                       {sp.sprintName}
                        </NavLink> 
                    
                    </li>
                ))
                }
            </ul>
    </>

 }
export default Sprints;