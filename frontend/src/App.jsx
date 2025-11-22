import { Button, Box, Heading, VStack } from '@chakra-ui/react'

function App() {
  return (
    <Box p={8}>
      <VStack spacing={4}>
        <Heading size="xl">
          Chakra UI работает! ✅
        </Heading>
        <Button colorScheme="blue">Тестовая кнопка</Button>
        <Button colorScheme="red" variant="outline">
          Еще кнопка
        </Button>
      </VStack>
    </Box>
  )
}

export default App
