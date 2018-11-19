import React, {Component} from 'react';
import {View, Text, Button, TouchableOpacity} from 'react-native';
import {NavigationScreenProps} from 'react-navigation';
import styles from './style';

class Main extends Component<NavigationScreenProps> {
    constructor(props: NavigationScreenProps) {
        super(props);
    }

    public render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Main</Text>
                <Button title={'LunchesList'} onPress={() => this.props.navigation.navigate('LunchesList')}/>
                <Button title={'Profile'} onPress={() => this.props.navigation.navigate('Profile')}/>
                <Button title={'Chat'} onPress={() => this.props.navigation.navigate('Chat')}/>
                <Button title={'Settings'} onPress={() => this.props.navigation.navigate('Settings')}/>
                <Button title={'Logout'} onPress={() => this.props.navigation.navigate('Auth')}/>

                <TouchableOpacity onPress={()=> {
                    this.props.navigation.navigate('Guests');
                }}>
                    <Text>Guests screen</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default Main;
