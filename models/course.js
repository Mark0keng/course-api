'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Course_Category.hasMany(models.Course, {foreignKey: 'course_category_id'})
      models.Course.belongsTo(models.Course_Category, {foreignKey: 'course_category_id'})
    }
  }
  Course.init({
    title: DataTypes.STRING,
    course_category_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};