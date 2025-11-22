// src/components/ui/Layout/AdminLayout.jsx
import { 
  Box, 
  Flex, 
  VStack, 
  HStack, 
  Text, 
  IconButton,
  useColorModeValue,
  Icon
} from '@chakra-ui/react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { 
  ChevronRightIcon,
  ChevronLeftIcon,
  SettingsIcon,
  CalendarIcon,
  ViewIcon,
  EditIcon,
  StarIcon,
  AtSignIcon, // вместо UsersIcon
  ChatIcon,    // вместо StatsIcon
  AddIcon
} from '@chakra-ui/icons';
import { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';

// Кастомные SVG иконки для недостающих
const StatsIcon = (props) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path fill="currentColor" d="M3 22V8h4v14H3zm7 0V2h4v20h-4zm7 0v-8h4v8h-4z"/>
  </Icon>
);

const UsersIcon = (props) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path fill="currentColor" d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A3.02 3.02 0 0016.95 6h-2.66c-.76 0-1.45.43-1.79 1.11L9.39 16H8v-4c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v4H0v6h6v-4c0-1.1.9-2 2-2h2.46l1.71 5.13c.34 1.01 1.33 1.67 2.4 1.67H22v-6h-2v6h-4z"/>
  </Icon>
);

const AnalyticsIcon = (props) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path fill="currentColor" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
  </Icon>
);

// Боковое меню
const Sidebar = ({ isCollapsed, onToggle }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Дашборд',
      icon: ChatIcon, // Используем ChatIcon вместо StatsIcon
      path: '/admin',
      roles: ['admin', 'organizer']
    },
    {
      id: 'hackathons',
      label: 'Все хакатоны',
      icon: CalendarIcon,
      path: '/admin/hackathons',
      roles: ['admin', 'organizer']
    },
    {
      id: 'create-hackathon',
      label: 'Создать хакатон',
      icon: AddIcon, // Используем AddIcon вместо EditIcon
      path: '/admin/create-hackathon',
      roles: ['admin', 'organizer']
    },
    {
      id: 'moderate-cases',
      label: 'Модерация кейсов',
      icon: ViewIcon,
      path: '/admin/moderate-cases',
      roles: ['admin', 'organizer']
    },
    {
      id: 'users',
      label: 'Пользователи',
      icon: UsersIcon, // Наша кастомная иконка
      path: '/admin/users',
      roles: ['admin']
    },
    {
      id: 'analytics',
      label: 'Аналитика',
      icon: AnalyticsIcon, // Наша кастомная иконка
      path: '/admin/analytics',
      roles: ['admin', 'organizer']
    },
    {
      id: 'settings',
      label: 'Настройки',
      icon: SettingsIcon,
      path: '/admin/settings',
      roles: ['admin']
    }
  ];

  const filteredMenuItems = menuItems.filter(item => 
    item.roles.includes(user?.role)
  );

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <Box
      bg={bgColor}
      borderRight="1px"
      borderColor={borderColor}
      w={isCollapsed ? "70px" : "280px"}
      transition="width 0.2s"
      flexShrink={0}
      position="relative"
    >
      {/* Кнопка сворачивания */}
      <Flex
        justify="flex-end"
        p={4}
        borderBottom="1px"
        borderColor={borderColor}
      >
        <IconButton
          aria-label={isCollapsed ? "Развернуть меню" : "Свернуть меню"}
          icon={isCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          size="sm"
          variant="ghost"
          onClick={onToggle}
        />
      </Flex>

      {/* Меню */}
      <VStack spacing={1} p={4} align="stretch">
        {filteredMenuItems.map((item) => {
          const IconComponent = item.icon;
          const active = isActive(item.path);
          
          return (
            <Box
              key={item.id}
              p={3}
              borderRadius="lg"
              bg={active ? 'blue.50' : 'transparent'}
              color={active ? 'blue.700' : 'gray.600'}
              cursor="pointer"
              _hover={{
                bg: active ? 'blue.50' : 'gray.50',
                color: active ? 'blue.700' : 'gray.700'
              }}
              onClick={() => navigate(item.path)}
              transition="all 0.2s"
            >
              <HStack spacing={3}>
                <IconComponent 
                  w={5} 
                  h={5} 
                  color={active ? 'blue.500' : 'gray.500'} 
                />
                {!isCollapsed && (
                  <Text 
                    fontWeight={active ? 'medium' : 'normal'}
                    fontSize="sm"
                  >
                    {item.label}
                  </Text>
                )}
              </HStack>
            </Box>
          );
        })}
      </VStack>

      {/* Информация о пользователе внизу */}
      {!isCollapsed && (
        <Box
          position="absolute"
          bottom={0}
          left={0}
          right={0}
          p={4}
          borderTop="1px"
          borderColor={borderColor}
          bg={bgColor}
        >
          <VStack spacing={1} align="start">
            <Text fontSize="sm" fontWeight="medium" color="gray.700">
              {user?.name}
            </Text>
            <Text fontSize="xs" color="gray.500">
              {user?.role === 'admin' ? 'Администратор' : 'Организатор'}
            </Text>
          </VStack>
        </Box>
      )}
    </Box>
  );
};

