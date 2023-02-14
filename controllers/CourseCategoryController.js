const db = require('../models')

const createCourseCat = async(req, res) => {
    try {
        await db.Course_Category.create({
            name: req.body.name,
        })
        res.status(201).json({message: 'Kategori Course berhasil dibuat!'})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

const getAllCourseCat = async(req, res) => {
  try {
      const courseCat = await db.Course_Category.findAll()
      res.status(200).json(courseCat)
  } catch (error) {
      res.status(400).json({message: error.message})
  }
}

const getCourseCatById = async(req, res) => {
  try {
    const courseCat = await db.Course_Category.findOne({
      where: {
        id: req.params.id
      }
    })
    if(!courseCat) return res.status(400).json({message: "Course tidak ditemukan!"})
    res.status(200).json(courseCat)
  } catch (error) {
      res.status(400).json({message: error.message})
  }
}

const updateCourseCat = async(req, res) => {
  try {
    const courseCat = await db.Course_Category.findByPk(req.params.id)
    if(!courseCat) return res.status(400).json({message: "Course tidak ditemukan!"})

    await db.Course_Category.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    res.status(200).json({message: 'Kategori Course berhasil diupdate!'})
  } catch (error) {
      res.status(400).json({message: error.message})
  }
}

const deleteCourseCat = async(req, res) => {
  try {
  const courseCat = await db.Course_Category.findByPk(req.params.id)
  if(!courseCat) return res.status(400).json({message: "Course tidak ditemukan!"})
  
  await db.Course_Category.destroy({
    where:{
      id: req.params.id
    }
  })
  res.status(200).json({message: 'Kategori Course berhasil dihapus'})
  } catch(error) {
    console.log(error.message)
  }
}

module.exports = {createCourseCat, getAllCourseCat, getCourseCatById, updateCourseCat, deleteCourseCat}
