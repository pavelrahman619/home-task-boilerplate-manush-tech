import { useEffect, useState } from 'react';
import { Table, Title, Loader } from '@mantine/core';
import { getOrders } from '../../services/orderService';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrders()
      .then(data => {
        setOrders(data || []); // Ensure orders is always an array
        setLoading(false);
      })
      .catch(() => {
        setOrders([]); // Fallback to empty array on error
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loader size="xl" />;
  }

  return (
    <div>
      <Title mb="md">Orders</Title>
      <Table striped highlightOnHover withBorder withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Customer</Table.Th>
            <Table.Th>Subtotal</Table.Th>
            <Table.Th>Discount</Table.Th>
            <Table.Th>Total</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {orders.length === 0 ? (
            <Table.Tr>
              <Table.Td colSpan={4} style={{ textAlign: 'center' }}>
                No orders available
              </Table.Td>
            </Table.Tr>
          ) : (
            orders.map(order => (
              <Table.Tr key={order.id}>
                <Table.Td>{order.customerName}</Table.Td>
                <Table.Td>{order.subtotal}</Table.Td>
                <Table.Td>{order.totalDiscount}</Table.Td>
                <Table.Td>{order.total}</Table.Td>
              </Table.Tr>
            ))
          )}
        </Table.Tbody>
      </Table>
    </div>
  );
};

export default OrderList;
