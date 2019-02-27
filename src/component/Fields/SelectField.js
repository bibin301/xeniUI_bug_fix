import React, {Component} from 'react'
import propTypes from "prop-types";
import { map as _map } from 'lodash';

class SelectField extends Component{

    render(){
        const { meta: { touched, error },label, input, options, ...remainingProps } = this.props;
        return(
            <React.Fragment>
                   <label>
                     {label}
                </label>
                <select {...input} {...remainingProps}>
                </select>
                {touched && error && <span>{error}</span>}
            </React.Fragment>
        )
    }
}

// SelectField.propTypes = {
//   option: propTypes.string.any.isRequired,
//   input: propTypes.string.isRequired
// };
export default SelectField;
