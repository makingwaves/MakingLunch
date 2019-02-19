import React, { memo, FunctionComponent } from 'react';
import { View, Modal, ActivityIndicator, Text, StyleProp, ViewStyle } from 'react-native';

import styles from './style';

import { colors } from '@app/config/styles';

export interface LoaderProps {
    isVisible: boolean;
    text?: String;
    loaderInner?: StyleProp<ViewStyle>;
    indicatorColor?: string;
};

const Loader: FunctionComponent<LoaderProps> = ({
    isVisible = false, text = 'Loading...', indicatorColor = colors.brandColorPrimary, loaderInner = {}
}) => (
        <Modal
            visible={isVisible}
            transparent={true}
            onRequestClose={() => { }}
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