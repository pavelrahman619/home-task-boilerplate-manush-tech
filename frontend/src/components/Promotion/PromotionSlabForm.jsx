import React, { useState } from 'react';
import { Button, TextInput, NumberInput, Group } from '@mantine/core';
import axios from 'axios';
import { API } from './../../api/endpoints';
import { showSuccess, showError } from './../../utils/notificationUtils';

const PromotionSlabForm = ({ promotionId, onSlabSubmit }) => {
  const [slabData, setSlabData] = useState({
    minWeight: 0,
    maxWeight: 0,
    discount: 0,
  });

  const handleSubmit = async () => {
    const { minWeight, maxWeight, discount } = slabData;

    // Validate that discount is a number
    if (discount === null || isNaN(discount)) {
      alert('Please enter a valid number for Discount Per Unit.');
      return;
    }

    try {
      await axios.post(API.PROMOTION_SLAB.CREATE, {
        promotionId,
        minWeight: parseFloat(minWeight),
        maxWeight: parseFloat(maxWeight),
        discount: parseFloat(discount),
      });
      onSlabSubmit();
      showSuccess('Created', 'Success');
    } catch (error) {
      console.error(error);
      showError('Error', 'Not Success');
    }
  };

  return (
    <div>
      <NumberInput
        label="Minimum Weight"
        min={0}
        precision={2}
        value={slabData.minWeight}
        onChange={(value) => setSlabData({ ...slabData, minWeight: value ?? 0 })}
        required
      />

      <NumberInput
        label="Maximum Weight"
        min={0}
        precision={2}
        value={slabData.maxWeight}
        onChange={(value) => setSlabData({ ...slabData, maxWeight: value ?? 0 })}
        required
      />
      <NumberInput
        label="Discount Per Unit"
        min={0}
        precision={2}
        value={slabData.discount}
        onChange={(value) =>
          setSlabData({ ...slabData, discount: value ?? 0 })
        }
        required
      />
      <Group position="right" mt="md">
        <Button variant="outline" onClick={onSlabSubmit}>Cancel</Button>
        <Button onClick={handleSubmit}>Add Slab</Button>
      </Group>
    </div>
  );
};

export default PromotionSlabForm;
