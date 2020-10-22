import ClayButton from '@clayui/button';
import ClayIcon from '@clayui/icon';
import ClayLabel from '@clayui/label';
import ClaySticker from '@clayui/sticker';
import Head from 'next/head';
import Link from 'next/link';
import React, { useState } from 'react';

import ImportIllustration from '../assets/import-illustration.svg';
import EmptyState from '../components/EmptyState';
import ManagementToolbar from '../components/ManagementToolbar';
import Modal from '../components/Modal';
import Page from '../components/Page';
import Table from '../components/Table';

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

        <Link href="/order/1">
          <span className="ml-2 link">{value}</span>
        </Link>
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
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <Page title="Order" addButton={AddButton}>
      <Head>
        <title>Liferay | Order</title>
      </Head>
      <div className="mt-4">
        <ManagementToolbar orderBy />
        {items.length && (
          <div className="">
            <Table borderless actions={actions} columns={columns} items={items} />
          </div>
        )}
      </div>

      {!items.length && (
        <EmptyState description="Please, import a supported file" title="No orders yet">
          {AddButton()}
        </EmptyState>
      )}
      <Modal size="md" visible={modalVisible} toggle={() => setModalVisible(!modalVisible)} title="Import File">
        <div className="import-file">
          <div className="mb-4">
            <img src={ImportIllustration}></img>
          </div>
          <div>
            <span>Drag & Drop to Upload or</span>
            <p>Supported file formats are .xls, .xlsx, .xlsm, or .csv</p>
            <ClayButton displayType="secondary">Select File</ClayButton>
          </div>
        </div>
      </Modal>
    </Page>
  );
}
