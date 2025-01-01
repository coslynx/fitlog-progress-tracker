import React from 'react';
import PropTypes from 'prop-types';
import GoalCard from './GoalCard.jsx';
import api from '../services/api.js';
import { useFetch } from '../hooks/useFetch.js';

/**
 * GoalList component displays a list of fitness goals.
 * @returns {JSX.Element} The goal list element.
 */
const GoalList = () => {
    const { data: goals, loading, error } = useFetch(() => api.getAllGoals());


    if (loading) {
        return <div className="text-center py-4">Loading goals...</div>;
    }

    if (error) {
      return <div className="text-center text-red-500 py-4">Error fetching goals: {error.message}</div>;
    }


    if (!goals || goals.length === 0) {
      return  <div className="text-center py-4">No goals set yet.</div>;
    }

    return (
        <div className="space-y-4">
            {goals.map(goal => (
                <GoalCard key={goal.id} goal={goal} />
            ))}
        </div>
    );
};


GoalList.propTypes = {
  goals: PropTypes.arrayOf(
      PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      target: PropTypes.number.isRequired,
      unit: PropTypes.string.isRequired,
      startDate: PropTypes.string,
      endDate: PropTypes.string,
      progress: PropTypes.arrayOf(
          PropTypes.shape({
            date: PropTypes.string.isRequired,
            value: PropTypes.number.isRequired,
          })
        ),
    })
  ),
  loading: PropTypes.bool,
  error: PropTypes.shape({
      message: PropTypes.string,
  })
};



export default GoalList;