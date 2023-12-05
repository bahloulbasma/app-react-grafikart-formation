import { useState, useEffect, useMemo,memo, useCallback,useRef,useReducer, forwardRef} from 'react'
import Checkbox from './components/forms/Checkbox';
import Input from './components/forms/Input';
import { useDocumentTitle } from './components/hooks/useDocumentTitle';
import useFetch from './components/hooks/useFetch';
import { useIncrement } from './components/hooks/useIncrement';
import { useToggle } from './components/hooks/useToggle';
import ProductCategoryRow from './components/products/ProductCategoryRow';
import ProductRow from './components/products/ProductRow';
import { ErrorBoundary } from "react-error-boundary";
import useTodo from './components/hooks/useTodo';
import { createBrowserRouter, defer, Link, NavLink, Outlet, RouterProvider, useNavigation, useRouteError } from 'react-router-dom';
import { Single } from './pages/Single';
import Sprints from './pages/Sprints';
import { motion } from 'framer-motion';



const router = createBrowserRouter([
 {
  path : '/',
  element : <div><Root/></div>,
  errorElement : <PageError/> ,
  children : [
    {
      path : 'sprints',
      element :<div className='row' >
        <aside className='col-3'>
          <h2>Sidebar</h2>
        </aside>
        <main className='col-9'>
        <Outlet/>
        </main>

      </div>,
      children :[
        {
          path : '',
          element : <Sprints />,
          loader:() => {
            const sprints =  fetch('http://fastminder.local/api/projects/sifast-project/sprints').then(r=>r.json())
            return defer({
              sprints
            })
          }
        },
        {
          path : ':id',
          element : <Single/>,
        }
      ]
    },
    {
      path : 'contact',
      element :<div>contact</div>,
    }

  ]
 }
])
function PageError(){
  const error = useRouteError()
  return <>
  <h1>
    Une erreur es survervenue
    <p>
      {error ?.error?.toString ?? error?.toString}
    </p>
  </h1>
  </>
}

function Root () {
  const {state }= useNavigation()
  return <>
  <header>
    <nav>
      <NavLink to ='/'>Home</NavLink>
      <NavLink to ='/sprints'>sprints</NavLink>
      <NavLink to ='/contact'>Contact</NavLink>
    </nav>
  </header>
  <div className='container my-4'>
    {state === "loading"&&<div className='spinner-border'>
           <span className='visually-hidden'>
           loading.......
           </span>

           </div>}
    <Outlet/>
  </div>
  </>
}

const title = "Bonjour les gens";
const showTitle = true;
const handleclick = (e) => {
  e.preventDefault();
  alert('test d\'application');
}


