import React, { Suspense } from 'react';
import { Switch, HashRouter } from 'react-router-dom';
import './i18n/config';


export default function App() {
  return (
    <HashRouter>
      <Suspense fallback>
        <Switch>
          
        </Switch>
      </Suspense>
    </HashRouter>
  );
}