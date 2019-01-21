import React from 'react'
import Helmet from 'react-helmet'
import { PageTitle, PageBody, Container, Layout } from '../components'

const AttributionPage = () => (
  <Layout>
    <Helmet>
      <title>Attribution</title>
      <meta name="attribution" />
    </Helmet>

    <Container>
      <PageTitle>Attribution</PageTitle>
      <PageBody>
        <h2>Gatsby Starter</h2>
        <p>
          Based on{' '}
          <a
            href="https://github.com/ryanwiemer/gatsby-starter-gcn"
            target="_blank"
            rel="noopener noreferrer"
          >
            gatsby-starter-gcn
          </a>{' '}
          by{' '}
          <a
            href="https://github.com/ryanwiemer"
            target="_blank"
            rel="noopener noreferrer"
          >
            @ryanwiemer
          </a>
        </p>
        <hr />
        <h2>Landing Page Hero</h2>
        <p>
          Images from{' '}
          <a href="https://undraw.co" target="_blank" rel="noopener noreferrer">
            unDraw
          </a>{' '}
          assembled on{' '}
          <a href="https://canva.com" target="_blank" rel="noopener noreferrer">
            Canva
          </a>
          .
        </p>
        <hr />
        <h2>Fonts</h2>
        <table>
          <tbody>
            <tr>
              <td style={{ 'font-family': 'K2D' }} align="left">
                <h3>K2D</h3>
              </td>
              <td className="license" align="right">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="http://scripts.sil.org/OFL"
                >
                  SIL Open Font License, 1.1
                </a>
              </td>
            </tr>
            <tr>
              <td className="copyright" colSpan="2">
                K2D-Thin.ttf: Copyright 2018 The K2D Project Authors
                (https://github.com/cadsondemak/K2D)
              </td>
            </tr>
            <tr>
              <td className="copyright" colSpan="2">
                K2D-Regular.ttf: Copyright 2018 The K2D Project Authors
                (https://github.com/cadsondemak/K2D)
              </td>
            </tr>
            <tr>
              <td style={{ 'font-family': 'Roboto' }} align="left">
                <h3>Roboto</h3>
              </td>

              <td className="license" align="right">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="http://www.apache.org/licenses/LICENSE-2.0.html"
                >
                  Apache License, version 2.0
                </a>
              </td>
            </tr>
            <tr>
              <td className="copyright" colSpan="2">
                Roboto-Light.ttf: Copyright 2011 Google Inc. All Rights
                Reserved.
              </td>
            </tr>
          </tbody>
        </table>
        <hr />

        <h2>Icons</h2>
        <p>See individual icon files</p>
      </PageBody>
    </Container>
  </Layout>
)

export default AttributionPage
