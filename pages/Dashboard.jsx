import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GoalList from '../components/GoalList.jsx';
import ProgressChart from '../components/ProgressChart.jsx';
import ProgressInput from '../components/ProgressInput.jsx';
import Modal from '../components/Modal.jsx';
import GoalForm from '../components/GoalForm.jsx';
import { useAuth } from '../hooks/useAuth.js';
import api from '../services/api.js';


/**
 * Dashboard component renders the main user dashboard, displaying fitness goals and progress.
 * @returns {JSX.Element} The dashboard element.
 */
const Dashboard = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedGoal, setSelectedGoal] = useState(null);
    const [progressData, setProgressData] = useState([]);

    // Redirect unauthenticated users to the home page
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);


    const fetchProgressData = async () => {
        try {
            const goals = await api.getAllGoals();

            if(goals && goals.length > 0){
                 const allProgressData = goals.reduce((acc, goal) => {
                  if (goal.progress && goal.progress.length > 0) {
                    const formattedProgress = goal.progress.map(item => ({
                        date: item.date,
                        value: item.value
                      }));

                    acc.push(...formattedProgress);
                    }
                   return acc;
                  }, []);

                    setProgressData(allProgressData);
            } else {
                setProgressData([]);
            }
        } catch (error) {
            console.error("Error fetching progress data", error);
        }
    };


    useEffect(() => {
        if(isAuthenticated) {
            fetchProgressData();
        }
      }, [isAuthenticated]);


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
              <h2 className="text-3xl font-bold text-center mb-4">Dashboard</h2>
            <GoalList openEditGoalModal={openEditGoalModal} />
                <Button onClick={openGoalModal} id="add-goal-button">Add New Goal</Button>
              <Modal isOpen={isModalOpen} onClose={closeGoalModal} title="Add New Goal">
                   <GoalForm onClose={closeGoalModal} />
              </Modal>
                <Modal isOpen={isEditModalOpen} onClose={closeEditGoalModal} title="Edit Goal">
                    <GoalForm onClose={closeEditGoalModal} goal={selectedGoal} />
                </Modal>
              <div className="w-full flex flex-col sm:flex-row gap-4">
                <div className="w-full sm:w-1/2">
                    <ProgressChart progressData={progressData} />
                </div>
                <div  className="w-full sm:w-1/2">
                      <ProgressInput goalId={1} />
                </div>
              </div>
          </div>
      </div>
    );
};


export default Dashboard;