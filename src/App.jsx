import {
  useState,
  useEffect,
  useMemo,
  memo,
  useCallback,
  useRef,
  useReducer,
  forwardRef,
} from "react";
import Checkbox from "./components/forms/Checkbox";
import Input from "./components/forms/Input";
import { useDocumentTitle } from "./components/hooks/useDocumentTitle";
import useFetch from "./components/hooks/useFetch";
import { useIncrement } from "./components/hooks/useIncrement";
import { useToggle } from "./components/hooks/useToggle";
import ProductCategoryRow from "./components/products/ProductCategoryRow";
import ProductRow from "./components/products/ProductRow";
import { ErrorBoundary } from "react-error-boundary";
import useTodo from "./components/hooks/useTodo";
import {
  createBrowserRouter,
  defer,
  Link,
  NavLink,
  Outlet,
  RouterProvider,
  useNavigation,
  useRouteError,
} from "react-router-dom";
import { Single } from "./pages/Single";
import Sprints from "./pages/Sprints";
import { motion } from "framer-motion";
import { useConfirm } from "./components/confirm/ConfirmContex";
import Login from "./pages/Login";
import Register from "./pages/Regiter";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Root />
      </div>
    ),
    errorElement: <PageError />,
    children: [
      {
        path: "sprints",
        element: (
          <div className="row">
            <main className="col-9">
              <Outlet />
            </main>
          </div>
        ),
        children: [
          {
            path: "",
            element: <Sprints />,
            loader: () => {
              const sprints = fetch(
                "http://fastminder.local/api/projects/sifast-project/sprints"
              ).then((r) => r.json());
              return defer({
                sprints,
              });
            },
          },
          {
            path: ":id",
            element: <Single />,
          },
        ],
      },
      {
        path: "products",
        element: <ProductListStatic />,
      },
      {
        path: "scrol",
        element: <ShowAndEditTable />,
      },
      {
        path: "timer",
        element: <Timer />,
      },
      {
        path: "memo",
        element: <Memo />,
      },
      {
        path: "hooks",
        element: <Hookspr />,
      },
      {
        path: "fetch_projects",
        element: <ListeProjectFastMinder />,
      },
      {
        path: "callback",
        element: <CallbackUse />,
      },
      {
        path: "reducer",
        element: <ReduceUse />,
      },
      {
        path: "motion",
        element: <FramerMotion />,
      },
      {
        path: "ModalConfirmation",
        element: <ConfirmationMessage />,
      },
      {
        path: "register",
        element: <Register />,
      },
     
    ],
  },
]);
function PageError() {
  const error = useRouteError();
  return (
    <>
      <h1>
        Une erreur es survervenue
        <p>{error?.error?.toString ?? error?.toString}</p>
      </h1>
    </>
  );
}

function Root() {
  const { state } = useNavigation();
  return (
    <>
      <header>
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a
              href="https://flowbite.com/"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <img
                src="https://flowbite.com/docs/images/logo.svg"
                className="h-8"
                alt="Flowbite Logo"
              />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                Formation
              </span>
            </a>
            <button
              data-collapse-toggle="navbar-default"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-default"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
            </button>
            <div
              className="hidden w-full md:block md:w-auto"
              id="navbar-default"
            >
              <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <NavLink
                    to="/"
                    className="block py-2 px-3 text-gray-900 bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                    aria-current="page"
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <button
                    id="dropdownNavbarLink"
                    data-dropdown-toggle="dropdownNavbar"
                    className="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                  >
                    Formation{" "}
                    <svg
                      className="w-2.5 h-2.5 ms-2.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                      />
                    </svg>
                  </button>

                  <div
                    id="dropdownNavbar"
                    className="z-10 hidden  font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
                  >
                    <ul
                      className="py-2 text-sm text-gray-700 dark:text-gray-400"
                      aria-labelledby="dropdownLargeButton"
                    >
                      <li>
                        <NavLink
                          to="/products"
                          className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                          aria-current="page"
                        >
                          Products
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/scrol"
                          className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                          aria-current="page"
                        >
                          Scrol
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/timer"
                          className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                          aria-current="page"
                        >
                          Timer
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/memo"
                          className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                          aria-current="page"
                        >
                          Memo
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/hooks"
                          className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                          aria-current="page"
                        >
                          Hook Personalisé
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/fetch_projects"
                          className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                          aria-current="page"
                        >
                          Projects(use fetch)
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/sprints"
                          className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                          aria-current="page"
                        >
                          sprints
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/reducer"
                          className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                          aria-current="page"
                        >
                          useReducer
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/motion"
                          className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                          aria-current="page"
                        >
                          Framer Motion
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/ModalConfirmation"
                          className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                          aria-current="page"
                        >
                          Modal de confirmation
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <NavLink
                    to="/register"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    aria-current="page"
                  >
                  Register
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <div className="container my-4">
        {state === "loading" && (
          <div className="spinner-border">
            <span className="visually-hidden">loading.......</span>
          </div>
        )}
        <Outlet />
      </div>
    </>
  );
}

