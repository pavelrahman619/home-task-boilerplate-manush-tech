// src/pages/ProductManagement.jsx
import React, { useState } from 'react';
import { Title, Text, Divider, Stack, Box } from '@mantine/core';
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
        <Box maw={800} mx="auto" px="md" py="xl">
            <Stack spacing="xl">
                {/* Page Title */}
                <div>
                    <Title order={2}>Product Management</Title>
                    <Text color="dimmed" size="sm">
                        Manage your products by creating, updating, or viewing them.
                    </Text>
                </div>

                {/* Product Form */}
                <div>
                    <Title order={3}>Create or Edit Product</Title>
                    <ProductForm product={productToEdit} onSubmit={handleSubmit} onCancel={() => setProductToEdit(null)} />
                </div>

                {/* Divider between sections */}
                <Divider label="Product List" labelPosition="center" my="md" />

                {/* Product List */}
                <div>
                    <Title order={3}>Product List</Title>
                    <Text size="sm">
                        Here are all your existing products.
                    </Text>
                    <ProductList onEdit={setProductToEdit} refreshTrigger={refresh} />
                </div>
            </Stack>
        </Box>
    );
};

export default ProductManagement;
