// src/pages/ProductManagement.jsx
import React, { useState } from 'react';
import { Box, Stack, Title, Text, Divider, Grid, Center } from '@mantine/core';
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
        <Box maw={1200} mx="auto" px="md" py="xl">
            <Stack spacing="xl">
                {/* Centered Page Title */}
                <Center>
                    <div>
                        <Title order={2} align="center">Product Management</Title>
                        <Text c="dimmed" size="sm" align="center">
                            Manage your products by creating, updating, or viewing them.
                        </Text>
                    </div>
                </Center>

                {/* Form and List in Grid */}
                <Grid gutter="xl" align="flex-start">
                    <Grid.Col span={{ base: 12, md: 6 }}>
                        <Title order={3} mb="sm">Create or Edit Product</Title>
                        <ProductForm
                            product={productToEdit}
                            onSubmit={handleSubmit}
                            onCancel={() => setProductToEdit(null)}
                        />
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, md: 6 }}>
                        <Title order={3} mb="sm">Product List</Title>
                        <Text size="sm" mb="md">
                            Here are all your existing products.
                        </Text>
                        <ProductList onEdit={setProductToEdit} refreshTrigger={refresh} />
                    </Grid.Col>
                </Grid>
            </Stack>
        </Box>
    );
};

export default ProductManagement;
