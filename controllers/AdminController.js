const db = require('../models')
const bcrypt = require('bcrypt')

const createAdmin = async(req, res) => {
    const {name, email, password} = req.body
    const hashPassword = await bcrypt.hash(password, 10)
    try {
        await db.Admin.create({
            name: name,
            email: email,
            password: hashPassword,
        })
        res.status(201).json({message: 'Register Admin Berhasil'})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

const getAllAdmin = async(req, res) => {
  try {
      const admin = await db.Admin.findAll()
      res.status(200).json(admin)
  } catch (error) {
      res.status(400).json({message: error.message})
  }
}

const getAdminById = async(req, res) => {
  try {
      const admin = await db.Admin.findOne({
        where: {
          id: req.params.id
        }
      })
      if(!admin) return res.status(400).json({message: "Admin tidak ditemukan!"})
      res.status(200).json(admin)
  } catch (error) {
      res.status(400).json({message: error.message})
  }
}

const updateAdmin = async(req, res) => {
  try {
    const admin = await db.Admin.findByPk(req.params.id)
    if(!admin) return res.status(400).json({message: "Admin tidak ditemukan!"})

    const {name, email, password} = req.body
    const hashPassword = await bcrypt.hash(password, 10)
    await db.Admin.update({
      name: name,
      email: email,
      password: hashPassword,
    }, {
      where: {
        id: req.params.id
      }
    })
    res.status(200).json({message: 'Admin berhasil diupdate!'})
  } catch (error) {
      res.status(400).json({message: error.message})
  }
}

const deleteAdmin = async(req, res) => {
  try {
    const admin = await db.Admin.findByPk(req.params.id)
    if(!admin) return res.status(400).json({message: "Admin tidak ditemukan!"})

    await db.Admin.destroy({
      where:{
        id: req.params.id
      }
    })
    res.status(200).json({message: 'Admin berhasil dihapus!'})
  } catch(error) {
    console.log(error.message)
  }
}

module.exports = {createAdmin, getAllAdmin, getAdminById, updateAdmin, deleteAdmin}
