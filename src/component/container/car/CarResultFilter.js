import React ,{ Component } from 'react';


class CarResultFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isFliterExpand: false,
        
        };
      }
    
    
    render(){
        const { isFliterExpand } = this.state;
        return(
            <div  className={
                      isFliterExpand
                        ? "filterBg flex-column align-self-start showFilterBg"
                        : "filterBg flex-column align-self-start"
                    }>
                <h2>FILTER BY</h2>
            </div>
        //     <div
        //     className={
        //       isFliterExpand
        //         ? "filterBg flex-column align-self-start showFilterBg"
        //         : "filterBg flex-column align-self-start"
        //     }
        //   >
        //     <h2>FILTER BY</h2>
    
        //     <div
        //       className="filterTitle"
        //       onClick={() =>
        //         this.setState({
        //           isFliterExpand: !isFliterExpand
        //         })
        //       }
        //     >
        //       {" "}
        //       <h2>
        //         FILTER BY
        //         <img src={downArrow} className="downArrowImg" />
        //       </h2>
        //     </div>
        //     <div className="respDeskShow">
        //       <div>
        //         <h4>Search By</h4>
        //         <div className="searchInPut">
        //           <input
        //             type="text"
        //             className="searchByName"
        //             placeholder="Hotel Name"
        //             name="searchStr"
        //             value={searchStr}
        //             onChange={this.searchByHotel}
        //           />
        //         </div>
        //       </div>
        //       <div>
        //         <h4>Price Range</h4>
        //         <div className="slideRange">
        //           <InputRange
        //             maxValue={10000}
        //             minValue={0}
        //             formatLabel={value => ``}
        //             onChangeComplete={value => this.getFilterResult(value)}
        //             onChange={value => this.handleChange(value)}
        //             value={this.state.values}
        //           />
        //         </div>
        //         <span className="rangeVauleLeft">${this.state.values.min}</span>
        //         <span className="rangeVauleRight">${this.state.values.max}</span>
        //       </div>
        //       <div>
        //         <h4> Star Rating</h4>
        //         <ul className="priceRange">
        //           {this._filterRatingList.map((each, i) => (
        //             <li
        //               key={i}
        //               className={
        //                 each.value === 2.5
        //                   ? "d-none"
        //                   : each.value === 3.5
        //                     ? "d-none"
        //                     : each.value === 4.5
        //                       ? "d-none"
        //                       : each.value === 1.5
        //                         ? "d-none"
        //                         : each.value === 0
        //                           ? "d-none"
        //                           : each.value === 1
        //                             ? "d-none"
        //                             : ""
        //               }
        //             >
        //               <input
        //                 className="filtercheckbox"
        //                 id={`priceRange_${i}`}
        //                 type="checkbox"
                      
        //                 value={each.value}
                     
        //                 onChange={this.onChangeRating.bind(this)}
        //               />
        //               <label htmlFor={`priceRange_${i}`}>
        //                 <img alt="" src={each.refImg} />
        //                 <p>{each.label} (
                        
        //                   {result[each.value + 0.5]
        //                     ? result[each.value] + result[each.value + 0.5] || result[each.value + 0.5]
        //                     : result[each.value] || 0}
                       
        //                 ) </p>
        //               </label>
        //             </li>
        //           ))}
        //         </ul>
        //       </div>
        //       <div>
        //         <h4>Car Type</h4>
        //         <ul>
        //           {this._defAccomodation.map((each, i) => (
        //             <li key={i}>
        //               <input
        //                 type="checkbox"
        //                 id={`acc_${i}`}
        //                 name={each.value}
        //                 className="filtercheckbox"
        //                 value=""
        //                 disabled
        //               />
        //               <label htmlFor={`acc_${i}`}>{each.label}</label>
        //             </li>
        //           ))}
        //         </ul>
        //       </div>
        //       <div>
        //         <h4>Car Company</h4>
              
        //         <p style={{ fontWeight: normalize, fontSize: "13px", color: '#fff' }} > Comming Soon </p>
    
        //       </div>
        //       <div>
        //         <h4>Engine</h4>
        //         <ul>
        //           {this._defAmenities.map((each, i) => (
        //             <li key={i}>
        //               <input
        //                 type="checkbox"
        //                 id={`ament_${i}`}
        //                 name={each.value}
        //                 className="filtercheckbox"
        //                 value=""
        //                 disabled
        //               />
        //               <label htmlFor={`ament_${i}`}>
        //                 <img alt="" src={each.refImg} />
        //                 {each.label}
        //               </label>
        //             </li>
        //           ))}
        //         </ul>
        //       </div>
        //     </div>
        //   </div>
        )

        
    }
}

export default CarResultFilter;