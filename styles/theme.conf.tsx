import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      'html, body': {
        color: 'gray.100',
        lineHeight: 'tall',
        bg: '#1C6758'
      },
      a: {
        color: 'teal.500',
      },
    },
  },
  colors: {
    brand: {
      50: '#1C6758',
      500: '#4ECB71',
    }
  },
  components: {
    Input: {
      variants: {
        filled: {
          field: {
            bg: 'white',
            color: 'black',
            borderRadius: '10',
            _focusVisible: {
              bg: 'white',
              color: 'black'
            },
            _focus: {
              borderColor: 'green.100',
            },
          },
        },
      },
    },
  },
});

export default theme
