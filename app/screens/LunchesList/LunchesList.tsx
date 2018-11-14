import React, {Component} from 'react';
import {NavigationScreenProps} from 'react-navigation';
import {Button, FlatList, ListRenderItemInfo, Text, View} from 'react-native';

class LunchesList extends Component<NavigationScreenProps> {
    private readonly lunchesList = ['Lunch1', 'Lunch2', 'Lunch3'];

    constructor(props: NavigationScreenProps) {
        super(props);
    }

    private renderSingleLunch = (listItem: ListRenderItemInfo<string>) =>
        (
            <Button
                title={listItem.item}
                onPress={() => this.props.navigation.navigate('Lunch')}
            />
        )

    public render() {
        return (
            <View>
                <Text>Lunches screen</Text>
                <FlatList
                    data={this.lunchesList}
                    renderItem={(it) => this.renderSingleLunch(it)}
                />
            </View>
        );
    }
}

export default LunchesList;
