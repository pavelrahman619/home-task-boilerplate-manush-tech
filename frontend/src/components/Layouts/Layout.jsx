import { Flex, Grid, Text, Stack, NavLink } from '@mantine/core';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/AppUrls';
import LogoutButton from '../Global/LogoutButton';

const Layout = ({ children }) => {
    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            {/* Sidebar */}
            <div style={{ width: 250, background: '#1A1B1E', padding: 20 }}>
                <Text c="white" size="lg" fw={500} mb="md">Dashboard</Text>
                <Stack spacing="md">
                    <NavLink color="blue.4" variant="subtle" active label="Home" component={Link} to={ROUTES.DASHBOARD} />
                    <NavLink color="blue.4" variant="subtle" active label="Products" component={Link} to={ROUTES.PRODUCT_MANAGEMENT} />
                    <NavLink color="blue.4" variant="subtle" active label="Promotions" component={Link} to={ROUTES.PROMOTION_MANAGEMENT} />
                    <NavLink color="blue.4" variant="subtle" active label="Orders Create" component={Link} to={ROUTES.ORDER_CREATE} />
                    <NavLink color="blue.4" variant="subtle" active label="Orders List" component={Link} to={ROUTES.ORDER_LIST} />
                </Stack>
            </div>

            {/* Main Content Area */}
            <div style={{ flex: 1, padding: '20px' }}>
                {/* Header */}
                <Flex justify="space-between" style={{ marginBottom: '20px', background: '#F5F5F5', padding: '15px' }}>
                    <Text align="center" size="xl" weight={700}>Welcome to the Dashboard</Text>
                    <LogoutButton />
                </Flex>

                {/* Main Content */}
                <main style={{ minHeight: '80vh' }}>{children}</main>

                {/* Footer */}
                <div style={{ marginTop: 'auto', background: '#1A1B1E', padding: '10px' }}>
                    <Text align="center" c="white" size="sm">© 2025 Your Company</Text>
                </div>
            </div>
        </div >
    );
};

export default Layout;
