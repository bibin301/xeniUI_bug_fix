import React, { Component } from 'react';
import DBAddCard from './DBAddCard'
import { connect } from "react-redux";
import { getCard, deleteCard } from "../../../service/card/action";
import { cardReducer } from "../../../service/card/reducer";

class DBPaymentMethod extends Component {
  state = {
    modal: false
  };
  handleModal = () => {
    this.setState({ modal: !this.state.modal });
  }
  componentWillMount = () => {
    const { email } = this.props.loginDetails;
    console.log("eamiil",email)
    this.props.getCard(email);
  };
  handleDelete = (card) => {
    console.log("card ",card)
    const { email } = this.props.loginDetails;
    const payload = {
      "email": email,
      "card_id": card
    }
    this.props.deleteCard(payload)
    this.props.getCard(email);
  }
  render() {
    const { getCardDetails } = this.props;
    const { modal } = this.state;
    console.log("get card Details",getCardDetails)
    return (
      <React.Fragment>
        <div className="dashRightSide align-self-start">
          <div className="d-flex flex-wrap">
            {getCardDetails &&
              getCardDetails.map((each, index) => (
                <div className="cardDetails flex-column" key={index}>
                  <div className="cardEditOpt">
                    <span className="editIcon">
                      <i
                        className="fas fa-pencil-alt"
                      />
                    </span>
                    <span className="closeIcon">
                      <i className="fas fa-times" onClick={this.handleDelete.bind(this, each.id)} />
                    </span>
                  </div>
                  {/* <h6>**** **** **** 9849</h6> */}
                  <h6>**** **** ****{each.last4}</h6>

                  <div className="cardValidInfo">
                    <span>VALID THRU</span>{" "}
                    <span>
                      {each.exp_month}/{each.exp_year}
                    </span>
                  </div>
                  <div className="cardBaseDet d-flex justify-content-between">
                    <span className="holderName">{each.name}</span>
                    <span className="visaCard" />
                  </div>
                </div>
              ))}
            <div
              className="cardDetails d-flex flex-column justify-content-center "
              onClick={this.handleModal}
            >
              <a
                className="addNewCard"
                data-target="#myAddCard"
                data-toggle="modal"
              >
                <span>
                  <i className="fas fa-plus" />
                </span>{" "}
                Add New Card
              </a>
            </div>
          </div>
          {modal &&
            <DBAddCard
              model={this.state.modal}
              handleModal={this.handleModal}
              getCardDetails={getCardDetails}
            />}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  loginDetails: state.loginReducer.loginDetails,
  getCardDetails: state.cardReducer.getCardDetails
});
const mapDispatchToProps = dispatch => ({
  getCard: email => dispatch(getCard(email)),
  deleteCard: value => dispatch(deleteCard(value))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DBPaymentMethod)
