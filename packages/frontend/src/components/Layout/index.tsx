import React from 'react';

import NavigationBar from '../NavigationBar';

export default function index({ children }) {
  return (
    <div>
      <NavigationBar />
      {children}
    </div>
  );
}
