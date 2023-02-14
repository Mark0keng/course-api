const db = require('../models')

const isAdmin = async(req, res, next) => {
  try {
    const admin = await db.Admin.findOne({
      where: {
        email: req.email
      }
    })
    if(!admin) return res.sendStatus(403)
    next()
  } catch (error) {
    res.status(400).json({message: error.message})
  }
}

module.exports = {isAdmin}