import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SearchPicturesApiCall } from './components/SearchPicturesApiCall';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SearchPicturesApiCall />
    </QueryClientProvider>
  )
}

export default App
