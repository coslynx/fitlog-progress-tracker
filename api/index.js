const express = require('express');
const router = express.Router();
const {
    login,
    signup,
    getAllGoals,
    createGoal,
    updateGoal,
    deleteGoal,
    addProgress,
} = require('../controllers/index');
const { authMiddleware } = require('../middlewares/authMiddleware');

router.use(express.json());

// Authentication routes
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await login(email, password);
        res.status(200).json(result);
    } catch (error) {
        console.error('Login error:', error);
        res.status(400).json({ message: error.message });
    }
});

router.post('/signup', async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await signup(email, password);
        res.status(201).json(result);
    } catch (error) {
        console.error('Signup error:', error);
        res.status(400).json({ message: error.message });
    }
});


// Protected routes
router.get('/goals', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const goals = await getAllGoals(userId);
        res.status(200).json(goals);
    } catch (error) {
        console.error('Get all goals error:', error);
        res.status(500).json({ message: 'Failed to fetch goals' });
    }
});

router.post('/goals', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const { name, description, target, unit, startDate, endDate} = req.body;
        const newGoal = await createGoal(userId, name, description, target, unit, startDate, endDate);
        res.status(201).json(newGoal);
    } catch (error) {
        console.error('Create goal error:', error);
        res.status(400).json({ message: error.message });
    }
});

router.put('/goals/:id', authMiddleware, async (req, res) => {
    try {
         const userId = req.user.id;
        const goalId = req.params.id;
        const { name, description, target, unit, startDate, endDate} = req.body;
        const updatedGoal = await updateGoal(userId, goalId, name, description, target, unit, startDate, endDate);
        res.status(200).json(updatedGoal);
    } catch (error) {
        console.error('Update goal error:', error);
        res.status(400).json({ message: error.message });
    }
});


router.delete('/goals/:id', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const goalId = req.params.id;
         await deleteGoal(userId, goalId);
        res.status(204).send();
    } catch (error) {
        console.error('Delete goal error:', error);
        res.status(400).json({ message: error.message });
    }
});


router.post('/progress', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const { goalId, value, date } = req.body;
        const newProgress = await addProgress(userId, goalId, value, date);
        res.status(201).json(newProgress);
    } catch (error) {
        console.error('Add progress error:', error);
         res.status(400).json({ message: error.message });
    }
});


module.exports = router;