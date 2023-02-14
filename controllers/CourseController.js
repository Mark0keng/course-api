const db = require('../models')

const createCourse = async(req, res) => {
    try {
        await db.Course.create({
            title: req.body.title,
            course_category_id: req.body.course_category_id,
        })
        res.status(201).json({message: 'Course berhasil dibuat!'})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

const getAllCourse = async(req, res) => {
  try {
      const course = await db.Course.findAll({
        include: [{
          model: db.Course_Category,
          attributes: ['name']
        }]
      })
      res.status(200).json(course)
  } catch (error) {
      res.status(400).json({message: error.message})
  }
}

const getCourseById = async(req, res) => {
  try {
      const course = await db.Course.findOne({
        where: {
          id: req.params.id
        }
      })
      if(!course) return res.status(400).json({message: "Course tidak ditemukan!"})
      res.status(200).json(course)
  } catch (error) {
      res.status(400).json({message: error.message})
  }
}

const updateCourse = async(req, res) => {
  try {
    const course = await db.Course.findByPk(req.params.id)
    if(!course) return res.status(400).json({message: "Course tidak ditemukan!"})

    await db.Course.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    res.status(200).json({message: 'Course berhasil diupdate!'})
  } catch (error) {
      res.status(400).json({message: error.message})
  }
}

const deleteCourse = async(req, res) => {
  try {
    const course = await db.Course.findByPk(req.params.id)
    if(!course) return res.status(400).json({message: "Course tidak ditemukan!"})

    await db.Course.destroy({
      where:{
        id: req.params.id
      }
    })
    res.status(200).json({message: 'Course berhasil dihapus'})
  } catch(error) {
    console.log(error.message)
  }
}

module.exports = {createCourse, getAllCourse, getCourseById, updateCourse, deleteCourse}
