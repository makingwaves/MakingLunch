import React, {Component} from 'react';
import { View, Image } from 'react-native';
import styles from './style';

class UserImage extends Component {
    render() {
        return (
            <View style={styles.imageContainer}>
                <View style={styles.fixedRatio}>
                    <Image source={{uri: 'https://picsum.photos/500/400?image=64'}} style={styles.image} />
                </View>
            </View>
        );
    }
}

export default UserImage;
