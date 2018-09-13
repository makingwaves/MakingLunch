import React, {Component} from 'react';
import { View, Image } from 'react-native';
import styles from './style';
import Bubble from "../Bubble/Bubble";
import { borderRadius } from "../../config/styles";

class UserImage extends Component {
    render() {
        return (
        <Bubble borderRadius={borderRadius.borderRadiusLarge}
                borderRadiusBottomRight={borderRadius.borderRadiusNone}
                hasTriangleBottomRight={true}>
            <View style={styles.imageContainer}>
                <View style={styles.fixedRatio}>
                    <Image source={{uri: 'https://picsum.photos/500/400?image=64'}} style={styles.image} />
                </View>
            </View>
        </Bubble>
        );
    }
}

export default UserImage;
