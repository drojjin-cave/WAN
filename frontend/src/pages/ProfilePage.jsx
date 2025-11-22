// src/pages/ProfilePage.jsx
import {
  Container,
  VStack,
  Heading,
  Text,
  Card,
  CardBody,
  HStack,
  Avatar,
  Badge,
  Box,
  SimpleGrid,
  Button,
  useColorModeValue,
  Divider,
  Tag,
  TagLabel,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText
} from '@chakra-ui/react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const getRoleDisplayName = (role) => {
  const roleNames = {
    participant: 'Участник',
    team_lead: 'Капитан команды',
    expert: 'Эксперт',
    judge: 'Жюри',
    admin: 'Администратор',
    organizer: 'Организатор'
  };
  return roleNames[role] || role;
};

const getRoleColor = (role) => {
  const colors = {
    participant: 'blue',
    team_lead: 'green',
    expert: 'orange',
    judge: 'purple',
    admin: 'red',
    organizer: 'pink'
  };
  return colors[role] || 'gray';
};

// Mock данные для статистики
const getMockStats = (role) => {
  const baseStats = {
    participant: {
      hackathons: 3,
      projects: 5,
      rating: 4.2
    },
    team_lead: {
      hackathons: 5,
      projects: 8,
      teams: 2,
      rating: 4.5
    },
    expert: {
      assessed: 24,
      hackathons: 8,
      avgRating: 4.1
    },
    admin: {
      managed: 12,
      users: 156,
      active: 3
    },
    organizer: {
      organized: 6,
      participants: 450,
      budget: '2.5M'
    }
  };
  return baseStats[role] || baseStats.participant;
};

export const ProfilePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const cardBg = useColorModeValue('white', 'gray.700');
  const stats = getMockStats(user?.role);
