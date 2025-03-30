import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Toaster as Sonner } from '@/components/ui/sonner';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Default from './components/layout/default';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './pages/dashboard';
import Feedbacks from './pages/feedbacks';
import FeedbackDetails from './pages/feedbacks/details';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import { AuthProvider } from './providers/AuthProvider';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<PrivateRoute element={<Default><Dashboard /></Default>} />} />
            <Route path="/feedbacks" element={<PrivateRoute element={<Default><Feedbacks /></Default>} />} />
            <Route path="/feedbacks/:id" element={<PrivateRoute element={<Default><FeedbackDetails /></Default>} />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
