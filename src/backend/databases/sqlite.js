const Sequelize = require("sequelize");

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./src/backend/databases/database.sqlite"
});

const users = sequelize.define("users", {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    gender: {
        type: Sequelize.STRING,
        allowNull: false
    },
    dob: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    phoneNo: {
        type: Sequelize.NUMBER,
        allowNull: false,
        unique: true
    },
    city: {
        type: Sequelize.STRING,
        allowNull: false
    },
    state: {
        type: Sequelize.STRING,
        allowNull: false
    },
    country: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

sequelize.sync()
    .then(() => console.log("Table created successfully"))
    .catch(() => console.log("Error occurred when creating table"));


module.exports = {
    User: users
};