import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]); // Initialize as an empty array
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    imageUrl: '',
    description: '',
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3001/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const getUsernameFromLocalStorage = () => {
    const storedUser = localStorage.getItem('username');
    return storedUser;
  };

  const isAdmin = getUsernameFromLocalStorage() === 'admin';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/addproducts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to add product');
      }

      const updatedProducts = await response.json();
      setProducts(updatedProducts);
      setShowModal(false);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="container mt-5">
        {isAdmin && (
          <>
      <div className="d-flex justify-content-between mb-3">
          <h1>Product List</h1>
          <button className="btn btn-success" onClick={openModal}>
            Add Product
          </button>
        </div>
          <div className={`modal ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Add Product</h5>
                  <button type="button" className="btn-close" onClick={closeModal}></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleFormSubmit}>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                        Product Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="imageUrl" className="form-label">
                        Image URL
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="imageUrl"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="description" className="form-label">
                        Description
                      </label>
                      <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                      ></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Add
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <div className="row">
        {products.map((product) => (
          <div key={product._id} className="col-md-4 mb-4">
            <div className="card">
              <img src={product.imageUrl} alt={product.name} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <Link to={`/product/${product._id}`} className="btn btn-primary">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
