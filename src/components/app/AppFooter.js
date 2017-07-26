import React from 'react';

export const AppFooter = () =>
  <footer className="footer" id="shared-bundle-footer">
    <div className="container">
      <div className="row">
        <div className="col-sm-6 col-xs-12">
          <div className="brand-subtle">kinops:</div>
          <ul className="unstyled">
            <li><a className="footer-link" target="kinops" href="https://kinops.io">Home</a></li>
            <li><a className="footer-link" target="kinops" href="https://kinops.io/kinops/privacy">Privacy</a></li>
            <li><a className="footer-link" target="kinops" href="https://kinops.io/kinops/terms">Terms</a></li>
          </ul>
        </div>
        <div className="col-sm-6 col-xs-12 copyright">
          <p className="copyright">
            ©2017 Kinetic Data. All Rights Reserved.<br />Version:  / teams / f07b01a
          </p>
        </div>
      </div>
    </div>
  </footer>;
