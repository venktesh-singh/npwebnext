'use client';
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || `https://npkohlercompaignapi.onrender.com/api/v1`;

export default function Page() {
    const [name, setName] = useState("");
    const [city, setCity] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [request, setRequest] = useState("");
    const [contact, setContact] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() =>  {
        const fetchData = async () => {
            try {
                const response = await fetch(`${BASE_URL}/contacts`);
                const data = await response.json();
                setContact(data);
            } catch (error) {
                setError(error.message);
            }
        }; 
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const contactData = { name, city, phone, email, request };

        try {
            const response = await fetch(`${BASE_URL}/contacts/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(contactData)
            });

            if (response.ok) {
                const result = await response.json();
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
                setName("");
                setCity("");
                setPhone("");
                setEmail("");
                setRequest("");
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
            <ToastContainer
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
            />
            <div className="inner-page request-quote">
                <section className="landing-hero" style={{ paddingBottom: '0px' }}>
                    <figure className="hero-image">
                        <Image
                            src="images/FB-Banner.jpg"
                            className="highlight-hero img-responsive"
                            title="About Us"
                            alt="store-lagos-banner.jpg"
                            width={1903}
                            height={724}
                        />
                    </figure>
                </section>

                <div className="rows main-content" style={{ background: '#fff' }}>
                    <div className="bodycopy">
                        <div className="input-area">
                            <article className="sitemap-menu">
                                <div className="contact-container">
                                    <div className="main-form">
                                        <div className="row">
                                            <header className="page-header template-header">
                                                <h2>Contact Us</h2>
                                                <hr />
                                            </header>
                                            <div className="col-md-6 col-sm-6 col-xs-12">
                                                <h5 className="section-title small-title">
                                                    Phone Number:
                                                    <br />
                                                    <span><a href="tel:+9779801036599">+977 980 1036599</a></span>
                                                    <br />
                                                    <span><a href="tel:+918126213736">+91 8126213736</a></span>
                                                </h5>
                                                <iframe
                                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28257.410479407452!2d85.25667662465008!3d27.71184211872966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb195062db2619%3A0xa664fda163c9f2f2!2sKohler%20Nepal!5e0!3m2!1sen!2sin!4v1699512916246!5m2!1sen!2sin"
                                                    width="500"
                                                    height="450"
                                                    style={{ border: 0 }}
                                                    allowFullScreen
                                                    loading="lazy"
                                                    referrerPolicy="no-referrer-when-downgrade"
                                                />
                                            </div>

                                            <div className="col-md-6 col-sm-6 col-xs-12">
                                                <form id="contact-us" className="validation-decorator" onSubmit={handleSubmit}>
                                                    <div className="form-group">
                                                        <label htmlFor="name" className="control-label">
                                                            Name*
                                                        </label>
                                                        <input
                                                            className="form-control"
                                                            id="name"
                                                            name="name"
                                                            required
                                                            type="text"
                                                            value={name}
                                                            onChange={e => setName(e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="city" className="control-label">
                                                            City*
                                                        </label>
                                                        <input
                                                            className="form-control"
                                                            id="city"
                                                            name="city"
                                                            required
                                                            type="text"
                                                            value={city}
                                                            onChange={e => setCity(e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="phone" className="control-label">
                                                            Phone*
                                                        </label>
                                                        <input
                                                            className="form-control"
                                                            id="phone"
                                                            name="phone"
                                                            required
                                                            type="tel"
                                                            value={phone}
                                                            onChange={e => setPhone(e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="input-mail" className="control-label">
                                                            Your Email Address*
                                                        </label>
                                                        <input
                                                            className="form-control"
                                                            id="input-mail"
                                                            name="email"
                                                            required
                                                            type="email"
                                                            value={email}
                                                            onChange={e => setEmail(e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <p>
                                                            <strong>
                                                                Please describe in detail your request, question, or issue with your product*
                                                            </strong>
                                                        </p>
                                                        <textarea
                                                            className="form-control"
                                                            id="request"
                                                            name="request"
                                                            required
                                                            rows={8}
                                                            value={request}
                                                            onChange={e => setRequest(e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="form-group contact-btn-box">
                                                        <div className="link-policy">
                                                            <a href="http://www.us.kohler.com/us/Privacy-Statement/content/CNT1100001.htm">
                                                                Privacy Policy
                                                            </a>
                                                        </div>
                                                        <div id="html_element">&nbsp;</div>
                                                        <div className="but">
                                                            <button
                                                                className="btn btn-block btn-contact submit-cubd-request"
                                                                type="submit"
                                                            >
                                                                Send
                                                            </button>
                                                        </div>
                                                    </div>
                                                    {error && (
                                                        <div className="alert alert-danger mt-3" role="alert">
                                                            {error}
                                                        </div>
                                                    )}
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
