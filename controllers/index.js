const jwt = require('jsonwebtoken');
const { User, Goal, Progress } = require('../models/index');
const validator = require('validator');

const login = async (email, password) => {
    try {
        if (!email || !password) {
            throw new Error('Email and password are required');
        }

        const user = await User.findOne({ where: { email } });
        if (!user) {
            throw new Error('Invalid credentials');
        }

        const isMatch = await user.validatePassword(password);
        if (!isMatch) {
             throw new Error('Invalid credentials');
        }


        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        return { user, token };
    } catch (error) {
         console.error('Login error:', error);
        throw error;
    }
};


const signup = async (email, password) => {
    try {
        if (!email || !password) {
            throw new Error('Email and password are required');
        }
       
        const newUser = await User.create({ email, password });
    

        const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        return { user: newUser, token };
    } catch (error) {
         console.error('Signup error:', error);
       throw error;
    }
};

const getAllGoals = async (userId) => {
    try {
        if (!userId) {
            throw new Error('User ID is required');
        }
         const goals = await Goal.findAll({ where: { userId } });
        return goals;
    } catch (error) {
        console.error('Get all goals error:', error);
        throw error;
    }
};

const createGoal = async (userId, name, description, target, unit, startDate, endDate) => {
    try {

         if (!userId) {
              throw new Error('User ID is required');
         }
        if (!name || !target || !unit) {
            throw new Error('Name, target and unit are required');
        }

        const newGoal = await Goal.create({
            userId,
            name,
            description,
            target,
            unit,
            startDate,
            endDate,
        });
        return newGoal;
    } catch (error) {
         console.error('Create goal error:', error);
        throw error;
    }
};

const updateGoal = async (userId, goalId, name, description, target, unit, startDate, endDate) => {
    try {
          if (!userId) {
              throw new Error('User ID is required');
         }
        if (!goalId) {
            throw new Error('Goal ID is required');
        }

        if (!name || !target || !unit) {
           throw new Error('Name, target and unit are required');
        }
         const goal = await Goal.findOne({ where: { id: goalId } });

          if (!goal) {
             throw new Error('Goal not found');
        }

        if(goal.userId !== userId){
             throw new Error('Unauthorized to update this goal');
        }


         const updatedGoal = await Goal.update(
            {
            name,
            description,
            target,
            unit,
            startDate,
            endDate,
        },
           { where: { id: goalId } }
        );

         if (updatedGoal[0] === 0) {
             throw new Error('Goal not found');
        }
          const updated = await Goal.findOne({ where: { id: goalId } });
        return updated;
    } catch (error) {
         console.error('Update goal error:', error);
        throw error;
    }
};

const deleteGoal = async (userId, goalId) => {
    try {
         if (!userId) {
              throw new Error('User ID is required');
         }
        if (!goalId) {
            throw new Error('Goal ID is required');
        }
        const goal = await Goal.findOne({ where: { id: goalId } });

        if (!goal) {
             throw new Error('Goal not found');
        }
        if(goal.userId !== userId){
             throw new Error('Unauthorized to delete this goal');
        }

         const deletedGoal = await Goal.destroy({
            where: { id: goalId },
        });
          if (deletedGoal === 0) {
            throw new Error('Goal not found');
        }
    } catch (error) {
          console.error('Delete goal error:', error);
        throw error;
    }
};

const addProgress = async (userId, goalId, value, date) => {
    try {
          if (!userId) {
            throw new Error('User ID is required');
         }
        if (!goalId || !value || !date) {
            throw new Error('Goal ID, value, and date are required');
        }

       const goal = await Goal.findOne({ where: { id: goalId } });

        if (!goal) {
             throw new Error('Goal not found');
        }

       if(goal.userId !== userId){
             throw new Error('Unauthorized to add progress to this goal');
       }


        const newProgress = await Progress.create({
            goalId,
            value,
            date,
        });

        return newProgress;
    } catch (error) {
        console.error('Add progress error:', error);
       throw error;
    }
};


module.exports = {
    login,
    signup,
    getAllGoals,
    createGoal,
    updateGoal,
    deleteGoal,
    addProgress,
};