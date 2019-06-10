import React from 'react';
import { Text, Button, View } from 'react-native';
import { Provider } from 'react-redux';

import store from './app/boot/store';
import Navigation from './app/navigation/navigation';
import Modal from "react-native-modal";

export default () => {
    return (
        <Provider store={store}>
            <Modal isVisible={false}>
                <View style={{ flex: 1 }}>
                    <Text style="color: red;">Hello!</Text>
                    {/* <Button title="Hide modal" onPress={() => { }} /> */}
                </View>
            </Modal>
            <Navigation />
        </Provider>
    );
};
