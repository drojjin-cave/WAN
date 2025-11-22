// src/pages/LoginPage.jsx
import { 
  Container, 
  VStack, 
  Heading, 
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  Alert,
  AlertIcon,
  useToast,
  Card,
  CardBody,
  HStack,
  Divider
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const { login, isAuthenticated } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'participant'
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Редирект если уже авторизован
  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  // Получаем путь для редиректа после логина
  const from = location.state?.from?.pathname || '/';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // В реальном приложении здесь был бы запрос к API
      const result = await login(formData.email, formData.password, formData.role);
      
      if (result.success) {
        toast({
          title: 'Вход выполнен!',
          description: `Добро пожаловать, ${result.user.name}!`,
          status: 'success',
          duration: 2000,
          isClosable: true,
        });

        // Редирект на предыдущую страницу или главную
        navigate(from, { replace: true });
      } else {
        setError(result.error || 'Ошибка при входе');
      }
    } catch (err) {
      setError('Произошла ошибка при входе');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = (role) => {
    const demoUsers = {
      participant: { email: 'participant@demo.com', password: 'demo', role: 'participant' },
      expert: { email: 'expert@demo.com', password: 'demo', role: 'expert' },
      admin: { email: 'admin@demo.com', password: 'demo', role: 'admin' }
    };

    setFormData(demoUsers[role]);
  };

   if (isAuthenticated) {
    return (
      <Container maxW="container.sm" py={8}>
        <VStack spacing={6}>
          <Text>Перенаправление...</Text>
        </VStack>
      </Container>
    );
  }

  return (
    <Container maxW="container.sm" py={8}>
      <VStack spacing={6} align="stretch">
        {/* Заголовок */}
        <Box textAlign="center">
          <Heading as="h1" size="xl" mb={2}>
            Вход в систему
          </Heading>
          <Text color="gray.600">
            Войдите в свой аккаунт для участия в хакатонах
          </Text>
        </Box>

        {/* Демо доступы */}
        <Card variant="outline">
          <CardBody p={4}>
            <VStack spacing={3}>
              <Text fontWeight="medium" fontSize="sm">
                Демо доступы для тестирования:
              </Text>
              <HStack spacing={2} wrap="wrap" justify="center">
              <Button
                size="sm"
                colorScheme="blue"
                variant="outline"
                onClick={() => handleDemoLogin('participant')}
              >
                Участник
              </Button>
                <Button
                  size="sm"
                  colorScheme="green"
                  variant="outline"
                  onClick={() => handleDemoLogin('expert')}
                >
                  Эксперт
                </Button>
                <Button
                  size="sm"
                  colorScheme="red"
                  variant="outline"
                  onClick={() => handleDemoLogin('admin')}
                >
                  Админ
                </Button>
              </HStack>
            </VStack>
          </CardBody>
        </Card>

        {/* Форма входа */}
        <Card variant="outline">
          <CardBody p={6}>
            <form onSubmit={handleSubmit}>
              <VStack spacing={4}>
                {error && (
                  <Alert status="error" borderRadius="md">
                    <AlertIcon />
                    {error}
                  </Alert>
                )}

                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Пароль</FormLabel>
                  <Input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Введите пароль"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Роль для демо-входа</FormLabel>
                  <Input
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    isReadOnly
                    bg="gray.50"
                    color="gray.600"
                  />
                  <Text fontSize="sm" color="gray.500" mt={1}>
                    Выберите демо-доступ выше для автоматического заполнения
                  </Text>
                </FormControl>

                <Button
                  type="submit"
                  colorScheme="blue"
                  size="lg"
                  w="100%"
                  isLoading={loading}
                  loadingText="Вход..."
                >
                  Войти
                </Button>
              </VStack>
            </form>
          </CardBody>
        </Card>

        {/* Ссылки */}
        <Box textAlign="center">
          <Text fontSize="sm" color="gray.500">
            Нет аккаунта?{' '}
            <Button
              as={RouterLink}
              to="/hackathons"
              variant="link"
              color="blue.500"
              size="sm"
            >
              Зарегистрируйтесь на хакатон
            </Button>
          </Text>
        </Box>
      </VStack>
    </Container>
  );
};
