import React,{useState} from 'react'
const AddingProductToCart =({props})=>{
    
    const products =[];
    const [productInCart,setProductInCart] = useState([]);

    const AddProduct =(props)=>{
        products.push(props)
        setProductInCart({props});
        console.log(productInCart)
    }
    return(
        <div className="product-add-to-cart">
            <button onClick={AddProduct(props)}>Add  product to Car</button>
        </div>
    )
}
export default AddingProductToCart;

