describe('empty spec', () => {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users', {
      username: 'root',
      name: 'admin',
      password: 'admin@123'
    })
    cy.visit('http://192.168.1.4:5173/')
  })

  it('login form is displayed', function () {
    cy.get('#loginForm')
      .contains('log in to application')
    cy.get('input[name="Username"]')
    cy.get('input[name="Password"]')
  })

  describe('Login', () => {
    it('succeeds with correct credentials', () => {
      cy.get('input[name="Username"').type('root')
      cy.get('input[name="Password"').type('admin@123')
      cy.contains('login').click()

      cy.get('p').should('contain', 'logged in as admin')
    })

    it('fails with wrong credentials', function () {
      cy.get('input[name="Username"').type('root')
      cy.get('input[name="Password"').type('admin@1234')
      cy.contains('login').click()

      cy.get('.notif')
        .should('have.css', 'border', '5px dashed rgb(255, 0, 0)')
        .then((elem) => elem.text('invalid username or password'))
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.get('input[name="Username"').type('root')
      cy.get('input[name="Password"').type('admin@123')
      cy.contains('login').click()
    })

    it('A blog can be created', function () {
      cy.get('button').contains('new note').click()
      cy.get('input[name="title"]').type('learn modern PHP')
      cy.get('input[name="author"]').type('odan')
      cy.get('input[name="url"]').type('https://odan.github.io/learn-php/')

      cy.get('button').contains('create').click()

      cy.get('#list-view').should('have.text', 'learn modern PHP by odan')
    })

    describe('When a blog exists already', () => {
      beforeEach(function () {
        cy.get('button').contains('new note').click()
        cy.get('input[name="title"]').type('learn modern PHP')
        cy.get('input[name="author"]').type('odan')
        cy.get('input[name="url"]').type('https://odan.github.io/learn-php/')

        cy.get('button').contains('create').click()

        cy.get('#list-view').should('have.text', 'learn modern PHP by odan')
      })

      it('A blog can be liked', function () {
        cy.get('button').contains('show').click()
        cy.get('button').contains('like').click()

        cy.get('#likesCount').should('have.text', 'likes : 1')
      })

      it('A blog can be deleted', function () {
        cy.get('button').contains('show').click()
        cy.get('button').contains('remove').click()

        cy.get('#list-view').should('not.exist')
      })
    })
  })

  describe('When more than one blog exists', () => {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3003/api/testing/seed')
      cy.reload()
    })

    it.only('blogs are ordered in descending order', () => {
      cy.get('.blog').eq(0).should('contain', 'blog with more likes')
      cy.get('.blog').eq(1).should('contain', 'blog with likes')
    })
  })

})