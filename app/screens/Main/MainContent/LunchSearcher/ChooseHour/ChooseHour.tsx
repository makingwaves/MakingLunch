import dayjs, { Dayjs } from 'dayjs';
import { View, Text, Image } from 'react-native';
import React, { PureComponent, Fragment } from 'react';

import styles from './style';

import Bubble from '@app/components/Bubble';
import { TimeSpan } from '@app/state/lunches/types';
import CustomButton from '@app/components/CustomButton';
import TimePickerType from './TimePickerType';
import { triangleSides } from '@app/components/Triangle/Triangle';
import UserLocationButton from '../../UserLocationButton';
import { Alert } from 'react-native';

const CLOCK = require('./img/clock.png');
const ARROW = require('./img/arrow.png');

export interface ChooseHourProps {
    onSearchClick: (timeSpan: TimeSpan) => void;
    onLocationClick: () => void;
};

export interface ChoouseHourState {
    lunchEnd: string;
    lunchStart: string;
};

class ChooseHour extends PureComponent<ChooseHourProps, ChoouseHourState> {
    public state: ChoouseHourState;

    constructor(props: ChooseHourProps) {
        super(props);

        this.state = {
            lunchStart: dayjs().format('HH:mm'),
            lunchEnd: dayjs().add(2, 'hour').format('HH:mm')
        };
    }

    private onSearchLunchClick = () => {
        this.props.onSearchClick(this.getTimespan());
    };

    private getTimespan(): TimeSpan {
        return {
            begin: this.getMappedDate(this.getTimeFromGivenString(this.splitBy(this.state.lunchStart))).format(),
            end: this.getMappedDate(this.getTimeFromGivenString(this.splitBy(this.state.lunchEnd))).format()
        }
    }

    private getMappedDate(str: number[]): Dayjs {
        return dayjs()
            .set('hour', str[0])
            .set('minute', str[1]);
    }

    private openTimePicker = (type: 'lunchStart' | 'lunchEnd', hour: number, minute: number) => {
        const selectedHour: string = this.mapTimePickerValuesToString(hour, minute);
        const fnName = type === 'lunchStart' ? 'isBefore' : 'isAfter';
        const stateVariable = type === 'lunchStart' ? 'lunchEnd' : 'lunchStart';

        if (this.isEndAfterStart(selectedHour, this.state[stateVariable], fnName))
            this.setState(prevState => ({ [type]: selectedHour }) as any)
        else
            this.showWrongTimeAlert();
    }

    private isEndAfterStart(selectedHour: string, checkingTime: string, fn: 'isAfter' | 'isBefore'): boolean {
        const selectedAsDaysJS = this.getMappedDate(this.getTimeFromGivenString(this.splitBy(selectedHour, ':')));
        const checkingAsDaysJS = this.getMappedDate(this.getTimeFromGivenString(this.splitBy(checkingTime, ':')));

        return selectedAsDaysJS[fn](checkingAsDaysJS);
    }

    private showWrongTimeAlert(): void {
        Alert.alert('Warning', 'The end of the dinner must be after start of the dinner.',
            [{ text: 'Ok' }],
            { cancelable: false }
        );
    }

    private mapTimePickerValuesToString(hour: number, minute: number, suffix: string = ':'): string {
        return [hour.toString(), minute.toString()]
            .map(timeType => timeType.length === 1 ? `0${timeType}` : timeType)
            .join(suffix);
    }

    private getTimeFromGivenString(str: string[]): number[] {
        return str
            .map(timeType => parseInt(timeType));
    }

    private splitBy(str: string, suffix: string = ':'): string[] {
        return str && str
            .split(suffix)
    }

    public render() {
        const {
            lunchStart,
            lunchEnd
        } = this.state;
        const {
            onLocationClick
        } = this.props;

        return (
            <Fragment>
                <UserLocationButton onClick={onLocationClick} />
                <Bubble
                    triangleSide={triangleSides.bottomLeft}
                    bubbleContainerStyles={styles.bubbleContainer}
                    bubbleStyles={styles.bubble}
                >
                    <View style={styles.upperBubbleContainer}>
                        <Image source={CLOCK} />
                        <Text style={styles.bubbleTitle}>Lunch begins today between</Text>
                    </View>
                    <View style={styles.bottomBubbleContainer}>
                        <TimePickerType
                            timeType={'lunchStart'}
                            timeValue={lunchStart}
                            onTimeChangeFn={this.openTimePicker}
                            textAlignment={'flex-start'}
                        />
                        <Image source={ARROW} style={styles.arrowImageStyles} />
                        <TimePickerType
                            timeType={'lunchEnd'}
                            timeValue={lunchEnd}
                            onTimeChangeFn={this.openTimePicker}
                            textAlignment={'flex-end'}
                        />
                    </View>
                </Bubble>
                <CustomButton
                    text={'Search!'}
                    onPress={this.onSearchLunchClick}
                    containerStyles={styles.searchButtonContainer}
                    buttonStyles={styles.searchButton}
                    textButtonStyles={styles.textSearchButton}
                    triangleSide={triangleSides.bottomRight}
                />
            </Fragment>
        );
    }
}

export default ChooseHour;