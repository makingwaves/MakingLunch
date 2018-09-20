import React, {Component} from 'react';
import { View, Image } from 'react-native';
import styles from './style';
import Bubble, {triangleSides} from "../Bubble/Bubble";
import { borderRadius } from "../../config/styles";

export interface UserImageProps {
    readonly imageUri: string;
}

class UserImage extends Component<UserImageProps> {
    render() {
        const { imageUri } = this.props;
        return (
        <Bubble borderRadius={borderRadius.borderRadiusLarge}
                borderRadiusBottomRight={borderRadius.borderRadiusNone}
                triangleSide={triangleSides.bottomRight}>
            <View style={styles.imageContainer}>
                <View style={styles.fixedRatio}>
                    <Image source={{uri: imageUri}} style={styles.image} />
                </View>
            </View>
        </Bubble>
        );
    }
}

export default UserImage;
