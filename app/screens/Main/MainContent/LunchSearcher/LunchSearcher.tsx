import Display from 'react-native-display';
import { View } from 'react-native';
import React, { PureComponent } from 'react';

import styles from './style';

import ChooseHour from './ChooseHour';
import { TimeSpan, Lunch } from '@app/state/lunches/types';
import { LunchStage } from '../MainContent';
import SearchingLunch from './SearchingLunch';
import WaitingForData from './WaitingForData';
import LunchAssigned from './LunchAssigned';

export interface LunchSearcherProps {
    stage: LunchStage;
    running: Lunch;
    onStageChange: (stage: LunchStage) => void;
    onSearchClick: (timeSpan: TimeSpan) => void;
    onCancelClick: () => void;
    onLocationClick: () => void;
};

class LunchSearcher extends PureComponent<LunchSearcherProps> {
    private timeoutFn: number;

    public componentDidUpdate(prevProps: LunchSearcherProps): void {
        if (prevProps.stage !== this.props.stage && this.props.stage === 'searching')
            this.timeoutFn = setTimeout(this.changeStage, 6000);
    }

    public componentWillUnmount(): void {
        clearTimeout(this.timeoutFn);
    }

    private changeStage = () => {
        this.props.onStageChange('chooseData');
    }

    public render() {
        const {
            stage,
            running,
            onLocationClick
        } = this.props;

        return (
            <View style={styles.lunchSearcherContainer}>
                <Display style={[styles.displayContainer, styles.waitingDisplay]} enable={stage === 'waitingForData'} enter={'lightSpeedIn'} exit={'fadeOutLeft'} defaultDuration={500}>
                    <WaitingForData />
                </Display>
                <Display style={styles.displayContainer} enable={stage === 'chooseData'} enter={'lightSpeedIn'} exit={'fadeOutLeft'} defaultDuration={500}>
                    <ChooseHour onSearchClick={this.props.onSearchClick} onLocationClick={onLocationClick} />
                </Display>
                <Display style={[styles.displayContainer, styles.searchingDisplay]} enable={stage === 'searching'} enter={'lightSpeedIn'} exit={'fadeOutLeft'} defaultDuration={500}>
                    <SearchingLunch onCancelClick={this.props.onCancelClick} />
                </Display>
                <Display style={styles.displayContainer} enable={stage === 'lunchAssigned'} enter={'lightSpeedIn'} exit={'fadeOutLeft'} defaultDuration={500}>
                    <LunchAssigned runningLunch={running} />
                </Display>
            </View>
        )
    }
}

export default LunchSearcher;