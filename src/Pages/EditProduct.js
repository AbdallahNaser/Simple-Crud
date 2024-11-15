import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditProduct() {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState(0);
    const { productID } = useParams(); // Get the product ID from the URL
    const navigate = useNavigate();

    // Fetch the product data when the component mounts
    useEffect(() => {
        fetch(`http://localhost:9000/Products/${productID}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch product details");
                }
                return res.json();
            })
            .then((data) => {
                setTitle(data.title);
                setPrice(data.price);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, [productID]);

    const formSubmit = (e) => {
        e.preventDefault();

        fetch(`http://localhost:9000/Products/${productID}`, {
            method: "PUT",
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
                throw new Error("Failed to edit product");
            }
            return res.json();
        })
        .then((data) => {
            console.log("Product edited successfully:", data);
            navigate('/products'); // Navigate back to the products page
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    };

    return (
        <>
            <h1>Edit Product</h1>

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
                    Edit Product
                </button>
            </form>
        </>
    );
}

export default EditProduct;
