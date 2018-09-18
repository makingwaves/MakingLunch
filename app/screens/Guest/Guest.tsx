import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from './style';
import UserImage from "../../components/UserImage/UserImage";
import Bubble from "../../components/Bubble/Bubble";
import { borderRadius } from "../../config/styles";

export interface GuestProps {
    readonly name: string;
    readonly description: string;
    readonly imageUri: string;
}

class Guest extends Component<GuestProps> {
    render() {
        const { name, description, imageUri } = this.props;
        return (
            <View style={styles.container}>
                <UserImage imageUri={imageUri}/>
                <Bubble
                    borderRadiusBottomLeft={borderRadius.borderRadiusNone}
                    borderRadiusTopRight={borderRadius.borderRadiusNone}
                    hasTriangleBottomLeft={true}>
                    <Text style={[styles.title, styles.text]}>{name}</Text>
                </Bubble>
                <Bubble
                    borderRadiusTopLeft={borderRadius.borderRadiusNone}
                    borderRadiusBottomRight={borderRadius.borderRadiusNone}
                    hasTriangleBottomRight={true}>
                    <Text style={styles.text}>{description}</Text>
                </Bubble>
            </View>
        );
    }
}

export default Guest;
