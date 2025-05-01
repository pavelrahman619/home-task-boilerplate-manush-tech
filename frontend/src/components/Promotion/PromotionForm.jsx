import React, { useState, useEffect } from 'react';
import { Button, TextInput, Select, Group } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import axios from 'axios';
import { API } from './../../api/endpoints';

const PromotionForm = ({ promotion, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        title: '',
        startDate: null,
        endDate: null,
        type: '',
        enabled: true
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (promotion) {
            setFormData({
                title: promotion.title,
                startDate: new Date(promotion.startDate),
                endDate: new Date(promotion.endDate),
                type: promotion.type,
                enabled: promotion.enabled
            });
        }
    }, [promotion]);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            if (promotion) {
                // Update promotion
                await axios.put(`${API.PROMOTION.UPDATE(promotion.id)}`, formData);
            } else {
                // Create promotion
                await axios.post(API.PROMOTION.CREATE, formData);
            }
            onSubmit();
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
                {/* <Button variant="outline" onClick={onCancel}>Cancel</Button> */}
                <Button variant="light" color="gray" type="button" onClick={handleCancel}>
                    Cancel
                </Button>
                <Button loading={loading} onClick={handleSubmit}>{promotion ? 'Update' : 'Create'} Promotion</Button>
            </Group>
        </div>
    );
};

export default PromotionForm;
