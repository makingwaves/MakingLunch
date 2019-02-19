import { Modal, View, Text } from 'react-native';
import React, { FunctionComponent, memo } from 'react';

import styles from './style';

import CustomButton from '@app/components/CustomButton';

export interface ErrorPopupProps {
    closePopup: () => void;
    errorOccured: boolean;
    title?: string;
    errorMsg?: string;
    closeButtonText?: string;
};

const ErrorPopup: FunctionComponent<ErrorPopupProps> = ({
    closePopup, errorOccured, title = 'Error', errorMsg = 'An error has occured', closeButtonText = 'Close'
}) => {
    return (
        <Modal
            visible={errorOccured}
            transparent={true}
            onRequestClose={() => { }}
        >
            <View style={styles.container}>
                <View style={styles.containerInnerStyles}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.errorContent}>{errorMsg}</Text>
                    <CustomButton
                        text={closeButtonText}
                        onPress={closePopup}
                        containerStyles={styles.buttonContainer}
                        buttonStyles={styles.buttonStyles}
                        textButtonStyles={styles.textButtonStyles}
                    />
                </View>
            </View>
        </Modal>
    );
}

export default memo(ErrorPopup);