// Верхняя панель
const TopBar = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const { user } = useAuth();
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/admin') return 'Дашборд';
    if (path === '/admin/hackathons') return 'Все хакатоны';
    if (path === '/admin/create-hackathon') return 'Создать хакатон';
    if (path === '/admin/moderate-cases') return 'Модерация кейсов';
    if (path === '/admin/users') return 'Пользователи';
    if (path === '/admin/analytics') return 'Аналитика';
    if (path === '/admin/settings') return 'Настройки';
    return 'Админ панель';
  };

  return (
    <Box
      bg={bgColor}
      borderBottom="1px"
      borderColor={borderColor}
      px={6}
      py={4}
    >
      <Flex justify="space-between" align="center">
        <VStack align="start" spacing={0}>
          <Text fontSize="xl" fontWeight="bold" color="gray.800">
            {getPageTitle()}
          </Text>
          <Text fontSize="sm" color="gray.500">
            {user?.role === 'admin' 
              ? 'Полный доступ к управлению платформой' 
              : 'Управление вашими хакатонами'
            }
          </Text>
        </VStack>

        <HStack spacing={4}>
          <Text fontSize="sm" color="gray.600">
            {new Date().toLocaleDateString('ru-RU', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </Text>
        </HStack>
      </Flex>
    </Box>
  );
};

// Основной компонент AdminLayout
export const AdminLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const bgColor = useColorModeValue('gray.50', 'gray.900');

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <Box minH="100vh" bg={bgColor}>
      <Flex>
        {/* Боковое меню */}
        <Sidebar 
          isCollapsed={isSidebarCollapsed} 
          onToggle={toggleSidebar} 
        />

        {/* Основной контент */}
        <Box flex="1" minW="0">
          {/* Верхняя панель */}
          <TopBar />

          {/* Контент страницы */}
          <Box p={6}>
            <Outlet />
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

// Временный AdminDashboard для тестирования
export const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const stats = [
    { label: 'Всего хакатонов', value: '12', color: 'blue', path: '/admin/hackathons' },
    { label: 'Активных хакатонов', value: '3', color: 'green', path: '/admin/hackathons' },
    { label: 'Участников', value: '1,234', color: 'purple', path: '/admin/users' },
    { label: 'Команд', value: '256', color: 'orange', path: '/admin/hackathons' },
    { label: 'Экспертов', value: '45', color: 'teal', path: '/admin/users' },
    { label: 'На модерации', value: '8', color: 'red', path: '/admin/moderate-cases' },
  ];

  const quickActions = [
    {
      title: 'Создать хакатон',
      description: 'Организуйте новое мероприятие',
      icon: AddIcon,
      path: '/admin/create-hackathon',
      color: 'green'
    },
    {
      title: 'Модерация кейсов',
      description: 'Проверьте предложенные экспертами кейсы',
      icon: ViewIcon,
      path: '/admin/moderate-cases',
      color: 'blue'
    },
    {
      title: 'Управление пользователями',
      description: 'Управляйте участниками и экспертами',
      icon: UsersIcon,
      path: '/admin/users',
      color: 'purple',
      adminOnly: true
    },
    {
      title: 'Аналитика',
      description: 'Статистика и отчеты по мероприятиям',
      icon: AnalyticsIcon,
      path: '/admin/analytics',
      color: 'orange'
    }
  ];

  const filteredQuickActions = quickActions.filter(action => 
    !action.adminOnly || user?.role === 'admin'
  );

  return (
    <Box>
      {/* Приветствие */}
      <VStack spacing={2} align="start" mb={8}>
        <Text fontSize="2xl" fontWeight="bold">
          Добро пожаловать, {user?.name}!
        </Text>
        <Text color="gray.600">
          {user?.role === 'admin' 
            ? 'У вас есть полный доступ к управлению платформой HackathonOS'
            : 'Управляйте вашими хакатонами и мероприятиями'
          }
        </Text>
      </VStack>

      {/* Статистика */}
      <Box mb={8}>
        <Text fontSize="lg" fontWeight="medium" mb={4}>
          Общая статистика
        </Text>
        <Flex gap={4} flexWrap="wrap">
          {stats.map((stat, index) => (
            <Box
              key={index}
              bg="white"
              p={6}
              borderRadius="lg"
              border="1px"
              borderColor="gray.200"
              flex="1"
              minW="200px"
              cursor="pointer"
              _hover={{ transform: 'translateY(-2px)', shadow: 'md' }}
              transition="all 0.2s"
              onClick={() => navigate(stat.path)}
            >
              <Text fontSize="2xl" fontWeight="bold" color={`${stat.color}.500`}>
                {stat.value}
              </Text>
              <Text color="gray.600" fontSize="sm">
                {stat.label}
              </Text>
            </Box>
          ))}
        </Flex>
      </Box>

      {/* Быстрые действия */}
      <Box>
        <Text fontSize="lg" fontWeight="medium" mb={4}>
          Быстрые действия
        </Text>
        <Flex gap={6} flexWrap="wrap">
          {filteredQuickActions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <Box
                key={index}
                bg="white"
                p={6}
                borderRadius="lg"
                border="1px"
                borderColor="gray.200"
                width="300px"
                cursor="pointer"
                _hover={{ transform: 'translateY(-2px)', shadow: 'md' }}
                transition="all 0.2s"
                onClick={() => navigate(action.path)}
              >
                <HStack spacing={3} mb={3}>
                  <Box
                    p={2}
                    borderRadius="md"
                    bg={`${action.color}.100`}
                    color={`${action.color}.500`}
                  >
                    <IconComponent w={5} h={5} />
                  </Box>
                  <Text fontWeight="medium" color="gray.800">
                    {action.title}
                  </Text>
                </HStack>
                <Text color="gray.600" fontSize="sm">
                  {action.description}
                </Text>
              </Box>
            );
          })}
        </Flex>
      </Box>

      {/* Последняя активность (заглушка) */}
      <Box mt={8}>
        <Text fontSize="lg" fontWeight="medium" mb={4}>
          Последняя активность
        </Text>
        <Box
          bg="white"
          p={6}
          borderRadius="lg"
          border="1px"
          borderColor="gray.200"
        >
          <Text color="gray.500" textAlign="center">
            Здесь будет отображаться последняя активность на платформе
          </Text>
        </Box>
      </Box>
    </Box>
  );
};
