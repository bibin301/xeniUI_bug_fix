import React, { Component } from "react";
import SignIn from "../../src/component/container/login/LandingSignInModal";
import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import img_book from '../asset/images/Booking Experience.svg';
import walking from '../asset/images/Xeniwalk.svg';
import xenicoin from '../asset/images/Xennies.png';
import gift from '../asset/images/Xenivoyage.svg';
import wish from '../asset/images/Wishlist.svg';
import multi from '../asset/images/Group Bookings.svg';
import change from '../asset/images/change.png'


class Landing extends Component {

    state = {
        isdivHide: true,
        isSignUpHide: false,
        isLandingSingup: false
    };

    handleSignup = () => {
        this.setState({ isSignUpHide: true });
        this.setState({ isdivHide: true });
        this.setState({ isLandingSingup: true })
    }

    onClose = () => {
        this.setState({ isSignUpHide: false })
    }

    render() {
        const { isSignUpHide, isdivHide, isLandingSingup } = this.state;
        const renderSignup = isSignUpHide && <SignIn onHide={this.onClose} isdivHide={isdivHide} isSignUpHide={isSignUpHide} isLandingSingup={isLandingSingup} />

        return (

            <div className="landing-page">
                {renderSignup}
                {<ToastContainer autoClose={4000} transition={Flip} />}
                <div className="container-fluid m-0 p-0">
                    <div className="slider-image d-flex justify-content-center align-items-center">
                        <div className="container d-flex justify-content-center">
                            <div className="slide-text">
                                <div className="slide-heading d-flex justify-content-center">
                                    <h1>Discover More with Xeniapp</h1>
                                </div>
                                <p>To get pre-launch access to <span> exclusive deals on flights, hotels and car-rentals,</span> <br />Sign Up to be a beta user </p>
                                <p></p>
                                <div className="slide-button d-flex justify-content-center pt-2">
                                    <button type="button" onClick={this.handleSignup}>SIGN UP</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="xeniapp-feature mt-5">
                        <h2>What's New?</h2>
                        <div className="row">
                            <div className="col-lg-4 col-sm-4 col-xs-12 pl-3">
                                <div className="feature-list d-flex justify-content-start align-items-center">
                                    <img src={img_book} alt="" width='50px' height='50px' />
                                    <p>A New Booking Experience</p>
                                </div>
                                <div className="feature-para">
                                    <p>Our improved search functionality makes planning and customizing your trip quicker and easier. On Xeniapp, you can search and build your trip itinerary on a single page. This way you can add flights, hotel or/and car rentals by simply dragging and dropping them into your itinerary. </p>
                                </div>
                            </div>
                            <div className="col-lg-4 col-sm-4 col-xs-12 pl-3">
                                <div className="feature-list d-flex justify-content-start align-items-center">
                                    <img src={xenicoin} alt="" height='50px' />
                                    <p>Blockchain Settlement Engine</p>
                                </div>
                                <div className="feature-para">
                                    <p>We have built a blockchain transaction settlement engine that  allows for rapid settlement and tracking of transactions. This technology  will be the foundation of new functionalities such as commission tracking, efficient cancellation and  points accumulation and redemptions.</p>
                                </div>
                            </div>
                            <div className="col-lg-4 col-sm-4 col-xs-12 pl-3">
                                <div className="feature-list d-flex justify-content-start align-items-center">
                                    <img src={walking} alt="" width='50px' height='50px' />
                                    <p>Xeniwalk/Walking Tours</p>
                                </div>
                                <div className="feature-para">
                                    <p>When exploring a new city or discovering new parts of your own city, walking tours are a fun and unique way to explore. Xeniwalk aims to provide a comprehensive list of walking tours that are easily searchable by neighborhood and topic. Our platform for walking tours is designed to allow tourists and locals to find and book walking tours and to allow tour guides to list tours for booking. </p>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-lg-4 col-sm-4 col-xs-12 pl-3">
                                <div className="feature-list d-flex justify-content-start align-items-center">
                                    <img src={gift} alt="" width='50px' height='50px' />
                                    <p>Xenivoyage</p>
                                </div>
                                <div className="feature-para">
                                    <p>If you don’t want to build your own itinerary, we have worked with travel agents to put together special travel packages. So you can skip the planning process, and just enjoy the trip. These packages offer you great deals to enjoy unique experiences in destinations around the world.</p>
                                </div>
                            </div>
                            <div className="col-lg-4 col-sm-4 col-xs-12 pl-3">
                                <div className="feature-list d-flex justify-content-start align-items-center">
                                    <img src={wish} alt="" width='50px' height='50px' />
                                    <p>Wishlist (Name your Price)</p>
                                </div>
                                <div className="feature-para">
                                    <p>With our Name Your Price tool, you will be able to build the itinerary of your dreams, save it for later and then name your desired price for each item. Xeniapp will then search for travel packages matching the one in your wishlist and alert you when they become available. </p>
                                </div>
                            </div>
                            <div className="col-lg-4 col-sm-4 col-xs-12 pl-3">
                                <div className="feature-list d-flex justify-content-start align-items-center">
                                    <img src={multi} alt="" width='50px' height='50px' />
                                    <p>Express Group Bookings</p>
                                </div>
                                <div className="feature-para">
                                    <p>Need to make multiple group bookings for different sets of travellers? Xeniapp allows users to do this is in one checkout cycle, and it’s simple. You no longer have to checkout for each itinerary. Book faster for multiple groups with Xeniapp. </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="change-way mt-5">
                    <div class="container-fluid">
                        <div class="row d-flex justify-content-center">
                            <img src={change} alt="" />
                        </div>
                    </div>
                </div>
                <footer class="copy-right">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-12">
                                <p>Copyright© 2019 Xeniapp Inc. All Rights Reserved.</p>
                            </div>
                        </div>
                    </div>
                </footer>

            </div>
        )

    }
}

export default Landing;