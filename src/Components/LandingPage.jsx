import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Navbar, Nav, Form, InputGroup, Carousel } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Add custom CSS to handle the transparent navbar dropdown
const customNavbarStyle = {
  navbarCollapse: {
    backgroundColor: 'transparent !important'
  },
  navLink: {
    color: '#212529'
  }
};

const RenewMartLandingPage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="renew-mart-app">
      <style>
        {`
         
          .navbar-collapse {
            background-color: transparent !important;
          }
          
          /* Ensure no background color and fixed position */
          .navbar {
            position: fixed;
            top: 0;
            width: 100%;
            z-index: 1030;
          }
          
          /* Optional: add some contrast to nav links when collapsed over hero */
 
    @media (max-width: 991.98px) {
  /* Style the navbar collapse container */
  .navbar-collapse {
    position: absolute;
    top: 100%;
    right: 0%;
    width: 300px;
    z-index: 1000;
    background-color: transparent;
  }

  
  /* Style each individual nav link */
  .navbar-collapse .nav-link {
    padding: 0.1rem;
    display: block;
    width: 100%;
    color: black;
  
  }
}
  @media (min-width: 768px) and (max-width: 991.98px) {
/* Style the navbar collapse container */
  .navbar-collapse {
    position: absolute;
    top: 100%;
    right: -50%;
    width: 300px;
    z-index: 1000;
    background-color: transparent;
  }

  
  /* Style each individual nav link */
  .navbar-collapse .nav-link {
    padding: 0.1rem;
    display: block;
    width: 100%;
    color: black;
  
  }
}
 
        `}
      </style>

      <Navbar bg="light" expand="lg" className="shadow-sm">
        <Container>
          <Navbar.Brand href="#home" className="fw-bold text-success me-auto">
            <i className="bi bi-arrow-repeat me-2"></i>
            Renew Mart
          </Navbar.Brand>
          
          {/* Navbar Toggle for Mobile View */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          
          {/* Navbar Links with transparent background */}
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav className="gap-3">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#categories">Categories</Nav.Link>
              <Nav.Link href="#how-it-works">How It Works</Nav.Link>
              <Nav.Link href="#safety">Safety</Nav.Link>
              <Nav.Link href="#about">About Us</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
      
      <div style={{ paddingTop: "56px" }}>
        {/* Hero Section */}
        <div id="home" className="bg-success text-white py-5">
          <Container>
            <Row className="align-items-center g-5">
              <Col lg={6} className="mb-4 mb-lg-0">
                <h1 className="display-4 fw-bold mb-3">Give Products a Second Life</h1>
                <p className="lead mb-4">
                  Renew Mart is a safe marketplace to buy and sell second-hand goods.
                  Verified sellers, secure payments, and fraud protection - all in one place.
                </p>
                <div className="d-flex gap-3">
                  <Button variant="light" size="lg" onClick={() => navigate("/Login")}>
                    Get Started
                  </Button>
                </div>
              </Col>
              <Col lg={6} className="text-center">
                <img
                  src="https://www.code-brew.com/wp-content/themes/Avada-Child-Theme/media/2022/07/olx-banner-img-mob.png"
                  alt="People exchanging goods"
                  className="img-fluid rounded-4 border-0 p-3"
                />
              </Col>
            </Row>
          </Container>
        </div>
    
</div>
   

      <section className="py-5" id="categories">
        <Container>
          <h2 className="text-center mb-5">Find What You Need</h2>
          <Row xs={2} md={3} lg={6} className="g-4 text-center">
            {['Electronics', 'Furniture', 'Fashion', 'Books', 'Home', 'Sports'].map((category) => (
              <Col key={category}>
                <Card className="h-100 border-0 shadow-sm hover-lift">
                  <Card.Body>
                    <div className="rounded-circle bg-light d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '80px', height: '80px' }}>
                      <i className={`bi bi-${getCategoryIcon(category)} fs-3 text-success`}></i>
                    </div>
                    <Card.Title>{category}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="py-5 bg-light" id="how-it-works">
        <Container>
          <h2 className="text-center mb-5">How Renew Mart Works</h2>
          <Row className="gy-4">
            {[
              { title: 'Create Account', desc: 'Sign up and verify your profile in minutes', icon: 'person-plus' },
              { title: 'Buy or Sell', desc: 'List items for sale or find what you need', icon: 'arrow-left-right' },
              { title: 'Secure Transaction', desc: 'Use our secure payment system to complete purchase', icon: 'shield-check' },
              { title: 'Exchange & Rate', desc: 'Meet up, exchange items and leave feedback', icon: 'star' }
            ].map((step, index) => (
              <Col md={3} key={index}>
                <Card className="h-100 border-0 shadow-sm text-center">
                  <Card.Body>
                    <div className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '60px', height: '60px' }}>
                      <span className="fw-bold">{index + 1}</span>
                    </div>
                    <Card.Title>{step.title}</Card.Title>
                    <Card.Text className="text-muted">{step.desc}</Card.Text>
                    <i className={`bi bi-${step.icon} text-success fs-2 mt-2`}></i>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

     
      <section className="py-5" id="safety">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb-4 mb-lg-0 pe-lg-5"> {/* Added pe-lg-5 for right padding */}
              <h2 className="mb-4">Your Safety Is Our Priority</h2>
              <p className="lead mb-4">
                At Renew Mart, we've built multiple layers of protection to ensure your buying and selling experience is safe.
              </p>
              <Row xs={1} md={2} className="g-4">
                {[
                  { title: 'Verified Users', desc: 'All users undergo thorough verification', icon: 'person-check' },
                  { title: 'Secure Payments', desc: 'Money held in escrow until delivery', icon: 'credit-card' },
                  { title: 'Fraud Detection', desc: 'AI-powered system flags suspicious activities', icon: 'shield-lock' },
                  { title: '24/7 Support', desc: 'Our team is always ready to help', icon: 'headset' }
                ].map((feature, index) => (
                  <Col key={index}>
                    <div className="d-flex mb-3">
                      <div className="me-3">
                        <i className={`bi bi-${feature.icon} text-success fs-3`}></i>
                      </div>
                      <div>
                        <h5 className="mb-1">{feature.title}</h5>
                        <p className="mb-0 text-muted small">{feature.desc}</p>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            </Col>
            <Col lg={6} className="ps-lg-5 text-center"> {/* Added ps-lg-5 for left padding */}
              <img
                src="https://png.pngtree.com/png-clipart/20221217/original/pngtree-green-shield-check-mark-safe-protect-icon-logo-png-image_8760618.png"
                alt="Security features visualization"
                className="img-fluid"
                style={{ width: "60%", height: "auto" }}
              />
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-5 bg-light">
        <Container>
          <h2 className="text-center mb-5">What Our Users Say</h2>
          <Carousel variant="dark" indicators={false} className="testimonial-carousel">
            {[1, 2, 3].map((item) => (
              <Carousel.Item key={item}>
                <div className="testimonial-slide">
                  <Row className="justify-content-center">
                    <Col md={8} lg={6}>
                      <Card className="border-0 shadow text-center p-4">
                        <div className="mb-3">
                          <span className="text-warning">
                            {'★'.repeat(5)}
                          </span>
                        </div>
                        <Card.Body>
                          <p className="mb-4">
                            "I've been using Renew Mart for over a year now. The verification process makes me feel safe,
                            and I've found amazing deals on furniture for my new apartment. Highly recommend!"
                          </p>
                          <div className="d-flex align-items-center justify-content-center">
                            <div className="rounded-circle bg-secondary d-inline-block me-3" style={{ width: '50px', height: '50px' }}></div>
                            <div className="text-start">
                              <h6 className="mb-0">Sarah Johnson</h6>
                              <small className="text-muted">Buyer</small>
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </Container>
      </section>

      <section className="py-5 bg-success text-white text-center">
        <Container>
          <h2 className="mb-4">Ready to Give Products a Second Life?</h2>
          <p className="lead mb-4 mx-auto" style={{ maxWidth: '700px' }}>
            Join thousands of users who are buying and selling second-hand goods safely on Renew Mart.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Button variant="light" size="lg">Sign Up Now</Button>
            <Button variant="outline-light" size="lg">Learn More</Button>
          </div>
        </Container>
      </section>

      <footer id="about" className="bg-dark text-white py-5">
        <Container>
          <Row>
            <Col md={4} className="mb-4 mb-md-0">
              <h5 className="mb-3">Renew Mart</h5>
              <p >
                A safe and secure marketplace for second-hand goods, promoting sustainability and trust.
              </p>
              <div className="d-flex gap-2 mt-3">
                <Button variant="outline-light" size="sm"><i className="bi bi-facebook"></i></Button>
                <Button variant="outline-light" size="sm"><i className="bi bi-twitter"></i></Button>
                <Button variant="outline-light" size="sm"><i className="bi bi-instagram"></i></Button>
                <Button variant="outline-light" size="sm"><i className="bi bi-linkedin"></i></Button>
              </div>
            </Col>
            <Col md={2} className="mb-4">
              <h6 className="mb-3">Quick Links</h6>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <a href="#home" className="text-light text-decoration-none">Home</a>
                </li>
                <li className="mb-2">
                  <a href="#categories" className="text-light text-decoration-none">Categories</a>
                </li>
                <li className="mb-2">
                  <a href="#how-it-works" className="text-light text-decoration-none">How It Works</a>
                </li>
                <li className="mb-2">
                  <a href="#safety" className="text-light text-decoration-none">Safety</a>
                </li>
              </ul>
            </Col>
            <Col md={2} className="mb-4">
              <h6 className="mb-3">Support</h6>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <a href="#faqs" className="text-light text-decoration-none">FAQs</a>
                </li>
                <li className="mb-2">
                  <a href="#contact" className="text-light text-decoration-none">Contact Us</a>
                </li>
                <li className="mb-2">
                  <a href="#help" className="text-light text-decoration-none">Help Center</a>
                </li>
                <li className="mb-2">
                  <a href="#report" className="text-light text-decoration-none">Report Fraud</a>
                </li>
              </ul>
            </Col>
            <Col md={4}>
              <h6 className="mb-3">Stay Updated</h6>
              <p className="text-muted">Subscribe to our newsletter for latest updates and offers.</p>
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="Your email address"
                  aria-label="Email"
                  aria-describedby="subscribe-button"
                />
                <Button variant="success" id="subscribe-button">
                  Subscribe
                </Button>
              </InputGroup>
              <p className="text-muted small">
                &copy; {new Date().getFullYear()} Renew Mart. All rights reserved.
              </p>
            </Col>

          </Row>
        </Container>
      </footer>
    </div>
  );
};

const getCategoryIcon = (category) => {
  const iconMap = {
    'Electronics': 'laptop',
    'Furniture': 'house',
    'Fashion': 'bag',
    'Books': 'book',
    'Home': 'house-door',
    'Sports': 'bicycle'
  };
  return iconMap[category] || 'tag';
};

export default RenewMartLandingPage;