const Products = [
  { category: "fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "fruits", price: "$1", stocked: true, name: "dragonfruit" },
  { category: "fruits", price: "$2", stocked: false, name: "passionfruit" },
  { category: "vegitables", price: "$2", stocked: true, name: "spinach" },
  { category: "vegitables", price: "$4", stocked: true, name: "pumpkin" },
  { category: "vegitables", price: "$1", stocked: false, name: "peas" },
]



function App() {

  const [showStockOnly, setShowStockOnly] = useState(false)
  const [search, setSearch] = useState('')

  const visibleProduct = Products.filter((product) => {
    if (!product.stocked && showStockOnly) {
      return false
    }
    if (search && !product.name.includes(search)) {
      return false
    }
    return true
  })
  const [showTitle, setShowTitle] = useState(true)
  const [checked, setChecked] = useToggle()
  const { count, increment, decrement } = useIncrement({
    base: 0,
    max: 10,
    min: 0
  })

  const [name, setName] = useState('')
  
  useDocumentTitle(name ? `Editer ${name} ` : null);

  const { loading, data, errors } = useFetch('http://fastminder.local/api/projects?page=1')
 
  const [prenom, setPrenom] = useState('')
  const nameRef = useRef(prenom)
  nameRef.current = prenom
  const handleClick = useCallback(()=>{
    console.log(nameRef.current)
  })

  const {visiblesTodos,showCompleted,toggletodo,removetodo,clear,netoyer}=useTodo();

  
  
   return (
    <>
    <RouterProvider router ={router}/>

      <div className='container my-3'>
        <SearchBar showStockOnly={showStockOnly} onShowStockONlyChange={setShowStockOnly} search={search} onSearchChange={setSearch} />
        <ProductTable produits={visibleProduct} />
        <p style={{ color: 'red', textAlign: 'center' }}>**********************Fin Produits*****************************</p>
        <Checkbox id="show_title" checked={showTitle} onChange={setShowTitle} label="Afficher le champs titre" />
        {showTitle && <EditTitle />}
        <div style={{ height: '3vh' }}></div>
        <p style={{ color: 'red', textAlign: 'center' }}>*************Timer*************************************</p>
        <Timer />
        <p style={{ color: 'red', textAlign: 'center' }}>*************MEMO*************************************</p>
        <Memo />

        <p style={{ color: 'red', textAlign: 'center' }}>*************hook personnalisé !!*************************************</p>
        <div>
          <Checkbox id="check" placeholder="present" checked={checked} onChange={setChecked} label={checked && 'je suis coché'} />
          <p>
            count : {count}
          </p>
          <button onClick={increment}>Increment</button>
          <button onClick={decrement}>Décrement</button>
        </div>
        <div style={{ height: '3vh' }}></div>
        <Input type="text" placeholder="name" value={name} onChange={setName} />
        <div style={{ height: '3vh' }}></div>
        <p style={{ color: 'red', textAlign: 'center' }}>*************fetch list project!!*************************************</p>
        <div>
          {loading && <div className='spinner-border'>
           
            <span className='visually-hidden'>
            loading.......
            </span>

            </div>}
          {errors && <div className='alert alert-danger'>{errors.toString()}</div>}
         <ErrorBoundary
            FallbackComponent={AlertError}
            onReset={()=>console.log('reset')}
            >
         {data && <div>
            <ProjectTable projects={data} />
          </div>}
         </ErrorBoundary>
          
        </div>
        <div style={{ height: '3vh' }}></div>
        <p style={{ color: 'red', textAlign: 'center' }}>*************Memorisation et use callback!!*************************************</p>
        <label style={{display:'block'}}>Prenom</label> 
        <Input type="text" id="prenom" placeholder="prenom" value={prenom} onChange ={setPrenom}/>
        <div className='my-2'>
          {prenom.toUpperCase()}
        </div>
        <InfoMemo onClick={handleClick}/>
        <div style={{ height: '3vh' }}></div>
        <p style={{ color: 'red', textAlign: 'center' }}>************* use reducer!!*************************************</p>
        <input type ="checkbox" checked ={showCompleted} onChange={netoyer} /> Afficher les taches completed 
       
        <ul>
          {
            visiblesTodos.map(todo =>(
              <li className='my-2'
              key = {todo.name}
              
               >
                <input type='checkbox' onChange ={()=>toggletodo(todo) } checked ={todo.checked} />
                {todo.name}
                <button className='btn-s btn-danger' onClick ={()=>removetodo(todo)}>
                 supprimer
                </button>
              </li>
            ))
          }
        </ul>
         <button onClick ={clear}>Supprimer les taches accomplites</button>
        <div style={{ height: '3vh' }}></div>
        <p style={{ color: 'red', textAlign: 'center' }}>*************FramerMotion!!*************************************</p>
        <FramerMotion />
      </div>
    </>
  )
}

const wrapperVariants = {
  visible: {opacity:1, transition:{when:'beforeChildren',staggerChildren: .2}},
  hidden : {opacity:0, transition:{when:'afterChildren',staggerChildren: .2}}
}

const boxVariants ={
  visible :{ x:0,rotate:0},
  hidden : {x:100,rotate:45}
}

function FramerMotion(){
  const [open,toggle]=useToggle(true)
  return (
    <>
    <div className='container my-4 vstack gap-2'>
      <div className='vstack gap-2'>
        <motion.div 
        className='hstack gap-2' 
        variants={wrapperVariants}
        animate ={open?'visible':'hidden'}>
        <MotionBox
         variants={boxVariants}
         transition ={{type:'intertia',velocity:150}}
         >1</MotionBox>
        <MotionBox variants={boxVariants}>2</MotionBox>
        <MotionBox variants={boxVariants}>3</MotionBox>
        </motion.div>
     
      </div>
      <div>
        <button onClick={toggle} className='btn btn-info'>Afficher/Masquer</button>
      </div>
    </div>
    </>
  )
}

const Box = forwardRef( ({children},ref) =>{
  return(
    <div className='box' ref ={ref}>
      {children}
    </div>
  )
}

)
const MotionBox = motion(Box)

function AlertError({error,resetErrorBoundary}){
  return (
    <div className='alert alert-danger'>
      {error.toString}
      <button className='btn btn-secondary' onClick={resetErrorBoundary}>Reset</button>
    </div>
  )
}

const InfoMemo = memo (function Info ({onClick}){
  console.log('info','render')
  return(
    <div className='alert alert-info' onClick={onClick}>
      LEORM is an online real estate crowdfunding investment platform. Investors are given the opportunity to finance property-backed loans primarily located in ...
    </div>
  )
})


function SearchBar({ showStockOnly, onShowStockONlyChange, search, onSearchChange }) {
  return (
    <div className='mb-3'>
      <Input id="search" value={search} onChange={onSearchChange} placeholder="Recharcher" />
      <Checkbox id="stocked" checked={showStockOnly} onChange={onShowStockONlyChange} label="n'affiche que les produits en stock" />
    </div>
  )
}


function ProductTable({ produits }) {
  const Rows = []
  let lastCat = null

  for (let prod of produits) {
    if (lastCat !== prod.category) {
      Rows.push(<ProductCategoryRow key={prod.category} name={prod.category} />)
    }
    lastCat = prod.category
    Rows.push(<ProductRow key={prod.name} products={prod} />)

  }

  return (

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

function EditTitle() {
  const [title, setTitle] = useState('')
  const [firstName, setFirstName] = useState('')
  const [y, setY] = useState(0)

  useEffect(() => {
    document.title = title

  }, [title]);
  useEffect(() => {
    const handleEvent = () => {
      console.log('scroll')
      setY(window.scrollY)
    }
    window.addEventListener('scroll', handleEvent)
    return () => {
      window.removeEventListener('scroll', handleEvent)
    }

  }, [])

  return (
    <div className='vstack gap-2'>
      <div>scroll:{y}</div>

      <Input id="title" placeholder="Modifier le titre" value={title} onChange={setTitle} />
      <Input id="firstName" placeholder="prénom" value={firstName} onChange={setFirstName} />

    </div>
  )

}

function Timer() {

  const [duration, setDuration] = useState(5)
  const [second, setSecond] = useState(duration)
  const handleChange = (v) => {
    setDuration(v)
    setSecond(v)
  }
  useEffect(() => {

    const timer = setInterval(() => {
      setSecond(v => {
        if (v <= 0) {
          clearInterval(timer)
          return 0
        }
        return v - 1
      })
    }, 1000)
    return () => {
      clearInterval(timer)
    }

  }, [duration])

  return (
    <div className='vstack gap-2'>
      <Input
        value={duration}
        id='valeur_initial'
        onChange={handleChange}
        placeholder='Timer......' />
      <p>Décompte : {second}</p>
    </div>
  )

}


function Memo() {
  const [firstName, setFirstName] = useState("Jhon")
  const [password, setPassword] = useState('MotDePasse')
  const security = useMemo(() => {
    return passwordSecurity(password)

  }, [password])
  //passwordSecurity(password)
  return (
    <div className='container my-3 vstack gap-2'>
      <Input
        type="text"
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
function passwordSecurity(password) {
  if (password.length < 3) {
    return 'faible'
  } else if (password.length < 6) {
    return 'moyen'
  }
  return 'fort';
}

function ProjectTable({ projects }) {


  return (

    <table className='table'>
      <thead>
        <tr>
          <th>Nom</th>
          <th>client</th>
        </tr>
      </thead>
      <tbody>

        {projects.map((project, index) => (
          <tr key={index}>
            <td>{project.projectName}</td>
            <td>{project.client}</td>
          </tr>
        ))
        }

      </tbody>

    </table>
  )
}

export default App
