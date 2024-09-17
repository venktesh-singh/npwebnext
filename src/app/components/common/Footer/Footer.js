'use client';
import Image from 'next/image';
import Search from '../Search/Search';
import { useState, useEffect } from 'react';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || `https://npkohlercompaignapi.onrender.com/api/v1`;

export default function Footer() {
  const [sku, setSku] = useState("");
  const [skuSubtitle, setSkuSubtitle] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pop, setPop] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/commonforms`);
        const data = await response.json();
        setPop(data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const contactData = { name, sku, sku_subtitle: skuSubtitle, email, phone };

    try {
      const response = await fetch(`${BASE_URL}/commonforms/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      });

      if (response.ok) {
        toast.success('Contact us Form submitted successfully!', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        // Reset form fields after successful submission
        setSku("");
        setSkuSubtitle("");
        setPhone("");
        setEmail("");
        setName("");
      } else {
        const errorData = await response.json();
        toast.error(`Error submitting contact: ${errorData.message}`);
      }
    } catch (error) {
      toast.error(`Error submitting contact: ${error.message}`);
    }
  };

  return (
    <>
      <div className="find">
        <a href="/our-store" className="findstr">
          <i className="bi bi-geo-alt-fill" /> Find a Store{" "}
        </a>
      </div>
     
      <footer id="footer">
        <div className="footer-top">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="row">
                  <div className="col-lg-3 col-md-6 footer-links">
                    <h4>KOHLER CO.</h4>
                    <ul>
                      <li><a href="/about-us">About Us</a></li>
                      <li><a href="#">Stewardship</a></li>
                    </ul>
                  </div>
                  <div className="col-lg-3 col-md-6 footer-links">
                    <h4>ABOUT US</h4>
                    <ul>
                      <li><a href="whoweare.php">Who We Are</a></li>
                      <li><a href="ourheritage.php">Heritage</a></li>
                      <li><a href="socialimpact.php">Social Impact</a></li>
                      <li><a href="sustainability.php">Sustainability</a></li>
                      <li><a href="#">150th Anniversary</a></li>
                    </ul>
                  </div>
                  <div className="col-lg-3 col-md-6 footer-links">
                    <h4>RESOURCES</h4>
                    <ul>
                      <li><a href="#">Guides and Lookbooks</a></li>
                      <li><a href="#">CSR</a></li>
                      <li><a href="#">Press Room</a></li>
                      <li><a href="#">Blogs</a></li>
                    </ul>
                  </div>
                  <div className="col-lg-3 col-md-6 footer-links">
                    <h4>HELP</h4>
                    <ul>
                      <li><a href="/book-an-appointment">Book an Appointment</a></li>
                      <li><a href="#">Help & FAQ’s</a></li>
                      <li><a href="#">Where to Buy</a></li>
                      <li><a href="/contact-us">Contact Us</a></li>
                      <li><a href="#">Warranty</a></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="row">
                  <div className="col-lg-12 col-md-12 footer-links social-link">
                    <div className="footer-newsletter">
                      <div className="newsletter">
                        <div className="newsletter-wrp d-flex justify-content-center">
                          <h4>Follow Us On</h4>
                          <div className="social-links mt3">
                            <a href="#" className="facebook">
                              <i className="bx bxl-facebook" />
                            </a>
                            <a href="#" className="instagram">
                              <i className="bx bxl-instagram" />
                            </a>
                            <a href="#" className="instagram">
                              <i className="bx bxl-youtube" />
                            </a>
                            <a href="#" className="twitter">
                              <i className="bx bi-twitter-x" />
                            </a>
                            <a href="#" className="linkedin">
                              <i className="bx bxl-linkedin" />
                            </a>
                          </div>
                        </div>
                        <div className="newsletter-wrap">
                          <div className="row justify-content-start">
                            <div className="col-lg-12">
                              <h5>
                                Subscribe to receive email news, promotions, and
                                information about Kohler.
                              </h5>
                            </div>
                            <div className="col-lg-12">
                              <div className="subscribe-form">
                                <form id="newletter">
                                  <input
                                    type="email"
                                    name="newletteremail"
                                    placeholder="Your email address"
                                    required=""
                                  />
                                  <button
                                    type="submit"
                                    className="btn btn-dark w-100 fw-bold submit-btn submit-btn-new"
                                  >
                                    Submit
                                  </button>
                                  <input
                                    type="hidden"
                                    name="action"
                                    defaultValue="newletterform"
                                  />
                                </form>
                                <div id="msgs" />
                                <p className="btm-line">
                                  By joining our mailing list you consent to having
                                  your data processed as shown in our{" "}
                                  <a href="#">privacy policy</a>.{" "}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom--2">
          <div className="container-fluid">
            <div className="quick-links">
              <a href="#">Subject Access Request</a>
              <a href="#">Privacy</a>
              <a href="#">Cookies Settings</a>
              <a href="#">Legal</a>
              <a href="#">Site Map</a>
              <a href="#">Terms</a>
              <a href="#">Accessibility</a>
            </div>
            <div className="copyright"> © Kohler Co. All Rights Reserved </div>
          </div>
        </div>
        

        <div className="modal modelPopup1">
            <div className="modal-content">
                <span className="close-button">×</span>
                <div className="top-btmtext from">
                <div className="row justify-content-center">
                    <div className="col-lg-12">
                    <ToastContainer
                          style={{
                              position: 'absolute',
                              top: '50%',
                              left: '50%',
                              transform: 'translate(-50%, -50%)',
                          }}
                      />
                    <form id="npproductenquiry" onSubmit={handleSubmit}> 
                        <div className="row g-3">
                        <div className="col-md-12 m-sapce">
                            <input
                            type="text"
                            className="form-control"
                            id="sku_subtitle"
                            name="sku_subtitle"
                            placeholder="Product Name"
                            value={skuSubtitle}
                            onChange={e => setSkuSubtitle(e.target.value)}
                            required=""
                            readonly
                            />
                        </div>
                        <div className="col-md-12 m-sapce">
                            <input
                            type="text"
                            className="form-control"
                            id="sku"
                            name="sku"
                            placeholder="Product Model"
                            required=""
                            value={sku}
                            onChange={e => setSku(e.target.value)}
                            readOnly
                            />
                        </div>
                        <div className="col-md-12 m-sapce">
                            <input
                            type="text"
                            className="form-control"
                            id="phonr-number"
                            name="name"
                            placeholder="Enter Full Name"
                            required=""
                            value={name}
                            onChange={e => setName(e.target.value)}
                            />
                        </div>
                        <div className="col-md-12 m-sapce">
                            <input
                            type="eamil"
                            className="form-control"
                            id="email-address"
                            name="email"
                            placeholder="Enter Email "
                            required=""
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="col-md-12 m-sapce">
                            <input
                            type="text"
                            className="form-control"
                            id="phonr-number"
                            name="phone"
                            placeholder="Enter Phone"
                            required=""
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                            />
                        </div>
                        
                        <input type="hidden" name="action" defaultValue="product" />
                        <button type="submit" class="btn btn-dark w-100 fw-bold submit-btn">Submit</button>
                      </div>
                    </form>
                    </div>
                </div>
                </div>
            </div>
        </div>   
        <Search/>
      </footer>
    </>
  );
}
