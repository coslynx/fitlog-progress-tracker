import axios from 'axios';
import api from '../../services/api';

jest.mock('axios');

describe('api service', () => {
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

        const result = await api.login(email, password);

        expect(axios.post).toHaveBeenCalledWith(`${baseURL}/login`, { email, password });
        expect(result).toEqual(mockData);
        expect(localStorage.setItem).toHaveBeenCalledWith('token', 'mockedToken');

        expect(axios.post).toHaveBeenCalledWith(`${baseURL}/login`, { email, password });
         expect(axios.post).toHaveBeenCalledTimes(1);


    });

    it('should handle login error', async () => {
        const email = 'test@example.com';
        const password = 'invalidPassword';
         const errorMessage = 'Invalid credentials';
         axios.post.mockRejectedValue(mockErrorResponse(400, errorMessage));

          await expect(api.login(email, password)).rejects.toEqual({
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

         await expect(api.login(email, password)).rejects.toEqual({
            status: null,
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

        const result = await api.signup(email, password);

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

        await expect(api.signup(email, password)).rejects.toEqual({
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


        await expect(api.signup(email, password)).rejects.toEqual({
          status: null,
          message: errorMessage
        });
          expect(localStorage.setItem).not.toHaveBeenCalled();
         expect(axios.post).toHaveBeenCalledWith(`${baseURL}/signup`, { email, password });
         expect(axios.post).toHaveBeenCalledTimes(1);

    });

    it('should successfully get all goals', async () => {
        const mockGoals = [{ id: 1, name: 'Goal 1' }, { id: 2, name: 'Goal 2' }];
        axios.get.mockResolvedValue(mockSuccessfulResponse(mockGoals));
        localStorage.getItem.mockReturnValue('mockedToken');


        const result = await api.getAllGoals();
        expect(axios.get).toHaveBeenCalledWith(`${baseURL}/goals`, {
          headers: {
               Authorization: 'Bearer mockedToken',
          }
         });
        expect(result).toEqual(mockGoals);

        expect(axios.get).toHaveBeenCalledTimes(1);
    });

     it('should handle error when getting all goals', async () => {
      const errorMessage = 'Failed to fetch goals';
       axios.get.mockRejectedValue(mockErrorResponse(500, errorMessage));
         localStorage.getItem.mockReturnValue('mockedToken');


       await expect(api.getAllGoals()).rejects.toEqual({
            status: 500,
            message: errorMessage,
       });

       expect(axios.get).toHaveBeenCalledWith(`${baseURL}/goals`,{
          headers: {
             Authorization: 'Bearer mockedToken',
          }
        });
       expect(axios.get).toHaveBeenCalledTimes(1);

    });

    it('should handle network error when getting all goals', async () => {
         const errorMessage = 'Network error';
         axios.get.mockRejectedValue(mockNetworkError(errorMessage));
         localStorage.getItem.mockReturnValue('mockedToken');


       await expect(api.getAllGoals()).rejects.toEqual({
           status: null,
            message: errorMessage,
       });


          expect(axios.get).toHaveBeenCalledWith(`${baseURL}/goals`,{
              headers: {
                 Authorization: 'Bearer mockedToken',
              }
           });
          expect(axios.get).toHaveBeenCalledTimes(1);
    });


    it('should successfully create a goal', async () => {
        const mockGoal = { id: 1, name: 'New Goal' };
        const mockData = { ...mockGoal, target: 100, unit: 'km', startDate: '2024-01-01', endDate: '2024-01-31' };
        axios.post.mockResolvedValue(mockSuccessfulCreationResponse(mockGoal));
         localStorage.getItem.mockReturnValue('mockedToken');

        const result = await api.createGoal(mockData.name, null, mockData.target, mockData.unit, mockData.startDate, mockData.endDate);


        expect(axios.post).toHaveBeenCalledWith(`${baseURL}/goals`, {
            name: mockData.name,
            description: null,
            target: mockData.target,
            unit: mockData.unit,
            startDate: mockData.startDate,
            endDate: mockData.endDate,
        }, {
             headers: {
                  Authorization: 'Bearer mockedToken',
              }
        });
        expect(result).toEqual(mockGoal);

        expect(axios.post).toHaveBeenCalledTimes(1);
    });


    it('should handle error when creating a goal', async () => {
          const errorMessage = 'Failed to create goal';
          axios.post.mockRejectedValue(mockErrorResponse(400, errorMessage));
         localStorage.getItem.mockReturnValue('mockedToken');

         const mockData = { name: 'New Goal', target: 100, unit: 'km', startDate: '2024-01-01', endDate: '2024-01-31' };

        await expect(api.createGoal(mockData.name, null, mockData.target, mockData.unit, mockData.startDate, mockData.endDate)).rejects.toEqual({
            status: 400,
            message: errorMessage
        });

         expect(axios.post).toHaveBeenCalledWith(`${baseURL}/goals`, {
            name: mockData.name,
            description: null,
            target: mockData.target,
            unit: mockData.unit,
            startDate: mockData.startDate,
            endDate: mockData.endDate,
        }, {
             headers: {
                  Authorization: 'Bearer mockedToken',
              }
          });
        expect(axios.post).toHaveBeenCalledTimes(1);

    });

    it('should handle network error when creating a goal', async () => {
          const errorMessage = 'Network error';
         axios.post.mockRejectedValue(mockNetworkError(errorMessage));
           localStorage.getItem.mockReturnValue('mockedToken');
        const mockData = { name: 'New Goal', target: 100, unit: 'km', startDate: '2024-01-01', endDate: '2024-01-31' };


          await expect(api.createGoal(mockData.name, null, mockData.target, mockData.unit, mockData.startDate, mockData.endDate)).rejects.toEqual({
              status: null,
               message: errorMessage,
           });

         expect(axios.post).toHaveBeenCalledWith(`${baseURL}/goals`, {
           name: mockData.name,
            description: null,
            target: mockData.target,
            unit: mockData.unit,
            startDate: mockData.startDate,
            endDate: mockData.endDate,
        }, {
             headers: {
                 Authorization: 'Bearer mockedToken',
             }
         });
       expect(axios.post).toHaveBeenCalledTimes(1);

    });


    it('should successfully update a goal', async () => {
        const goalId = 1;
        const mockGoal = { id: goalId, name: 'Updated Goal' };
        const mockData = { ...mockGoal, target: 150, unit: 'miles', startDate: '2024-02-01', endDate: '2024-02-29' };

        axios.put.mockResolvedValue(mockSuccessfulResponse(mockGoal));
         localStorage.getItem.mockReturnValue('mockedToken');


         const result = await api.updateGoal(mockData.id, mockData.name, null, mockData.target, mockData.unit, mockData.startDate, mockData.endDate);

        expect(axios.put).toHaveBeenCalledWith(`${baseURL}/goals/${goalId}`, {
             name: mockData.name,
             description: null,
              target: mockData.target,
             unit: mockData.unit,
             startDate: mockData.startDate,
             endDate: mockData.endDate,
         }, {
              headers: {
                   Authorization: 'Bearer mockedToken',
               }
         });

        expect(result).toEqual(mockGoal);
        expect(axios.put).toHaveBeenCalledTimes(1);
    });

    it('should handle error when updating a goal', async () => {
        const goalId = 1;
         const mockData = { name: 'Updated Goal', target: 150, unit: 'miles', startDate: '2024-02-01', endDate: '2024-02-29' };
          const errorMessage = 'Goal not found';
           axios.put.mockRejectedValue(mockErrorResponse(400, errorMessage));
           localStorage.getItem.mockReturnValue('mockedToken');


         await expect(api.updateGoal(goalId, mockData.name, null, mockData.target, mockData.unit, mockData.startDate, mockData.endDate)).rejects.toEqual({
             status: 400,
             message: errorMessage
        });

          expect(axios.put).toHaveBeenCalledWith(`${baseURL}/goals/${goalId}`, {
              name: mockData.name,
              description: null,
              target: mockData.target,
              unit: mockData.unit,
              startDate: mockData.startDate,
              endDate: mockData.endDate,
          }, {
                headers: {
                   Authorization: 'Bearer mockedToken',
                 }
          });
           expect(axios.put).toHaveBeenCalledTimes(1);

    });

     it('should handle network error when updating a goal', async () => {
          const goalId = 1;
           const mockData = { name: 'Updated Goal', target: 150, unit: 'miles', startDate: '2024-02-01', endDate: '2024-02-29' };
          const errorMessage = 'Network error';
          axios.put.mockRejectedValue(mockNetworkError(errorMessage));
          localStorage.getItem.mockReturnValue('mockedToken');

           await expect(api.updateGoal(goalId, mockData.name, null, mockData.target, mockData.unit, mockData.startDate, mockData.endDate)).rejects.toEqual({
            status: null,
            message: errorMessage
        });


          expect(axios.put).toHaveBeenCalledWith(`${baseURL}/goals/${goalId}`, {
              name: mockData.name,
              description: null,
              target: mockData.target,
              unit: mockData.unit,
              startDate: mockData.startDate,
              endDate: mockData.endDate,
          }, {
                 headers: {
                      Authorization: 'Bearer mockedToken',
                 }
           });
        expect(axios.put).toHaveBeenCalledTimes(1);


    });


    it('should successfully delete a goal', async () => {
        const goalId = 1;
        axios.delete.mockResolvedValue(mockSuccessfulResponse({}));
         localStorage.getItem.mockReturnValue('mockedToken');

        const result = await api.deleteGoal(goalId);

         expect(axios.delete).toHaveBeenCalledWith(`${baseURL}/goals/${goalId}`,{
             headers: {
                 Authorization: 'Bearer mockedToken',
             }
          });

        expect(result).toEqual({});
         expect(axios.delete).toHaveBeenCalledTimes(1);
    });


    it('should handle error when deleting a goal', async () => {
          const goalId = 1;
          const errorMessage = 'Goal not found';
        axios.delete.mockRejectedValue(mockErrorResponse(400, errorMessage));
        localStorage.getItem.mockReturnValue('mockedToken');

         await expect(api.deleteGoal(goalId)).rejects.toEqual({
             status: 400,
            message: errorMessage
        });
         expect(axios.delete).toHaveBeenCalledWith(`${baseURL}/goals/${goalId}`, {
           headers: {
              Authorization: 'Bearer mockedToken',
           }
         });
        expect(axios.delete).toHaveBeenCalledTimes(1);

    });


    it('should handle network error when deleting a goal', async () => {
          const goalId = 1;
           const errorMessage = 'Network Error';
        axios.delete.mockRejectedValue(mockNetworkError(errorMessage));
         localStorage.getItem.mockReturnValue('mockedToken');


          await expect(api.deleteGoal(goalId)).rejects.toEqual({
              status: null,
               message: errorMessage
          });

         expect(axios.delete).toHaveBeenCalledWith(`${baseURL}/goals/${goalId}`,{
            headers: {
               Authorization: 'Bearer mockedToken',
             }
         });
          expect(axios.delete).toHaveBeenCalledTimes(1);

    });


     it('should successfully add progress', async () => {
        const mockProgress = { id: 1, value: 10, date: '2024-01-05' };
        const mockData = { goalId: 1, value: 10, date: '2024-01-05' }
        axios.post.mockResolvedValue(mockSuccessfulCreationResponse(mockProgress));
        localStorage.getItem.mockReturnValue('mockedToken');

        const result = await api.addProgress(mockData.goalId, mockData.value, mockData.date);

        expect(axios.post).toHaveBeenCalledWith(`${baseURL}/progress`, {
            goalId: mockData.goalId,
            value: mockData.value,
            date: mockData.date,
        }, {
             headers: {
                  Authorization: 'Bearer mockedToken',
              }
          });
        expect(result).toEqual(mockProgress);
          expect(axios.post).toHaveBeenCalledTimes(1);

    });

    it('should handle error when adding progress', async () => {
         const mockData = { goalId: 1, value: 10, date: '2024-01-05' }
          const errorMessage = 'Failed to add progress';
         axios.post.mockRejectedValue(mockErrorResponse(400, errorMessage));
           localStorage.getItem.mockReturnValue('mockedToken');

         await expect(api.addProgress(mockData.goalId, mockData.value, mockData.date)).rejects.toEqual({
            status: 400,
            message: errorMessage
         });


         expect(axios.post).toHaveBeenCalledWith(`${baseURL}/progress`, {
             goalId: mockData.goalId,
             value: mockData.value,
            date: mockData.date,
        }, {
              headers: {
                  Authorization: 'Bearer mockedToken',
             }
        });
         expect(axios.post).toHaveBeenCalledTimes(1);

    });

    it('should handle network error when adding progress', async () => {
         const mockData = { goalId: 1, value: 10, date: '2024-01-05' }
          const errorMessage = 'Network Error';
        axios.post.mockRejectedValue(mockNetworkError(errorMessage));
          localStorage.getItem.mockReturnValue('mockedToken');

         await expect(api.addProgress(mockData.goalId, mockData.value, mockData.date)).rejects.toEqual({
            status: null,
             message: errorMessage
         });

          expect(axios.post).toHaveBeenCalledWith(`${baseURL}/progress`, {
             goalId: mockData.goalId,
             value: mockData.value,
            date: mockData.date,
         },  {
              headers: {
                  Authorization: 'Bearer mockedToken',
              }
        });
         expect(axios.post).toHaveBeenCalledTimes(1);


    });
});