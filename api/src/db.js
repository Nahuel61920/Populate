import Sequelize from 'sequelize';


export const sequelize = new Sequelize('populate', 'postgres', '1234', {
    host: 'localhost',
    dialect: 'postgres',
    operatorsAliases: false,
    define: {
        timestamps: false
    }
});