// src/components/ProductForm.jsx
import React, { useEffect, useState } from 'react';
import { createProduct, updateProduct } from '../services/productService';
import { Button, TextInput, Textarea } from '@mantine/core';

const ProductForm = ({ product, onSubmit, onCancel }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [weight, setWeight] = useState('');

    useEffect(() => {
        if (product) {
            setName(product.name || '');
            setDescription(product.description || '');
            setPrice(product.price?.toString() || '');
            setWeight(product.weight?.toString() || '');
        } else {
            setName('');
            setDescription('');
            setPrice('');
            setWeight('');
        }
    }, [product]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            name,
            description,
            price: parseFloat(price),
            weight: parseFloat(weight),
            enabled: true,
        };

        if (product) {
            await updateProduct(product.id, payload);
        } else {
            await createProduct(payload);
        }

        onSubmit();
    };

    const handleCancel = () => {
        setName('');
        setDescription('');
        setPrice('');
        setWeight('');
        onCancel?.();
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextInput
                label="Name"
                value={name}
                onChange={(e) => setName(e.currentTarget.value)}
                required
            />
            <Textarea
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.currentTarget.value)}
                required
            />
            <TextInput
                label="Price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.currentTarget.value)}
                required
            />
            <TextInput
                label="Weight"
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.currentTarget.value)}
                required
            />
            <Button type="submit">{product ? 'Update Product' : 'Create Product'}</Button>
            <Button
                variant="light"
                color="gray"
                type="button"
                onClick={handleCancel}
            >
                Cancel
            </Button>
        </form>
    );
};

export default ProductForm;
