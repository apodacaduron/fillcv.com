import { Navigate } from 'react-router-dom';

import { useAuth } from '@/providers/AuthProvider';

const PrivateRoute = ({ element }) => {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  return user ? element : <Navigate to="/" replace />;
};

export default PrivateRoute;