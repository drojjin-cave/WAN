// src/components/shared/PlaceholderComponent.jsx
import { 
  Box, 
  VStack, 
  Heading, 
  Text, 
  Button, 
  Icon, 
  useColorModeValue,
  Container 
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

// Правильные импорты из @chakra-ui/icons
import { 
  SettingsIcon,        // вместо FaCog
  WarningIcon,         // вместо FaExclamationTriangle
  ArrowForwardIcon,    // вместо FaRocket
  HamburgerIcon        // вместо FaTools
} from '@chakra-ui/icons';

// Кастомные иконки через SVG
const HomeIcon = (props) => (
  <svg viewBox="0 0 24 24" {...props}>
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
  </svg>
);

const RocketIcon = (props) => (
  <svg viewBox="0 0 24 24" {...props}>
    <path d="M2.81 14.12l5.66 5.66-5.66 5.66h5.66v-5.66l5.66-5.66-5.66-5.66v-5.66h-5.66l5.66 5.66-5.66 5.66z"/>
  </svg>
);

// Экспортируем с привычными названиями
const FaCog = SettingsIcon;
const FaExclamationTriangle = WarningIcon;
const FaRocket = RocketIcon;
const FaHome = HomeIcon;
const FaTools = HamburgerIcon;

export const PlaceholderComponent = ({ 
  type = 'not-implemented', 
  title, 
  description,
  showHomeButton = true,
  showActionButton = false,
  actionButtonText,
  onActionClick 
}) => {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  
  const config = {
    'not-implemented': {
      icon: FaTools,
      defaultTitle: 'В разработке',
      defaultDescription: 'Этот раздел находится в стадии активной разработки. Мы работаем над тем, чтобы сделать его максимально удобным и функциональным для вас.',
      iconColor: 'blue.500',
    },
    '404': {
      icon: FaExclamationTriangle,
      defaultTitle: 'Страница не найдена',
      defaultDescription: 'Запрашиваемая страница не существует или была перемещена. Проверьте URL или вернитесь на главную страницу.',
      iconColor: 'orange.500',
    },
    'coming-soon': {
      icon: FaRocket,
      defaultTitle: 'Скоро будет доступно',
      defaultDescription: 'Мы готовим для вас что-то особенное! Этот функционал появится в ближайшее время.',
      iconColor: 'green.500',
    },
    'error': {
      icon: FaCog,
      defaultTitle: 'Произошла ошибка',
      defaultDescription: 'При загрузке страницы произошла непредвиденная ошибка. Пожалуйста, попробуйте обновить страницу или вернуться позже.',
      iconColor: 'red.500',
    }
  };

  const { 
    icon, 
    defaultTitle, 
    defaultDescription, 
    iconColor 
  } = config[type] || config['not-implemented'];

  return (
    <Container maxW="container.md" py={12}>
      <Box
        bg={bgColor}
        border="1px"
        borderColor={borderColor}
        borderRadius="xl"
        p={8}
        textAlign="center"
        boxShadow="sm"
      >
        <VStack spacing={6}>
          {/* Иконка */}
          <Box
            p={4}
            borderRadius="full"
            bg={`${iconColor}15`}
            color={iconColor}
          >
            <Icon as={icon} w={12} h={12} />
          </Box>

          {/* Заголовок и описание */}
          <VStack spacing={4}>
            <Heading as="h1" size="lg">
              {title || defaultTitle}
            </Heading>
            <Text fontSize="lg" color="gray.600" lineHeight="tall">
              {description || defaultDescription}
            </Text>
          </VStack>

          {/* Прогресс бар для "В разработке" */}
          {type === 'not-implemented' && (
            <Box w="100%" maxW="300px" bg="gray.200" borderRadius="full" h="4px" overflow="hidden">
              <Box 
                w="65%" 
                h="100%" 
                bg="blue.500" 
                borderRadius="full"
                animation="pulse 2s infinite"
              />
            </Box>
          )}

          {/* Кнопки действий */}
          <VStack spacing={4} pt={4}>
            {showHomeButton && (
            <Button
              as={RouterLink}
              to="/"
              leftIcon={<Icon as={FaHome} w={5} h={5} />}
              colorScheme="blue"
              variant="solid"
              size="lg"
            >
              На главную
            </Button>
            )}
            
            {showActionButton && onActionClick && (
              <Button
                onClick={onActionClick}
                colorScheme="gray"
                variant="outline"
                size="lg"
              >
                {actionButtonText || 'Попробовать снова'}
              </Button>
            )}

            {/* Специальная кнопка для 404 */}
            {type === '404' && (
              <Button
                as={RouterLink}
                to="/hackathons"
                colorScheme="green"
                variant="outline"
                size="lg"
              >
                Смотреть хакатоны
              </Button>
            )}
          </VStack>
        </VStack>
      </Box>
    </Container>
  );
};

// Специализированные компоненты для частых случаев
export const NotImplemented = (props) => (
  <PlaceholderComponent type="not-implemented" {...props} />
);

export const NotFound404 = (props) => (
  <PlaceholderComponent type="404" {...props} />
);

export const ComingSoon = (props) => (
  <PlaceholderComponent type="coming-soon" {...props} />
);

export const ErrorState = (props) => (
  <PlaceholderComponent type="error" {...props} />
);
