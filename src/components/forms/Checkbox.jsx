const Checkbox = ({checked,onChange,label,id}) => {
    return ( 
        <div className="form-check">
        <input type="checkbox" className="form-check-input" id={id} checked={checked} onChange ={(e)=>onChange(e.target.checked)}/>
        <label className="form-check-label">{label}</label>
        </div>
     );
}
 
export default Checkbox;