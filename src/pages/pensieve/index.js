import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from '@components';

const PensievePage = ({ location }) => (
  <Layout location={location}>
    <main style={{ padding: '150px 50px' }}>
      <h1>Pensieve</h1>
      <p>This page is being updated.</p>
    </main>
  </Layout>
);

PensievePage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default PensievePage;
