import { useState } from 'react';
import { Title, Button, TextInput } from '@mantine/core';
import OrderCart from '../../components/Orders/OrderCart';
import { createOrder } from '../../services/orderService';

const CreateOrder = () => {
  const [customerName, setCustomerName] = useState('');
  const [items, setItems] = useState([]);

  const handleSubmit = async () => {
    await createOrder({ customerName, items });
    // Optional: redirect or toast
  };

  return (
    <div>
      <Title>Create Order</Title>
      <TextInput
        label="Customer Name"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
        required
      />
      <OrderCart items={items} setItems={setItems} />
      <Button mt="md" onClick={handleSubmit}>Submit Order</Button>
    </div>
  );
};

export default CreateOrder;
