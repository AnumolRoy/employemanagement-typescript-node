import * as React from 'react';
import { IUsermanagentProps } from './IUsermanagentProps';
// import { escape } from '@microsoft/sp-lodash-subset';
import App from '../App';

export default class Usermanagent extends React.Component<IUsermanagentProps, {}> {
  public render(): React.ReactElement<IUsermanagentProps> {
   

    return (
      <section>
        <React.StrictMode>
    <App />
  </React.StrictMode>
      </section>
    );
  }
}
