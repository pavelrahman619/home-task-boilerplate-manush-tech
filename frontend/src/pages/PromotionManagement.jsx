import React, { useState } from 'react';
import { Box, Stack, Title, Text, Divider, Grid, Center } from '@mantine/core';
import PromotionList from './../components/Promotion/PromotionList';
import PromotionForm from './../components/Promotion/PromotionForm';

const PromotionManagement = () => {
    const [promotionToEdit, setPromotionToEdit] = useState(null);
    const [refresh, setRefresh] = useState(0);

    const handleSubmit = () => {
        setPromotionToEdit(null);
        setRefresh((r) => r + 1);
    };

    return (
        <Box maw={1200} mx="auto" px="md" py="xl">
            <Stack spacing="xl">
                <Center>
                    <div>
                        <Title order={2} align="center">Promotion Management</Title>
                        <Text c="dimmed" size="sm" align="center">
                            Manage promotions with title, date, and slab discounts.
                        </Text>
                    </div>
                </Center>

                <Grid gutter="xl" align="flex-start">
                    <Grid.Col span={{ base: 12, md: 6 }}>
                        <Title order={3} mb="sm">Create or Edit Promotion</Title>
                        <PromotionForm
                            promotion={promotionToEdit}
                            onSubmit={handleSubmit}
                            onCancel={() => setPromotionToEdit(null)}
                        />
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, md: 6 }}>
                        <Title order={3} mb="sm">Promotion List</Title>
                        <PromotionList onEdit={setPromotionToEdit} refreshTrigger={refresh} />
                    </Grid.Col>
                </Grid>
            </Stack>
        </Box>
    );
};

export default PromotionManagement;
