const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('there are six blogs returned as json', async () => {
  await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    .expect((response) => { response.body.length === helper.initialBlogs.length })
})

test('the unique identifier property of the blog posts is named id', async () => {
  const response = await api.get('/api/blogs')
  response.body.forEach(x => expect(x.id).toBeDefined())
});

test('a valid blog can be added', async () => {
  const newBlog = {
    title: "Test Blog",
    author: "Blogger",
    url: "http://blog.com",
    likes: 2
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

  // https://medium.com/@andrei.pfeiffer/jest-matching-objects-in-array-50fe2f4d6b98
  expect(blogsAtEnd).toEqual(
    expect.arrayContaining([
      expect.objectContaining(newBlog)
    ])
  )
})

test('likes property has default value 0', async () => {
  const newBlog = {
    title: "Test Blog 2",
    author: "Blogger2",
    url: "http://blog2.com"
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

  expect(blogsAtEnd).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ ...newBlog, likes: 0 })
    ])
  )
})

test('adding a blog without title and url result in bad request', async () => {
  const newBlog = {
    author: "Blogger3",
    likes: 999
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

afterAll(() => {
  mongoose.connection.close()
})