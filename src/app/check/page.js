'use client';
import Image from "next/image";
export default function Page(){
    return (
        <>
            
            <main id="main">
                <div className="inner-page product-list">
                    <div className="container-fluid">
                    <div className="breadcrumb">
                        <ul>
                        <li>
                            <a href="#">Home</a> <span>/</span>
                        </li>
                        <li>Bathroom</li>
                        </ul>
                    </div>
                    </div>
                    <section id="" className="top-section sectionbg1">
                    <div className="container-fluid">
                        <div className="top-head">
                        <h2>Rain Head</h2>
                        </div>
                        <div className="top-btmtext">
                        <p>Modern design meets exceptional power, innovation and comfort.</p>
                        </div>
                    </div>
                    </section>
                    <section id="" className="product-btm--01">
                    <div className="container-fluid">
                        <div className="row">
                        <div className="col-sm-3 left-side">
                            <div className="left-section">
                            <h1>Left Menu</h1>
                            {/*?php include("includes/leftmenu.php"); ?*/}
                            </div>
                        </div>
                        <div className="col-sm-9 right-side">
                            <div className="right-section">
                            <div className="row">
                                <div className="col-sm-4">
                                <div className="product-box">
                                    <div className="image">
                                    
                                    </div>
                                    <div className="info">
                                    <h3>MASTER CLEAN</h3>
                                    <p>SF 330X230MM RAINHEAD</p>
                                    <p>27731IN-BL</p>
                                    <div className="btm-inquiry">
                                        <a
                                        href="javascript:"
                                        className="place-an-enquiry enqbtn"
                                        data-pname="SF 330X230MM RAINHEAD"
                                        data-pmodel="27731IN-BL"
                                        >
                                        Place an Enquiry
                                        </a>
                                        {/*a href="#" class="rmd">Read Description</a*/}
                                    </div>
                                    </div>
                                </div>
                                </div>
                                <div className="col-sm-4">
                                <div className="product-box">
                                    <div className="image">
                                    <a href="#">
                                        
                                    </a>
                                    </div>
                                    <div className="info">
                                    <h3>RAINDUET</h3>
                                    <p>RAINDUET SQUARE 203MM RAINHEAD</p>
                                    <p>73199IN-CP</p>
                                    <div className="btm-inquiry">
                                        <a
                                        href="javascript:"
                                        className="place-an-enquiry enqbtn"
                                        data-pname="RAINDUET SQUARE 203MM RAINHEAD"
                                        data-pmodel="73199IN-CP"
                                        >
                                        Place an Enquiry
                                        </a>
                                        
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </section>
                    <br />
                </div>
            </main>
        </>
    )
}