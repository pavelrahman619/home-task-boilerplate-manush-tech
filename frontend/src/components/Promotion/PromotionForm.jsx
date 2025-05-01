import React, { useState, useEffect } from 'react';
import { Button, TextInput, Select, Group, Divider, Title, Text } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import axios from 'axios';
import { API } from './../../api/endpoints';
import PromotionSlabForm from './PromotionSlabForm';

const PromotionForm = ({ promotion, onSubmit }) => {
    const [formData, setFormData] = useState({
        title: '',
        startDate: null,
        endDate: null,
        type: '',
        enabled: true,
    });

    const [savedPromotionId, setSavedPromotionId] = useState(promotion?.id || null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (promotion) {
            setFormData({
                title: promotion.title,
                startDate: new Date(promotion.startDate),
                endDate: new Date(promotion.endDate),
                type: promotion.type,
                enabled: promotion.enabled,
            });
            setSavedPromotionId(promotion.id);
        }
    }, [promotion]);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            if (savedPromotionId) {
                await axios.put(API.PROMOTION.UPDATE(savedPromotionId), formData);
            } else {
                const res = await axios.post(API.PROMOTION.CREATE, formData);
                setSavedPromotionId(res.data.id); // Track new ID
            }
            onSubmit(); // Refresh or close modal
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setFormData({
            title: '',
            startDate: null,
            endDate: null,
            type: '',
            enabled: true,
        });
    };

    return (
        <div>
            <TextInput
                label="Promotion Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
            />
            <DatePickerInput
                label="Start Date"
                value={formData.startDate}
                onChange={(value) => setFormData({ ...formData, startDate: value })}
                required
            />
            <DatePickerInput
                label="End Date"
                value={formData.endDate}
                onChange={(value) => setFormData({ ...formData, endDate: value })}
                required
            />
            <Select
                label="Discount Type"
                value={formData.type}
                onChange={(value) => setFormData({ ...formData, type: value })}
                data={[
                    { value: 'PERCENTAGE', label: 'Percentage' },
                    { value: 'FIXED', label: 'Fixed' },
                    { value: 'WEIGHTED', label: 'Weighted' },
                ]}
                required
            />

            <Group position="right" mt="md">
                <Button variant="light" color="gray" type="button" onClick={handleCancel}>
                    Cancel
                </Button>
                <Button loading={loading} onClick={handleSubmit}>
                    {savedPromotionId ? 'Update' : 'Create'} Promotion
                </Button>
            </Group>

            {/* Show Slab form after creation when type is WEIGHTED */}
            {formData.type === 'WEIGHTED' && savedPromotionId && (
                <>
                    <Divider my="lg" />
                    <Title order={4}>Add Slabs</Title>
                    <Text size="sm" mb="md">
                        Define weight ranges and discount per unit for this weighted promotion.
                    </Text>
                    <PromotionSlabForm
                        promotionId={savedPromotionId}
                        onSlabSubmit={() => {
                            console.log('Slab submitted');
                        }}
                    />
                </>
            )}
        </div>
    );
};

export default PromotionForm;
