// src/components/ProductList.jsx
import React, { useEffect, useState } from 'react';
import { getProducts, updateProduct } from '../services/productService';
import { Table, Switch, Button, Center } from '@mantine/core';

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
            <Table.Thead>
                <Table.Tr>
                    <Table.Th>Name</Table.Th>
                    <Table.Th>Price</Table.Th>
                    <Table.Th>Weight</Table.Th>
                    <Table.Th>Enabled</Table.Th>
                    <Table.Th>Actions</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                {products.map((p) => (
                    <Table.Tr key={p.id}>
                        <Table.Td>{p.name}</Table.Td>
                        <Table.Td>{p.price}</Table.Td>
                        <Table.Td>{p.weight}</Table.Td>
                        <Table.Td>
                            <Switch checked={p.enabled} onChange={() => handleToggle(p)} />
                        </Table.Td>
                        <Table.Td>
                            <Button size="xs" variant="filled" onClick={() => onEdit(p)}>
                                Edit
                            </Button>
                        </Table.Td>
                    </Table.Tr>
                ))}
            </Table.Tbody>
        </Table>
    );
};

export default ProductList;
