const Input = ({type,placeholder,value,onChange,id}) => {
    return ( 
        <>
        <label>
            <input type={type?type:"text"}id={id} className="form-control" placeholder={placeholder} value={value} onChange={(e)=> onChange(e.target.value)}/>
        </label>
        </>
     );
}
 
export default Input;