import React, { FunctionComponent, memo } from 'react';

import styles from './style';

import CustomButton from '../../../../../../components/CustomButton';

export type LunchTimeType = 'lunchStart' | 'lunchEnd';

export interface TimePickersBubbleProps {
    timeType: LunchTimeType;
    timeValue: string;
    textAlignment: 'flex-start' | 'flex-end';
    openTimePicker: (type: LunchTimeType) => void;
};

const TimePickerType: FunctionComponent<TimePickersBubbleProps> = ({
    timeValue, timeType, openTimePicker, textAlignment 
}) => {
    const onButtonClick = () => {
        openTimePicker(timeType);
    };

    return (
        <CustomButton
            text={timeValue}
            onPress={onButtonClick}
            containerStyles={styles.timePickerContainer}
            buttonStyles={styles.timePickerButton}
            textButtonStyles={styles.timePickerText}
            textAlignment={textAlignment}
        />
    );
}

export default memo(TimePickerType)