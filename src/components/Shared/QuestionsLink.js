import React from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';
import { actions } from '../../redux/modules/modalForm';
import { HELP_FORM_CONFIG } from '../../constants';

export const QuestionsLink = ({ handleOpenForm }) =>
  <section>
    <div className="row">
      <div className="text-center col-sm-12">
        <h5>
          <a
            className="issue-link"
            onClick={handleOpenForm}
            role="button"
            tabIndex={0}
          >
            Do you have questions? Ask for help here.
          </a>
        </h5>
      </div>
    </div>
  </section>;

const enhance = compose(
  connect(null, { openForm: actions.openForm }),
  withHandlers({
    handleOpenForm: props => () => props.openForm(HELP_FORM_CONFIG),
  }),
);

export const QuestionsLinkContainer = enhance(QuestionsLink);
