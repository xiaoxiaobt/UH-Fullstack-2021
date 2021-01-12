describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'AdminTester',
      username: 'roottest',
      password: 'roottest',
      blogs: []
    }
    const user2 = {
      name: 'AdminTester2',
      username: 'roottest2',
      password: 'roottest2',
      blogs: []
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.request('POST', 'http://localhost:3001/api/users', user2)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('login').click()
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('roottest')
      cy.get('#password').type('roottest')
      cy.get('#login-button').click()
      cy.contains('AdminTester logged in')
    })

    it('fails with wrong credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('aaaaaaaa')
      cy.get('#password').type('bbbbbbbb')
      cy.get('#login-button').click()
      cy.get('.error')
        .should('contain', 'wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('html').should('not.contain', 'AdminTester logged in')
    })

    describe('When logged in', function () {
      beforeEach(function () {
        cy.contains('login').click()
        cy.get('#username').type('roottest')
        cy.get('#password').type('roottest')
        cy.get('#login-button').click()
      })

      it('A blog can be created', function () {
        cy.contains('create new blog').click()
        cy.get('#title').type('blogTitle')
        cy.get('#author').type('blogAuthor')
        cy.get('#url').type('blogUrl')
        cy.get('#create-button').click()
        cy.contains('blogTitle')
        cy.contains('blogAuthor')
      })

      it('A blog can be liked', function () {
        cy.contains('create new blog').click()
        cy.get('#title').type('blogTitle')
        cy.get('#author').type('blogAuthor')
        cy.get('#url').type('blogUrl')
        cy.get('#create-button').click()
        cy.contains('view').click()
        cy.get('#like-button').click()
        cy.contains('likes 1')
        cy.get('#like-button').click()
        cy.contains('likes 2')
      })

      it('A blog can be deleted', function () {
        cy.contains('create new blog').click()
        cy.get('#title').type('blogTitle')
        cy.get('#author').type('blogAuthor')
        cy.get('#url').type('blogUrl')
        cy.get('#create-button').click()
        cy.wait(5000) // So the notification disappears
        cy.contains('view').click()
        cy.get('#delete-button').click()
        cy.get('html').should('not.contain', 'blogTitle')
        cy.get('html').should('not.contain', 'blogAuthor')
        cy.contains('create new blog').click()
        cy.get('#title').type('blogTitle')
        cy.get('#author').type('blogAuthor')
        cy.get('#url').type('blogUrl')
        cy.get('#create-button').click()
        cy.contains('logout').click()
        cy.contains('login').click()
        cy.get('#username').type('roottest2')
        cy.get('#password').type('roottest2')
        cy.get('#login-button').click()
        cy.contains('view').click()
        cy.get('html').should('not.contain', '#delete-button')
      })

      it('Blogs are ordered', function () {
        cy.contains('create new blog').click()
        cy.get('#title').type('popular')
        cy.get('#author').type('blogAuthor')
        cy.get('#url').type('blogUrl')
        cy.get('#create-button').click()
        cy.contains('view').click()
        cy.get('#like-button').click()
        cy.contains('likes 1')
        cy.get('#like-button').click()
        cy.contains('likes 2')
        cy.contains('hide').click()
        cy.contains('create new blog').click()
        cy.get('#title').type('unpopular')
        cy.get('#author').type('blogAuthor')
        cy.get('#url').type('blogUrl')
        cy.get('#create-button').click()
        cy.get('.titleDiv:first').should('not.contain', 'unpopular')
        cy.get('.titleDiv:last').should('contain', 'unpopular')
      })
    })
  })
})