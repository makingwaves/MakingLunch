import {StyleSheet} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

export default StyleSheet.create({
    container: {
        position: 'absolute',
        zIndex: 1,
        top: wp('12%'),
        left: wp('6.4%'),
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
});
