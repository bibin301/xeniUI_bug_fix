import React from 'react';
import { connect } from 'react-redux';
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

import TopNav from '../component/container/TopNav'
import MainContainer from '../component/container/mainPage/MainContainer'
import ContentContainer from '../component/container/mainPage/ContentContainer'
import Itinerary from '../component/container/Itinerary';
import SearchTool from '../component/container/searchTool/SearchTool';
import SearchBanner from '../component/container/searchTool/SearchBanner';
import SearchResult from '../component/container/mainPage/SearchResult';
import CarSearchBanner from  '../component/container/car/CarSearchBanner';
import CarSearchContent from  '../component/container/car/CarSearchContent'
import SignIn from "../component/container/login/SignInModal";
import Loading from '../component/Loading';
import { init } from '../service/common/action'; 

class Dashboard extends React.Component {
 
constructor(props){
  super(props)
  this.state={
    isVisibleSignIn: false,
    isdivHide:false
   
  }
}

componentDidMount() {
  this.props.init();
}
handleSignIn =() =>{
  this.setState({isVisibleSignIn:true})
  this.setState({isdivHide:true})
}

onClose =() => {
  this.setState({isVisibleSignIn:false})
}
render() {
  console.log("location" ,this.props.location.search)
  const { isVisibleSignIn ,isdivHide} = this.state;
  const { isSearching, hotelCount } = this.props;
  const renderSignInModal =isVisibleSignIn && <SignIn onHide={this.onClose} isdivHide={isdivHide}/>
  const carCount = 0;
  return (
    <div>
      {renderSignInModal}

        <TopNav onSignIn={this.handleSignIn} />
      <MainContainer>
        {<Loading />}
        <ContentContainer>
          <SearchTool path={this.props.match.path} />

          {this.props.location.pathname == "/hotel/search" &&
            hotelCount != 0 && <SearchBanner />}
          {this.props.location.search && hotelCount != 0 && <SearchResult />}

          {/* TODO car */}

          {/* {this.props.location.pathname === "/car/search" &&
             <CarSearchBanner />}

          {this.props.location.search ==="" && carCount == 0  && <CarSearchContent />} */}

        </ContentContainer>
        <Itinerary />
      </MainContainer>
    </div>
  );
  }
}
const mapStateToProps = state => ({
  hotelList: state.hotelReducer.hotelList,
  hotelCount: state.hotelReducer.hotelCount
})

const mapDispatchToProps = dispatch => ({
  init: () => dispatch(init())
})

export default connect(mapStateToProps, mapDispatchToProps)(DragDropContext(HTML5Backend)(Dashboard))