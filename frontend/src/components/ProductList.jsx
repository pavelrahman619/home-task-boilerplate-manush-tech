// src/components/ProductList.jsx
import React, { useEffect, useState } from 'react';
import { getProducts, updateProduct } from '../services/productService';
import { Table, Switch, Button } from '@mantine/core';

const ProductList = ({ onEdit, refreshTrigger }) => {
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  useEffect(() => {
    loadProducts();
  }, [refreshTrigger]);

  const handleToggle = async (product) => {
    await updateProduct(product.id, { ...product, enabled: !product.enabled });
    loadProducts();
  };

  return (
    <Table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Weight</th>
          <th>Enabled</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((p) => (
          <tr key={p.id}>
            <td>{p.name}</td>
            <td>{p.price}</td>
            <td>{p.weight}</td>
            <td>
              <Switch checked={p.enabled} onChange={() => handleToggle(p)} />
            </td>
            <td>
              <Button size="xs" onClick={() => onEdit(p)}>Edit</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ProductList;
