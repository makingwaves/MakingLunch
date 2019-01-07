import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
    container: {
        height: hp('10%'),
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingHorizontal: 20
    },
});