const Products = [
  { category: "fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "fruits", price: "$1", stocked: true, name: "dragonfruit" },
  { category: "fruits", price: "$2", stocked: false, name: "passionfruit" },
  { category: "vegitables", price: "$2", stocked: true, name: "spinach" },
  { category: "vegitables", price: "$4", stocked: true, name: "pumpkin" },
  { category: "vegitables", price: "$1", stocked: false, name: "peas" },
];

function App() {
  return (
    <>
      <RouterProvider router={router} />

      <div className="container my-3"></div>
    </>
  );
}

function ReduceUse() {
  const {
    visiblesTodos,
    showCompleted,
    toggletodo,
    removetodo,
    clear,
    netoyer,
  } = useTodo();
  return (
    <>
      <input type="checkbox" checked={showCompleted} onChange={netoyer} />{" "}
      Afficher les taches completed
      <ul>
        {visiblesTodos.map((todo) => (
          <li className="my-2" key={todo.name}>
            <input
              type="checkbox"
              onChange={() => toggletodo(todo)}
              checked={todo.checked}
            />
            {todo.name}
            <button
              type="button"
              onClick={() => removetodo(todo)}
              className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              supprimer
            </button>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={clear}
        className="text-white bg-gradient-to-r
              from-red-400 via-red-500 to-red-600 
              hover:bg-gradient-to-br focus:ring-4 focus:outline-none
               focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        Supprimer les taches accomplites
      </button>
    </>
  );
}

function ShowAndEditTable() {
  const [showTitle, setShowTitle] = useState(true);
  const [name, setName] = useState("");
  useDocumentTitle(name ? `Editer ${name} ` : null);
  return (
    <>
      <Checkbox
        id="show_title"
        checked={showTitle}
        onChange={setShowTitle}
        label="Afficher le champs titre"
      />
      {showTitle && <EditTitle />}
      <div style={{ height: "3vh" }}></div>
      <Input type="text" placeholder="name" value={name} onChange={setName} />
    </>
  );
}

function ProductListStatic() {
  const [showStockOnly, setShowStockOnly] = useState(false);
  const [search, setSearch] = useState("");

  const visibleProduct = Products.filter((product) => {
    if (!product.stocked && showStockOnly) {
      return false;
    }
    if (search && !product.name.includes(search)) {
      return false;
    }
    return true;
  });
  return (
    <>
      <SearchBar
        showStockOnly={showStockOnly}
        onShowStockONlyChange={setShowStockOnly}
        search={search}
        onSearchChange={setSearch}
      />
      <ProductTable produits={visibleProduct} />
    </>
  );
}

function CallbackUse() {
  const [prenom, setPrenom] = useState("");
  const nameRef = useRef(prenom);
  nameRef.current = prenom;
  const handleClick = useCallback(() => {
    console.log(nameRef.current);
  });
  return (
    <div>
      <label style={{ display: "block" }}>Prenom</label>
      <Input
        type="text"
        id="prenom"
        placeholder="prenom"
        value={prenom}
        onChange={setPrenom}
      />
      <div className="my-2">{prenom.toUpperCase()}</div>
      <InfoMemo onClick={handleClick} />
    </div>
  );
}

function ListeProjectFastMinder() {
  const { loading, data, errors } = useFetch(
    "http://fastminder.local/api/projects?page=1"
  );
  return (
    <div>
      {loading && (
        <div className="spinner-border">
          <span className="visually-hidden">loading.......</span>
        </div>
      )}
      {errors && <div className="alert alert-danger">{errors.toString()}</div>}
      <ErrorBoundary
        FallbackComponent={AlertError}
        onReset={() => console.log("reset")}
      >
        {data && (
          <div>
            <ProjectTable projects={data} />
          </div>
        )}
      </ErrorBoundary>
    </div>
  );
}

const wrapperVariants = {
  visible: {
    opacity: 1,
    transition: { when: "beforeChildren", staggerChildren: 0.2 },
  },
  hidden: {
    opacity: 0,
    transition: { when: "afterChildren", staggerChildren: 0.2 },
  },
};

const boxVariants = {
  visible: { x: 0, rotate: 0 },
  hidden: { x: 100, rotate: 45 },
};
function Hookspr() {
  const [checked, setChecked] = useToggle();
  const { count, increment, decrement } = useIncrement({
    base: 0,
    max: 10,
    min: 0,
  });

  return (
    <div>
      <Checkbox
        id="check"
        placeholder="present"
        checked={checked}
        onChange={setChecked}
        label={checked && "je suis coché"}
      />
      <p>count : {count}</p>
      <button
        onClick={increment}
        type="button"
        className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        Increment
      </button>
      <button
        onClick={decrement}
        type="button"
        class="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        Décrement
      </button>
    </div>
  );
}
function FramerMotion() {
  const [open, toggle] = useToggle(true);
  return (
    <>
      <div className="container my-4 vstack gap-2">
        <div className="vstack gap-2">
          <motion.div
            className="hstack gap-2"
            variants={wrapperVariants}
            animate={open ? "visible" : "hidden"}
          >
            <MotionBox
              variants={boxVariants}
              transition={{ type: "intertia", velocity: 150 }}
            >
              1
            </MotionBox>
            <MotionBox variants={boxVariants}>2</MotionBox>
            <MotionBox variants={boxVariants}>3</MotionBox>
          </motion.div>
        </div>
        <div>
          <button
            onClick={toggle}
            type="button"
            className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Afficher/Masquer
          </button>
        </div>
      </div>
    </>
  );
}

const Box = forwardRef(({ children }, ref) => {
  return (
    <div className="box" ref={ref}>
      {children}
    </div>
  );
});
const MotionBox = motion(Box);

function AlertError({ error, resetErrorBoundary }) {
  return (
    <div className="alert alert-danger">
      {error.toString}
      <button
        onClick={resetErrorBoundary}
        type="button"
        class="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        Reset
      </button>
    </div>
  );
}

const InfoMemo = memo(function Info({ onClick }) {
  console.log("info", "render");
  return (
    <div className="alert alert-info" onClick={onClick}>
      LEORM is an online real estate crowdfunding investment platform. Investors
      are given the opportunity to finance property-backed loans primarily
      located in ...
    </div>
  );
});

function SearchBar({
  showStockOnly,
  onShowStockONlyChange,
  search,
  onSearchChange,
}) {
  return (
    <div className="mb-3">
      <Input
        id="search"
        value={search}
        onChange={onSearchChange}
        placeholder="Recharcher"
      />
      <Checkbox
        id="stocked"
        checked={showStockOnly}
        onChange={onShowStockONlyChange}
        label="n'affiche que les produits en stock"
      />
    </div>
  );
}

function ProductTable({ produits }) {
  const Rows = [];
  let lastCat = null;

  for (let prod of produits) {
    if (lastCat !== prod.category) {
      Rows.push(
        <ProductCategoryRow key={prod.category} name={prod.category} />
      );
    }
    lastCat = prod.category;
    Rows.push(<ProductRow key={prod.name} products={prod} />);
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Nom</th>
          <th>price</th>
        </tr>
      </thead>
      <tbody>{Rows}</tbody>
    </table>
  );
}

function EditTitle() {
  const [title, setTitle] = useState("");
  const [firstName, setFirstName] = useState("");
  const [y, setY] = useState(0);

  useEffect(() => {
    document.title = title;
  }, [title]);
  useEffect(() => {
    const handleEvent = () => {
      console.log("scroll");
      setY(window.scrollY);
    };
    window.addEventListener("scroll", handleEvent);
    return () => {
      window.removeEventListener("scroll", handleEvent);
    };
  }, []);

  return (
    <div className="vstack gap-2">
      <div>scroll:{y}</div>

      <Input
        id="title"
        placeholder="Modifier le titre"
        value={title}
        onChange={setTitle}
      />
      <Input
        id="firstName"
        placeholder="prénom"
        value={firstName}
        onChange={setFirstName}
      />
    </div>
  );
}

function Timer() {
  const [duration, setDuration] = useState(5);
  const [second, setSecond] = useState(duration);
  const handleChange = (v) => {
    setDuration(v);
    setSecond(v);
  };
  useEffect(() => {
    const timer = setInterval(() => {
      setSecond((v) => {
        if (v <= 0) {
          clearInterval(timer);
          return 0;
        }
        return v - 1;
      });
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [duration]);

  return (
    <div className="vstack gap-2">
      <Input
        value={duration}
        id="valeur_initial"
        onChange={handleChange}
        placeholder="Timer......"
      />
      <p>Décompte : {second}</p>
    </div>
  );
}

function Memo() {
  const [firstName, setFirstName] = useState("Jhon");
  const [password, setPassword] = useState("MotDePasse");
  const security = useMemo(() => {
    return passwordSecurity(password);
  }, [password]);
  //passwordSecurity(password)
  return (
    <div className="container my-3 vstack gap-2">
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
  );
}
function passwordSecurity(password) {
  if (password.length < 3) {
    return "faible";
  } else if (password.length < 6) {
    return "moyen";
  }
  return "fort";
}

function ProjectTable({ projects }) {
  return (
    <table className="table">
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
        ))}
      </tbody>
    </table>
  );
}
function ConfirmationMessage() {
  const [count, setCount] = useState(0);
  const { confirm } = useConfirm();

  const increment = async () => {
    if (await confirm({ title: "vous voulez incrementez???" })) {
      setCount((v) => v + 1);
    }
  };

  return (
    <>
      <p>compteur: {count}</p>

      <button
        onClick={increment}
        type="button"
        class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        Incrementer
      </button>
    </>
  );
}

export default App;
