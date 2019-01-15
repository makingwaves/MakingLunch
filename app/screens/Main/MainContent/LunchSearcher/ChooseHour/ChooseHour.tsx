import React, { PureComponent } from 'react';
import { View, Text, Image, TimePickerAndroid } from 'react-native';
import dayjs, { Dayjs } from 'dayjs';

import styles from './style';
import CustomButton from '../../../../../components/CustomButton';
import { triangleSides } from '../../../../../components/Triangle/Triangle';
import Bubble from '../../../../../components/Bubble';
import TimePickerType from './TimePickerType';

const CLOCK = require('./img/clock.png');
const ARROW = require('./img/arrow.png');

export interface ChooseHourProps {

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

    };

    private openTimePicker = async (type: 'lunchStart') => {
        const { [type]: timeType } = this.state;

        try {
            const [hourType, minuteType] = this.getTimeFromGivenString(timeType);

            const { action, hour, minute } = await TimePickerAndroid.open({
                hour: hourType,
                minute: minuteType,
                is24Hour: true
            });

            if(action !== TimePickerAndroid.dismissedAction) {
                this.setState(prevState  => ({ [type]: this.mapTimePickerValuesToString(hour, minute) }))
            }
        } catch(err) { }
    }

    private mapTimePickerValuesToString(hour: number, minute: number, suffix: string = ':'): string {
        return [hour.toString(), minute.toString()]
            .map(timeType => timeType.length === 1 ? `0${timeType}` : timeType)
            .join(suffix);
    }

    private getTimeFromGivenString(str: string, suffix: string = ':'): number[] {
        return str && str
            .split(suffix)
            .map(timeType => parseInt(timeType));
    }

    public render() {
        const {
            lunchStart,
            lunchEnd
        } = this.state;

        return (
            <View style={styles.chooseHourContainer}>
                <Bubble 
                    triangleSide={triangleSides.bottomLeft}
                    bubbleContainerStyles={styles.bubbleContainer}
                    bubbleStyles={styles.bubble}
                >
                    <View style={styles.upperBubbleContainer}>
                        <Image source={CLOCK} />
                        <Text style={styles.bubbleTitle}>Lunch begins between</Text>
                    </View>
                    <View style={styles.bottomBubbleContainer}>
                        <TimePickerType 
                            timeType={'lunchStart'}
                            timeValue={lunchStart}
                            openTimePicker={this.openTimePicker}
                            textAlignment={'flex-start'}
                        />
                        <Image source={ARROW} style={styles.arrowImageStyles} />
                        <TimePickerType 
                            timeType={'lunchEnd'}
                            timeValue={lunchEnd}
                            openTimePicker={this.openTimePicker}
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
            </View>
        );
    }
}

export default ChooseHour;