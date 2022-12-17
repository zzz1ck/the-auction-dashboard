import { GlobalStyles } from 'twin.macro';
import { QueryClient, QueryClientProvider } from 'react-query';
import Bootstrapper from './Bootstrapper';
import { ThemeProvider } from './ThemeContext';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider initialTheme='light'>
      <GlobalStyles />
      <div tw="flex w-full min-h-screen bg-white text-zinc-900 dark:bg-zinc-900 dark:text-white p-4">
        <Bootstrapper />
      </div>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
