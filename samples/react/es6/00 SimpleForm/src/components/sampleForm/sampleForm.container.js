import { connect } from 'react-redux';
import { SampleForm } from './sampleForm';
import { customerUIInputStart } from '../../actions/customerUIInputStart';
import { customerSaveStart } from '../../actions/customerSaveStart';

const mapStateToProps = (state) => {
  return {
    customer: state.customer.customer,
    errors: state.customer.customerErrors
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fireValidationFieldValueChanged: (viewModel, fieldName, value) => {
      return dispatch(customerUIInputStart(viewModel, fieldName, value));
    },
    saveCustomer: (customer) => {
      return dispatch(customerSaveStart(customer));
    }
  }
};

export const ContainerSampleForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(SampleForm);
