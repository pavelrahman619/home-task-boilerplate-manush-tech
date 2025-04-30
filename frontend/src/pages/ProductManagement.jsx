// src/pages/ProductManagement.jsx
import React, { useState } from 'react';
import ProductForm from '../components/ProductForm';
import ProductList from '../components/ProductList';

const ProductManagement = () => {
    const [productToEdit, setProductToEdit] = useState(null);
    const [refresh, setRefresh] = useState(0);

    const handleSubmit = () => {
        setProductToEdit(null);
        setRefresh((r) => r + 1); // trigger reload
    };

    return (
        <div>
            <h2>Product Management</h2>
            <ProductForm product={productToEdit} onSubmit={handleSubmit} onCancel={() => setProductToEdit(null)} />
            <ProductList onEdit={setProductToEdit} refreshTrigger={refresh} />
        </div>
    );
};

export default ProductManagement;
