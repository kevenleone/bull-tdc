import ClayDropDown from '@clayui/drop-down';
import React from 'react';

const { Divider, Item } = ClayDropDown;

export default ({ action: { action, name }, item, setActive }) => {
  if (name === 'divider') {
    return <Divider />;
  }

  return (
    <Item
      onClick={(event) => {
        event.preventDefault();
        setActive(false);

        if (action) {
          action(item);
        }
      }}
    >
      {typeof name === 'function' ? name(item) : name}
    </Item>
  );
};
