import { Container, Flex, Grid, Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/AppUrls';
import LogoutButton from '../Global/LogoutButton';

const Layout = ({ children }) => {
    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            {/* Sidebar */}
            <div style={{ width: '250px', background: '#1A1B1E', padding: '20px' }}>
                <Text c="white" size="lg" weight={500}>Dashboard</Text>
                <nav>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        <li>
                            <Link to={ROUTES.DASHBOARD} style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
                        </li>
                        <li>
                            <Link to={ROUTES.PRODUCT_MANAGEMENT} style={{ color: 'white', textDecoration: 'none' }}>Products</Link>
                        </li>
                        <li>
                            <Link to={ROUTES.PROMOTION_MANAGEMENT} style={{ color: 'white', textDecoration: 'none' }}>Promotions</Link>
                        </li>
                        {/* Add more links as needed */}
                    </ul>
                </nav>
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
