module.exports = function(sequelize, Datatypes) {
    var Blogpost = sequelize.define('Blogpost', {
        post_id: {
            type: Datatypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: Datatypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "User id required"
                }
            }
        },
        title: {
            type: Datatypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Title required"
                }
            }
        },
        content: {
            type: Datatypes.JSON,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Content required"
                }
            }
        },
        post_date: {
            type: Datatypes.DATE,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Date required"
                }
            }
        }
    });

    return Blogpost;
};