// src/components/ui/Navigation/Footer.jsx
import { 
  Box, 
  Container, 
  Flex, 
  Text, 
  Link, 
  Stack, 
  IconButton, 
  VStack, 
  HStack,
  Icon
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { 
  EmailIcon, 
  PhoneIcon, 
  ExternalLinkIcon,
  ChevronRightIcon 
} from '@chakra-ui/icons';

// Кастомные иконки через SVG с правильными пропсами
const GithubIcon = (props) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </Icon>
);

const TelegramIcon = (props) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.14.141-.259.259-.374.261l.213-3.053 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.136-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
  </Icon>
);

const VkIcon = (props) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93V15.07C2 20.67 3.33 22 8.93 22H15.07C20.67 22 22 20.67 22 15.07V8.93C22 3.33 20.67 2 15.07 2M18.15 16.27H16.69C16.14 16.27 15.97 15.82 15 14.83C14.12 14 13.74 13.88 13.53 13.88C13.24 13.88 13.15 13.96 13.15 14.38V15.69C13.15 16.04 13.04 16.26 12.11 16.26C10.57 16.26 8.86 15.32 7.66 13.59C5.85 11.05 5.36 9.13 5.36 8.75C5.36 8.54 5.43 8.34 5.85 8.34H7.32C7.69 8.34 7.83 8.5 7.97 8.9C8.69 10.96 9.89 12.76 10.38 12.76C10.57 12.76 10.65 12.66 10.65 12.25V10.1C10.6 9.12 10.07 9.03 10.07 8.68C10.07 8.5 10.21 8.34 10.44 8.34H12.73C13.04 8.34 13.15 8.5 13.15 8.88V11.77C13.15 12.08 13.28 12.19 13.38 12.19C13.56 12.19 13.72 12.08 14.05 11.74C15.1 10.54 15.85 8.44 15.85 8.44C15.95 8.17 16.09 8.05 16.43 8.05H17.85C18.16 8.05 18.24 8.25 18.15 8.55C18.04 8.85 17.16 10.66 16.1 12.32C15.52 13.2 15.05 13.54 14.82 13.73C14.45 14 14.57 14.14 14.82 14.42C15.15 14.86 16.47 16.27 16.85 16.27H18.15Z"/>
  </Icon>
);

const DocumentIcon = (props) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
  </Icon>
);

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box as="footer" bg="gray.800" color="white" py={8} mt="auto">
      <Container maxW="container.xl">
        <Flex
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          align={{ base: 'start', md: 'center' }}
          gap={6}
        >
          {/* Лого и описание */}
          <VStack align="start" spacing={3} maxW="400px" flex="1">
            <RouterLink to="/">
              <Text fontSize="2xl" fontWeight="bold" color="blue.400">
                HackathonOS
              </Text>
            </RouterLink>
            <Text fontSize="sm" color="gray.300" lineHeight="tall">
              Платформа для организации и проведения IT-хакатонов и образовательных интенсивов. 
              Оптимизируем процессы, повышаем вовлеченность, обеспечиваем эффективную аналитику.
            </Text>
            
            {/* Социальные сети */}
            <HStack spacing={2} pt={2}>
              <IconButton
                aria-label="GitHub"
                icon={<GithubIcon w={5} h={5} />}
                size="sm"
                variant="ghost"
                color="gray.300"
                _hover={{ color: 'white', bg: 'gray.700', transform: 'translateY(-2px)' }}
                transition="all 0.2s"
              />
              <IconButton
                aria-label="Telegram"
                icon={<TelegramIcon w={5} h={5} />}
                size="sm"
                variant="ghost"
                color="gray.300"
                _hover={{ color: 'white', bg: 'gray.700', transform: 'translateY(-2px)' }}
                transition="all 0.2s"
              />
              <IconButton
                aria-label="VK"
                icon={<VkIcon w={5} h={5} />}
                size="sm"
                variant="ghost"
                color="gray.300"
                _hover={{ color: 'white', bg: 'gray.700', transform: 'translateY(-2px)' }}
                transition="all 0.2s"
              />
            </HStack>
          </VStack>

       
          

          {/* Контакты и документы */}
          <VStack align="end" spacing={4} flex="1">
            <VStack align="start" spacing={3}>
              <Text fontWeight="bold" color="orange.400" fontSize="lg">
                Контакты
              </Text>
              <Link 
                href="mailto:support@hackathonos.ru" 
                color="gray.300" 
                _hover={{ color: 'white' }}
                display="flex"
                alignItems="center"
                transition="all 0.2s"
              >
                <EmailIcon w={4} h={4} mr={2} />
                support@hackathonos.ru
              </Link>
              <Link 
                href="tel:+78001234567" 
                color="gray.300" 
                _hover={{ color: 'white' }}
                display="flex"
                alignItems="center"
                transition="all 0.2s"
              >
                <PhoneIcon w={4} h={4} mr={2} />
                8 (800) 123-45-67
              </Link>
            </VStack>

           
          </VStack>
        </Flex>

        {/* Нижняя часть */}
        <Box
          borderTop="1px"
          borderColor="gray.600"
          mt={8}
          pt={6}
        >
          <Flex
            direction={{ base: 'column', md: 'row' }}
            justify="space-between"
            align="center"
            gap={4}
          >
            <Text fontSize="sm" color="gray.400" textAlign={{ base: 'center', md: 'left' }}>
              © {currentYear} HackathonOS. Все права защищены.
            </Text>
            
            <Text fontSize="sm" color="gray.500" textAlign={{ base: 'center', md: 'right' }}>
              Сделано с ❤️ для IT-сообщества
            </Text>
          </Flex>
        </Box>
      </Container>
    </Box>
  );
};
