const { User } = require('../models')

class UserController {
  static async findAll(req, res, next) {
    try {
      const users = await User.find()
      res.status(200).json(users)
    } catch (err) {
      next(err)
    }
  }

  static async findOne(req, res, next) {
    try {
      const { id } = req.params
      const user = await User.findById(id)
      res.status(200).json(user)
    } catch (err) {
      next(err)
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params
      const response = await User.findOneAndUpdate(
        { _id: id },
        { $set: req.body },
        { new: true, returnOriginal: false, runValidators: true }
      )
      res.status(200).json(response)
    } catch (err) {
      next(err)
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params
      await User.deleteOne({ _id: id })
      // delete meals here
      res.status(200).json({ message: 'Success delete your account' })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = UserController
