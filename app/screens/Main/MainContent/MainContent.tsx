import React, { PureComponent, Fragment } from 'react';
import { View } from 'react-native';

import LunchSearcher from './LunchSearcher';

class MainContent extends PureComponent {
    constructor(props) {
        super(props);
    }

    public render() {
        return (
            <Fragment>
                <View>
                    <LunchSearcher />
                </View>
            </Fragment>
        );
    }
}

export default MainContent;