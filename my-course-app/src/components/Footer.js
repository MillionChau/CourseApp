import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

function Footer() {
  return (
    <footer className="bg-dark text-white py-4 mt-auto">
      <Container>
        <Row>
          <Col md={4} className='mt-4'>
            <h5>Company</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-white">About Us</a></li>
              <li><a href="/" className="text-white">Careers</a></li>
              <li><a href="/" className="text-white">Blog</a></li>
            </ul>
          </Col>

          <Col md={4}>
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/courses" className="text-white">Course List</a></li>
            </ul>
          </Col>

          <Col md={4}>
            <h5>Follow Us</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-white">Facebook</a></li>
              <li><a href="/" className="text-white">Zalo</a></li>
            </ul>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col className="text-center">
            <p>&copy; 2024 My Company. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
