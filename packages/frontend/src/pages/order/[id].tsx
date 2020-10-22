import ClayLabel from '@clayui/label';
import ClayLayout from '@clayui/layout';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

import Page from '../../components/Page';

const Order = () => {
  const router = useRouter();

  return (
    <Page onClickBack={() => router.push('/')} title="Order Name">
      <Head>
        <title>Liferay | Order Detail</title>
      </Head>
      <ClayLayout.ContainerFluid>
        <ClayLayout.Row>
          <ClayLayout.Col xl={4} className="order-list">
            <div className="p-3">
              <div className="mt-2 mb-4">
                <h1>Services</h1>
              </div>
              <div className="order-card">
                <p>
                  Service Name 1 <ClayLabel className="ml-2">Test</ClayLabel>
                </p>
                <span>1 hour ago</span>
              </div>
            </div>
          </ClayLayout.Col>
          <ClayLayout.Col className="order-details">
            <div className="p-3">
              <div className="mt-2 mb-4">
                <h1>Service Name 1</h1>
              </div>
              <div className="order-card">
                <ClayLayout.Row className="order-info">
                  <ClayLayout.Col>
                    <p>Created Data</p>
                    <span>1 hour ago</span>
                  </ClayLayout.Col>
                  <ClayLayout.Col>
                    <p>Status</p>
                    <ClayLabel>Status</ClayLabel>
                  </ClayLayout.Col>
                </ClayLayout.Row>

                <ClayLayout.Row className="order-info">
                  <ClayLayout.Col>
                    <p>Assigned</p>
                    <span>Keven Leone</span>
                  </ClayLayout.Col>
                  <ClayLayout.Col>
                    <p>Service Type</p>
                    <span>Fix</span>
                  </ClayLayout.Col>
                </ClayLayout.Row>

                <ClayLayout.Row className="order-info">
                  <ClayLayout.Col>
                    <p>Description</p>
                    <span>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                      nisi ut aliquip ex ea commodo consequat.
                    </span>
                  </ClayLayout.Col>
                </ClayLayout.Row>
              </div>
            </div>
          </ClayLayout.Col>
        </ClayLayout.Row>
      </ClayLayout.ContainerFluid>
    </Page>
  );
};

export default Order;
