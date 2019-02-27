import React, { Component } from 'react';
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import InputField from '../../../component/Fields/TextField'
import propTypes from 'prop-types';
class ResetPassword extends Component {
    static proptypes = {
        resetPassword: propTypes.func
    }
    handleFormInitialValues = () => {
        this.props.initialize({
            current_password: "",
            new_password: "",
            confirm_password: ""
        })
    }
    render() {
        const { handleSubmit } = this.props;
        return (
            <div>
                <h5>Change Password</h5>
                <form onSubmit={handleSubmit(this.props.resetPassword)}>
                    <div className="row">
                        <div className="col-sm-12 col-md-4 col-lg-4">
                            <div className="form-group passwordIcon">
                                <Field
                                    name="current_password"
                                    type="password"
                                    label="Current Password"
                                    component={InputField}
                                    placeholder="Current Password"
                                    className="form-control"
                                />
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-4 col-lg-4">
                            <div className="form-group passwordIcon">
                                <Field
                                    name="new_password"
                                    type="password"
                                    label="New Password"
                                    component={InputField}
                                    placeholder="New Password"
                                    className="form-control"
                                />
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-4 col-lg-4">
                            <div className="form-group passwordIcon">
                                <Field
                                    name="confirm_password"
                                    type="password"
                                    label="New Password Again"
                                    component={InputField}
                                    placeholder="New Password Again"
                                    className="form-control"
                                />
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-12 col-lg-12">
                            <button className="searchBtn float-right mb-3">Change Password</button>
                        </div>
                    </div>
                </form>
            </div>

        )
    }


}
const validatePassword = formValues => {
    const errors = {};
    if (!formValues.current_password) {
        errors.current_password = "Please Enter Current Password"
    } 
    // else if (
    //     !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/.test(
    //         formValues.current_password
    //     )
    // ) {
    //     errors.current_password = "Must have one uppercase lowercase and Number";
    // }

   if(!formValues.new_password){
    errors.new_password = "Please Enter New Password";
   }
   if(!formValues.confirm_password){
    errors.confirm_password = "Please Enter New Password";
   }
    return errors;
}
export default reduxForm({
    form: "resetForm",
    validate: validatePassword,
})(ResetPassword)