// src/pages/admin/AdminHackathonDetailPage.jsx
import {
  Container,
  VStack,
  HStack,
  Heading,
  Text,
  Card,
  CardBody,
  Badge,
  Button,
  Box,
  SimpleGrid,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Progress,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Avatar,
  AvatarGroup,
  useToast,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton
} from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  EditIcon, 
  ChevronLeftIcon,
  CalendarIcon,
  TimeIcon,
  ViewIcon,
  CheckIcon,
  CloseIcon,
  HamburgerIcon
} from '@chakra-ui/icons';
import { useState } from 'react';

// Mock данные для детальной страницы хакатона
const mockHackathonDetail = {
  id: '1',
  name: 'AI Challenge 2024',
  description: 'Крупнейшее соревнование по искусственному интеллекту и машинному обучению. Участники создадут инновационные AI-решения для реальных бизнес-задач.',
  shortDescription: 'Создай AI-решение для бизнеса и выиграй 500,000 рублей!',
  status: 'active',
  format: 'online',
  registrationStart: '2024-01-01T00:00:00',
  registrationEnd: '2024-01-14T23:59:59',
  startDate: '2024-01-15T10:00:00',
  endDate: '2024-01-17T18:00:00',
  location: null,
  onlineUrl: 'https://meet.tech/ai-challenge-2024',
  maxParticipants: 200,
  maxTeams: 40,
  prizes: '1 место: 500,000 руб, 2 место: 300,000 руб, 3 место: 200,000 руб, специальные призы от партнеров',
  rules: 'Команды до 5 человек, 48 часов на разработку, готовый прототип с открытым исходным кодом',
  
  // Статистика
  stats: {
    registeredParticipants: 156,
    approvedParticipants: 145,
    teams: 32,
    projects: 28,
    experts: 8
  },

  // Команды
  teams: [
    {
      id: '1',
      name: 'AI Masters',
      participants: [
        { id: '1', name: 'Петр Лидеров', role: 'leader' },
        { id: '2', name: 'Иван Участников', role: 'member' },
        { id: '3', name: 'Александра Разработчикова', role: 'member' }
      ],
      project: {
        name: 'SmartDoc AI',
        status: 'submitted',
        submittedAt: '2024-01-16T15:30:00'
      },
      checkpoints: [
        { name: 'Идея и концепция', status: 'completed', score: 8.5 },
        { name: 'Техническая реализация', status: 'completed', score: 7.8 },
        { name: 'Финальная презентация', status: 'pending', score: null }
      ]
    },
    {
      id: '2',
      name: 'Neural Ninjas',
      participants: [
        { id: '4', name: 'Мария Кодерова', role: 'leader' },
        { id: '5', name: 'Алексей Алгоритмов', role: 'member' }
      ],
      project: {
        name: 'EduAI Assistant',
        status: 'in_progress',
        submittedAt: null
      },
      checkpoints: [
        { name: 'Идея и концепция', status: 'completed', score: 7.2 },
        { name: 'Техническая реализация', status: 'pending', score: null },
        { name: 'Финальная презентация', status: 'pending', score: null }
      ]
    }
  ],

  // Эксперты
  experts: [
    { id: '1', name: 'Дмитрий Экспертов', role: 'expert', specialization: ['AI', 'Machine Learning'] },
    { id: '2', name: 'Анна Журева', role: 'judge', specialization: ['Startups', 'Business'] },
    { id: '3', name: 'Сергей Технический', role: 'expert', specialization: ['Backend', 'Architecture'] }
  ],

  // Чекпоинты
  checkpoints: [
    { id: '1', name: 'Идея и концепция', deadline: '2024-01-15T14:00:00', completedTeams: 28 },
    { id: '2', name: 'Техническая реализация', deadline: '2024-01-16T18:00:00', completedTeams: 15 },
    { id: '3', name: 'Финальная презентация', deadline: '2024-01-17T16:00:00', completedTeams: 0 }
  ],

  // Регистрации на модерации
  pendingRegistrations: [
    { id: '1', name: 'Алексей Новый', email: 'new@example.com', skills: ['Python', 'ML'], experience: 'beginner' },
    { id: '2', name: 'Екатерина Стартова', email: 'start@example.com', skills: ['React', 'Node.js'], experience: 'intermediate' }
  ]
};

const getStatusColor = (status) => {
  switch (status) {
    case 'active': return 'green';
    case 'upcoming': return 'blue';
    case 'completed': return 'gray';
    case 'draft': return 'yellow';
    default: return 'gray';
  }
};

