// src/components/ui/Layout/MainLayout.jsx
import { Box } from '@chakra-ui/react';
import { Header } from '../Navigation/Header';
import { Footer } from '../Navigation/Footer';
import { Outlet } from 'react-router-dom';

export const MainLayout = () => {
  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <Header />
      <Box as="main" flex="1" py={8}>
        <Outlet />
      </Box>
      <Footer /> {/* Добавляем футер */}
    </Box>
  );
};
