import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import styles from './style';
import UserImage from "../../components/UserImage/UserImage";
import Bubble from "../../components/Bubble/Bubble";
import { borderRadius } from "../../config/styles";
import BackButton from "../../components/BackButton/BackButton";

export interface GuestProps {
    readonly navigation: object;
    readonly name: string;
    readonly description: string;
    readonly imageUri: string;
}

class Guest extends Component<GuestProps> {
    render() {
        const { navigation, name, description, imageUri } = this.props;
        return (
            <ScrollView style={styles.container}>
                <BackButton navigation={navigation}></BackButton>
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

            </ScrollView>
        );
    }
}

export default Guest;
