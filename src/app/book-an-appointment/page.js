'use client';
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || `https://npkohlercompaignapi.onrender.com/api/v1`;

const validationSchema = Yup.object({
    fname: Yup.string().required('First Name is required'),
    lname: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    phone: Yup.string().matches(/^[0-9\b]+$/, 'Invalid phone number').required('Phone is required'),
    city: Yup.string().required('City is required'),
    iam: Yup.string().required('Please select an I Am'),
});

export default function Page() {
    const [appoint, setAppoint] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() =>  {
        const fetchData = async () => {
            try {
                const response = await fetch(`${BASE_URL}/appointments/`);
                const data = await response.json();
                setAppoint(data);
            } catch (error) {
                setError(error.message);
            }
        }; 
        fetchData();
    }, []);

    const handleSubmit = async (values, { resetForm }) => {
        try {
            const response = await fetch(`${BASE_URL}/appointments/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            });

            if (response.ok) {
                const result = await response.json();
                toast.success('Appointments Form submitted successfully!', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                
                // Reset form
                resetForm();
            } else {
                const errorData = await response.json();
                toast.error(`Error submitting appointments: ${errorData.message}`);
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
                    top: '100%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
            /> 
            <div className="inner-page request-quote">
                <section className="landing-hero" style={{paddingBottom: '0px'}}>
                    <div className="has-edit-button">
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
                    </div>
                </section>
                <div className="form top-head">
                    <h2>Book Visit Appointment</h2>
                    <div className="top-btmtext newlc">
                        <p>
                            To book an appointment, please share your details in the form below and someone from our team will get <br />
                            in touch with you.
                        </p>
                    </div>
                    <hr />
                </div>
                <div className="input-area">
                    <Formik
                        initialValues={{
                            fname: '',
                            lname: '',
                            email: '',
                            phone: '',
                            city: '',
                            iam: '',
                            source: '',
                            medium: '',
                            campaign: ''
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ errors, touched }) => (
                            <Form className="validation-decorator" id="enq_form">
                                <div className="form-group row">
                                    <div className="col-md-6 col-sm-12">
                                        <Field
                                            type="text"
                                            name="fname"
                                            placeholder="First Name"
                                            className={`form-control ${errors.fname && touched.fname ? 'is-invalid' : ''}`}
                                        />
                                        <ErrorMessage name="fname" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="col-md-6 col-sm-12">
                                        <Field
                                            type="text"
                                            name="lname"
                                            placeholder="Last Name"
                                            className={`form-control ${errors.lname && touched.lname ? 'is-invalid' : ''}`}
                                        />
                                        <ErrorMessage name="lname" component="div" className="invalid-feedback" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-md-6 col-sm-12">
                                        <Field
                                            type="email"
                                            name="email"
                                            placeholder="E-mail id"
                                            className={`form-control ${errors.email && touched.email ? 'is-invalid' : ''}`}
                                        />
                                        <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="col-md-6 col-sm-12">
                                        <Field
                                            type="text"
                                            name="phone"
                                            placeholder="Phone"
                                            className={`form-control ${errors.phone && touched.phone ? 'is-invalid' : ''}`}
                                        />
                                        <ErrorMessage name="phone" component="div" className="invalid-feedback" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div id="ktc" className="col-md-6 col-sm-12 kstoresec">
                                        <Field as="select" name="city" className={`form-control ${errors.city && touched.city ? 'is-invalid' : ''}`}>
                                            <option value="">--Select City--</option>
                                            <option value="Biratnagar">Biratnagar</option>
                                            <option value="Bhaktapur">Bhaktapur</option>
                                            <option value="Kathmandu">Kathmandu</option>
                                            <option value="Manigram">Manigram</option>
                                            <option value="Pokhara">Pokhara</option>
                                        </Field>
                                        <ErrorMessage name="city" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="col-md-6 col-sm-12">
                                        <Field as="select" name="iam" className={`form-control ${errors.iam && touched.iam ? 'is-invalid' : ''}`}>
                                            <option value="">--Select I Am--</option>
                                            <option value="A Consumer">A Consumer</option>
                                            <option value="An Architect">An Architect</option>
                                            <option value="A Developer/Builder">A Developer/Builder</option>
                                        </Field>
                                        <ErrorMessage name="iam" component="div" className="invalid-feedback" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-md-6 col-sm-12">
                                        <Field
                                            hidden
                                            type="text"
                                            name="source"
                                            placeholder="Source"
                                        />
                                    </div>
                                    <div className="col-md-6 col-sm-12">
                                        <Field
                                            hidden
                                            type="text"
                                            name="medium"
                                            placeholder="Medium"
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-md-6 col-sm-12">
                                        <Field
                                            hidden
                                            type="text"
                                            name="campaign"
                                            placeholder="Campaign"
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-md-12 col-sm-12 text-center">
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </>
    );
}
