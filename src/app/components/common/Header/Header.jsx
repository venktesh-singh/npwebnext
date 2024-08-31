'use client';
import React from "react";
import Link from 'next/link';
import Image from 'next/image';
import Nav from '../HaederNav/Nav'

export default function Header() {
    return (
      <>

          <section id="topbar" className="d-flex align-items-center">
            <div className="container-fluid d-flex justify-content-between">
              <div className="contact-info d-flex align-items-center">
                {" "}
                KOHLER NEPAL{" "}
              </div>
              <div className="social-links d-none d-md-flex align-items-center">
                <a href="/our-store" className="twitter">
                  <i className="bi bi-geo-alt-fill" /> Find a Store{" "}
                </a>
                <a href="/contact-us" className="facebook">
                  <i className="bi bi-envelope-fill" /> Contact Us{" "}
                </a>
              </div>
            </div>
          </section>
          
          <header id="header" className="d-flex align-items-center">
            <div className="container-fluid d-flex align-items-center justify-content-between">
              <div className="navleft">
              
              <a href="/" className="logo">
                <Image src="/images/logo.png" className="white" width={150} height={48} alt="Logo" />
              </a>

                
                <Nav/>
              </div>
              <div className="right-part">
                <a className="btnsearch" href="#">
                  <i className="bi bi-search" />
                </a>
                <a className="btn-getstarted" href="/book-an-appointment">
                  Request a Quote
                </a>
              </div>
            </div>
          </header>
      </>
    );
}
