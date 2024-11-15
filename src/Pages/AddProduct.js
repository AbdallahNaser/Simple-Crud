import { useState } from "react";
import Products from "./Products";
import { useNavigate } from "react-router-dom";
function AddProduct() {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState(0);

    let navigate=useNavigate();
    const formSubmit = (e) => {
        e.preventDefault();

        fetch("http://localhost:9000/Products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title,
                price: parseFloat(price), 
                
            })
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error("Failed to add product");
            }
            return res.json();
        })
        .then((data) => {
            console.log("Product added successfully:", data);
            navigate('/products');
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    };

    return (
        <>
            <h1>Add Product</h1>

            <form onSubmit={formSubmit}>
                <div className="mb-3">
                    <label htmlFor="productTitle" className="form-label">
                        Title
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="productTitle"
                        placeholder="Product title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="productPrice" className="form-label">
                        Price
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="productPrice"
                        placeholder="Product price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Add Product
                </button>
            </form>
        </>
    );
}

export default AddProduct;
