import { useDispatch } from "react-redux";
import { signOut } from "../redux/user/userSlice";
const Logout = () => {
   const  dispath = useDispatch();
   
   dispath(signOut)
   
}
 
export default Logout;