import axios from 'axios';
import auth from '../../services/auth';

jest.mock('axios');

describe('auth service', () => {
    const baseURL = process.env.REACT_APP_API_BASE_URL;

    beforeAll(() => {
        jest.spyOn(global, 'localStorage', 'get').mockReturnValue({
            getItem: jest.fn(),
            setItem: jest.fn(),
            removeItem: jest.fn()
        });
    });

    const mockSuccessfulResponse = (data) => ({
        data,
        status: 200,
    });

    const mockSuccessfulCreationResponse = (data) => ({
        data,
        status: 201,
    });


    const mockErrorResponse = (status, message) => ({
        response: {
            status,
            data: { message }
        }
    });

    const mockNetworkError = (message) => ({
        message,
    });


    it('should successfully login user', async () => {
        const email = 'test@example.com';
        const password = 'password123';
        const mockData = { user: { id: 1, email }, token: 'mockedToken' };
        axios.post.mockResolvedValue(mockSuccessfulResponse(mockData));

        const result = await auth.login(email, password);

        expect(axios.post).toHaveBeenCalledWith(`${baseURL}/login`, { email, password });
        expect(localStorage.setItem).toHaveBeenCalledWith('token', 'mockedToken');
        expect(result).toEqual(mockData);
        expect(axios.post).toHaveBeenCalledTimes(1);
    });

    it('should handle login error', async () => {
        const email = 'test@example.com';
        const password = 'invalidPassword';
        const errorMessage = 'Invalid credentials';
        axios.post.mockRejectedValue(mockErrorResponse(400, errorMessage));

        await expect(auth.login(email, password)).rejects.toEqual({
            status: 400,
            message: errorMessage,
        });
        expect(localStorage.setItem).not.toHaveBeenCalled();
        expect(axios.post).toHaveBeenCalledWith(`${baseURL}/login`, { email, password });
        expect(axios.post).toHaveBeenCalledTimes(1);

    });

    it('should handle network error during login', async () => {
        const email = 'test@example.com';
        const password = 'password123';
        const errorMessage = 'Network Error';
        axios.post.mockRejectedValue(mockNetworkError(errorMessage));


       await expect(auth.login(email, password)).rejects.toEqual({
            message: errorMessage,
        });
          expect(localStorage.setItem).not.toHaveBeenCalled();
        expect(axios.post).toHaveBeenCalledWith(`${baseURL}/login`, { email, password });
        expect(axios.post).toHaveBeenCalledTimes(1);

    });

    it('should successfully signup user', async () => {
        const email = 'test@example.com';
        const password = 'password123';
        const mockData = { user: { id: 1, email }, token: 'mockedToken' };
        axios.post.mockResolvedValue(mockSuccessfulCreationResponse(mockData));

        const result = await auth.signup(email, password);

        expect(axios.post).toHaveBeenCalledWith(`${baseURL}/signup`, { email, password });
        expect(localStorage.setItem).toHaveBeenCalledWith('token', 'mockedToken');
        expect(result).toEqual(mockData);
        expect(axios.post).toHaveBeenCalledTimes(1);


    });


    it('should handle signup error', async () => {
        const email = 'test@example.com';
        const password = 'password123';
        const errorMessage = 'Email already exists';
        axios.post.mockRejectedValue(mockErrorResponse(400, errorMessage));


        await expect(auth.signup(email, password)).rejects.toEqual({
            status: 400,
            message: errorMessage
        });
           expect(localStorage.setItem).not.toHaveBeenCalled();
         expect(axios.post).toHaveBeenCalledWith(`${baseURL}/signup`, { email, password });
        expect(axios.post).toHaveBeenCalledTimes(1);
    });

    it('should handle network error during signup', async () => {
        const email = 'test@example.com';
        const password = 'password123';
        const errorMessage = 'Network Error';
        axios.post.mockRejectedValue(mockNetworkError(errorMessage));


        await expect(auth.signup(email, password)).rejects.toEqual({
             message: errorMessage
        });
           expect(localStorage.setItem).not.toHaveBeenCalled();
       expect(axios.post).toHaveBeenCalledWith(`${baseURL}/signup`, { email, password });
       expect(axios.post).toHaveBeenCalledTimes(1);
    });


     it('should call localStorage.removeItem on logout', () => {
        auth.logout();
        expect(localStorage.removeItem).toHaveBeenCalledWith('token');
    });
});