import React from 'react';
const Footer = () => {
  return (
    <footer className="bg-success text-white py-5 mt-5">
      <div className="container">
        <div className="row">
          {/* Popular Locations */}
          <div className="col-md-3 mb-4">
            <h5 className="mb-3 border-bottom pb-2 border-light">Popular Locations</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="#" className="text-white text-decoration-none hover-opacity">Kolkata</a></li>
              <li className="mb-2"><a href="#" className="text-white text-decoration-none hover-opacity">Mumbai</a></li>
              <li className="mb-2"><a href="#" className="text-white text-decoration-none hover-opacity">Chennai</a></li>
              <li className="mb-2"><a href="#" className="text-white text-decoration-none hover-opacity">Pune</a></li>
            </ul>
          </div>

          {/* Trending Locations */}
          <div className="col-md-3 mb-4">
            <h5 className="mb-3 border-bottom pb-2 border-light">Trending Locations</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="#" className="text-white text-decoration-none hover-opacity">Bhubaneshwar</a></li>
              <li className="mb-2"><a href="#" className="text-white text-decoration-none hover-opacity">Hyderabad</a></li>
              <li className="mb-2"><a href="#" className="text-white text-decoration-none hover-opacity">Chandigarh</a></li>
              <li className="mb-2"><a href="#" className="text-white text-decoration-none hover-opacity">Nashik</a></li>
            </ul>
          </div>

          {/* About Us */}
          <div className="col-md-3 mb-4">
            <h5 className="mb-3 border-bottom pb-2 border-light">About Us</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="#" className="text-white text-decoration-none hover-opacity">Tech@Renewmart</a></li>
              <li className="mb-2"><a href="#" className="text-white text-decoration-none hover-opacity">Blog</a></li>
              <li className="mb-2"><a href="#" className="text-white text-decoration-none hover-opacity">Help</a></li>
              <li className="mb-2"><a href="#" className="text-white text-decoration-none hover-opacity">Sitemap</a></li>
              <li className="mb-2"><a href="#" className="text-white text-decoration-none hover-opacity">Legal & Privacy information</a></li>
              <li className="mb-2"><a href="#" className="text-white text-decoration-none hover-opacity">Vulnerability Disclosure Program</a></li>
            </ul>
          </div>

          {/* Follow Us */}
          <div className="col-md-3 mb-4">
            <h5 className="mb-3 border-bottom pb-2 border-light">Follow Us</h5>
            <div className="d-flex gap-3">
              <a href="#" className="text-white">
                <i className="bi bi-facebook fs-4"></i>
              </a>
              <a href="#" className="text-white">
                <i className="bi bi-twitter fs-4"></i>
              </a>
              <a href="#" className="text-white">
                <i className="bi bi-instagram fs-4"></i>
              </a>
              <a href="#" className="text-white">
                <i className="bi bi-linkedin fs-4"></i>
              </a>
            </div>
            <div className="mt-4">
              <h6>Download Our App</h6>
              <div className="d-flex gap-2 mt-2">
                <a href="#" className="btn btn-outline-light btn-sm">
                  <i className="bi bi-apple me-1"></i> App Store
                </a>
                <a href="#" className="btn btn-outline-light btn-sm">
                  <i className="bi bi-google-play me-1"></i> Google Play
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-4 pt-4 border-top border-light">
          <div className="col-md-6">
            <p className="small mb-0">© 2025 RenewMart. All rights reserved.</p>
          </div>
          <div className="col-md-6 text-md-end">
            <p className="small mb-0">
              <a href="#" className="text-white me-3">Terms of Use</a>
              <a href="#" className="text-white me-3">Privacy Policy</a>
              <a href="#" className="text-white">Cookie Policy</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Add this CSS to your stylesheet
const styles = `
.hover-opacity:hover {
  opacity: 0.8;
  transition: opacity 0.2s ease;
}
`;

export default Footer;
