import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from '@components';

const TagsPage = ({ location }) => (
  <Layout location={location}>
    <main style={{ padding: '150px 50px' }}>
      <h1>Tags</h1>
      <p>This page is being updated.</p>
    </main>
  </Layout>
);

TagsPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default TagsPage;
