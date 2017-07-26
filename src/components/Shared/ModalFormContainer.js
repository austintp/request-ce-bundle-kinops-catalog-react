import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';
import { ModalForm } from './ModalForm';
import { actions as modalFormActions } from '../../redux/modules/modalForm';

const mapStateToProps = state => ({
  form: state.modalForm.form,
  completed: state.modalForm.completed,
});

const mapDispatchToProps = {
  completeForm: modalFormActions.completeForm,
  dismissForm: modalFormActions.dismissForm,
};

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    handleCompleted: props => (submission, actions) => {
      actions.stop();
      props.completeForm();
    },
    handleDismissed: props => event => {
      if (event) event.stopPropagation();
      props.dismissForm();
    },
  }),
);

export const ModalFormContainer = enhance(ModalForm);
