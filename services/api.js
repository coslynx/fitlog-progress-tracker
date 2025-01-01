import axios from 'axios';

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const apiClient = axios.create({
    baseURL: apiBaseUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});


apiClient.interceptors.request.use(
  (config) => {
      const token = localStorage.getItem('token');
        if (token && !config.url.includes('/login') && !config.url.includes('/signup')) {
           config.headers.Authorization = `Bearer ${token}`;
        }
      return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


const handleResponse = (response) => {
    return response.data;
};


const handleError = (error) => {
    console.error('API Error:', error);

     const errorResponse = {
          status: error.response ? error.response.status : null,
          message: error.response
            ? error.response.data.message || 'Something went wrong'
            : error.message || 'Network error',
     };

  return Promise.reject(errorResponse);

};



const api = {
    async login(email, password) {
        try {
            const response = await apiClient.post('/login', { email, password });
            localStorage.setItem('token', response.data.token);
            return handleResponse(response);
        } catch (error) {
           return handleError(error)
        }
    },

    async signup(email, password) {
        try {
            const response = await apiClient.post('/signup', { email, password });
              localStorage.setItem('token', response.data.token);
            return handleResponse(response);
        } catch (error) {
          return  handleError(error);
        }
    },

    async getAllGoals() {
        try {
            const response = await apiClient.get('/goals');
            return handleResponse(response);
        } catch (error) {
            return handleError(error);
        }
    },

     async createGoal(name, description, target, unit, startDate, endDate) {
        try {
            const response = await apiClient.post('/goals', {
                name,
                description,
                target,
                unit,
                startDate,
                endDate,
            });
            return handleResponse(response);
        } catch (error) {
           return handleError(error);
        }
    },

    async updateGoal(id, name, description, target, unit, startDate, endDate) {
        try {
            const response = await apiClient.put(`/goals/${id}`, {
                 name,
                description,
                target,
                unit,
                startDate,
                endDate,
            });
            return handleResponse(response);
        } catch (error) {
           return handleError(error);
        }
    },

    async deleteGoal(id) {
        try {
            const response = await apiClient.delete(`/goals/${id}`);
           return handleResponse(response);
        } catch (error) {
            return handleError(error);
        }
    },

     async addProgress(goalId, value, date) {
        try {
            const response = await apiClient.post('/progress', {
                goalId,
                value,
                date,
            });
            return handleResponse(response);
        } catch (error) {
            return handleError(error);
        }
    },
};

export default api;