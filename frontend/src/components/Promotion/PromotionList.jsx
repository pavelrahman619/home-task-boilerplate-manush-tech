import React, { useEffect, useState } from 'react';
import { Table, Button, Text, Group, Switch } from '@mantine/core';
import axios from 'axios';
import { API } from './../../api/endpoints';

const PromotionList = ({ onEdit, refreshTrigger }) => {
    const [promotions, setPromotions] = useState([]);

    useEffect(() => {
        const fetchPromotions = async () => {
            try {
                const { data } = await axios.get(API.PROMOTION.LIST_ALL);
                setPromotions(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPromotions();
    }, [refreshTrigger]);

    const handleEnableDisable = async (id, enabled) => {
        try {
            if (enabled) {
                await axios.put(API.PROMOTION.DISABLE(id));
            } else {
                await axios.put(API.PROMOTION.ENABLE(id));
            }
            setPromotions((prev) =>
                prev.map((promotion) =>
                    promotion.id === id ? { ...promotion, enabled: !enabled } : promotion
                )
            );
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <Table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {promotions.map((promotion) => (
                        <tr key={promotion.id}>
                            <td>{promotion.title}</td>
                            <td>{new Date(promotion.startDate).toLocaleDateString()}</td>
                            <td>{new Date(promotion.endDate).toLocaleDateString()}</td>
                            <td>
                                <Switch
                                    checked={promotion.enabled}
                                    onChange={() => handleEnableDisable(promotion.id, promotion.enabled)}
                                />
                            </td>
                            <td>
                                <Group spacing="xs">
                                    <Button variant="filled" onClick={() => onEdit(promotion)}>
                                        Edit
                                    </Button>
                                </Group>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {!promotions.length && <Text align="center" mt="md">No promotions found</Text>}
        </div>
    );
};

export default PromotionList;
