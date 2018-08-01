import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Login from './app/screens/login/Login';

// class App extends React.Component<{}> {
//     render() {
//         return (
//             <View style={styles.container}>
//                 <Text>test</Text>
//             </View>
//         );
//     }
// }

export default createStackNavigator({
    App: {
        screen: Login
    }
});

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         alignItems: 'center',
//         justifyContent: 'center'
//     }
// });
