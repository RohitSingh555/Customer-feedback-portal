import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-4">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <h5 className="mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <Link className="text-white" to="/">
                  Home
                </Link>
              </li>
              <li>
                <a className="text-white" href="https://rohitsingh555.github.io/RohitSinghPortfolio/" target="_blank" rel="noopener noreferrer">
                  Portfolio
                </a>
              </li>
            </ul>
          </div>
          <div className="col-lg-6">
            <h5 className="mb-3">Contact</h5>
            <p className="mb-1">Email: forrohitsingh99@gmail.com</p>
            <p>Phone: +91 8668428101</p>
          </div>
        </div>
      </div>
      <div className="container-fluid mt-3">
        <div className="text-center">
          <p className="mb-0">
            &copy; {new Date().getFullYear()} All rights reserved by Rohit Singh, a full-stack developer.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
