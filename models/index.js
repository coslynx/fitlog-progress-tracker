const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const validator = require('validator');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
              msg: "Invalid email format"
          }
      },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isPasswordStrong(value) {
                if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}/.test(value)) {
                  throw new Error('Password must be at least 8 characters long and contain one uppercase letter, one lowercase letter, one number and one special character');
                }
            }
        }
    },
},
{
     hooks: {
        beforeValidate: (user) => {
            if (user.email) {
                user.email = validator.normalizeEmail(user.email);
            }
        }
    }
}
);


const Goal = sequelize.define('Goal', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    target: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    unit: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    startDate: {
        type: DataTypes.DATE,
    },
    endDate: {
        type: DataTypes.DATE,
    },
});

const Progress = sequelize.define('Progress', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    goalId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Goal,
            key: 'id',
        },
    },
    value: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
});

User.hasMany(Goal, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
});

Goal.belongsTo(User, {
    foreignKey: 'userId',
});

Goal.hasMany(Progress, {
    foreignKey: 'goalId',
    onDelete: 'CASCADE',
});

Progress.belongsTo(Goal, {
    foreignKey: 'goalId',
});

module.exports = {
    User,
    Goal,
    Progress,
    sequelize,
};