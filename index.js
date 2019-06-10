XMLHttpRequest = GLOBAL.originalXMLHttpRequest ?
  GLOBAL.originalXMLHttpRequest :
  GLOBAL.XMLHttpRequest;

// fetch logger
global._fetch = fetch;
global.fetch = function (uri, options, ...args) {
  return global._fetch(uri, options, ...args).then((response) => {
    console.log('Fetch', { request: { uri, options, ...args }, response });
    return response;
  });
};

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

import "react-redux-toastr/lib/css/react-redux-toastr.min.css"

AppRegistry.registerComponent(appName, () => App);
