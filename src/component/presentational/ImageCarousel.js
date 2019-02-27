import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { map as _map } from 'lodash';

import img_unAvaliable from "../../asset/images/No_Image.jpg";
import img_hotel from '../../asset/images/dashboard/hotelPic.jpg';

class ImageCarousel extends Component {

  static propTypes = {
    imageList: PropTypes.arrayOf(PropTypes.any),
  };

  static defaultProps = {
    imageList: [
      { "name": 'Not Available', url: img_unAvaliable }
    ]
  }

  state = {
    currentStage: 0,
    totalStage: this.props.imageList.length,
    isPopUp: false,
    currentImage: 0,
    left:0

  }

  next = (event) => {
    event.preventDefault();
    if (this.state.currentStage < this.state.totalStage)
      this.setState({
        currentStage: this.state.currentStage + 1
      });
  }

  previous = (event) => {
    event.preventDefault();
    if (this.state.currentStage > 1)
      this.setState({
        currentStage: this.state.currentStage - 1,
      });
  }

  previousImage = (event) => {
    if (this.state.currentImage < this.state.totalStage && this.state.currentImage >= 1){
this.setState({
  currentImage: this.state.currentImage - 1
});
    }
           
      if (this.state.currentImage > 4) {
        this.setState({
          left: this.state.left - 150
        });
      }else{
        this.setState({
          left:0
        });
      }
  }
  nextImage = (event) => {
    event.preventDefault();
    if (this.state.currentImage < this.state.totalStage - 1){
      this.setState({
       currentImage: this.state.currentImage + 1
      });
      if (this.state.currentImage > 4) {
        this.setState({
          left: this.state.left + 150
        });
      }else{
        this.setState({
          left:0
        });
      }
    }
     

      
  }

  changeImg = (index) => {
    this.setState({ currentImage: index })
    if(index>5)
    {
      this.setState({
        left: this.state.left + 150
      });
    }
  }

  render() {
    const { imageList, hotelName } = this.props;
    const { currentStage, totalStage, isPopUp, currentImage } = this.state;
const style = { 
  left:'-'+this.state.left+'px'
};
console.log(style,"tukmdsflkjdsa");
    return (
      <div className="owl-carousel owl-theme">
        <div className="item">
          <div onClick={() => this.setState({ isPopUp: !this.state.isPopUp })}>
            {/* <div> */}
            <img src={imageList[currentStage].url} alt={imageList[currentStage].name} />
          </div>
          {totalStage > 1 && <React.Fragment>
            {<span className="leftArrow" onClick={this.previous} disabled=""><i className="fas fa-chevron-left"></i></span>}
            {<span className="rightArrow" onClick={this.next} disabled=""><i className="fas fa-chevron-right"></i></span>}
          </React.Fragment>}
        </div>
        {isPopUp && <div class={isPopUp ? 'modal backgroundDark d-block' : 'modal'} tabindex="-1" role="dialog">
          <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
              <div class="modal-header imageCaroselHeader">
                <h5 class="modal-title">{hotelName}</h5>
                <button type="button" class="close popBtnClose" onClick={() => this.setState({ isPopUp: !this.state.isPopUp })} data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div className="popCaroselImage">
                  <img src={imageList[currentImage].url} alt={imageList[currentImage].name} alt="images" />
                  <span className="leftArrow" onClick={this.previousImage}><i className="fas fa-chevron-left"></i></span>
                  <span className="rightArrow" onClick={this.nextImage}><i className="fas fa-chevron-right"></i></span>
                </div>
                <div className="popCaroselImageList">
                  <span> {currentImage + 1} / {totalStage} </span>
                  <div className="popCaroselVal" style={style}>
                    <ul>
                      {_map(imageList, (image, index) => {
                        return (<li key={index} onClick={() => this.changeImg(index)} className={currentImage == index ? 'active' : ''}><a > <img src={image.url} alt="thumnail Images" /></a></li>)
                      }, this)}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>}
      </div>
    );
  }
}

export default ImageCarousel;

