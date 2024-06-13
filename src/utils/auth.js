import { URLS } from './urls.js';

const setTokens = (accessToken, refreshToken) => {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
};

const getAccessToken = () => {
  return localStorage.getItem('accessToken');
};

const getRefreshToken = () => {
  return localStorage.getItem('refreshToken');
};

const logout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  window.location.href = '/login';
};

const fetchWithAuth = (url, options = {}) => {
  options.headers = {
    ...options.headers,
    'Authorization': `Bearer ${getAccessToken()}`,
    'Content-Type': 'application/json',
  };

  return fetch(url, options)
    .then(response => {
      if (response.status === 401) {
        return refreshAccessToken()
          .then(refreshed => {
            if (refreshed) {
              options.headers['Authorization'] = `Bearer ${getAccessToken()}`;
              return fetch(url, options);
            } else {
              throw new Error('Failed to refresh access token');
            }
          });
      } else {
        return response;
      }
    })
    .catch(error => {
      console.error('fetchWithAuth error:', error);
      logout();
      return Promise.reject(error);
    });
};

const refreshAccessToken = () => {
  return fetch(URLS.REFRESH_TOKEN, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refresh: getRefreshToken() }),
  })
    .then(response => {
      if (response.ok) {
        return response.json()
          .then(data => {
            setTokens(data.access, data.refresh);
            return true;
          });
      }
    })
    .catch(error => {
      console.error('refreshAccessToken error:', error);
      logout();
      return false;
    });
};

export { fetchWithAuth };
