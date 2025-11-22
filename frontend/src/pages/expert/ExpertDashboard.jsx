// src/pages/expert/ExpertDashboard.jsx (временная заглушка)
import { Container, VStack, Heading, Text, Button } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

export const ExpertDashboard = () => {
  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={6}>
        <Heading>Панель эксперта</Heading>
        <Text>Здесь будут проекты для оценки</Text>
        <Button as={RouterLink} to="/expert/assessment" colorScheme="orange">
          Оценить проекты
        </Button>
      </VStack>
    </Container>
  );
};
