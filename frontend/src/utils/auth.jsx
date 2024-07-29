let authData = null;

export const login = (email, password, userType) => {
 
  authData = { email, userType };
  localStorage.setItem('authData', JSON.stringify(authData));
};

export const logout = () => {
  authData = null;
  localStorage.removeItem('authData');
};

export const isAuthenticated = () => {
  if (authData) return true;
  const storedData = localStorage.getItem('authData');
  if (storedData) {
    authData = JSON.parse(storedData);
    return true;
  }
  return false;
};

export const getUserType = () => {
  if (authData) return authData.userType;
  const storedData = localStorage.getItem('authData');
  if (storedData) {
    authData = JSON.parse(storedData);
    return authData.userType;
  }
  return null;
};