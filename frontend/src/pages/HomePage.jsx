// src/pages/HomePage.jsx
import { 
  Box, 
  Container, 
  VStack, 
  Heading, 
  Text, 
  Button, 
  HStack,
  SimpleGrid,
  Card,
  CardBody,
  Icon,
  useColorModeValue,
  Flex
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { 
  CalendarIcon, 
  TimeIcon, 
  StarIcon,
  ArrowForwardIcon 
} from '@chakra-ui/icons';
import { useAuth } from '../contexts/AuthContext';

// Иконки для карточек
const HackathonIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
  </svg>
);

const TeamIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A3.02 3.02 0 0016.95 6h-2.66c-.76 0-1.45.43-1.79 1.11L9.39 16H8v-4c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v4H0v6h6v-4c0-1.1.9-2 2-2h2.46l1.71 5.13c.34 1.01 1.33 1.67 2.4 1.67H22v-6h-2v6h-4zm-7.5-8.5l1.6-4.8.4.3c1.1.8 2.5 1.2 3.9 1.2h.6l-2.6 7.8h-3.9l1.1-4.5z"/>
  </svg>
);

const ExpertIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
  </svg>
);

export const HomePage = () => {
  const { isAuthenticated, user } = useAuth();
  const bgGradient = useColorModeValue(
    'linear(to-b, blue.50, white)',
    'linear(to-b, gray.900, gray.800)'
  );
  
  const cardBg = useColorModeValue('white', 'gray.700');
  const cardBorder = useColorModeValue('gray.200', 'gray.600');

  const features = [
    {
      icon: HackathonIcon,
      title: 'IT-Хакатоны',
      description: 'Участвуйте в современных IT-соревнованиях и проявляйте свои навыки',
      color: 'blue'
    },
    {
      icon: TeamIcon,
      title: 'Командная работа',
      description: 'Создавайте команды и работайте над проектами вместе',
      color: 'green'
    },
    {
      icon: ExpertIcon,
      title: 'Экспертная оценка',
      description: 'Получайте обратную связь от профессионалов индустрии',
      color: 'orange'
    }
  ];

  const stats = [
    { number: '50+', label: 'Проведенных хакатонов' },
    { number: '1000+', label: 'Участников' },
    { number: '200+', label: 'Экспертов' },
    { number: '95%', label: 'Довольных команд' }
  ];

 return (
    <Box>
      {/* Hero Section */}
      <Box 
        bgGradient={bgGradient}
        py={20}
        borderBottom="1px"
        borderColor={useColorModeValue('gray.200', 'gray.600')}
      >
        <Container maxW="container.xl">
          <VStack spacing={8} textAlign="center">
            <VStack spacing={6}>
              <Heading 
                as="h1" 
                size="2xl" 
                bgGradient="linear(to-r, blue.500, purple.600)"
                bgClip="text"
                fontWeight="bold"
              >
                HackathonOS
              </Heading>
              <Text 
                fontSize="xl" 
                color={useColorModeValue('gray.600', 'gray.300')}
                maxW="600px"
                lineHeight="tall"
              >
                {isAuthenticated 
                  ? `Добро пожаловать, ${user?.name}! Готовы к новым вызовам?`
                  : 'Платформа для организации и проведения IT-хакатонов и образовательных интенсивов.'
                }
              </Text>
            </VStack>

            <HStack spacing={4} pt={4}>
              <Button
                as={RouterLink}
                to="/hackathons"
                size="lg"
                colorScheme="blue"
                rightIcon={<ArrowForwardIcon />}
                px={8}
              >
                Смотреть хакатоны
              </Button>
              
              {!isAuthenticated && (
                <Button
                  as={RouterLink}
                  to="/login"
                  size="lg"
                  variant="outline"
                  px={8}
                >
                  Войти
                </Button>
              )}
              
              {isAuthenticated && user?.role === 'participant' && (
                <Button
                  as={RouterLink}
                  to="/participant"
                  size="lg"
                  variant="outline"
                  px={8}
                >
                  Мой кабинет
                </Button>
              )}
            </HStack>
          </VStack>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxW="container.xl" py={16}>
        <VStack spacing={12}>
          <VStack spacing={4} textAlign="center">
            <Heading as="h2" size="xl">
              Возможности платформы
            </Heading>
            <Text fontSize="lg" color="gray.600" maxW="800px">
              Все необходимое для успешного проведения и участия в IT-мероприятиях
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} w="100%">
            {features.map((feature, index) => (
              <Card 
                key={index}
                bg={cardBg}
                border="1px"
                borderColor={cardBorder}
                boxShadow="sm"
                _hover={{ 
                  transform: 'translateY(-4px)',
                  boxShadow: 'lg',
                  transition: 'all 0.2s'
                }}
                transition="all 0.2s"
              >
                <CardBody p={6}>
                  <VStack spacing={4} align="start">
                    <Flex
                      p={3}
                      borderRadius="lg"
                      bg={`${feature.color}.100`}
                      color={`${feature.color}.600`}
                    >
                      <Icon as={feature.icon} w={6} h={6} />
                    </Flex>
                    <VStack spacing={2} align="start">
                      <Heading as="h3" size="md">
                        {feature.title}
                      </Heading>
                      <Text color="gray.600" fontSize="sm">
                        {feature.description}
                      </Text>
                    </VStack>
                  </VStack>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>

      {/* Stats Section */}
      <Box 
        bg={useColorModeValue('gray.50', 'gray.800')}
        py={12}
      >
        <Container maxW="container.xl">
          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={8} textAlign="center">
            {stats.map((stat, index) => (
              <VStack key={index} spacing={2}>
                <Text fontSize="3xl" fontWeight="bold" color="blue.600">
                  {stat.number}
                </Text>
                <Text color="gray.600" fontSize="sm">
                  {stat.label}
                </Text>
              </VStack>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Container maxW="container.md" py={16}>
        <Card 
          bgGradient="linear(to-r, blue.500, purple.600)"
          color="white"
          textAlign="center"
        >
          <CardBody py={12} px={8}>
            <VStack spacing={6}>
              <Heading as="h3" size="lg">
                Готовы начать?
              </Heading>
              <Text fontSize="lg" opacity={0.9}>
                Присоединяйтесь к сообществу разработчиков и организаторов
              </Text>
              <HStack spacing={4} pt={4}>
                <Button
                  as={RouterLink}
                  to="/hackathons"
                  size="lg"
                  colorScheme="white"
                  variant="outline"
                  rightIcon={<CalendarIcon />}
                >
                  Найти хакатон
                </Button>
                <Button
                  as={RouterLink}
                  to="/login"
                  size="lg"
                  bg="white"
                  color="blue.600"
                  _hover={{ bg: 'gray.100' }}
                >
                  Начать сейчас
                </Button>
              </HStack>
            </VStack>
          </CardBody>
        </Card>
      </Container>
    </Box>
  );
};
