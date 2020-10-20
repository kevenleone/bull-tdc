import ClayButton from '@clayui/button';
import ClayIcon from '@clayui/icon';
import ClayLabel from '@clayui/label';
import ClaySticker from '@clayui/sticker';
import Head from 'next/head';
import React from 'react';

import EmptyState from '../components/EmptyState';
import ManagementToolbar from '../components/ManagementToolbar';
import Page from '../components/Page';
import Table from '../components/Table';

/* <Table actions={actions} columns={columns} items={fieldTypes} /> */

const StatusTypeDisplay = {
  IN_PROCESSING: 'info',
  NOT_PROCESSED: 'danger',
  PROCESSED: 'success',
};

const columns = [
  {
    key: 'name',
    render: (value) => (
      <>
        <ClaySticker displayType="light" shape="circle" size="sm">
          <img className="sticker-img" src="https://avatars2.githubusercontent.com/u/22279592?v=4" />
        </ClaySticker>
        <span className="ml-2">{value}</span>
      </>
    ),
    value: 'Name',
  },
  {
    key: 'createdAt',
    value: 'Created At',
  },
  {
    key: 'status',
    render: (status) => <ClayLabel displayType={StatusTypeDisplay[status]}>{status}</ClayLabel>,
    value: 'Status',
  },
];

const items = [
  {
    createdAt: '22/10/2020',
    name: 'Order Name',
    status: 'Processing',
  },
  {
    createdAt: '22/10/2020',
    name: 'Order Name',
    status: 'IN_PROCESSING',
  },
  {
    createdAt: '22/10/2020',
    name: 'Order Name',
    status: 'PROCESSED',
  },
  {
    createdAt: '22/10/2020',
    name: 'Order Name',
    status: 'NOT_PROCESSED',
  },
];

const actions = [
  {
    action() {},
    name: 'Edit',
  },
];

const AddButton = () => (
  <ClayButton>
    <span className="inline-item inline-item-before">
      <ClayIcon symbol="import" />
    </span>
    Import
  </ClayButton>
);

export default function index() {
  return (
    <Page title="Order" addButton={AddButton}>
      <Head>
        <title>Liferay | Order</title>
      </Head>
      <ManagementToolbar />
      {items.length && (
        <div className="m-2">
          <Table borderless actions={actions} columns={columns} items={items} />
        </div>
      )}

      {!items.length && (
        <EmptyState description="Please, import a supported file" title="No orders yet">
          {AddButton()}
        </EmptyState>
      )}
    </Page>
  );
}
