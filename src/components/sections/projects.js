import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import styled from 'styled-components';
import { Icon } from '@components/icons';

const StyledProjectsSection = styled.section`
  max-width: 1000px;

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
    margin-top: 50px;
  }

  .project-card {
    position: relative;
    cursor: default;
    transition: var(--transition);
    background-color: var(--light-navy);
    border-radius: var(--border-radius);
    padding: 2rem 1.75rem;
    height: 100%;
  }

  .project-inner {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .project-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 35px;
  }

  .project-links {
    display: flex;
    align-items: center;
    margin-right: -10px;
    color: var(--light-slate);

    a {
      display: flex;
      align-items: center;
      padding: 5px 7px;
    }
  }

  h3 {
    margin: 0 0 10px;
    color: var(--lightest-slate);
    font-size: var(--fz-xxl);
  }

  .project-description {
    color: var(--light-slate);
    font-size: 17px;
  }

  .project-tech-list {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    flex-grow: 1;
    padding: 0;
    margin: 20px 0 0;
    list-style: none;

    li {
      font-family: var(--font-mono);
      font-size: var(--fz-xxs);
      line-height: 1.75;
      margin-right: 15px;
      margin-bottom: 5px;
      color: var(--light-slate);
    }
  }
`;

const Projects = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/projects/" } }
        sort: { fields: frontmatter___title, order: ASC }
      ) {
        nodes {
          html
          frontmatter {
            title
            github
            external
            tech
          }
        }
      }
    }
  `);

  const projects = data.allMarkdownRemark.nodes;

  return (
    <StyledProjectsSection id="projects">
      <h2 className="numbered-heading">Projects</h2>

      <div className="projects-grid">
        {projects.map((project, i) => {
          const { frontmatter, html } = project;
          const { title, github, external, tech } = frontmatter;

          return (
            <div className="project-card" key={i}>
              <div className="project-inner">
                <header>
                  <div className="project-top">
                    <div className="folder">
                      <Icon name="Folder" />
                    </div>

                    <div className="project-links">
                      {github && (
                        <a href={github} aria-label="GitHub Link" target="_blank" rel="noreferrer">
                          <Icon name="GitHub" />
                        </a>
                      )}

                      {external && (
                        <a
                          href={external}
                          aria-label="External Link"
                          target="_blank"
                          rel="noreferrer">
                          <Icon name="External" />
                        </a>
                      )}
                    </div>
                  </div>

                  <h3>{title}</h3>

                  <div className="project-description" dangerouslySetInnerHTML={{ __html: html }} />
                </header>

                {tech && (
                  <footer>
                    <ul className="project-tech-list">
                      {tech.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </footer>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </StyledProjectsSection>
  );
};

export default Projects;
