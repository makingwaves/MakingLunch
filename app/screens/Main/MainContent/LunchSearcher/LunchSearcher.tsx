import React, { PureComponent, ReactElement, ComponentClass } from 'react';
import { View } from 'react-native';

import styles from './style';

import { TimeSpan } from '../../../../state/lunches/types';
import { LunchStage } from '../MainContent';
import ChooseHour from './ChooseHour';
import SearchingLunch from './SearchingLunch';

export interface LunchSearcherProps {
    stage: LunchStage;
    onSearchClick: (timeSpan: TimeSpan) => void;
    onCancelClick: () => void;
};

export interface LunchSearcherState {

};

class LunchSearcher extends PureComponent<LunchSearcherProps, LunchSearcherState> {
    public state: LunchSearcherState;

    private stageView: { [key in LunchStage]: () => ReactElement<ComponentClass> } = {
        chooseData: () => <ChooseHour onSearchClick={this.props.onSearchClick} />,
        searching: () => <SearchingLunch onCancelClick={this.props.onCancelClick} />
    };

    constructor(props: LunchSearcherProps) {
        super(props);

        this.state = {

        };
    }

    public render() {
        const {
            stage
        } = this.props;
        
        return (
            <View style={styles.lunchSearcherContainer}>
                {this.stageView[stage]()}
            </View>
        )
    }
}

export default LunchSearcher;