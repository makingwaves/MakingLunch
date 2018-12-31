import React, { memo } from 'react';
import { View, Modal, ActivityIndicator, Text, RegisteredStyle } from 'react-native';

import styles from './style';
import { colors } from '../../config/styles';

export interface LoaderProps {
    isVisible: boolean;
    text?: String;
    loaderInner?: RegisteredStyle<{[key: string]: string | number}>;
    indicatorColor?: string;
};

const Loader: React.SFC<LoaderProps> = ({
    isVisible = false, text = 'Loading...', indicatorColor = colors.brandColorPrimary, loaderInner = {}
}) => (
    <Modal
        visible={isVisible} 
        transparent={true}
        onRequestClose={() => {}}
    >
        <View style={styles.container}>
            <View style={[styles.containerInnerStyles, loaderInner]}>
                <ActivityIndicator color={indicatorColor} />
                <Text style={[styles.textStyles, { color: indicatorColor }]}>{text}</Text>
            </View>
        </View> 
    </Modal>
);    

export default memo(Loader);