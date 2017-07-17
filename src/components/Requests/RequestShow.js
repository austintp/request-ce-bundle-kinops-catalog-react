import React from 'react';

export const RequestShow = ({ match }) =>
  <div>
    {match.params.submissionId} ({match.params.mode})
  </div>;