console.log('user',user)
  if (!user) {
    return (
      <Container maxW="container.md" py={8}>
        <Text>Пользователь не найден</Text>
      </Container>
    );
  }

  return (
    <Container maxW="container.lg" py={8}>
      <VStack spacing={6} align="stretch">
        {/* Заголовок */}
        <Box>
          <Heading as="h1" size="xl">Профиль</Heading>
          <Text color="gray.600">Управление вашей учетной записью и статистика</Text>
        </Box>

        {/* Основная информация */}
        <Card bg={cardBg} variant="outline">
          <CardBody>
            <HStack spacing={6} align="start">
              <Avatar size="xl" name={user.name} bg="blue.500" />
              
              <VStack align="start" spacing={3} flex={1}>
                <HStack spacing={4}>
                  <Heading as="h2" size="lg">{user.name}</Heading>
                  <Badge 
                    colorScheme={getRoleColor(user.role)}
                    fontSize="md"
                    px={3}
                    py={1}
                    borderRadius="full"
                  >
                    {getRoleDisplayName(user.role)}
                  </Badge>
                </HStack>
                
                <Text color="gray.600" fontSize="lg">{user.email}</Text>
                
                {user.skills && user.skills.length > 0 && (
                  <HStack spacing={2} flexWrap="wrap">
                    {user.skills.map((skill, index) => (
                      <Tag key={index} colorScheme="blue" variant="subtle">
                        <TagLabel>{skill}</TagLabel>
                      </Tag>
                    ))}
                  </HStack>
                )}
              </VStack>

              <Button 
                colorScheme="blue" 
                variant="outline"
                onClick={() => navigate('/settings')}
              >
                Редактировать
              </Button>
            </HStack>
          </CardBody>
        </Card>

        <Divider />

        {/* Статистика в зависимости от роли */}
        <Box>
          <Heading as="h3" size="md" mb={4}>Статистика</Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
            {/* Общая статистика для всех ролей */}
            <Card bg={cardBg} variant="outline">
              <CardBody>
                <Stat>
                  <StatLabel>Хакатонов</StatLabel>
                  <StatNumber>{stats.hackathons || stats.managed || stats.organized}</StatNumber>
                  <StatHelpText>
                    {user.role === 'participant' && 'участий'}
                    {user.role === 'expert' && 'в качестве эксперта'}
                    {user.role === 'admin' && 'управляемых'}
                    {user.role === 'organizer' && 'организованных'}
                  </StatHelpText>
                </Stat>
              </CardBody>
            </Card>

            {/* Специфичная статистика для каждой роли */}
            {user.role === 'participant' && (
              <>
                <Card bg={cardBg} variant="outline">
                  <CardBody>
                    <Stat>
                      <StatLabel>Проектов</StatLabel>
                      <StatNumber>{stats.projects}</StatNumber>
                      <StatHelpText>создано</StatHelpText>
                    </Stat>
                  </CardBody>
                </Card>
                <Card bg={cardBg} variant="outline">
                  <CardBody>
                    <Stat>
                      <StatLabel>Рейтинг</StatLabel>
                      <StatNumber>{stats.rating}</StatNumber>
                      <StatHelpText>из 5.0</StatHelpText>
                    </Stat>
                  </CardBody>
                </Card>
              </>
            )}

            {user.role === 'team_lead' && (
              <>
                <Card bg={cardBg} variant="outline">
                  <CardBody>
                    <Stat>
                      <StatLabel>Команд</StatLabel>
                      <StatNumber>{stats.teams}</StatNumber>
                      <StatHelpText>создано</StatHelpText>
                    </Stat>
                  </CardBody>
                </Card>
                <Card bg={cardBg} variant="outline">
                  <CardBody>
                    <Stat>
                      <StatLabel>Рейтинг</StatLabel>
                      <StatNumber>{stats.rating}</StatNumber>
                      <StatHelpText>лидерский</StatHelpText>
                    </Stat>
                  </CardBody>
                </Card>
              </>
            )}

            {user.role === 'expert' && (
              <>
                <Card bg={cardBg} variant="outline">
                  <CardBody>
                    <Stat>
                      <StatLabel>Оценено проектов</StatLabel>
                      <StatNumber>{stats.assessed}</StatNumber>
                      <StatHelpText>всего</StatHelpText>
                    </Stat>
                  </CardBody>
                </Card>
                <Card bg={cardBg} variant="outline">
                  <CardBody>
                    <Stat>
                      <StatLabel>Средняя оценка</StatLabel>
                      <StatNumber>{stats.avgRating}</StatNumber>
                      <StatHelpText>строгость</StatHelpText>
                    </Stat>
                  </CardBody>
                </Card>
              </>
            )}

            {user.role === 'admin' && (
              <>
                <Card bg={cardBg} variant="outline">
                  <CardBody>
                    <Stat>
                      <StatLabel>Пользователей</StatLabel>
                      <StatNumber>{stats.users}</StatNumber>
                      <StatHelpText>в системе</StatHelpText>
                    </Stat>
                  </CardBody>
                </Card>
                <Card bg={cardBg} variant="outline">
                  <CardBody>
                    <Stat>
                      <StatLabel>Активных</StatLabel>
                      <StatNumber>{stats.active}</StatNumber>
                      <StatHelpText>хакатонов</StatHelpText>
                    </Stat>
                  </CardBody>
                </Card>
              </>
            )}

            {user.role === 'organizer' && (
              <>
                <Card bg={cardBg} variant="outline">
                  <CardBody>
                    <Stat>
                      <StatLabel>Участников</StatLabel>
                      <StatNumber>{stats.participants}</StatNumber>
                      <StatHelpText>всего</StatHelpText>
                    </Stat>
                  </CardBody>
                </Card>
                <Card bg={cardBg} variant="outline">
                  <CardBody>
                    <Stat>
                      <StatLabel>Бюджет</StatLabel>
                      <StatNumber>{stats.budget} ₽</StatNumber>
                      <StatHelpText>призовые фонды</StatHelpText>
                    </Stat>
                  </CardBody>
                </Card>
              </>
            )}
          </SimpleGrid>
        </Box>

        <Divider />

        {/* Быстрые действия в зависимости от роли */}
        <Box>
          <Heading as="h3" size="md" mb={4}>Быстрые действия</Heading>
          <HStack spacing={4} flexWrap="wrap">
            {(user.role === 'participant' || user.role === 'team_lead') && (
              <>
                <Button 
                  colorScheme="blue" 
                  onClick={() => navigate('/hackathons')}
                >
                  Найти хакатон
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => navigate('/participant')}
                >
                  Мой кабинет
                </Button>
              </>
            )}

            {(user.role === 'expert' || user.role === 'judge') && (
              <>
                <Button 
                  colorScheme="orange"
                  onClick={() => navigate('/expert')}
                >
                  Оценить проекты
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => navigate('/hackathons')}
                >
                  Активные хакатоны
                </Button>
              </>
            )}

            {(user.role === 'admin' || user.role === 'organizer') && (
              <>
                <Button 
                  colorScheme="green"
                  onClick={() => navigate('/admin')}
                >
                  Панель управления
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => navigate('/admin/hackathons')}
                >
                  Управление хакатонами
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => navigate('/admin/users')}
                >
                  Пользователи
                </Button>
              </>
            )}

            <Button 
              variant="ghost" 
              onClick={() => navigate('/settings')}
            >
              Настройки
            </Button>
          </HStack>
        </Box>
      </VStack>
    </Container>
  );
};
