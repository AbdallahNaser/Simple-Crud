import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
function Products() {
  const [products, setProducts] = useState([]);



  const getAllProducts=()=>{
    fetch("http://localhost:9000/Products")
      .then((res) => res.json())
      .then((data) => setProducts(data));

  }

  useEffect(() => {
    getAllProducts();
  }, []);


  const deleteProduct=(product)=>{
    Swal.fire({
        title:`are you sure to delete ${product.title} ?`,
        showCancelButton: true
    }).then((data)=>{
        if(data.isConfirmed){
            fetch(`http://localhost:9000/Products/${product.id}`,{
                method:"DELETE"
            }).then((res)=>res.json()).then((data)=>{getAllProducts()});
        }
    })
   
  }

  return (
    <>
      <h3>Products page</h3>
      <Link to={"/products/add"} className="btn btn-success m-3">
        Add New Product
      </Link>
      <table className="table table-striped mt-5">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Operation</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            return (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.title}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>
                  <button className="btn btn-danger btn-sm m-1" onClick={()=>{deleteProduct(product)}}>Delete</button>
                  <Link className="btn btn-info btn-sm m-1" to={`/products/${product.id}`}>View</Link>
                  <Link className="btn btn-primary btn-sm m-1" to={`/products/edit/${product.id}`}>Edit</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default Products;
