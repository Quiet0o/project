import React,{useEffect,useState}from 'react'
import { db } from '../confing/firebase-config';
import { useNavigate } from 'react-router-dom';
import  { getDocs,collection,getDoc,doc }  from "firebase/firestore"; 
import Product from './Product';
import SingleProduct from './SingleProduct';
// import AddingProductToCart from "./AddingProductToCart";
const ShowProducts=()=>{
    
    let navigate = useNavigate();
    const [products, setproducts] = useState([])
    // const [singleProduct, setSingleProduct] = useState([])
    // const [productsInCart,setProductsInCart] = useState([])
    const  productInCart =[];
    // const [dupa,setdupa] = useState([])
    let Cartsize=productInCart.length;
    // let [size , setSize ] = useState(0); 

    const ShowAllProducts= async ()=>{
        const getProducts =[];
        
        const docRef = collection(db, "Products");
        let docSnap = await getDocs(docRef);
        docSnap.forEach((doc)=>{
            getProducts.push({
                key: doc.id,
                ...doc.data()
            })
            setproducts([...getProducts])
        });
        console.log(getProducts)

    }

    // const showOneProduct = async(docId) =>{
    //     // console.log("----------------------------ONe--------------------");
    //     const getSingleProduct =[];
    //     const docRef = doc(db, "Products",docId);
    //     let docSnap = await getDoc(docRef);
    //     // console.log(docSnap.data())

    //     getSingleProduct.push({key:docSnap.id, ...docSnap.data()})

    //     console.log(getSingleProduct);
    //     // setSingleProduct(...getSingleProduct)
    //     // console.log(singleProduct);
    //     // console.clear()
    // }

    const AddingProductToCart=(props)=>{
        productInCart.push(props)
        console.log(productInCart)
        // console.log(productInCart.length)
        // Cartsize = productInCart.length
        // console.log(Cartsize)
        // productInCart.forEach((product)=>{
        //     console.log(product)
        // })
        
    }

    useEffect(()=>{
        ShowAllProducts()
       
    },[])

    return (
        <div className="all-product" >
            {/* <p >{Cartsize}</p> */}
            { products && products.length>0 &&
            products.map((product)=> 
            <div className="Single-product">
                <Product props={product} key={product.id}/>
                <button onClick={()=>{navigate(`/product/${product.key}`)}}>Single Product values</button>
                {/* <button>{product.key}</button> */}
                <button onClick={()=>(AddingProductToCart(product))}>Add to cart</button>
               
                
            </div>
            )}
        
        </div>
    )
}
export default ShowProducts