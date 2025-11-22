// src/pages/RegistrationPage.jsx
import { 
  Container, 
  VStack, 
  Heading, 
  Text,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Box,
  Alert,
  AlertIcon,
  useToast,
  Card,
  CardBody
} from '@chakra-ui/react';
import { useState } from 'react';
import { Link as RouterLink, useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Mock данные хакатона
const getHackathonMock = (id) => ({
  id: id,
  name: 'AI Challenge 2024',
  description: 'Соревнование по созданию AI-решений для бизнеса'
});

export const RegistrationPage = () => {
  const { hackathonId } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const { user, login } = useAuth();
  
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    role: 'participant',
    teamName: '',
    skills: '',
    experience: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const hackathon = getHackathonMock(hackathonId);

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
      // Имитация API запроса
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // В реальном приложении здесь был бы запрос к API
      console.log('Registration data:', {
        hackathonId,
        ...formData
      });

      // Показываем успешное сообщение
      toast({
        title: 'Регистрация успешна!',
        description: 'Вы успешно зарегистрированы на хакатон',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      // Редирект на страницу хакатона
      setTimeout(() => {
        navigate(`/hackathons/${hackathonId}`);
      }, 2000);

    } catch (err) {
      setError('Ошибка при регистрации. Попробуйте еще раз.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={6} align="stretch">
        {/* Заголовок */}
        <Box textAlign="center">
          <Heading as="h1" size="xl" mb={2}>
            Регистрация на хакатон
          </Heading>
          <Text fontSize="xl" color="blue.600" fontWeight="medium">
            {hackathon.name}
          </Text>
          <Text color="gray.600">
            {hackathon.description}
          </Text>
        </Box>

        {/* Форма регистрации */}
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

                {/* Основная информация */}
                <FormControl isRequired>
                  <FormLabel>ФИО</FormLabel>
                  <Input
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Введите ваше полное имя"
                  />
                </FormControl>

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
                  <FormLabel>Роль</FormLabel>
                  <Select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                  >
                    <option value="participant">Участник</option>
                    <option value="team_lead">Капитан команды</option>
                  </Select>
                </FormControl>

                {/* Информация о команде */}
                {formData.role === 'team_lead' && (
                  <FormControl isRequired>
                    <FormLabel>Название команды</FormLabel>
                    <Input
                      name="teamName"
                      value={formData.teamName}
                      onChange={handleChange}
                      placeholder="Придумайте название команды"
                    />
                  </FormControl>
                )}

                {/* Дополнительная информация */}
                <FormControl>
                  <FormLabel>Навыки и технологии</FormLabel>
                  <Input
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    placeholder="JavaScript, Python, React, etc."
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Опыт участия в хакатонах</FormLabel>
                  <Select
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                  >
                    <option value="">Выберите опыт</option>
                    <option value="none">Нет опыта</option>
                    <option value="1-2">1-2 хакатона</option>
                    <option value="3-5">3-5 хакатонов</option>
                    <option value="5+">Более 5 хакатонов</option>
                  </Select>
                </FormControl>

                {/* Кнопки действий */}
                <VStack spacing={3} w="100%" pt={4}>
                  <Button
                    type="submit"
                    colorScheme="blue"
                    size="lg"
                    w="100%"
                    isLoading={loading}
                    loadingText="Регистрация..."
                  >
                    Зарегистрироваться
                  </Button>
                  
                  <Button
                    as={RouterLink}
                    to={`/hackathons/${hackathonId}`}
                    variant="outline"
                    w="100%"
                  >
                    Отмена
                  </Button>
                </VStack>
              </VStack>
            </form>
          </CardBody>
        </Card>

        {/* Дополнительная информация */}
        <Box textAlign="center">
          <Text fontSize="sm" color="gray.500">
            После регистрации вы получите подтверждение на email и сможете присоединиться к команде
          </Text>
        </Box>
      </VStack>
    </Container>
  );
};
