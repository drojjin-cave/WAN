// src/pages/admin/AdminHackathonsPage.jsx
import { 
  Container, 
  VStack, 
  Heading, 
  Text, 
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  HStack
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { EditIcon, ViewIcon, AddIcon } from '@chakra-ui/icons';

const mockHackathons = [
  {
    id: 1,
    name: 'AI Challenge 2024',
    status: 'active',
    participants: 45,
    teams: 12,
    startDate: '2024-01-15',
    endDate: '2024-01-17',
    format: 'online'
  },
  {
    id: 2,
    name: 'Blockchain Innovation',
    status: 'upcoming',
    participants: 0,
    teams: 0,
    startDate: '2024-02-01',
    endDate: '2024-02-03',
    format: 'hybrid'
  },
  {
    id: 3,
    name: 'Web3 Hackathon',
    status: 'completed',
    participants: 32,
    teams: 8,
    startDate: '2023-12-10',
    endDate: '2023-12-12',
    format: 'offline'
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
    case 'active': return 'Активен';
    case 'upcoming': return 'Скоро';
    case 'completed': return 'Завершен';
    default: return status;
  }
};

export const AdminHackathonsPage = () => {
  return (
    <Container maxW="container.xl" p={0}>
      <VStack spacing={6} align="stretch">
        <HStack justify="space-between">
          <VStack align="start" spacing={1}>
            <Heading as="h1" size="xl">Все хакатоны</Heading>
            <Text color="gray.600">Управление всеми мероприятиями платформы</Text>
          </VStack>
          <Button
            as={RouterLink}
            to="/admin/create-hackathon"
            colorScheme="blue"
            leftIcon={<AddIcon />}
          >
            Создать хакатон
          </Button>
        </HStack>

        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Название</Th>
              <Th>Статус</Th>
              <Th>Участники</Th>
              <Th>Команды</Th>
              <Th>Даты</Th>
              <Th>Формат</Th>
              <Th>Действия</Th>
            </Tr>
          </Thead>
          <Tbody>
            {mockHackathons.map((hackathon) => (
              <Tr key={hackathon.id}>
                <Td fontWeight="medium">{hackathon.name}</Td>
                <Td>
                  <Badge colorScheme={getStatusColor(hackathon.status)}>
                    {getStatusText(hackathon.status)}
                  </Badge>
                </Td>
                <Td>{hackathon.participants}</Td>
                <Td>{hackathon.teams}</Td>
                <Td>
                  {new Date(hackathon.startDate).toLocaleDateString('ru-RU')} - {' '}
                  {new Date(hackathon.endDate).toLocaleDateString('ru-RU')}
                </Td>
                <Td>
                  {hackathon.format === 'online' ? 'Онлайн' : 
                   hackathon.format === 'offline' ? 'Оффлайн' : 'Гибрид'}
                </Td>
                <Td>
                  <HStack spacing={2}>
                    <Button
                      size="sm"
                      variant="outline"
                      leftIcon={<ViewIcon />}
                    >
                      Просмотр
                    </Button>
                    <Button
                      size="sm"
                      colorScheme="blue"
                      leftIcon={<EditIcon />}
                    >
                      Редактировать
                    </Button>
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>
    </Container>
  );
};
