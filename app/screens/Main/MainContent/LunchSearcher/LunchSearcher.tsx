import { View } from 'react-native';
import React, { PureComponent, ReactElement, ComponentClass } from 'react';

import styles from './style';

import ChooseHour from './ChooseHour';
import { TimeSpan } from '@app/state/lunches/types';
import { LunchStage } from '../MainContent';
import SearchingLunch from './SearchingLunch';

export interface LunchSearcherProps {
    stage: LunchStage;
    onStageChange: (stage: LunchStage) => void;
    onSearchClick: (timeSpan: TimeSpan) => void;
    onCancelClick: () => void;
};

class LunchSearcher extends PureComponent<LunchSearcherProps> {
    private timeoutFn: number;

    private stageView: { [key in LunchStage]: () => ReactElement<ComponentClass> } = {
        chooseData: () => <ChooseHour onSearchClick={this.props.onSearchClick} />,
        searching: () => <SearchingLunch onCancelClick={this.props.onCancelClick} />
    };

    public componentDidUpdate(prevProps: LunchSearcherProps): void {
        if (prevProps.stage !== this.props.stage && this.props.stage === 'searching')
            this.timeoutFn = setTimeout(this.changeStage, 3000);
    }

    public componentWillUnmount(): void {
        clearTimeout(this.timeoutFn);
    }

    private changeStage = () => {
        this.props.onStageChange('chooseData');
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