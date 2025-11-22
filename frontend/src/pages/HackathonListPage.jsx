// src/pages/HackathonListPage.jsx
import { 
  Box, 
  Container, 
  VStack, 
  Heading, 
  Text,
  SimpleGrid,
  Card,
  CardBody,
  Badge,
  HStack,
  Button,
  Spinner,
  Alert,
  AlertIcon
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { CalendarIcon, TimeIcon } from '@chakra-ui/icons';
import { useState, useEffect } from 'react';

// Mock данные для хакатонов
const mockHackathons = [
  {
    id: '1',
    name: 'AI Challenge 2024',
    description: 'Соревнование по созданию AI-решений для бизнеса',
    status: 'active',
    startDate: '2024-01-15',
    endDate: '2024-01-17',
    participants: 45,
    format: 'online'
  },
  {
    id: '2',
    name: 'Blockchain Hackathon',
    description: 'Разработка децентрализованных приложений',
    status: 'upcoming',
    startDate: '2024-02-01',
    endDate: '2024-02-03',
    participants: 0,
    format: 'offline'
  },
  {
    id: '3',
    name: 'Web3 Innovation',
    description: 'Создание инновационных решений для Web3',
    status: 'completed',
    startDate: '2023-12-10',
    endDate: '2023-12-12',
    participants: 32,
    format: 'hybrid'
  }
];

const getStatusColor = (status) => {
  switch (status) {
    case 'active': return 'green';
    case 'upcoming': return 'blue';
    case 'completed': return 'gray';
    default: return 'gray';
  }
};

const getStatusText = (status) => {
  switch (status) {
    case 'active': return 'Идет сейчас';
    case 'upcoming': return 'Скоро начнется';
    case 'completed': return 'Завершен';
    default: return status;
  }
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('ru-RU');
};

export const HackathonListPage = () => {
  const [hackathons, setHackathons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Имитация загрузки данных
    const loadHackathons = async () => {
      try {
        setLoading(true);
        // В реальном приложении здесь был бы API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setHackathons(mockHackathons);
      } catch (err) {
        setError('Не удалось загрузить список хакатонов');
      } finally {
        setLoading(false);
      }
    };

    loadHackathons();
  }, []);

  if (loading) {
    return (
      <Container maxW="container.xl" py={10}>
        <VStack spacing={6}>
          <Spinner size="xl" />
          <Text>Загружаем список хакатонов...</Text>
        </VStack>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxW="container.xl" py={10}>
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        {/* Заголовок */}
        <Box>
          <Heading as="h1" size="xl" mb={2}>
            Все хакатоны
          </Heading>
          <Text color="gray.600">
            Выберите интересующий хакатон и присоединяйтесь к сообществу разработчиков
          </Text>
        </Box>

        {/* Список хакатонов */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {hackathons.map((hackathon) => (
            <Card 
              key={hackathon.id}
              variant="outline"
              _hover={{ 
                transform: 'translateY(-2px)',
                boxShadow: 'md',
                transition: 'all 0.2s'
              }}
              transition="all 0.2s"
            >
              <CardBody>
                <VStack spacing={4} align="start">
                  {/* Заголовок и статус */}
                  <Box w="100%">
                    <HStack justify="space-between" align="start" mb={2}>
                      <Heading as="h3" size="md" flex={1}>
                        {hackathon.name}
                      </Heading>
                      <Badge 
                        colorScheme={getStatusColor(hackathon.status)}
                        variant="subtle"
                      >
                        {getStatusText(hackathon.status)}
                      </Badge>
                    </HStack>
                    <Text color="gray.600" fontSize="sm">
                      {hackathon.description}
                    </Text>
                  </Box>

                  {/* Даты */}
                  <VStack spacing={2} align="start" w="100%">
                    <HStack spacing={2}>
                      <CalendarIcon color="gray.500" w={4} h={4} />
                      <Text fontSize="sm" color="gray.600">
                        {formatDate(hackathon.startDate)} - {formatDate(hackathon.endDate)}
                      </Text>
                    </HStack>
                    <HStack spacing={2}>
                      <TimeIcon color="gray.500" w={4} h={4} />
                      <Text fontSize="sm" color="gray.600">
                        {hackathon.format === 'online' ? 'Онлайн' : 
                         hackathon.format === 'offline' ? 'Оффлайн' : 'Гибрид'}
                      </Text>
                    </HStack>
                  </VStack>

                  {/* Участники и кнопка */}
                  <HStack justify="space-between" w="100%" pt={2}>
                    <Text fontSize="sm" color="gray.500">
                      {hackathon.participants} участников
                    </Text>
                    <Button
                      as={RouterLink}
                      to={`/hackathons/${hackathon.id}`}
                      size="sm"
                      colorScheme="blue"
                      variant={hackathon.status === 'completed' ? 'outline' : 'solid'}
                      isDisabled={hackathon.status === 'completed'}
                    >
                      {hackathon.status === 'completed' ? 'Посмотреть' : 'Участвовать'}
                    </Button>
                  </HStack>
                </VStack>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>

        {/* Сообщение если нет хакатонов */}
        {hackathons.length === 0 && (
          <Box textAlign="center" py={10}>
            <Text fontSize="lg" color="gray.500">
              Пока нет активных хакатонов. Следите за обновлениями!
            </Text>
          </Box>
        )}
      </VStack>
    </Container>
  );
};
