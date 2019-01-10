import React, { FunctionComponent } from 'react';
import { View } from 'react-native';

import styles from './style';

import Menu from './Menu';
import LunchSearcher from './LunchSearcher';

export interface MainProps {
    
};

const Main: FunctionComponent<MainProps> = ({

}) => {
    return (
        <View style={styles.mainContainer}>
            <Menu />
            <LunchSearcher />
        </View>
    );
}

export default Main;
