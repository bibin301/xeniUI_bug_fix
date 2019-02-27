import React, { Component } from "react";
import DBWishListCarContent from "./DBWishListCarContent";
import DBWishListHotelContent from "./DBWishListHotelContent";
import DBWishListFlightContent from "./DBWishListFlightContent";

const TYPE_OF_VIEW = {
  FLIGHT: "FLIGHT",
  HOTEL: "HOTEL",
  CAR: "CAR",
  ACTIVITIES: "ACTIVITIES",
  PRIVATE: "PRIVATE"
};
class DBWishList extends Component {
  state = {
    typeofView: TYPE_OF_VIEW["FLIGHT"]
  };
  handleCar = value => {
    this.setState({
      typeOfView: TYPE_OF_VIEW[value]
    });
  };
  render() {
    const { typeOfView } = this.state;
    return (
      <div className="dashRightSide align-self-start">
        <div className="d-flex flex-row">
          <div className="flex-column wishListLeft">
            <span>Trip Id :</span>
          </div>
          <div className=" d-flex justify-content-between wishListRight">
            <ul className="tripIdItems">
              <li className="activeItem">24S9</li>
              <li>11X4</li>
              <li>5W84</li>
            </ul>
            <span>
              <img src="images/dashboard/resize.png" />
            </span>
          </div>
        </div>
        <div className="d-flex flex-row mt-3">
          <div className="flex-column wishListLeft">
            <ul className="wishListTabItems">
              <li
                className={
                  typeOfView === "FLIGHT" || typeOfView === undefined
                    ? "activeTabItem"
                    : ""
                }
                onClick={() => this.handleCar("FLIGHT")}
              >
                Flights
              </li>
              <li
                className={typeOfView === "HOTEL" ? "activeTabItem" : ""}
                onClick={() => this.handleCar("HOTEL")}
              >
                Hotels
              </li>
              <li
                className={typeOfView === "CAR" ? "activeTabItem" : ""}
                onClick={() => this.handleCar("CAR")}
              >
                Cars
              </li>
              <li
                className={typeOfView === "ACTIVITIES" ? "activeTabItem" : ""}
                onClick={() => this.handleCar("ACTIVITIES")}
              >
                Activities
              </li>
              <li
                className={typeOfView === "PRIVATE" ? "activeTabItem" : ""}
                onClick={() => this.handleCar("PRIVATE")}
              >
                Private Jet
              </li>
            </ul>
          </div>
          {typeOfView === "CAR" ? <DBWishListCarContent /> : ""}
          {typeOfView === "HOTEL" ? <DBWishListHotelContent /> : ""}
          {typeOfView === "FLIGHT" || typeOfView === undefined ? (
            <DBWishListFlightContent />
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

export default DBWishList;
