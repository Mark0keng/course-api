const db = require('../models')
const bcrypt = require('bcrypt')

const createUser = async(req, res) => {
    const {name, email, password} = req.body
    const hashPassword = await bcrypt.hash(password, 10)
    try {
        await db.User.create({
            name: name,
            email: email,
            password: hashPassword,
        })
        res.status(201).json({message: 'Register Berhasil'})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

const getAllUser = async(req, res) => {
  try {
      const user = await db.User.findAll()
      res.status(200).json(user)
  } catch (error) {
      res.status(400).json({message: error.message})
  }
}

const getUserById = async(req, res) => {
  try {
      const user = await db.User.findOne({
        where: {
          id: req.params.id
        }
      })
      if(!user) return res.status(400).json({message: "User tidak ditemukan!"})
      res.status(200).json(user)
  } catch (error) {
      res.status(400).json({message: error.message})
  }
}

const updateUser = async(req, res) => {
  try {
    const user = await db.User.findByPk(req.params.id)
    if(!user) return res.status(400).json({message: "User tidak ditemukan!"})

    const {name, email, password} = req.body
    const hashPassword = await bcrypt.hash(password, 10)
    await db.User.update({
      name: name,
      email: email,
      password: hashPassword,
    }, {
      where: {
        id: req.params.id
      }
    })
    res.status(200).json({message: 'User berhasil diupdate!'})
  } catch (error) {
      res.status(400).json({message: error.message})
  }
}

const deleteUser = async(req, res) => {
  try {
    const user = await db.User.findByPk(req.params.id)
    if(!user) return res.status(400).json({message: "User tidak ditemukan!"})

    await db.User.destroy({
      where:{
        id: req.params.id
      }
    })
    res.status(200).json({message: 'User berhasil dihapus!'})
  } catch(error) {
    console.log(error.message)
  }
}

module.exports = {createUser, getAllUser, getUserById, updateUser, deleteUser}
