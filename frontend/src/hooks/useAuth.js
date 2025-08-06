import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { login, register, logout, getCurrentUser } from '../redux/slices/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const handleLogin = useCallback((credentials) => {
    return dispatch(login(credentials));
  }, [dispatch]);

  const handleRegister = useCallback((userData) => {
    return dispatch(register(userData));
  }, [dispatch]);

  const handleLogout = useCallback(() => {
    return dispatch(logout());
  }, [dispatch]);

  const handleGetCurrentUser = useCallback(() => {
    return dispatch(getCurrentUser());
  }, [dispatch]);

  return {
    user: auth.user,
    isAuthenticated: auth.isAuthenticated,
    loading: auth.loading,
    error: auth.error,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    getCurrentUser: handleGetCurrentUser,
  };
};