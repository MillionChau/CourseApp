describe('User Registration', () => {
    it('should register a new user successfully', () => {
      cy.visit('http://localhost:3000/register')
  
      cy.get('#username').type('newuser')
      cy.get('#email').type('newuser@example.com')
      cy.get('#password').type('password123')
      cy.get('button[type="submit"]').click()
  
      cy.url().should('include', '/login')
      cy.get('.alert-danger').should('not.exist')
    })
  
    it('should show error on duplicate email', () => {
      cy.visit('http://localhost:3000/register')
      cy.get('#username').type('newuser')
      cy.get('#email').type('newuser@example.com')
      cy.get('#password').type('password123')
      cy.get('button[type="submit"]').click()
  
      cy.get('.alert-danger').should('exist')
    })
  })

  describe('User Login', () => {
    it('should log in successfully with valid credentials', () => {
      cy.visit('http://localhost:3000/login')
  
      cy.get('#email').type('newuser@example.com')
      cy.get('#password').type('password123')
      cy.get('button[type="submit"]').click()
  
      cy.url().should('include', '/')
      cy.get('.alert-danger').should('not.exist')
    })
  
    it('should show error with invalid credentials', () => {
      cy.visit('http://localhost:3000/login')
  
      cy.get('#email').type('nonexistentuser@example.com')
      cy.get('#password').type('wrongpassword')
      cy.get('button[type="submit"]').click()

      cy.get('.alert-danger').should('exist')
    })
  })
  
  