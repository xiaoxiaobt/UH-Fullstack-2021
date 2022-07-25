const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)
const Blog = require('../models/blog')


beforeEach(async () => {
  await Blog.deleteMany({})
  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('blogs are returned as json', async () => {
  await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    .expect((response) => { response.body.length === helper.initialBlogs.length })
})


test('there are six blogs', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(6)
})

afterAll(() => {
  mongoose.connection.close()
})