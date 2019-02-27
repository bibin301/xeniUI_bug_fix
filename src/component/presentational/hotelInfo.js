import React from 'react';
import UserRating from './UserRating';
import ImageCarousel from "./ImageCarousel";
import { map as _map, find as _find } from "lodash";

import noImage from '../../asset/images/test_image.jpg';
import img_whereIcon from "../../asset/images/Where Icon (Map Marker).svg";
import img_bussiness from "../../asset/images/bussiness.png";
import img_bar from "../../asset/images/glass.png";
import img_laundry from "../../asset/images/laundry.png";
import img_swmmingPool from "../../asset/images/swimming-silhouette.png";
import img_television from "../../asset/images/television.png";
import img_unknown from "../../asset/images/arrow.png";
import img_parking from "../../asset/images/selectRoom/parking-sign(1).png";
import img_hotcoffee from "../../asset/images/selectRoom/hot-coffee.png";

const HotelInfo = ({ hotel, isPolicy, rmvHtmlFunc,
    isMain, isAmenities, isContact, isDesc, isNear }) => {

    const locationRef = `https://maps.google.com/?q=${hotel.geocode.lat},${hotel.geocode.long}`
    const detailedAddress = hotel.contact.address.line1 + ", " + hotel.contact.address.line2 + ", " + hotel.contact.address.city.name + ", " + hotel.contact.address.countryCode + ", " + hotel.contact.address.postalCode;
    const descriptionsData = _find(hotel.descriptions, ['type', 'General']);
    let description = descriptionsData
        ? descriptionsData['value']
        : "Description not available";
    return (<div className="selectRoomBg d-flex flex-wrap  selectNewRooMdetail">
        <div className="d-flex flex-row res-column">
            <React.Fragment>
                <div className="flex-column">
                    {hotel.images.length
                        ? <ImageCarousel
                            hotelName={hotel.name}
                            imageList={_map(hotel.images, (each, i) => ({
                                name: 'img' + { i },
                                url: each.URL
                            }))} />
                        : <ImageCarousel />}
                </div>
                <div className="detailsBg flex-column selectNewInfo">
                    <UserRating rating={hotel && hotel.rating} />
                    <h4>{hotel && hotel.name}</h4>
                    <p>
                        <img src={img_whereIcon} alt="location" />
                        <a href={locationRef} title={detailedAddress} target='_blank' rel="noreferrer">
                            {detailedAddress && detailedAddress.substring(0, 60) + '...'}
                        </a>
                    </p>
                    <div className="priceDiv">
                    </div>
                    <div className="mapInfoShow">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d172771.04389694938!2d-122.59110161474152!3d47.420765472217596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54904f7dd2ecdd31%3A0x1fb834a2a78665ec!2sVashon%2C+WA+98070%2C+USA!5e0!3m2!1sen!2sin!4v1548763725521" style={{ width: "100%", height: '160px', border: '0px' }}></iframe>
                    </div>
                </div> </React.Fragment>
        </div>
        <div className="d-flex flex-row res-column borderTop">
            {isDesc && <React.Fragment>
                <div className="flex-column"><h6>General </h6>
                    <p>
                        {description ? rmvHtmlFunc(description) : 'No Description Available'}</p>
                    {_map(hotel.descriptions, (each, i) => {
                        return (
                            each.type != 'General' &&
                            // <div className="flex-column">
                            <React.Fragment>
                                <h6 >{each.type}</h6>
                                <p>{rmvHtmlFunc(each.value)}</p>
                                {/* // </div> */}
                            </React.Fragment>
                        )
                    })}
                </div>

            </React.Fragment>}
            {isAmenities && <React.Fragment>
                <div className="d-flex flex-row resWrap">
                    <div className="flex-column">
                        <ul>
                            {hotel.amenities.map((item, i) => {
                                return (
                                    i % 2 === 0 && i < 10 ?
                                        <li key={i}>
                                            <img
                                                src={
                                                    item.category
                                                        ? _find(_amenties, ["category", item.category])[
                                                        "icon"
                                                        ]
                                                        : img_unknown
                                                }
                                                alt=""
                                                height='15px'
                                                width='15px'
                                            />
                                            &nbsp;{item.name}
                                        </li> : null
                                );
                            })}
                        </ul>
                    </div>
                    <div className="flex-column">
                        <ul>
                            {hotel.amenities.map((item, i) => {
                                return (
                                    i % 2 !== 0 && i < 11 ?
                                        <li key={i}>
                                            <img
                                                src={
                                                    item.category
                                                        ? _find(_amenties, ["category", item.category])[
                                                        "icon"
                                                        ]
                                                        : img_unknown
                                                }
                                                alt=""
                                                height='15px'
                                                width='15px'
                                            />
                                            &nbsp;{item.name}
                                        </li> : null
                                );
                            })}
                        </ul>
                    </div>
                </div> </React.Fragment>}
            {isContact && <React.Fragment>
                {hotel.contact.address.line1},&nbsp;
                {hotel.contact.address.line2},&nbsp;
                {hotel.contact.address.city.name}-{hotel.contact.address.postalCode}
            </React.Fragment>}
            {isNear && <React.Fragment>
                <div className="d-flex flex-row resWrap">
                    <div className="flex-column">
                        <ul className="nearUsContent">
                            {hotel.areaAttractions.map((item, i) => {
                                return (
                                    i % 2 === 0 && i < 10 ?
                                        <li key={i}>
                                            <img
                                                src={
                                                    item.category
                                                        ? _find(_amenties, ["category", item.category])[
                                                        "icon"
                                                        ]
                                                        : img_unknown
                                                }
                                                alt=""
                                                height='15px'
                                                width='15px'
                                            />
                                            &nbsp; {item.desc}
                                        </li> : null
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </React.Fragment>}
            {isPolicy && <React.Fragment>
                <div className="flex-column">
                    {hotel.policies.length
                        ? hotel.policies.map((each, index) =>
                            <React.Fragment>
                                <h6>{each.type} </h6>
                                <p>{rmvHtmlFunc(each.text)} </p> </React.Fragment>)
                        : <p> No details found</p>}
                </div>
            </React.Fragment>}
        </div>
    </div>);
}
const _amenties = [
    {
        category: "Breakfast",
        icon: img_unknown
    },
    {
        category: "Business Center",
        icon: img_unknown
    },
    {
        category: "Laundry Services",
        icon: img_unknown
    },
    {
        category: "Bar",
        icon: img_unknown
    },
    {
        category: "Swimming Pool",
        icon: img_unknown
    },
    {
        category: "Parking",
        icon: img_unknown
    },
    {
        category: "Television",
        icon: img_unknown
    },
    {
        category: "Currency Exchange",
        icon: img_unknown
    },
    {
        category: "Airport Shuttle",
        icon: img_unknown
    },
    {
        category: "Internet",
        icon: img_unknown
    },
    {
        category: "Non Smoking",
        icon: img_unknown
    },
    {
        category: "Restaurant",
        icon: img_unknown
    },
    {
        category: "Fitness Facility",
        icon: img_unknown
    },
    {
        category: "Pets Allowed",
        icon: img_unknown
    },
    {
        category: "Childcare Service",
        icon: img_unknown
    },
    {
        category: "Spa",
        icon: img_unknown
    }
];
export default HotelInfo;