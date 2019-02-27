import React from 'react';

const AlertHotelCard = (props) => {
  const { alertInfo } = props;
  return(
    <div className="sectionCard marginTop0">
      <span className="noHotels"><i className="fas fa-hotel"></i></span>
      <h2 className="noHotelText">{alertInfo}</h2>
    </div>
  )
}

export default AlertHotelCard;