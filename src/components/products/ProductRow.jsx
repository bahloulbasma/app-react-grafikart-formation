const ProductRow = ({products}) => {
    const style = products.stocked ? undefined : {color:'red'}
    return ( 
        <tr>
            <td style={style}>{products.name}</td>
            <td>{products.price}</td>
        </tr>
     );
}
 
export default ProductRow;