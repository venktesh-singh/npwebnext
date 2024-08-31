'use client';
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || `https://npkohlercompaignapi.onrender.com/api/v1`;

export default function Page(){
    const [fname, setFname] = useState("");  
    const [lname, setLname] = useState(""); 
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [city, setCity] = useState("");
    const [iam, setIam]  = useState("");
    const [source, setSource] = useState("");  
    const [medium, setMedium] = useState("");
    const [campaign, setCampaign] = useState("");
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const contactData = { fname, lname, city, phone, email, iam };

        try {
            const response = await fetch(`${BASE_URL}/appointments/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(contactData)
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
                
                setFname("");
                setLname("");
                setEmail("");
                setPhone("");
                setCity("");
                setIam("");
                setSource("");
                setMedium("");
                setCampaign("");
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
                            src="images/FB-Banner.jpg" 
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
                    <form className="validation-decorator" id="enq_form" onSubmit={handleSubmit}>
                        <div className="form-group row">
                            <div className="col-md-6 col-sm-12">
                                <input 
                                    className="form-control" 
                                    id="fname" 
                                    name="fname" 
                                    value={fname} 
                                    onChange={e => setFname(e.target.value)} 
                                    required 
                                    placeholder="First Name" 
                                    type="text" 
                                />
                            </div>
                            <div className="col-md-6 col-sm-12">
                                <input 
                                    className="form-control" 
                                    id="lname" 
                                    name="lname" 
                                    value={lname} 
                                    onChange={e => setLname(e.target.value)} 
                                    required 
                                    placeholder="Last Name" 
                                    type="text" 
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-md-6 col-sm-12">
                                <input 
                                    className="form-control" 
                                    id="email" 
                                    name="email" 
                                    value={email} 
                                    onChange={e => setEmail(e.target.value)} 
                                    required 
                                    placeholder="E-mail id" 
                                    type="email" 
                                />
                            </div>
                            <div className="col-md-6 col-sm-12">
                                <input 
                                    className="form-control" 
                                    id="pnumber" 
                                    name="phone" 
                                    value={phone} 
                                    onChange={e => setPhone(e.target.value)} 
                                    required 
                                    placeholder="Phone" 
                                    type="text" 
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <div id="ktc" className="col-md-6 col-sm-12 kstoresec">
                                <select 
                                    name="city" 
                                    id="kohlercity" 
                                    value={city} 
                                    onChange={e => setCity(e.target.value)} 
                                    className="form-control" 
                                    autoComplete="off"
                                >
                                    <option value="">--Select City--</option>
                                    <option value="Biratnagar">Biratnagar</option>
                                    <option value="Bhaktapur">Bhaktapur</option> 
                                    <option value="Kathmandu">Kathmandu</option>
                                    <option value="Manigram">Manigram</option>
                                    <option value="Pokhara">Pokhara</option>
                                </select>
                            </div>
                            <div className="col-md-6 col-sm-12">
                                <select 
                                    name="i_am" 
                                    value={iam} 
                                    onChange={e => setIam(e.target.value)}  
                                    className="form-control"
                                >
                                    <option value="">--Select I Am--</option>
                                    <option value="A Consumer">A Consumer</option>
                                    <option value="An Architect">An Architect</option>
                                    <option value="A Developer/Builder">A Developer/Builder</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-12 col-sm-12 capt" style={{marginTop: '30px'}}>
                            <div className="g-recaptcha" data-sitekey="6LejhiIeAAAAAAH_QXxjIkR4fBC4z_UTYlRlgI2q" />
                            <div className="text-danger" id="captcha_error" />
                        </div>
                        <div className="col-xs-12 col-md-12 col-sm-12 text-center">
                            <div id="html_element">&nbsp;</div>
                            <input type="hidden" name="utm_source" value={source} onChange={e=> setSource(e.target.value)}  />
                            <input type="hidden" name="utm_medium" value={medium} onChange={e=> setMedium(e.target.value)} />
                            <input type="hidden" name="utm_campaign" value={campaign} onChange={e=> setCampaign(e.target.value)} />
                            <button 
                                className="btn btn-block btn-contact submit-btn" 
                                type="submit" 
                                style={{background: '#000', color: '#fff'}}
                            >
                                Book Now  
                            </button>
                        </div>
                        {error && (
                            <div className="alert alert-danger mt-3" role="alert">
                                {error}
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </>
      )
}      
