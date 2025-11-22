// src/components/ui/Navigation/Header.jsx
import { Box, Flex, Button, Text, Avatar, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';

export const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

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

  return (
    <Box as="header" bg="blue.600" color="white" px={8} py={4}>
      <Flex justify="space-between" align="center">
        <Link to="/">
          <Text fontSize="2xl" fontWeight="bold">HackathonOS</Text>
        </Link>

        <Flex align="center" gap={6}>
          <Link to="/hackathons">
            <Button variant="ghost" color="white" _hover={{ bg: 'blue.500' }}>
              Хакатоны
            </Button>
          </Link>

          {isAuthenticated ? (
            <Menu>
              <MenuButton>
                <Flex align="center" gap={2} cursor="pointer">
                  <Avatar size="sm" name={user?.name} bg="blue.400" />
                  <Box textAlign="left">
                    <Text fontSize="sm" fontWeight="medium">{user?.name}</Text>
                    <Text fontSize="xs" opacity={0.8}>{getRoleDisplayName(user?.role)}</Text>
                  </Box>
                </Flex>
              </MenuButton>
              <MenuList bg="white" color="gray.800" borderColor="gray.200">
                <MenuItem 
                  bg="white" 
                  _hover={{ bg: 'gray.50' }}
                  _focus={{ bg: 'gray.50' }}
                  onClick={() => navigate('/profile')}
                >
                  Профиль
                </MenuItem>
                
                {user?.role === 'participant' && (
                  <MenuItem 
                    bg="white"
                    _hover={{ bg: 'gray.50' }}
                    _focus={{ bg: 'gray.50' }}
                    onClick={() => navigate('/participant')}
                  >
                    Личный кабинет
                  </MenuItem>
                )}
                
                {user?.role === 'expert' && (
                  <MenuItem 
                    bg="white"
                    _hover={{ bg: 'gray.50' }}
                    _focus={{ bg: 'gray.50' }}
                    onClick={() => navigate('/expert')}
                  >
                    Панель эксперта
                  </MenuItem>
                )}
                
                {user?.role === 'admin' && (
                  <MenuItem 
                    bg="white"
                    _hover={{ bg: 'gray.50' }}
                    _focus={{ bg: 'gray.50' }}
                    onClick={() => navigate('/admin')}
                  >
                    Админ панель
                  </MenuItem>
                )}
                
                <MenuItem 
                  bg="white"
                  _hover={{ bg: 'gray.50' }}
                  _focus={{ bg: 'gray.50' }}
                  onClick={handleLogout}
                  color="red.600"
                >
                  Выйти
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Link to="/login">
              <Button variant="outline" color="white" borderColor="white" _hover={{ bg: 'blue.500' }}>
                Войти
              </Button>
            </Link>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};
