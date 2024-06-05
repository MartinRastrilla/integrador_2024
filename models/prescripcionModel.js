const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');
const Profesional = require('./profesionalModel');
const Paciente = require('./pacienteModel');

// Función para calcular la fecha un mes después de la fecha actual
const getNextMonthDate = () => {
    const now = new Date();
    const nextMonth = new Date(now.setMonth(now.getMonth() + 1));
    return nextMonth;
};

const Prescripcion = sequelize.define('Prescripcion', {
    id_prescripcion: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_profesional: {
        type: DataTypes.INTEGER,
        references: {
            model: Profesional,
            key: 'id_profesional'
        },
        allowNull:false
    },
    id_paciente: {
        type: DataTypes.INTEGER,
        references: {
            model: Paciente,
            key: 'id_paciente'
        },
        allowNull:false
    },
    fecha_prescripcion: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    diagnostico: {
        type: DataTypes.STRING(100),
        allowNull:false
    },
    vigencia: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: getNextMonthDate
    }
}, {
    tableName: 'Prescripciones',
    timestamps: false
});

module.exports = Prescripcion;