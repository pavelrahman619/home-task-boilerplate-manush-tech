import React, { useState } from 'react';
import { Button, TextInput, NumberInput, Group, Divider } from '@mantine/core';
import axios from 'axios';
import { API } from './../../api/endpoints';

const PromotionSlabForm = ({ promotionId, onSlabSubmit }) => {
  const [slabData, setSlabData] = useState({
    minWeight: 0,
    maxWeight: 0,
    discountPerUnit: 0,
  });

  const handleSubmit = async () => {
    try {
      await axios.post(API.PROMOTION_SLAB.CREATE, {
        promotionId,
        ...slabData,
      });
      onSlabSubmit();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <TextInput
        label="Minimum Weight"
        type="number"
        value={slabData.minWeight}
        onChange={(e) => setSlabData({ ...slabData, minWeight: +e.target.value })}
        required
      />
      <TextInput
        label="Maximum Weight"
        type="number"
        value={slabData.maxWeight}
        onChange={(e) => setSlabData({ ...slabData, maxWeight: +e.target.value })}
        required
      />
      <NumberInput
        label="Discount Per Unit"
        value={slabData.discountPerUnit}
        onChange={(value) => setSlabData({ ...slabData, discountPerUnit: value })}
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
