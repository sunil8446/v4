import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { IconLoader } from '@components/icons';

const StyledLoader = styled.div`
  ${({ theme }) => theme.mixins.flexCenter};
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: var(--dark-navy);
  z-index: 99;

  .logo-wrapper {
    width: max-content;
    max-width: 100px;
    transition: var(--transition);
    opacity: ${props => (props.isMounted ? 1 : 0)};

    svg {
      display: block;
      width: 100%;
      height: 100%;
      margin: 0 auto;
      fill: none;
      user-select: none;

      #S {
        opacity: 0;
      }
    }
  }
`;

const Loader = ({ finishLoading }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    let timeout;
    let loader;

    const runAnimation = async () => {
      if (typeof window === 'undefined') {return;}

      const animeModule = await import('animejs');
      const anime = animeModule.default;

      timeout = setTimeout(() => setIsMounted(true), 10);

      loader = anime.timeline({
        complete: () => finishLoading(),
      });

      loader
        .add({
          targets: '#logo path, #logo polygon',
          delay: 300,
          duration: 1500,
          easing: 'easeInOutQuart',
          strokeDashoffset: [anime.setDashoffset, 0],
        })
        .add({
          targets: '#logo #S',
          duration: 700,
          easing: 'easeInOutQuart',
          opacity: 1,
        })
        .add({
          targets: '#logo',
          delay: 500,
          duration: 300,
          easing: 'easeInOutQuart',
          opacity: 0,
          scale: 0.1,
        })
        .add({
          targets: '.loader',
          duration: 200,
          easing: 'easeInOutQuart',
          opacity: 0,
          zIndex: -1,
        });
    };

    runAnimation();

    return () => {
      if (timeout) {clearTimeout(timeout);}
      if (loader) {loader.pause();}
    };
  }, [finishLoading]);

  return (
    <StyledLoader className="loader" isMounted={isMounted}>
      <Helmet bodyAttributes={{ class: 'hidden' }} />
      <div className="logo-wrapper">
        <IconLoader />
      </div>
    </StyledLoader>
  );
};

Loader.propTypes = {
  finishLoading: PropTypes.func.isRequired,
};

export default Loader;
