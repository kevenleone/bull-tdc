import ClayLayout from '@clayui/layout';
import ClayPanel from '@clayui/panel';
import React from 'react';

export default function index({ addButton = () => <></>, children, title }) {
  return (
    <ClayLayout.ContainerFluid className="page-component">
      <ClayLayout.Row className="header">
        <ClayLayout.Col lg={8} xl={10}>
          <h1>{title}</h1>
        </ClayLayout.Col>
        <ClayLayout.Col style={{ marginTop: -7, textAlign: 'end' }}>{addButton()}</ClayLayout.Col>
      </ClayLayout.Row>

      <ClayPanel className="mt-4">
        <ClayPanel.Body>{children}</ClayPanel.Body>
      </ClayPanel>
    </ClayLayout.ContainerFluid>
  );
}
