import { connect } from 'react-redux';
import { Form } from './Form';

export const mapStateToProps = () =>
  ({});

export const FormContainer = connect(mapStateToProps)(Form);
