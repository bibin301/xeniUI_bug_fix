import React, { Component } from "react";
import HotelContent from "../hotel/HotelContent";

class SearchResult extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="sectionCard">
               <HotelContent/>
        </div>
      </React.Fragment>
    );
  }
}

export default SearchResult;
