import React from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import App from '../../frontend/src/App.jsx';

const container = document.getElementById('root');
if (container) {
    createRoot(container).render(
        <ChakraProvider>
            <App />
        </ChakraProvider>
    );
}
