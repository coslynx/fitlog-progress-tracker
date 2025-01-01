import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GoalList from '../components/GoalList.jsx';
import Modal from '../components/Modal.jsx';
import GoalForm from '../components/GoalForm.jsx';
import Button from '../components/Button.jsx';
import { useAuth } from '../hooks/useAuth.js';

/**
 * Goals component renders the goals page, displaying fitness goals and allowing users to add/edit goals.
 * @returns {JSX.Element} The goals page element.
 */
const Goals = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedGoal, setSelectedGoal] = useState(null);

    // Redirect unauthenticated users to the home page
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);


    // Function to open the modal for adding a new goal
    const openGoalModal = () => {
        setIsModalOpen(true);
    };

    // Function to close the modal for adding a new goal
    const closeGoalModal = () => {
        setIsModalOpen(false);
        setSelectedGoal(null);
    };


    // Function to open the modal for editing a goal
    const openEditGoalModal = (goal) => {
        setSelectedGoal({...goal});
        setIsEditModalOpen(true);
    };

    // Function to close the modal for editing a goal
    const closeEditGoalModal = () => {
        setIsEditModalOpen(false);
        setSelectedGoal(null);
    };


    if (!isAuthenticated) {
        return null;
    }


    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-4">
            <div className="w-full max-w-4xl p-4 bg-white shadow-md rounded-lg space-y-4">
                <h2 className="text-3xl font-bold text-center mb-4">Goals</h2>
                <GoalList openEditGoalModal={openEditGoalModal} />
                <Button onClick={openGoalModal} id="add-goal-button">Add New Goal</Button>
                <Modal isOpen={isModalOpen} onClose={closeGoalModal} title="Add New Goal" id="add-goal-modal">
                    <GoalForm onClose={closeGoalModal} />
                </Modal>
                <Modal isOpen={isEditModalOpen} onClose={closeEditGoalModal} title="Edit Goal" id="edit-goal-modal">
                    <GoalForm onClose={closeEditGoalModal} goal={selectedGoal} />
                </Modal>
            </div>
        </div>
    );
};


export default Goals;