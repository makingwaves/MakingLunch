import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';


export default StyleSheet.create({
    messagesViewContainer: {
        flex: 1,
        paddingHorizontal: 30,
        transform: [{ scaleY: -1 }]
    },
    headerFlatList: {
        marginBottom: hp('7%')
    },
    flip: {
        transform: [{ scaleY: -1 }]
    }
});
