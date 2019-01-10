import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';

import styles from './style';

import ChooseHour from './ChooseHour';

export interface LunchSearcherProps {

};

export interface LunchSearcherState {

};

class LunchSearcher extends PureComponent<LunchSearcherProps, LunchSearcherState> {
    public state: LunchSearcherState;

    constructor(props: LunchSearcherProps) {
        super(props);

        this.state = {

        };
    }

    public render() {

        return (
            <View style={styles.lunchSearcherContainer}>
                <ChooseHour />
            </View>
        )
    }
}

export default LunchSearcher;