import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProductDetails(){

    let{productID}=useParams();
    const [product,setProducts]=useState([]);

    useEffect(()=>{
        fetch(`http://localhost:9000/Products/${productID}`)
        .then((res)=>res.json())
        .then((product)=>setProducts(product));
    },[]);
    return (
        <>
            {product &&
            <>
                <h2>{product.title}</h2>
                <p>{product.description}</p>
                </>
                }
               
        
        </>
    )
}

export default ProductDetails;