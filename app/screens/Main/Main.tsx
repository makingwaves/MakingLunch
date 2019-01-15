import React, { FunctionComponent } from 'react';
import { View } from 'react-native';

import styles from './style';

import Menu from './Menu';
import MainContent from './MainContent';

const Main: FunctionComponent = ({

}) => {
    return (
        <View style={styles.mainContainer}> 
            <Menu />
            <MainContent />
        </View>
    );
}

export default Main;