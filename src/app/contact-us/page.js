'use client';
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || `https://npkohlercompaignapi.onrender.com/api/v1`;

const validationSchema = Yup.object({
    name: Yup.string().required('Full Name is required'),
    city: Yup.string().required('City is required'),
    phone: Yup.string().matches(/^[0-9\b]+$/, 'Invalid phone number').required('Phone is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    request: Yup.string().required('Request is required'),
});

export default function Page() {
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

    const handleSubmit = async (values, { resetForm }) => {
        try {
            const response = await fetch(`${BASE_URL}/contacts/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            });

            if (response.ok) {
                const result = await response.json();
                toast.success('Contact Us form submitted successfully!', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                // Reset form after successful submission
                resetForm();
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
                            src="/images/FB-Banner.jpg"
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
                                                <Formik
                                                    initialValues={{
                                                        name: '',
                                                        city: '',
                                                        phone: '',
                                                        email: '',
                                                        request: '',
                                                    }}
                                                    validationSchema={validationSchema}
                                                    onSubmit={handleSubmit}
                                                >
                                                    {({ errors, touched }) => (
                                                        <Form id="contact-us" className="validation-decorator">
                                                            <div className="form-group">
                                                                <label htmlFor="name" className="control-label">
                                                                    Name*
                                                                </label>
                                                                <Field
                                                                    id="name"
                                                                    name="name"
                                                                    type="text"
                                                                    className={`form-control ${errors.name && touched.name ? 'is-invalid' : ''}`}
                                                                />
                                                                <ErrorMessage name="name" component="div" className="invalid-feedback" />
                                                            </div>
                                                            <div className="form-group">
                                                                <label htmlFor="city" className="control-label">
                                                                    City*
                                                                </label>
                                                                <Field
                                                                    id="city"
                                                                    name="city"
                                                                    type="text"
                                                                    className={`form-control ${errors.city && touched.city ? 'is-invalid' : ''}`}
                                                                />
                                                                <ErrorMessage name="city" component="div" className="invalid-feedback" />
                                                            </div>
                                                            <div className="form-group">
                                                                <label htmlFor="phone" className="control-label">
                                                                    Phone*
                                                                </label>
                                                                <Field
                                                                    id="phone"
                                                                    name="phone"
                                                                    type="tel"
                                                                    className={`form-control ${errors.phone && touched.phone ? 'is-invalid' : ''}`}
                                                                />
                                                                <ErrorMessage name="phone" component="div" className="invalid-feedback" />
                                                            </div>
                                                            <div className="form-group">
                                                                <label htmlFor="email" className="control-label">
                                                                    Your Email Address*
                                                                </label>
                                                                <Field
                                                                    id="email"
                                                                    name="email"
                                                                    type="email"
                                                                    className={`form-control ${errors.email && touched.email ? 'is-invalid' : ''}`}
                                                                />
                                                                <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                                            </div>
                                                            <div className="form-group">
                                                                <p>
                                                                    <strong>
                                                                        Please describe in detail your request, question, or issue with your product*
                                                                    </strong>
                                                                </p>
                                                                <Field
                                                                    as="textarea"
                                                                    id="request"
                                                                    name="request"
                                                                    rows={8}
                                                                    className={`form-control ${errors.request && touched.request ? 'is-invalid' : ''}`}
                                                                />
                                                                <ErrorMessage name="request" component="div" className="invalid-feedback" />
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
                                                        </Form>
                                                    )}
                                                </Formik>
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
