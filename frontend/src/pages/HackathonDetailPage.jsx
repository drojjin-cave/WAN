// src/pages/HackathonDetailPage.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container, Heading, Text, Button, VStack, HStack, Badge } from '@chakra-ui/react';
import { hackathonService } from '../services/hackathonService';

export const HackathonDetailPage = () => {
  const { id } = useParams();
  const [hackathon, setHackathon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHackathon = async () => {
      try {
        const data = await hackathonService.getById(id);
        setHackathon(data);
      } catch (error) {
        console.error('Error fetching hackathon:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHackathon();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!hackathon) return <div>Hackathon not found</div>;

  return (
    <Container maxW="container.lg" py={8}>
      <VStack spacing={6} align="start">
        <Box>
          <HStack spacing={4} mb={4}>
            <Badge colorScheme="blue">{hackathon.status}</Badge>
            <Text color="gray.600">{hackathon.date}</Text>
          </HStack>
          <Heading mb={4}>{hackathon.name}</Heading>
          <Text fontSize="lg" mb={6}>{hackathon.description}</Text>
        </Box>

        <Button colorScheme="blue" size="lg" as="a" href={`/register/${hackathon.id}`}>
          Зарегистрироваться
        </Button>

        <Box>
          <Heading size="md" mb={4}>Детали мероприятия</Heading>
          <Text><strong>Дата:</strong> {hackathon.startDate} - {hackathon.endDate}</Text>
          <Text><strong>Формат:</strong> {hackathon.format}</Text>
          <Text><strong>Призы:</strong> {hackathon.prizes}</Text>
        </Box>
      </VStack>
    </Container>
  );
};
