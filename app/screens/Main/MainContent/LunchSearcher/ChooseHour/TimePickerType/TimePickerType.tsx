import TimePicker from 'react-native-24h-timepicker';
import { Platform, TimePickerAndroid } from 'react-native';
import React, { PureComponent, RefObject, createRef, Fragment } from 'react';

import styles from './style';

import CustomButton from "@app/components/CustomButton";

export type LunchTimeType = 'lunchStart' | 'lunchEnd';

export interface TimePickerTypeProps {
    timeType: LunchTimeType;
    timeValue: string;
    textAlignment: 'flex-start' | 'flex-end';
    onTimeChangeFn: (type: LunchTimeType, hour: number, minute: number) => void;
};

class TimePickerType extends PureComponent<TimePickerTypeProps> {
    private timePickerRef: RefObject<TimePicker>;

    constructor(props: TimePickerTypeProps) {
        super(props);

        this.timePickerRef = createRef();
    }

    public onTimepickerOpen = (): void => {
        if (Platform.OS === 'ios')
            this.openIOSTimepicker();
        else
            this.openAndroidTimepicker();
    }

    public onTimeIOSChoose = (hour: number, minute: number): void => {
        this.props.onTimeChangeFn(this.props.timeType, hour, minute);
        this.timePickerRef.current.close();
    }

    private openIOSTimepicker(): void {
        this.timePickerRef.current.open();
    }

    private async openAndroidTimepicker(): Promise<void> {
        const [hourProps, minuteProps] = this.getTimeObject(this.props.timeValue);
        const { action, hour, minute } = await TimePickerAndroid.open({
            hour: parseInt(hourProps),
            minute: parseInt(minuteProps),
            is24Hour: true
        }) as any;

        if (action !== TimePickerAndroid.dismissedAction)
            this.props.onTimeChangeFn(this.props.timeType, hour, minute);
    }

    private getTimeObject(time: string): string[] {
        return time && time.split(':');
    }

    public render() {
        const {
            timeValue,
            textAlignment
        } = this.props;

        const [hour, minute] = this.getTimeObject(timeValue);

        return (
            <Fragment>
                <CustomButton
                    text={timeValue}
                    onPress={this.onTimepickerOpen}
                    containerStyles={styles.timePickerContainer}
                    buttonStyles={styles.timePickerButton}
                    textButtonStyles={styles.timePickerText}
                    textAlignment={textAlignment}
                />
                {Platform.OS === 'ios' && (
                    <TimePicker
                        ref={this.timePickerRef}
                        selectedHour={hour}
                        selectedMinute={minute}
                        onConfirm={this.onTimeIOSChoose}
                    />
                )}
            </Fragment>
        )
    }
}

export default TimePickerType;
