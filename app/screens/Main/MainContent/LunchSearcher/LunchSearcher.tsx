import Display from 'react-native-display';
import { View } from 'react-native';
import React, { FunctionComponent, memo } from 'react';

import styles from './style';

import ChooseHour from './ChooseHour';
import LunchAssigned from './LunchAssigned';
import { LunchStage } from '../MainContent';
import WaitingForData from './WaitingForData';
import { TimeSpan, Lunch } from '@app/state/lunches/types';

export interface LunchSearcherProps {
    stage: LunchStage;
    running: Lunch;
    onSearchClick: (timeSpan: TimeSpan) => void;
    onLocationClick: () => void;
};

const LunchSearcher: FunctionComponent<LunchSearcherProps> = ({
    stage, running, onSearchClick, onLocationClick
}) => {
    return (
        <View style={styles.lunchSearcherContainer}>
            <Display style={[styles.displayContainer, styles.waitingDisplay]} enable={stage === 'waitingForData'} enter={'lightSpeedIn'} exit={'fadeOutLeft'} defaultDuration={500}>
                <WaitingForData />
            </Display>
            <Display style={styles.displayContainer} enable={stage === 'chooseData'} enter={'lightSpeedIn'} exit={'fadeOutLeft'} defaultDuration={500}>
                <ChooseHour onSearchClick={onSearchClick} onLocationClick={onLocationClick} />
            </Display>
            <Display style={styles.displayContainer} enable={stage === 'lunchAssigned'} enter={'lightSpeedIn'} exit={'fadeOutLeft'} defaultDuration={500}>
                <LunchAssigned runningLunch={running} />
            </Display>
        </View>
    )
}

export default memo(LunchSearcher);