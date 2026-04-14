import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from '../components';

const ArchivePage = ({ location }) => (
  <Layout location={location}>
    <main style={{ padding: '150px 50px' }}>
      <h1>Archive</h1>
      <p>This page is being updated.</p>
    </main>
  </Layout>
);

ArchivePage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default ArchivePage;
