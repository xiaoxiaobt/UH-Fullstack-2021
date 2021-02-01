const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id)
    return response.status(401).json({ error: 'token missing or invalid' })

  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
    comments: []
  })

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  const populatedSavedBlog = await Blog.findById(savedBlog._id).populate('user', { username: 1, name: 1 })

  response.json(populatedSavedBlog.toJSON())
})

blogsRouter.post('/:id/comments', async (request, response, next) => {
  const body = request.body
  const blog = await Blog.findById(request.params.id)
  if (!blog)
    return response.status(401).json({ error: 'the blog with specified id cannot be found' })
  const newBlog = {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes,
    user: blog.user,
    comments: [...blog.comments, body.comment]
  }
  Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true }).populate('user', { username: 1, name: 1 })
    .then(updatedBlog => {
      response.json(updatedBlog.toJSON())
    })
    .catch(error => next(error))
})


blogsRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id)
    return response.status(401).json({ error: 'token missing or invalid' })
  else if (!blog)
    return response.status(401).json({ error: 'the blog with specified id cannot be found' })

  const user = await User.findById(decodedToken.id)

  if (blog.user.toString() === user._id.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    return response.status(204).end()
  } else
    return response.status(401).json({ error: 'current user does not have permission to delete' })
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: body.user,
    comments: body.comments
  }

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true }).populate('user', { username: 1, name: 1 })
    .then(updatedBlog => {
      response.json(updatedBlog.toJSON())
    })
    .catch(error => next(error))
})

module.exports = blogsRouter