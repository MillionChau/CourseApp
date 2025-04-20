describe('Add Course', () => {
    it('should add a course successfully', () => {
        cy.visit('/add-course')
    
        cy.get('#name').type('New Course')
        cy.get('#description').type('Course description')
        cy.get('#video').type('abc123')
        cy.get('#level').type('Beginner')
        cy.get('#energy').type('High')
    
        cy.get('button[type="submit"]').click()
    
        cy.url().should('include', '/')
    })
})

describe('Get Courses', () => {
    it('should fetch the list of courses successfully', () => {
      cy.intercept('GET', 'http://localhost:5000/api/courses', {
        statusCode: 200,
        body: [
          {
            name: 'React Basics',
            description: 'Learn the fundamentals of React.',
            videoId: 'abc123',
            image: 'https://img.youtube.com/vi/abc123/mqdefault.jpg',
            level: 'Beginner',
            energy: 'High',
          },
          {
            name: 'Advanced Node.js',
            description: 'Dive deep into Node.js and backend development.',
            videoId: 'def456',
            image: 'https://img.youtube.com/vi/def456/mqdefault.jpg',
            level: 'Advanced',
            energy: 'Medium',
          },
        ],
      }).as('getCourses')
  
      cy.visit('/courses')
  
      cy.wait('@getCourses')
    })
  })


  describe('Edit Courses', () => {
    it('should fetch the course successfully', () => {
      const courseId = '673d92163452b3b757238858'
      cy.intercept('GET', `http://localhost:5000/api/courses/${courseId}/edit`, {
        statusCode: 200,
        body: {
          name: 'Dart Flutter',
          description: 'Phát triển ứng dụng mobile app bằng Dart và Flutter',
          videoId: 'ZTbPz2i2Dms',
          level: 'Trình độ nâng cao',
          energy: 'Học mọi lúc,mọi nơi',
        }
      }).as('getCourse')

      cy.visit(`/courses/${courseId}/edit`)
  
      cy.wait('@getCourse')
  
      cy.wait('@getCourse').its('response.statusCode').should('eq', 200)

      cy.get('#name').should('have.value', 'Dart Flutter')
      cy.get('#description').should('have.value', 'Phát triển ứng dụng mobile app bằng Dart và Flutter')
      cy.get('#video').should('have.value', 'ZTbPz2i2Dms')
      cy.get('#level').should('have.value', 'Trình độ nâng cao')
      cy.get('#energy').should('have.value', 'Học mọi lúc,mọi nơi')
    })
  })

  describe('Update Course', () => {
    it('should update the course successfully', () => {
      const courseId = '673d92163452b3b757238858'
      const updatedCourse = {
        name: 'Dart Flutter',
        description: 'Phát triển ứng dụng mobile app bằng Dart và Flutter',
        videoId: 'ZTbPz2i2Dms',
        level: 'Trình độ nâng cao',
        energy: 'Học mọi lúc,mọi nơi'
      }
  
      cy.intercept('GET', `http://localhost:5000/api/courses/${courseId}/edit`, {
        statusCode: 200,
        body: {
          name: 'Dart Flutter 2',
          description: 'Phát triển ứng dụng mobile app bằng Dart và Flutter',
          videoId: 'ZTbPz2i2Dms',
          level: 'Trình độ nâng cao',
          energy: 'Học mọi lúc,mọi nơi',
        },
      }).as('getCourse')
  
      cy.intercept('PUT', `http://localhost:5000/api/courses/${courseId}`, {
        statusCode: 200,
        body: {
          message: 'Course updated successfully',
          course: updatedCourse,
        },
      }).as('updateCourse')
  
      cy.visit(`/courses/${courseId}/edit`)
  
      cy.get('#name').clear().type(updatedCourse.name)
      cy.get('#description').clear().type(updatedCourse.description)
      cy.get('#video').clear().type(updatedCourse.videoId)
      cy.get('#level').clear().type(updatedCourse.level)
      cy.get('#energy').clear().type(updatedCourse.energy)
  
      cy.get('button[type="submit"]').click()
  
      cy.wait('@updateCourse')
        .then((interception) => {
          expect(interception.request.body).to.deep.equal({
            name: updatedCourse.name,
            description: updatedCourse.description,
            videoId: updatedCourse.videoId,
            image: `https://img.youtube.com/vi/${updatedCourse.videoId}/mqdefault.jpg`,
            level: updatedCourse.level,
            energy: updatedCourse.energy,
          })
          expect(interception.response.statusCode).to.eq(200)
        })

      cy.url().should('include', '/')
      cy.get('.alert-info').should('not.exist')
    })
  })
  
  describe('Delete Course', () => {
    beforeEach(() => {
      // Thiết lập API giả lập và dữ liệu ban đầu
      cy.intercept('GET', 'http://localhost:5000/api/courses', {
        statusCode: 200,
        body: [
          {
            _id: '123',
            name: 'React Basics',
            description: 'Learn the basics of React',
            createdAt: new Date().toISOString(),
          },
          {
            _id: '456',
            name: 'Node.js Fundamentals',
            description: 'Understand core concepts of Node.js',
            createdAt: new Date().toISOString(),
          },
        ],
      }).as('getCourses')
  
      cy.intercept('DELETE', 'http://localhost:5000/api/courses/123', {
        statusCode: 200,
        body: { message: 'Course deleted successfully' },
      }).as('deleteCourse')
  
      localStorage.setItem('role', 'admin')
  
      cy.visit('/courses')
      cy.wait('@getCourses')
    })
  
    it('should delete a course successfully', () => {
      cy.get('.courseItem').contains('React Basics').should('exist')
  
      cy.contains('React Basics')
        .parent()
        .find('.btn-danger')
        .click()
      cy.contains('This course will be deleted').should('be.visible')
      cy.contains('Delete').click()
  
      cy.wait('@deleteCourse').its('response.statusCode').should('eq', 200)
  
      cy.get('.courseItem').contains('React Basics').should('not.exist')
    })
  
    it('should cancel deletion', () => {
      cy.contains('React Basics')
        .parent()
        .find('.btn-danger')
        .click()
      cy.contains('This course will be deleted').should('be.visible')
      cy.contains('Cancel').click()
  
      cy.get('.courseItem').contains('React Basics').should('exist')
    })
  })  