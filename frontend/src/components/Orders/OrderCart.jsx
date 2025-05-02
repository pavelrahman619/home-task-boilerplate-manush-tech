import { useEffect, useState } from 'react';
import { NumberInput, Select, Group, Button, Flex } from '@mantine/core';
import { getEnabledProducts } from '../../services/productService';
import { getEnabledPromotions } from '../../services/promotionService';
import { ActionIcon } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';

const OrderCart = ({ items, setItems }) => {
    const [products, setProducts] = useState([]);
    const [promotions, setPromotions] = useState([]);

    useEffect(() => {
        getEnabledProducts().then(data => setProducts(data || []));
        getEnabledPromotions().then(data => setPromotions(data || []));
    }, []);

    const addItem = () => {
        setItems([
            ...items,
            {
                productId: '',
                productName: '',
                quantity: 1,
                unitPrice: 0,
                discount: 0,
                promotionId: '',
                weight: 0,
            },
        ]);
    };

    const updateItem = (index, key, value) => {
        console.log('updateItem called with:', { index, key, value });

        const updatedItem = { ...items[index], [key]: value };

        if (key === 'productId') {
            const productId = Number(value);
            const product = products.find(p => p.id === productId);
            console.log('Product selected:', product);
            if (product) {
                updatedItem.productId = productId;
                updatedItem.productName = product.name;
                updatedItem.unitPrice = product.price;
                updatedItem.weight = product.weight;
            }
        }

        if (key === 'promotionId' || key === 'quantity') {
            const promotionId = Number(updatedItem.promotionId);
            const promotion = promotions.find(p => p.id === promotionId);
            if (promotion) {
                updatedItem.discount = calculateDiscount(promotion, updatedItem);
            }
        }

        const updatedItems = [...items];
        updatedItems[index] = updatedItem;

        setItems(updatedItems);
        console.log('Updated items:', updatedItems);
    };

    const calculateDiscount = (promotion, item) => {
        const { unitPrice, quantity } = item;

        if (promotion.type === 'PERCENTAGE' && promotion.discountPercentage) {
            return (unitPrice * promotion.discountPercentage) / 100 * quantity;
        }

        if (promotion.type === 'FIXED' && promotion.discountPercentage) {
            return promotion.discountPercentage * quantity;
        }

        if (promotion.type === 'WEIGHTED') {
            const totalWeight = item.weight * item.quantity;
            console.log(`Total weight ${totalWeight}`);

            const applicableSlab = promotion.promotionSlabs?.find(
                slab => totalWeight >= slab.minWeight && totalWeight <= slab.maxWeight
            );

            if (applicableSlab) {
                return applicableSlab.discount * item.quantity;
            }
        }

        return 0;
    };

    const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
    const discount = items.reduce((sum, item) => sum + item.discount, 0);
    const total = subtotal - discount;

    const removeItem = (index) => {
        const updatedItems = [...items];
        updatedItems.splice(index, 1);
        setItems(updatedItems);
    };

    return (
        <div>
            {items.map((item, i) => (
                <Group key={i} grow mt="sm">
                    <Select
                        label="Product"
                        data={products.map(p => ({ value: String(p.id), label: p.name }))}
                        value={item.productId}
                        onChange={(val) => updateItem(i, 'productId', val)}
                        searchable
                    />
                    <NumberInput
                        label="Qty"
                        value={item.quantity}
                        onChange={(val) => updateItem(i, 'quantity', val ?? 1)}
                        allowNegative={false}
                    />
                    <NumberInput
                        label="Price"
                        value={item.unitPrice}
                        disabled
                    />
                    <NumberInput
                        label="Discount"
                        value={item.discount}
                        disabled
                    />
                    <Select
                        label="Promotion"
                        data={promotions.map(p => ({
                            value: String(p.id),
                            label: p.title,
                        }))}
                        value={item.promotionId}
                        onChange={(val) => updateItem(i, 'promotionId', val)}
                        searchable
                    />
                    <Flex direction="column" justify="flex-end">
                        <ActionIcon
                            color="red"
                            variant="light"
                            onClick={() => removeItem(i)}
                            size="lg"
                            radius="sm"
                            title="Remove item"
                            style={{ marginBottom: '-1.3rem' }}
                        >
                            <IconTrash size={16} />
                        </ActionIcon>
                    </Flex> 
                </Group>
            ))}
            <Button mt="sm" onClick={addItem}>Add Item</Button>
            <div style={{ marginTop: '1rem' }}>
                <p>Subtotal: {subtotal.toFixed(2)}</p>
                <p>Total Discount: {discount.toFixed(2)}</p>
                <p><strong>Grand Total: {total.toFixed(2)}</strong></p>
            </div>
        </div>
    );
};

export default OrderCart;
