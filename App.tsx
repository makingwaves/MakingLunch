import React from 'react';
import { Provider } from 'react-redux';

import store from './app/boot/store';
import Navigation from './app/navigation/navigation';

// import "react-redux-toastr/lib/css/react-redux-toastr.min.css";
// import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
// import ReduxToastr from 'react-redux-toastr'


export default () => {
    return (
        <Provider store={store}>
            <Navigation />
            {/* <ReduxToastr
                timeOut={4000}
                newestOnTop={false}
                preventDuplicates
                position="top-left"
                transitionIn="fadeIn"
                transitionOut="fadeOut"
                progressBar
                closeOnToastrClick /> */}
        </Provider>
    );
};
