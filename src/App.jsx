import { useState,useEffect,useMemo } from 'react'
import Checkbox from './components/forms/Checkbox';
import Input from './components/forms/Input';
import ProductCategoryRow from './components/products/ProductCategoryRow';
import ProductRow from './components/products/ProductRow';



const title = "Bonjour les gens";
const showTitle = true;
const handleclick = (e)=>{
  e.preventDefault();
  alert('test d\'application');
}
const Products =[
  {category:"fruits",price:"$1",stocked:true,name:"Apple"},
  {category:"fruits",price:"$1",stocked:true,name:"dragonfruit"},
  {category:"fruits",price:"$2",stocked:false,name:"passionfruit"},
  {category:"vegitables",price:"$2",stocked:true,name:"spinach"},
  {category:"vegitables",price:"$4",stocked:true,name:"pumpkin"},
  {category:"vegitables",price:"$1",stocked:false,name:"peas"},
]

function App() {

  const [showStockOnly,setShowStockOnly]=useState(false)
  const [search,setSearch]=useState('')

  const visibleProduct = Products.filter((product)=>{
    if(!product.stocked && showStockOnly){
      return false
    }
    if(search && !product.name.includes(search)){
      return false
    }
      return true
  })
  const[showTitle,setShowTitle]=useState(true)
  return (
    <> 
    <div className='container my-3'>
    <SearchBar showStockOnly ={showStockOnly} onShowStockONlyChange ={setShowStockOnly} search={search} onSearchChange={setSearch} />
    <ProductTable produits ={visibleProduct} />
    <p style={{color:'red',textAlign:'center'}}>**********************Fin Produits*****************************</p>
    <Checkbox id="show_title" checked={showTitle} onChange={setShowTitle} label= "Afficher le champs titre"/>
    {showTitle && <EditTitle />} 
    <div style={{height:'3vh'}}></div>
    <p style={{color:'red',textAlign:'center'}}>*************Timer*************************************</p>
    <Timer/>
    <p style={{color:'red',textAlign:'center'}}>*************MEMO*************************************</p>
    <Memo />
    </div>
    </>
  )
}

function SearchBar({showStockOnly,onShowStockONlyChange,search,onSearchChange}){
  return(
    <div className='mb-3'>
    <Input id ="search" value={search}  onChange={onSearchChange} placeholder ="Recharcher" />
    <Checkbox  id="stocked" checked={showStockOnly} onChange ={onShowStockONlyChange}  label = "n'affiche que les produits en stock"/>
    </div>
  )
}


function ProductTable ({produits}) {
  const Rows = []
  let lastCat = null
  
  for(let prod of produits){
    if(lastCat !== prod.category){
      Rows.push(<ProductCategoryRow  key = {prod.category} name={prod.category}/>)
    }
    lastCat = prod.category
    Rows.push(<ProductRow key={prod.name} products={prod}/>)
    
  }

  return(

    <table className='table'>
      <thead>
        <tr>
          <th>Nom</th>
          <th>price</th>
        </tr>
      </thead>
      <tbody>

        {Rows}
        
      </tbody>

    </table>
  )
}

function EditTitle (){
  const [title,setTitle]=useState('')
  const [firstName,setFirstName]=useState('')
  const [y,setY]=useState(0)
  
useEffect(() => {
  document.title = title

}, [title]);
useEffect(() => {
 const handleEvent =()=>{
  console.log('scroll')
  setY(window.scrollY)
}
  window.addEventListener('scroll',handleEvent)
  return () => {
    window.removeEventListener('scroll',handleEvent)
  }

}, [])

  return (
    <div className='vstack gap-2'>
      <div>scroll:{y}</div>
    
      <Input  id ="title" placeholder="Modifier le titre" value={title} onChange ={setTitle} />
      <Input  id ="firstName" placeholder="prénom" value={firstName} onChange ={setFirstName} />
     
    </div>
  )

}

function Timer(){

  const [duration,setDuration]=useState(5)
  const [second,setSecond]=useState(duration)
  const handleChange =(v)=>{
    setDuration(v)
    setSecond(v)
  }
  useEffect(() => { 
    
    const timer = setInterval(() => {
      setSecond(v => {
        if(v <= 0){
          clearInterval(timer)
          return 0
        }
        return v - 1
       })
    }, 1000)
    return ()=>{
      clearInterval(timer)
    }
  
  }, [duration])

  return(
    <div className='vstack gap-2'>
      <Input 
      value={duration}
      id ='valeur_initial'
      onChange={handleChange}
      placeholder ='Timer......' />
      <p>Décompte : {second}</p>
    </div>
  )

}


function Memo (){
  const [firstName,setFirstName]=useState("Jhon")
  const [password,setPassword]=useState('MotDePasse')
  const security = useMemo(() => {
    return  passwordSecurity(password)
    
  }, [password])
  //passwordSecurity(password)
  return (
    <div className='container my-3 vstack gap-2'>
      <Input
      type = "text"
      id="firstName"
      placeholder="FirstName"
      value={firstName}
      onChange={setFirstName}
       /> 
      <Input
      type="password"
      id="password"
      placeholder="password"
      value={password}
      onChange={setPassword}
       />
       <p>Sécurité : {security} </p> 
    </div>
  )
}
function passwordSecurity(password){
  if(password.length <3) {
    return 'faible'
  } else if(password.length <6){
    return 'moyen'
  }
return 'fort';
}

export default App