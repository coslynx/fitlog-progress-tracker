import React from 'react';
import PropTypes from 'prop-types';
import { formatDate, calculateDaysBetween } from '../utils/helpers';

/**
 * GoalCard component displays the details of a fitness goal.
 * @param {object} props - The props object.
 * @param {object} props.goal - The goal object.
 * @returns {JSX.Element} The goal card element.
 */
const GoalCard = ({ goal }) => {
    const { id, name, target, unit, startDate, endDate, progress } = goal || {};


    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);
    const daysRemaining = calculateDaysBetween(startDate, endDate);


  return (
      <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <div className="flex flex-col space-y-2">
              <div className="flex items-center">
                  <span className="text-gray-700 font-medium mr-2">Name:</span>
                  <span className="text-gray-900">{name}</span>
              </div>
             <div className="flex items-center">
                  <span className="text-gray-700 font-medium mr-2">Target:</span>
                  <span className="text-gray-900">{target} {unit}</span>
              </div>

              {formattedStartDate && (
                <div className="flex items-center">
                    <span className="text-gray-700 font-medium mr-2">Start Date:</span>
                    <span className="text-gray-900">{formattedStartDate}</span>
                </div>
             )}

            {formattedEndDate && (
                <div className="flex items-center">
                   <span className="text-gray-700 font-medium mr-2">End Date:</span>
                   <span className="text-gray-900">{formattedEndDate}</span>
                </div>
            )}

            {daysRemaining !== null && formattedStartDate && formattedEndDate && (
                 <div className="flex items-center">
                   <span className="text-gray-700 font-medium mr-2">Days Remaining:</span>
                    <span className="text-gray-900">{daysRemaining}</span>
                </div>
            )}

              {progress && progress.length > 0 && (
                  <div>
                      <div className="flex items-center">
                        <span className="text-gray-700 font-medium mr-2">Progress:</span>
                      </div>
                      <ul className="ml-4">
                          {progress.map((item, index) => (
                              <li key={index} className="flex items-center">
                                  <span className="text-gray-700 font-medium mr-2">Date: {formatDate(item.date)}</span>
                                  <span className="text-gray-900">Value: {item.value}</span>
                              </li>
                           ))}
                      </ul>
                 </div>
                )}

          </div>
      </div>
  );
};


GoalCard.propTypes = {
    goal: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        target: PropTypes.number.isRequired,
        unit: PropTypes.string.isRequired,
        startDate: PropTypes.string,
        endDate: PropTypes.string,
       progress: PropTypes.arrayOf(PropTypes.shape({
             date: PropTypes.string.isRequired,
            value: PropTypes.number.isRequired,
        })),
    }),
};

export default GoalCard;