'use client';
import React from "react";
import Link from 'next/link';
import Image from 'next/image';  

export default function Index() {
    return (
        <>
            <section id="hero" className="d-flex align-items-center">
                <div className="video-bg">
                    <video
                        width="100%"
                        height="100%"
                        muted
                        playsInline
                        autoPlay
                        loop
                    >
                        <source src="/img/hero-video.mp4" type="video/mp4" />
                    </video>
                </div>
                <div className="container-fluid">
                    <div className="bannerinfo">
                        <h1>The Evolution of Showering</h1>
                        <h2>
                            Embrace the beauty of minimalism and comfort of Kohler <br />
                            showering collection with Anthem.
                        </h2>
                       
                    </div>
                </div>
            </section>
            {/* End Hero */}
            <main id="main">
                {/* ======= About Section ======= */}
                <section id="about" className="about about-section sectionbg">
                    <div className="container-fluid">
                        <div className="top-head">
                            <h2>New Collections</h2>
                        </div>
                        <div className="row">
                            {[
                                {
                                    imgSrc: "/images/product-img1.jpg",
                                    title: "Colors by Kohler: Brighten Your Bathroom",
                                    description: "Transform your space with our vibrant range of colorful ceramics and radiant finishes.",
                                    linkText: "Explore Colors by Kohler"
                                },
                                {
                                    imgSrc: "/images/product-img2.jpg",
                                    title: "The Finish is Just the Beginning",
                                    description: "Start with the finish you love to craft a personalized kitchen or bathroom design around your favorite faucet and finish combination.",
                                    linkText: "Explore Faucet Finishes"
                                },
                                {
                                    imgSrc: "/images/product-img3.jpg",
                                    title: "Upgrade to Smart Cleanliness",
                                    description: "Experience next-level cleanliness and comfort with our advanced toilet technology.",
                                    linkText: "Explore Kohler Intelligent Toilets and Cleansing Seats"
                                },
                                {
                                    imgSrc: "/images/product-img4.jpg",
                                    title: "Revolutionize Your Shower",
                                    description: "Feel the warmth and volume of rainforest-like droplets with our advanced shower technology.",
                                    linkText: "Explore Katalyst Air-Induction Technology"
                                },
                                {
                                    imgSrc: "/images/product-img5.jpg",
                                    title: "A Complete Bathroom Solution",
                                    description: "Designed for comfort and convenience, ensuring a seamless experience for all family members.",
                                    linkText: "Explore Family Care Products"
                                },
                                {
                                    imgSrc: "/images/product-img6.jpg",
                                    title: "The World's Slimmest Bathroom Suite",
                                    description: "Experience minimalistic elegance and advanced hygiene with our ultra-slim, rimless design for modern comfort.",
                                    linkText: "Explore The World's Slimmest Bathroom Suite"
                                },
                                {
                                    imgSrc: "/images/product-img7.jpg",
                                    title: "Revolution 360: The Ultimate in Toilet Hygiene",
                                    description: "Experience our advanced swirl flush technology for a powerfully clean and fully covered toilet bowl.",
                                    linkText: "Explore Revolution 360"
                                },
                                {
                                    imgSrc: "/images/product-img8.jpg",
                                    title: "Elevate Family Life with a Bidet Toilet Seat",
                                    description: "Experience comfort and hygiene with our bidet seats, designed for every member of your family.",
                                    linkText: "Explore Kohler Bidet Seats"
                                }
                            ].map((item, index) => (
                                <div key={index} className="col-lg-6 pt-4 pt-lg-0 content d-flex flex-column justify-content-center">
                                    <div className="about-item" data-aos="fade-up">
                                        <a href="#" className="hg">
                                            <Image
                                                src={item.imgSrc}
                                                className="business-img img-fluid"
                                                alt={item.title}
                                                width={880}
                                                height={463}
                                            />
                                        </a>
                                        <div className="info">
                                            <h3>{item.title}</h3>
                                            <p>{item.description}</p>
                                            <div className="cta-btn">
                                                <a href="#">{item.linkText}</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                
                <section className="about-us-section blog-section sectionbg">
                    <div className="container-fluid" data-aos="fade-up">
                        <div className="top-head">
                            <h2>Trending Products</h2>
                        </div>
                        <div className="row">
                            {[
                                {
                                    imgSrc: "/img/trending-pro-img1.jpg",
                                    title: "Toilet",
                                    linkText: "Explore Toilet"
                                },
                                {
                                    imgSrc: "/img/trending-pro-img2.jpg",
                                    title: "Kitchen Faucets",
                                    linkText: "Explore Kitchen Faucets"
                                },
                                {
                                    imgSrc: "/img/trending-pro-img3.jpg",
                                    title: "Bathroom Faucets",
                                    linkText: "Explore Bathroom Faucets"
                                }
                            ].map((item, index) => (
                                <div key={index} className="col-lg-4 col-md-4">
                                    <div className="box">
                                        <a href="#">
                                            <div className="image">
                                                <Image
                                                    src={item.imgSrc}
                                                    className="missiin-img"
                                                    alt={item.title}
                                                    width={385}
                                                    height={341}
                                                />
                                            </div>
                                            <div className="info">
                                                <h2>{item.title}</h2>
                                            </div>
                                            <div className="hide-info">
                                                <h3>{item.linkText}</h3>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}
