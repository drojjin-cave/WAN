// src/pages/expert/AssessmentPage.jsx
import {
  Container,
  VStack,
  Heading,
  Text,
  Card,
  CardBody,
  SimpleGrid,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Box,
  useToast,
  HStack,
  Badge,
  Progress
} from '@chakra-ui/react';
import { useState } from 'react';

// Mock данные для оценки
const mockAssessmentData = {
  hackathon: 'AI Challenge 2024',
  team: 'AI Masters',
  project: 'SmartDoc AI',
  description: 'AI-система для автоматической обработки медицинских документов',
  checkpoints: [
    {
      id: 1,
      name: 'Идея и концепция',
      deadline: '2024-01-15 14:00:00',
      criteria: [
        { id: 1, name: 'Инновационность', maxScore: 10, description: 'Новизна и оригинальность идеи' },
        { id: 2, name: 'Практическая польза', maxScore: 10, description: 'Потенциальное влияние на бизнес' }
      ]
    },
    {
      id: 2, 
      name: 'Техническая реализация',
      deadline: '2024-01-16 18:00:00',
      criteria: [
        { id: 3, name: 'Качество кода', maxScore: 10, description: 'Чистота и структура кода' },
        { id: 4, name: 'Архитектура', maxScore: 10, description: 'Правильность архитектурных решений' }
      ]
    }
  ]
};

export const ExpertAssessmentPage = () => {
  const toast = useToast();
  const [scores, setScores] = useState({});
  const [comments, setComments] = useState({});
  const [loading, setLoading] = useState(false);

  const handleScoreChange = (checkpointId, criteriaId, score) => {
    setScores(prev => ({
      ...prev,
      [`${checkpointId}_${criteriaId}`]: parseInt(score) || 0
    }));
  };

  const handleCommentChange = (checkpointId, comment) => {
    setComments(prev => ({
      ...prev,
      [checkpointId]: comment
    }));
  };

  const calculateCheckpointProgress = (checkpointId) => {
    const checkpointCriteria = mockAssessmentData.checkpoints
      .find(c => c.id === checkpointId)?.criteria || [];
    
    const totalPossible = checkpointCriteria.reduce((sum, criteria) => sum + criteria.maxScore, 0);
    const currentScore = checkpointCriteria.reduce((sum, criteria) => {
      const score = scores[`${checkpointId}_${criteria.id}`] || 0;
      return sum + Math.min(score, criteria.maxScore);
    }, 0);

    return (currentScore / totalPossible) * 100;
  };

  const handleSubmitAssessment = async (checkpointId) => {
    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: 'Оценка сохранена',
        description: `Оценка для чекпоинта "${mockAssessmentData.checkpoints.find(c => c.id === checkpointId)?.name}" отправлена`,
        status: 'success',
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось сохранить оценку',
        status: 'error',
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const canSubmitCheckpoint = (checkpointId) => {
    const checkpointCriteria = mockAssessmentData.checkpoints
      .find(c => c.id === checkpointId)?.criteria || [];
    
    return checkpointCriteria.every(criteria => {
      const score = scores[`${checkpointId}_${criteria.id}`];
      return score !== undefined && score >= 0 && score <= criteria.maxScore;
    });
  };

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={6} align="stretch">
        {/* Заголовок */}
        <Box>
          <Heading as="h1" size="xl">Оценка проектов</Heading>
          <Text color="gray.600">Оценивайте проекты команд на каждом чекпоинте</Text>
        </Box>

        {/* Информация о проекте */}
        <Card variant="outline">
          <CardBody>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
              <Box>
                <Text fontWeight="medium" color="gray.600">Хакатон</Text>
                <Text fontSize="lg">{mockAssessmentData.hackathon}</Text>
              </Box>
              <Box>
                <Text fontWeight="medium" color="gray.600">Команда</Text>
                <Text fontSize="lg">{mockAssessmentData.team}</Text>
              </Box>
              <Box>
                <Text fontWeight="medium" color="gray.600">Проект</Text>
                <Text fontSize="lg">{mockAssessmentData.project}</Text>
              </Box>
            </SimpleGrid>
            <Box mt={4}>
              <Text fontWeight="medium" color="gray.600">Описание проекта</Text>
              <Text>{mockAssessmentData.description}</Text>
            </Box>
          </CardBody>
        </Card>

        {/* Чекпоинты */}
        {mockAssessmentData.checkpoints.map((checkpoint) => (
          <Card key={checkpoint.id} variant="outline">
            <CardBody>
              <VStack spacing={4} align="stretch">
                <HStack justify="space-between">
                  <Box>
                    <Heading as="h3" size="md">{checkpoint.name}</Heading>
                    <Text color="gray.600">
                      Дедлайн: {new Date(checkpoint.deadline).toLocaleString('ru-RU')}
                    </Text>
                  </Box>
                  <Badge colorScheme="blue" fontSize="md">
                    Прогресс: {Math.round(calculateCheckpointProgress(checkpoint.id))}%
                  </Badge>
                </HStack>

                <Progress 
                  value={calculateCheckpointProgress(checkpoint.id)} 
                  colorScheme="blue" 
                  size="sm"
                />

                {/* Критерии оценки */}
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                  {checkpoint.criteria.map((criteria) => (
                    <FormControl key={criteria.id} isRequired>
                      <FormLabel>
                        {criteria.name} (макс. {criteria.maxScore} баллов)
                        <Text fontSize="sm" color="gray.600" fontWeight="normal">
                          {criteria.description}
                        </Text>
                      </FormLabel>
                      <Input
                        type="number"
                        min="0"
                        max={criteria.maxScore}
                        value={scores[`${checkpoint.id}_${criteria.id}`] || ''}
                        onChange={(e) => handleScoreChange(checkpoint.id, criteria.id, e.target.value)}
                        placeholder="0-10"
                      />
                    </FormControl>
                  ))}
                </SimpleGrid>

                {/* Комментарий к чекпоинту */}
                <FormControl>
                  <FormLabel>Комментарий к чекпоинту</FormLabel>
                  <Textarea
                    value={comments[checkpoint.id] || ''}
                    onChange={(e) => handleCommentChange(checkpoint.id, e.target.value)}
                    placeholder="Общий комментарий по выполнению чекпоинта..."
                    rows={3}
                  />
                </FormControl>

                {/* Кнопка отправки */}
                <Button
                  colorScheme="blue"
                  onClick={() => handleSubmitAssessment(checkpoint.id)}
                  isDisabled={!canSubmitCheckpoint(checkpoint.id)}
                  isLoading={loading}
                  loadingText="Сохранение..."
                >
                  Сохранить оценку
                </Button>
              </VStack>
            </CardBody>
          </Card>
        ))}
      </VStack>
    </Container>
  );
};
