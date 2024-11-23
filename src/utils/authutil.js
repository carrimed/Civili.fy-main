const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    // Optionally, validate token with backend API
    return !!token; // True if token exists
  };