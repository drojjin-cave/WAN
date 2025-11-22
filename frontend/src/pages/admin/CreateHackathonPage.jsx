// src/pages/admin/CreateHackathonPage.jsx
import {
  Container,
  VStack,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Button,
  Box,
  useToast,
  Card,
  CardBody,
  SimpleGrid,
  HStack
} from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const CreateHackathonPage = () => {
  const navigate = useNavigate();
  const toast = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    shortDescription: '',
    description: '',
    format: 'online',
    registrationStart: '',
    registrationEnd: '',
    startDate: '',
    endDate: '',
    location: '',
    onlineUrl: '',
    maxParticipants: '',
    maxTeams: '',
    prizes: '',
    rules: '',
    checkpoints: [{ name: '', deadline: '', description: '' }],
    schedule: [{ time: '', event: '' }]
  });
  
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckpointChange = (index, field, value) => {
    const updatedCheckpoints = [...formData.checkpoints];
    updatedCheckpoints[index][field] = value;
    setFormData(prev => ({
      ...prev,
      checkpoints: updatedCheckpoints
    }));
  };

  const addCheckpoint = () => {
    setFormData(prev => ({
      ...prev,
      checkpoints: [...prev.checkpoints, { name: '', deadline: '', description: '' }]
    }));
  };

  const removeCheckpoint = (index) => {
    setFormData(prev => ({
      ...prev,
      checkpoints: prev.checkpoints.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Hackathon created:', formData);
      
      toast({
        title: 'Хакатон создан!',
        description: 'Хакатон успешно создан и добавлен в систему',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      navigate('/admin/hackathons');

    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось создать хакатон',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={6} align="stretch">
        <Box>
          <Heading as="h1" size="xl">Создание хакатона</Heading>
          <Text color="gray.600">Заполните информацию о новом хакатоне</Text>
        </Box>

        <Card variant="outline">
          <CardBody p={6}>
            <form onSubmit={handleSubmit}>
              <VStack spacing={6}>
                {/* Основная информация */}
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} w="100%">
                  <FormControl isRequired>
                    <FormLabel>Название хакатона</FormLabel>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="AI Challenge 2024"
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Формат</FormLabel>
                    <Select
                      name="format"
                      value={formData.format}
                      onChange={handleChange}
                    >
                      <option value="online">Онлайн</option>
                      <option value="offline">Оффлайн</option>
                      <option value="hybrid">Гибридный</option>
                    </Select>
                  </FormControl>
                </SimpleGrid>

                <FormControl isRequired>
                  <FormLabel>Краткое описание</FormLabel>
                  <Input
                    name="shortDescription"
                    value={formData.shortDescription}
                    onChange={handleChange}
                    placeholder="Создай AI-решение для бизнеса и выиграй 500,000 рублей!"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Полное описание</FormLabel>
                  <Textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Детальное описание хакатона, задачи, цели..."
                    rows={4}
                  />
                </FormControl>

                {/* Даты проведения */}
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} w="100%">
                  <FormControl isRequired>
                    <FormLabel>Начало регистрации</FormLabel>
                    <Input
                      name="registrationStart"
                      type="datetime-local"
                      value={formData.registrationStart}
                      onChange={handleChange}
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Окончание регистрации</FormLabel>
                    <Input
                      name="registrationEnd"
                      type="datetime-local"
                      value={formData.registrationEnd}
                      onChange={handleChange}
                    />
                  </FormControl>
                </SimpleGrid>

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} w="100%">
                  <FormControl isRequired>
                    <FormLabel>Начало хакатона</FormLabel>
                    <Input
                      name="startDate"
                      type="datetime-local"
                      value={formData.startDate}
                      onChange={handleChange}
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Окончание хакатона</FormLabel>
                    <Input
                      name="endDate"
                      type="datetime-local"
                      value={formData.endDate}
                      onChange={handleChange}
                    />
                  </FormControl>
                </SimpleGrid>

                {/* Место проведения */}
                {formData.format !== 'online' && (
                  <FormControl isRequired={formData.format === 'offline'}>
                    <FormLabel>Место проведения</FormLabel>
                    <Input
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="Москва, Коворкинг 'Точка кипения'"
                    />
                  </FormControl>
                )}

                {formData.format !== 'offline' && (
                  <FormControl isRequired={formData.format === 'online'}>
                    <FormLabel>Ссылка для онлайн-участия</FormLabel>
                    <Input
                      name="onlineUrl"
                      value={formData.onlineUrl}
                      onChange={handleChange}
                      placeholder="https://meet.tech/hackathon-link"
                    />
                  </FormControl>
                )}

                {/* Лимиты */}
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} w="100%">
                  <FormControl>
                    <FormLabel>Максимум участников</FormLabel>
                    <Input
                      name="maxParticipants"
                      type="number"
                      value={formData.maxParticipants}
                      onChange={handleChange}
                      placeholder="200"
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Максимум команд</FormLabel>
                    <Input
                      name="maxTeams"
                      type="number"
                      value={formData.maxTeams}
                      onChange={handleChange}
                      placeholder="40"
                    />
                  </FormControl>
                </SimpleGrid>

                {/* Призы и правила */}
                <FormControl>
                  <FormLabel>Информация о призах</FormLabel>
                  <Textarea
                    name="prizes"
                    value={formData.prizes}
                    onChange={handleChange}
                    placeholder="1 место: 500,000 руб, 2 место: 300,000 руб..."
                    rows={3}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Правила участия</FormLabel>
                  <Textarea
                    name="rules"
                    value={formData.rules}
                    onChange={handleChange}
                    placeholder="Команды до 5 человек, 48 часов на разработку..."
                    rows={3}
                  />
                </FormControl>

                {/* Чекпоинты */}
                <Box w="100%">
                  <HStack justify="space-between" mb={4}>
                    <FormLabel>Чекпоинты</FormLabel>
                    <Button size="sm" onClick={addCheckpoint}>
                      + Добавить чекпоинт
                    </Button>
                  </HStack>
                  
                  {formData.checkpoints.map((checkpoint, index) => (
                    <SimpleGrid key={index} columns={{ base: 1, md: 3 }} spacing={4} mb={4}>
                      <Input
                        placeholder="Название чекпоинта"
                        value={checkpoint.name}
                        onChange={(e) => handleCheckpointChange(index, 'name', e.target.value)}
                      />
                      <Input
                        type="datetime-local"
                        value={checkpoint.deadline}
                        onChange={(e) => handleCheckpointChange(index, 'deadline', e.target.value)}
                      />
                      <HStack>
                        <Input
                          placeholder="Описание"
                          value={checkpoint.description}
                          onChange={(e) => handleCheckpointChange(index, 'description', e.target.value)}
                        />
                        <Button
                          size="sm"
                          colorScheme="red"
                          variant="ghost"
                          onClick={() => removeCheckpoint(index)}
                          isDisabled={formData.checkpoints.length === 1}
                        >
                          ×
                        </Button>
                      </HStack>
                    </SimpleGrid>
                  ))}
                </Box>

                {/* Кнопки */}
                <HStack spacing={4} w="100%" pt={4}>
                  <Button
                    type="submit"
                    colorScheme="blue"
                    size="lg"
                    flex={1}
                    isLoading={loading}
                    loadingText="Создание..."
                  >
                    Создать хакатон
                  </Button>
                  
                  <Button
                    onClick={() => navigate('/admin/hackathons')}
                    variant="outline"
                    size="lg"
                    flex={1}
                  >
                    Отмена
                  </Button>
                </HStack>
              </VStack>
            </form>
          </CardBody>
        </Card>
      </VStack>
    </Container>
  );
};
