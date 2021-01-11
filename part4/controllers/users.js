const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const body = request.body
  if (body.password.length < 3) response.status(400).json('Error: Password must be at least 3 characters long').end()
  else {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
      blogs: body.blogs
    })

    const savedUser = await user.save()

    response.json(savedUser)
  }
})

usersRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const user = {
    username: body.username,
    name: body.name,
    blogs: body.blogs
  }

  User.findByIdAndUpdate(request.params.id, user, { new: true })
    .then(updatedUser => {
      response.json(updatedUser.toJSON())
    })
    .catch(error => next(error))
})


module.exports = usersRouter