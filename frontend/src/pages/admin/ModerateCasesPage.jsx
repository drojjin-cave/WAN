// src/pages/admin/ModerateCasesPage.jsx
import {
  Container,
  VStack,
  Heading,
  Text,
  Card,
  CardBody,
  HStack,
  Badge,
  Button,
  Box,
  useToast,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Select
} from '@chakra-ui/react';
import { useState } from 'react';

// Mock данные кейсов от экспертов
const mockCases = [
  {
    id: 1,
    hackathon: 'AI Challenge 2024',
    expert: 'Дмитрий Экспертов',
    caseTitle: 'Автоматизация медицинской диагностики',
    caseDescription: 'AI-система для анализа медицинских изображений и постановки предварительных диагнозов',
    status: 'pending',
    submittedAt: '2024-01-10 14:30:00'
  },
  {
    id: 2,
    hackathon: 'Blockchain Innovation',
    expert: 'Анна Журева', 
    caseTitle: 'Децентрализованная система голосования',
    caseDescription: 'Прозрачная и безопасная система для проведения онлайн-голосований',
    status: 'approved',
    submittedAt: '2024-01-09 11:20:00'
  },
  {
    id: 3,
    hackathon: 'AI Challenge 2024',
    expert: 'Петр Технов',
    caseTitle: 'Умный ассистент для образования',
    caseDescription: 'AI-помощник для персонализированного обучения студентов',
    status: 'rejected',
    submittedAt: '2024-01-08 16:45:00'
  }
];

export const ModerateCasesPage = () => {
  const toast = useToast();
  const [cases, setCases] = useState(mockCases);
  const [selectedHackathon, setSelectedHackathon] = useState('all');

  const handleStatusChange = (caseId, newStatus) => {
    setCases(prev => prev.map(c => 
      c.id === caseId ? { ...c, status: newStatus } : c
    ));

    toast({
      title: 'Статус обновлен',
      description: `Кейс ${newStatus === 'approved' ? 'одобрен' : 'отклонен'}`,
      status: 'success',
      duration: 2000,
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'green';
      case 'rejected': return 'red';
      case 'pending': return 'orange';
      default: return 'gray';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'approved': return 'Одобрен';
      case 'rejected': return 'Отклонен';
      case 'pending': return 'На рассмотрении';
      default: return status;
    }
  };

  const filteredCases = selectedHackathon === 'all' 
    ? cases 
    : cases.filter(c => c.hackathon === selectedHackathon);

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={6} align="stretch">
        <Box>
          <Heading as="h1" size="xl">Модерация кейсов</Heading>
          <Text color="gray.600">Управление кейсами, предложенными экспертами</Text>
        </Box>

        {/* Фильтры */}
        <Card variant="outline">
          <CardBody>
            <HStack spacing={4}>
              <Box>
                <Text fontWeight="medium" mb={2}>Фильтр по хакатону</Text>
                <Select
                  value={selectedHackathon}
                  onChange={(e) => setSelectedHackathon(e.target.value)}
                  width="300px"
                >
                  <option value="all">Все хакатоны</option>
                  <option value="AI Challenge 2024">AI Challenge 2024</option>
                  <option value="Blockchain Innovation">Blockchain Innovation</option>
                </Select>
              </Box>
            </HStack>
          </CardBody>
        </Card>

        {/* Таблица кейсов */}
        <Card variant="outline">
          <CardBody p={0}>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Хакатон</Th>
                  <Th>Эксперт</Th>
                  <Th>Название кейса</Th>
                  <Th>Описание</Th>
                  <Th>Дата подачи</Th>
                  <Th>Статус</Th>
                  <Th>Действия</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredCases.map((caseItem) => (
                  <Tr key={caseItem.id}>
                    <Td>{caseItem.hackathon}</Td>
                    <Td>{caseItem.expert}</Td>
                    <Td fontWeight="medium">{caseItem.caseTitle}</Td>
                    <Td>
                      <Text noOfLines={2} title={caseItem.caseDescription}>
                        {caseItem.caseDescription}
                      </Text>
                    </Td>
                    <Td>{new Date(caseItem.submittedAt).toLocaleDateString('ru-RU')}</Td>
                    <Td>
                      <Badge colorScheme={getStatusColor(caseItem.status)}>
                        {getStatusText(caseItem.status)}
                      </Badge>
                    </Td>
                    <Td>
                      {caseItem.status === 'pending' && (
                        <HStack spacing={2}>
                          <Button
                            size="sm"
                            colorScheme="green"
                            onClick={() => handleStatusChange(caseItem.id, 'approved')}
                          >
                            Одобрить
                          </Button>
                          <Button
                            size="sm"
                            colorScheme="red"
                            variant="outline"
                            onClick={() => handleStatusChange(caseItem.id, 'rejected')}
                          >
                            Отклонить
                          </Button>
                        </HStack>
                      )}
                      {caseItem.status !== 'pending' && (
                        <Text fontSize="sm" color="gray.500">
                          Решение принято
                        </Text>
                      )}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </CardBody>
        </Card>

        {filteredCases.length === 0 && (
          <Box textAlign="center" py={8}>
            <Text color="gray.500">Нет кейсов для модерации</Text>
          </Box>
        )}
      </VStack>
    </Container>
  );
};
