var _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.length === 0 ? 0 : blogs.map(x => x.likes).reduce((x, y) => x + y)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0)
        return
    else {
        let res = [...blogs].sort((a, b) => b.likes - a.likes)[0]
        delete res["url"]
        return res
    }
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0)
        return
    else {
        let authorDict = _.countBy(blogs.map(x => x.author))
        let author = _.maxBy(Object.entries(authorDict), x => x[1])
        author = { author: author[0], blogs: author[1] }
        return author
    }
}
const mostLikes = (blogs) => {
    if (blogs.length === 0)
        return
    else {
        let authorDict = _.groupBy(blogs, x => x.author)
        let author = _.mapValues(authorDict, x => x.map(y => y.likes).reduce((a, b) => a + b))
        author = _.maxBy(Object.entries(author), x => x[1])
        author = { author: author[0], likes: author[1] }
        return author
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}