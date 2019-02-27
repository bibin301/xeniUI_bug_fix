import React, { Component } from "react";
import xeniwalk from "../asset/images/aboutUs/xeniWalkLogo.png";
import xeniapp from "../asset/images/aboutUs/xenniesLogo.png";
import xenivoya from "../asset/images/aboutUs/xenivoyageLogo1.png";

class Footer extends Component {

 render(){
     return(  
 <React.Fragment>
     <div className="exploreSection mt-5">
     {/* <section class="footer-landing"> */}
        <div className="container">
                        <div className="">
              <div className="product-title"><h1  >Explore our Products</h1></div><div className="explore-product-div"><ul><li className="wow fadeInLeft animated" data-wow-duration="0.5s" ><a href="https://xenivoyage.com" target="_blank"><img src={xenivoya} alt="product-logo"/></a></li><li className="wow fadeInLeft animated" data-wow-duration="1s" ><a href="https://xennies.io/home" target="_blank"><img src={xeniapp} alt="product-logo"/></a></li><li className="wow fadeInLeft animated" data-wow-duration="1.5s" ><a href="https://xeniwalk.com" target="_blank"><img src={xeniwalk} alt="product-logo"/></a></li></ul></div>
            </div>
            
        </div>
{/* </section> */}
    </div>
    <div className="footerBg">
        <div className="container">
        <div className="row borderDashed">
        <div className="col-md-4 col-sm-6 col-12">
            <div className="footer-about">
               <h1>About Xeniapp</h1>
                <p>Xeniapp is a <b>travel booking portal </b> that allows you to browse and build your trip itinerary on a single page. You can add flights, hotels or/and car rentals by simply dragging and dropping them into your itinerary.</p>
                <p>Our <b>blockchain transaction settlement engine</b> allows for rapid settlement and tracking of transactions and With our <b>Name Your Price tool</b>, you will be able to build the itinerary of your dreams, save it for later and then name your desired price for each item.</p>
            </div>
        </div>
        <div className="col-md-3 col-sm-6 col-12">
            <div className="keepconnect ml-5">
                <h1>Keep Connected</h1>
                <ul>
                    <li>
                        <a href="https://xenivoyage.com/contact" target="_blank">Contact</a>
                    </li>
                    <li>
                        <a href="https://xenivoyage.com/faq" target="_blank">FAQ</a>
                    </li>
                    <li>
                        <a href="https://xenivoyage.com/what-to-eat" target="_blank">W2E</a>
                    </li>
                    <li>
                        <a href="https://xenivoyage.com/what-to-wear" target="_blank">W2W</a>
                    </li>
                    <li>
                        <a href="https://xenivoyage.com/feedback" target="_blank">Share Your Story</a>
                    </li>
                    <li>
                        <a href="https://xenivoyage.com/gallery" target="_blank">Gallery</a>
                    </li>
                    <li>
                        <a href="https://xenivoyage.com/news" target="_blank">News</a>
                    </li>
                </ul>
            </div>
        </div>
        <div className="col-md-3 col-sm-6 col-12">
            <div className="keepconnect ml-4">
                <h1>Company</h1>
                <ul>
                    <li>
                        <a href="https://xenivoyage.com/team" target="_blank">Team</a>
                    </li>
                    <li>
                        <a href="https://xenivoyage.com/careers" target="_blank">Careers</a>
                    </li>
                    <li>
                        <a href="https://xenivoyage.com/partner" target="_blank">Partners</a>
                    </li>
                    <li>
                        <a href="https://xenivoyage.com/privacy-policy" target="_blank">Privacy Policy</a>
                    </li>
                    <li>
                        <a href="https://xenivoyage.com/terms-of-use" target="_blank">Terms &amp; Conditions</a>
                    </li>
                </ul>
            </div>
        </div>
        <div className="col-md-2 col-sm-6 col-12 pl-0">
            <div className="keepconnect">
                <h1>Contact</h1>
                <ul className="email">
                    <li>
                        <a href="mailto:info@xeniapp.com">
                            <i className="far fa-envelope"></i>  info@xeniapp.com
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div> 
    <div className="row">
        <div className="col-lg-12 col-sm-12 col-xs-12">
            <div className="social-link">
                <ul>
                    <li>
                        <a href="https://www.facebook.com/Xeniapp" target="_blank">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                    </li>
                    <li>
                        <a href="https://twitter.com/@WeXeniapp" target="_blank">
                            <i className="fab fa-twitter"></i>
                        </a>
                    </li>
                    <li>
                        <a href="https://plus.google.com/u/0/116416930426661839392" target="_blank">
                            <i className="fab fa-google-plus-g"></i>
                        </a>
                    </li>
                    <li>
                        <a href="https://www.instagram.com/xeniapp/" target="_blank">
                            <i className="fab fa-instagram"></i>
                        </a>
                    </li>
                    <li>
                        <a href="https://www.youtube.com/channel/UCPGNo9T8BlGRbAxEZ0NK5Dw" target="_blank">
                            <i className="fab fa-youtube"></i>
                        </a>
                    </li>
                </ul>
            </div>
            <div className="copyright-div">
                <p>Powered by 
                    <a href="https://xeniapp.com/"> Xeniapp Inc</a>
                </p>
            </div>
        </div>
    </div> 
 </div>
</div>
   </React.Fragment>
)}}
 
export default Footer;
