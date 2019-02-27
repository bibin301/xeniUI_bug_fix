import React from "react";
import PropTypes from "prop-types";
import GoogleMapLoader from "react-google-maps-loader";
import GooglePlacesSuggest from "react-google-places-suggest";
import queryString from 'query-string'

const MY_API_KEY = "AIzaSyDZng2yRc6-MiBWPr71vQwQLrKvvqE789I";
// const values = queryString.parse(window.location.search);

class LocationSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      value: "",
      rectangle: null
    };
  }

  componentWillMount=()=>{
    if(window.location.search)
    {
    const values = queryString.parse(window.location.search);
    this.setState({ value: values.searchText})
    console.log("values=========>",values)
    }
  }
  handleInputChange = e => {
    console.log("e.taarget",e.target.value)
    this.setState({ search: e.target.value, value: e.target.value })
      // () => {
      //  this.props.onSearch({ searchString: '' }) });
  };

  handleSelectSuggest = (geocodedPrediction, originalPrediction) => {
    const { ea, la } = geocodedPrediction.geometry.viewport;
    // const rectangle = {
    //   topLeft: {
    //     lat: la.l,
    //     long: ea.l
    //   },
    //   bottomRight: {
    //     lat: la.j,
    //     long: ea.j
    //   }
    // };
    this.setState(
      {
        search: "",
        value: geocodedPrediction.formatted_address,
        // rectangle: rectangle
      },
      () => {
        const { onSearch } = this.props;
        const { rectangle, value } = this.state;
        const searchPayload = {
          bounds: { rectangle },
          searchString: value
        };
        onSearch(searchPayload);
      }
    );
  };

  render() {
    const { search, value } = this.state;
     console.log("search,value",value)
    return (
      <GoogleMapLoader
        params={{
          key: MY_API_KEY,
          libraries: "places,geocode"
        }}
        render={googleMaps => {
          return (
            googleMaps && (
              <GooglePlacesSuggest
                className="locationDropDown"
                googleMaps={googleMaps}
                autocompletionRequest={{
                  input: search
                  // Optional options
                  // https://developers.google.com/maps/documentation/javascript/reference?hl=fr#AutocompletionRequest
                }}
                // Optional props
                onSelectSuggest={(pre, org) =>
                  this.handleSelectSuggest(pre, org)
                }
                textNoResults="My custom no results text" // null or "" if you want to disable the no results item
                customRender={prediction => (
                  <div className="customWrapper">
                    {prediction
                      ? prediction.description
                      : "please try nearby location"}
                  </div>
                )}
              >
             
              <input 
                type="text"
                value={value}
                /* onBlur={this.handleSearch} */
                placeholder="Where ?"
                onChange={this.handleInputChange} 
                />
              </GooglePlacesSuggest>
            )
          );
        }}
      />
    );
  }
}

LocationSearch.propTypes = {
  onSearch: PropTypes.func.isRequired
};

export default LocationSearch;