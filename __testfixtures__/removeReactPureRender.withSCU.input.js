import React from 'react';
import { shouldPureComponentUpdate } from 'react-pure-render';

export default class MyComp extends React.Component {
  shouldComponentUpdate = shouldPureComponentUpdate;
}
