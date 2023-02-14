const db = require('../models')
const course_category = require('../models/course_category')

const createUserCourse = async(req, res) => {
    try {
        await db.User_Course.create({
              user_id: req.body.user_id,
              course_id: req.body.course_id,
        })
        res.status(201).json({message: 'Course berhasil diambil!'})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

const getAllUserCourse = async(req, res) => {
  try {
      const result = await db.User_Course.findAll()
      res.status(200).json(result)
  } catch (error) {
      res.status(400).json({message: error.message})
  }
}

const getCourseByUserId = async(req, res) => {
  try {
    const result = await db.User.findOne({
      attributes: ['id', 'name', 'email'],
      where: {
        id: req.params.id
      },
      include: [{
        model: db.Course,
        attributes: ['title']
      }]
    })
    if(!result) return res.status(400).json({message: "Belum ada course yang diambil!"})
    res.status(200).json(result)
  } catch (error) {
      res.status(400).json({message: error.message})
  }
}

const getUserByCourseId = async(req, res) => {
  try {
    const result = await db.Course.findAll({
      attributes: ['id', 'title', 'course_category_id'],
      where: {
        id: req.params.id
      },
      include: [{
        model: db.User,
        attributes: ['name', 'email']
      }]
    })
    if(!result) return res.status(400).json({message: "Belum ada user yang mengambil course ini!"})
    res.status(200).json(result)
  } catch (error) {
      res.status(400).json({message: error.message})
  }
}

const updateUserCourse = async(req, res) => {
  try {
    const result = await db.User_Course.findByPk(req.params.id)
    if(!result) return res.status(400).json({message: "Data tidak ditemukan!"})

    await db.User_Course.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    res.status(200).json({message: 'User Course berhasil diupdate!'})
  } catch (error) {
      res.status(400).json({message: error.message})
  }
}

const deleteUserCourse = async(req, res) => {
  try {
    const result = await db.User_Course.findByPk(req.params.id)
    if(!result) return res.status(400).json({message: "Data tidak ditemukan!"})

    await db.User_Course.destroy({
      where:{
        id: req.params.id
      }
    })
    res.status(200).json({message: 'User Course berhasil dihapus'})
  } catch(error) {
    console.log(error.message)
  }
}

module.exports = {createUserCourse, getAllUserCourse, getCourseByUserId, getUserByCourseId, updateUserCourse, deleteUserCourse}