const getStatusText = (status) => {
  switch (status) {
    case 'active': return 'Активен';
    case 'upcoming': return 'Скоро начнется';
    case 'completed': return 'Завершен';
    case 'draft': return 'Черновик';
    default: return status;
  }
};

const getCheckpointStatusColor = (status) => {
  switch (status) {
    case 'completed': return 'green';
    case 'in_progress': return 'blue';
    case 'pending': return 'gray';
    case 'failed': return 'red';
    default: return 'gray';
  }
};

export const AdminHackathonDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [hackathon, setHackathon] = useState(mockHackathonDetail);

  const handleApproveRegistration = (registrationId) => {
    toast({
      title: 'Заявка одобрена',
      description: 'Участник добавлен в хакатон',
      status: 'success',
      duration: 3000,
    });
    // В реальном приложении здесь был бы API вызов
  };

  const handleRejectRegistration = (registrationId) => {
    toast({
      title: 'Заявка отклонена',
      status: 'info',
      duration: 3000,
    });
    // В реальном приложении здесь был бы API вызов
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Container maxW="container.xl" p={0}>
      <VStack spacing={6} align="stretch">
        {/* Хлебные крошки и заголовок */}
        <HStack spacing={4}>
          <Button
            variant="ghost"
            leftIcon={<ChevronLeftIcon />}
            onClick={() => navigate('/admin/hackathons')}
          >
            Назад к списку
          </Button>
          <Box flex="1">
            <HStack justify="space-between" align="start">
              <VStack align="start" spacing={1}>
                <HStack spacing={3}>
                  <Heading as="h1" size="xl">{hackathon.name}</Heading>
                  <Badge 
                    colorScheme={getStatusColor(hackathon.status)}
                    fontSize="lg"
                    px={3}
                    py={1}
                  >
                    {getStatusText(hackathon.status)}
                  </Badge>
                </HStack>
                <Text color="gray.600" fontSize="lg">
                  {hackathon.shortDescription}
                </Text>
              </VStack>
              <Button
                colorScheme="blue"
                leftIcon={<EditIcon />}
                onClick={() => navigate(`/admin/hackathons/${id}/edit`)}
              >
                Редактировать
              </Button>
            </HStack>
          </Box>
        </HStack>

        {/* Основная информация */}
        <Card variant="outline">
          <CardBody>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
              <Box>
                <Text fontWeight="medium" color="gray.600" mb={2}>Формат</Text>
                <Text fontSize="lg">
                  {hackathon.format === 'online' ? 'Онлайн' : 
                   hackathon.format === 'offline' ? 'Оффлайн' : 'Гибрид'}
                </Text>
              </Box>
              <Box>
                <Text fontWeight="medium" color="gray.600" mb={2}>Даты проведения</Text>
                <Text fontSize="lg">
                  {formatDate(hackathon.startDate)} - {formatDate(hackathon.endDate)}
                </Text>
              </Box>
              <Box>
                <Text fontWeight="medium" color="gray.600" mb={2}>Регистрация</Text>
                <Text fontSize="lg">
                  {formatDate(hackathon.registrationStart)} - {formatDate(hackathon.registrationEnd)}
                </Text>
              </Box>
            </SimpleGrid>
            {hackathon.onlineUrl && (
              <Box mt={4}>
                <Text fontWeight="medium" color="gray.600" mb={2}>Онлайн-ссылка</Text>
                <Text fontSize="lg" color="blue.500">
                  <a href={hackathon.onlineUrl} target="_blank" rel="noopener noreferrer">
                    {hackathon.onlineUrl}
                  </a>
                </Text>
              </Box>
            )}
          </CardBody>
        </Card>

        {/* Статистика */}
        <SimpleGrid columns={{ base: 2, md: 3, lg: 5 }} spacing={4}>
          <Card>
            <CardBody>
              <Stat>
                <StatLabel>Участники</StatLabel>
                <StatNumber>{hackathon.stats.approvedParticipants}</StatNumber>
                <StatHelpText>
                  из {hackathon.stats.registeredParticipants} зарегистрированных
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <Stat>
                <StatLabel>Команды</StatLabel>
                <StatNumber>{hackathon.stats.teams}</StatNumber>
                <StatHelpText>
                  из {hackathon.maxTeams} максимально
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <Stat>
                <StatLabel>Проекты</StatLabel>
                <StatNumber>{hackathon.stats.projects}</StatNumber>
                <StatHelpText>
                  {Math.round((hackathon.stats.projects / hackathon.stats.teams) * 100)}% команд
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <Stat>
                <StatLabel>Эксперты</StatLabel>
                <StatNumber>{hackathon.stats.experts}</StatNumber>
                <StatHelpText>
                  оценивают проекты
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <Stat>
                <StatLabel>Прогресс</StatLabel>
                <StatNumber>
                  {Math.round((hackathon.stats.projects / hackathon.stats.teams) * 100)}%
                </StatNumber>
                <StatHelpText>
                  выполнения проектов
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </SimpleGrid>

        {/* Табы с детальной информацией */}
        <Tabs colorScheme="blue">
          <TabList>
            <Tab>Команды и проекты</Tab>
            <Tab>Чекпоинты</Tab>
            <Tab>Эксперты</Tab>
            <Tab>Модерация заявок</Tab>
            <Tab>Информация</Tab>
          </TabList>

          <TabPanels>
            {/* Таб: Команды и проекты */}
            <TabPanel>
              <VStack spacing={6}>
                {hackathon.teams.map((team) => (
                  <Card key={team.id} variant="outline" w="100%">
                    <CardBody>
                      <VStack spacing={4} align="start">
                        <HStack justify="space-between" w="100%">
                          <VStack align="start" spacing={1}>
                            <Heading as="h3" size="md">{team.name}</Heading>
                            <HStack spacing={2}>
                              <Badge colorScheme={team.project.status === 'submitted' ? 'green' : 'blue'}>
                                {team.project.status === 'submitted' ? 'Проект сдан' : 'В работе'}
                              </Badge>
                              <Text fontSize="sm" color="gray.500">
                                {team.participants.length} участников
                              </Text>
                            </HStack>
                          </VStack>
                          <Menu>
                            <MenuButton
                              as={IconButton}
                              icon={<HamburgerIcon />}
                              variant="ghost"
                            />
                            <MenuList>
                              <MenuItem>Просмотр проекта</MenuItem>
                              <MenuItem>Отправить сообщение</MenuItem>
                              <MenuItem>Исключить из хакатона</MenuItem>
                            </MenuList>
                          </Menu>
                        </HStack>

                        {/* Участники команды */}
                        <Box>
                          <Text fontWeight="medium" mb={2}>Участники:</Text>
                          <AvatarGroup size="sm" max={5}>
                            {team.participants.map((participant) => (
                              <Avatar 
                                key={participant.id} 
                                name={participant.name}
                                title={participant.role === 'leader' ? 'Капитан' : 'Участник'}
                              />
                            ))}
                          </AvatarGroup>
                        </Box>

                        {/* Информация о проекте */}
                        {team.project && (
                          <Box w="100%">
                            <Text fontWeight="medium" mb={2}>
                              Проект: {team.project.name}
                            </Text>
                            {team.project.submittedAt && (
                              <Text fontSize="sm" color="gray.500">
                                Сдан: {formatDate(team.project.submittedAt)}
                              </Text>
                            )}
                          </Box>
                        )}

                        {/* Прогресс по чекпоинтам */}
                        <Box w="100%">
                          <Text fontWeight="medium" mb={2}>Прогресс:</Text>
                          <VStack spacing={2} align="start">
                            {team.checkpoints.map((checkpoint, index) => (
                              <HStack key={index} w="100%" justify="space-between">
                                <Text fontSize="sm">{checkpoint.name}</Text>
                                <HStack spacing={2}>
                                  {checkpoint.score && (
                                    <Text fontSize="sm" fontWeight="medium">
                                      {checkpoint.score}/10
                                    </Text>
                                  )}
                                  <Badge 
                                    colorScheme={getCheckpointStatusColor(checkpoint.status)}
                                    size="sm"
                                  >
                                    {checkpoint.status === 'completed' ? '✅' : 
                                     checkpoint.status === 'in_progress' ? '🔄' : '⏳'}
                                  </Badge>
                                </HStack>
                              </HStack>
                            ))}
                          </VStack>
                        </Box>
                      </VStack>
                    </CardBody>
                  </Card>
                ))}
              </VStack>
            </TabPanel>

            {/* Таб: Чекпоинты */}
            <TabPanel>
              <VStack spacing={4}>
                {hackathon.checkpoints.map((checkpoint) => (
                  <Card key={checkpoint.id} variant="outline" w="100%">
                    <CardBody>
                      <VStack spacing={3} align="start">
                        <HStack justify="space-between" w="100%">
                          <VStack align="start" spacing={1}>
                            <Heading as="h4" size="sm">{checkpoint.name}</Heading>
                            <Text fontSize="sm" color="gray.500">
                              Дедлайн: {formatDate(checkpoint.deadline)}
                            </Text>
                          </VStack>
                          <Badge colorScheme="blue">
                            {checkpoint.completedTeams}/{hackathon.stats.teams} команд
                          </Badge>
                        </HStack>
                        
                        <Box w="100%">
                          <Progress 
                            value={(checkpoint.completedTeams / hackathon.stats.teams) * 100} 
                            colorScheme="green" 
                            size="lg"
                            borderRadius="full"
                          />
                        </Box>

                        <Text fontSize="sm" color="gray.600">
                          {checkpoint.completedTeams} из {hackathon.stats.teams} команд завершили этот чекпоинт
                        </Text>
                      </VStack>
                    </CardBody>
                  </Card>
                ))}
              </VStack>
            </TabPanel>

            {/* Таб: Эксперты */}
            <TabPanel>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Эксперт</Th>
                    <Th>Роль</Th>
                    <Th>Специализация</Th>
                    <Th>Действия</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {hackathon.experts.map((expert) => (
                    <Tr key={expert.id}>
                      <Td fontWeight="medium">{expert.name}</Td>
                      <Td>
                        <Badge colorScheme={expert.role === 'judge' ? 'purple' : 'orange'}>
                          {expert.role === 'judge' ? 'Жюри' : 'Эксперт'}
                        </Badge>
                      </Td>
                      <Td>
                        <HStack spacing={1}>
                          {expert.specialization.map((spec, index) => (
                            <Badge key={index} variant="subtle" colorScheme="blue">
                              {spec}
                            </Badge>
                          ))}
                        </HStack>
                      </Td>
                      <Td>
                        <HStack spacing={2}>
                          <Button size="sm" variant="outline">
                            Назначения
                          </Button>
                          <Button size="sm" colorScheme="red" variant="ghost">
                            Удалить
                          </Button>
                        </HStack>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
              <Button mt={4} colorScheme="blue">
                + Добавить эксперта
              </Button>
            </TabPanel>

            {/* Таб: Модерация заявок */}
            <TabPanel>
              {hackathon.pendingRegistrations.length > 0 ? (
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Участник</Th>
                      <Th>Навыки</Th>
                      <Th>Опыт</Th>
                      <Th>Действия</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {hackathon.pendingRegistrations.map((registration) => (
                      <Tr key={registration.id}>
                        <Td>
                          <VStack align="start" spacing={0}>
                            <Text fontWeight="medium">{registration.name}</Text>
                            <Text fontSize="sm" color="gray.500">{registration.email}</Text>
                          </VStack>
                        </Td>
                        <Td>
                          <HStack spacing={1}>
                            {registration.skills.map((skill, index) => (
                              <Badge key={index} variant="subtle" colorScheme="green">
                                {skill}
                              </Badge>
                            ))}
                          </HStack>
                        </Td>
                        <Td>
                          <Badge colorScheme={
                            registration.experience === 'beginner' ? 'yellow' :
                            registration.experience === 'intermediate' ? 'blue' : 'green'
                          }>
                            {registration.experience === 'beginner' ? 'Начинающий' :
                             registration.experience === 'intermediate' ? 'Средний' : 'Опытный'}
                          </Badge>
                        </Td>
                        <Td>
                          <HStack spacing={2}>
                            <Button
                              size="sm"
                              colorScheme="green"
                              leftIcon={<CheckIcon />}
                              onClick={() => handleApproveRegistration(registration.id)}
                            >
                              Одобрить
                            </Button>
                            <Button
                              size="sm"
                              colorScheme="red"
                              variant="outline"
                              leftIcon={<CloseIcon />}
                              onClick={() => handleRejectRegistration(registration.id)}
                            >
                              Отклонить
                            </Button>
                          </HStack>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              ) : (
                <Box textAlign="center" py={8}>
                  <Text color="gray.500">Нет заявок на модерацию</Text>
                </Box>
              )}
            </TabPanel>

            {/* Таб: Информация */}
            <TabPanel>
              <VStack spacing={6} align="start">
                <Box>
                  <Heading as="h3" size="md" mb={2}>Описание</Heading>
                  <Text>{hackathon.description}</Text>
                </Box>

                <Box>
                  <Heading as="h3" size="md" mb={2}>Призы</Heading>
                  <Text>{hackathon.prizes}</Text>
                </Box>

                <Box>
                  <Heading as="h3" size="md" mb={2}>Правила участия</Heading>
                  <Text>{hackathon.rules}</Text>
                </Box>

                <Box>
                  <Heading as="h3" size="md" mb={2}>Лимиты</Heading>
                  <SimpleGrid columns={2} spacing={4}>
                    <Text>Максимум участников: {hackathon.maxParticipants}</Text>
                    <Text>Максимум команд: {hackathon.maxTeams}</Text>
                  </SimpleGrid>
                </Box>
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </Container>
  );
};
