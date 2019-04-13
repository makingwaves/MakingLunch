import TimePicker from "react-native-24h-timepicker";
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
        this.timePickerRef.current.open();
    }

    public onTimeChoose = (hour: number, minute: number): void => {
        this.props.onTimeChangeFn(this.props.timeType, hour, minute);
        this.timePickerRef.current.close();
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
                <TimePicker 
                    ref={this.timePickerRef} 
                    selectedHour={hour}
                    selectedMinute={minute}
                    onConfirm={this.onTimeChoose} 
                />
            </Fragment>
        )
    }
}

export default TimePickerType;