import { connect } from 'react-redux';
import { RequestShow } from './RequestShow';

export const mapStateToProps = () => ({});

export const mapDispatchToProps = {};

export const RequestShowContainer =
  connect(mapStateToProps, mapDispatchToProps)(RequestShow);
