import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';


export default StyleSheet.create({
    messagesViewContainer: {
        flex: 1,
        paddingHorizontal: 30,
    },
    headerFlatList: {
        marginBottom: hp('8%')
    }
});
