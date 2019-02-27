import React,{Component} from 'react';
import CarCard from './CarCard';
import CarResultFilter from './CarResultFilter';


class CarSearchResult extends Component{
    render(){
        return(

            <div className="d-flex flex-row tab-column justify-content-start">
            <CarResultFilter />
            <div className="filterResult">
            
                {/* <button className="newTabBtn" onClick={() => window.open(window.location, "_blank")}><img src={openNewTab} /> Open in new tab</button> */}
    
                <div className='cardDetailsHowBg' id="content" >
                  <CarCard/>
                </div>
              
            </div>
          </div>
        )
    }
}
export default CarSearchResult;