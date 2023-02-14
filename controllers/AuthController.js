const db = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const register = async(req, res) => {
  const {name, email, password, confirmPassword} = req.body
  if(password !== confirmPassword)
  return res.status(400).json({message: "Password dan konfirmasi password tidak cocok"})
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

const login = async(req, res) => {
    try {
        const user = await db.User.findOne({
          where: {
            email: req.body.email
          }
        })
        if(!user) return res.status(404).json({message: "Email atau password anda salah!"})
        const match = await bcrypt.compare(req.body.password, user.password)
        if(!match) return res.status(400).json({message: "Email atau password anda salah!"})

        const accessToken = jwt.sign({id: user.id, name:user.name, email:user.email}, '3ncr1p21', {
          expiresIn: '1d',
        })

        res.cookie('accessToken', accessToken, {
          maxAge: 60 * 60 * 24 * 1000,
          httpOnly: true
        })
        res.status(200).json({accessToken: accessToken})
        console.log(accessToken)
    } catch (error) {
        res.status(400).json({message: error.message,})
    }
}

const loginAdmin = async(req, res) => {
    try {
        const admin = await db.Admin.findOne({
          where: {
            email: req.body.email
          }
        })
        if(!admin) return res.status(404).json({message: "Email atau password anda salah!"})
        const match = await bcrypt.compare(req.body.password, admin.password)
        if(!match) return res.status(400).json({message: "Email atau password anda salah!"})

        const accessToken = jwt.sign({id: admin.id, name:admin.name, email:admin.email}, '3ncr1p21', {
          expiresIn: '1d',
        })

        res.cookie('accessToken', accessToken, {
          maxAge: 60 * 60 * 24 * 1000,
          httpOnly: true
        })
        res.status(200).json({accessToken: accessToken})
        console.log(accessToken)
    } catch (error) {
        res.status(400).json({message: error.message,})
    }
}

const logout = async(req, res) => {
  try {
      const accessToken = req.cookies.accessToken
      if(!accessToken) return res.sendStatus(204)

      res.clearCookie('accessToken')
      return res.sendStatus(200)
  } catch (error) {
      res.status(400).json({message: error.message})
  }
}

module.exports = {register, login, loginAdmin, logout}