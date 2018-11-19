import React, {Component} from 'react';
import {ScrollView, View} from 'react-native';
import Guest, {GuestProps} from '../Guest/Guest';
import {NavigationScreenProps} from 'react-navigation';
import {ParallaxSwiper, ParallaxSwiperPage} from 'react-native-parallax-swiper';
import BackButton from '../../components/BackButton/BackButton';
import styles from './style';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

class GuestsList extends Component<NavigationScreenProps> {

    static navigationOptions = {
        header: null,
    }

    public state = {
        guests: [
            {
                id: 0,
                name: 'Guest name',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac laoreet metus. Maecenas a mattis ex, malesuada aliquet tortor. Praesent eget libero et quam aliquet semper sed a neque.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac laoreet metus. Maecenas a mattis ex, malesuada aliquet tortor. Praesent eget libero et quam aliquet semper sed a neque.',
                imageUri: 'https://picsum.photos/500/400?image=64',
                meetings: 5,
            },
            {
                id: 1,
                name: 'Guest name 1',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac laoreet metus.',
                imageUri: 'https://picsum.photos/400/600?image=1005',
                meetings: 15,
            },
            {
                id: 2,
                name: 'Guest name 2',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                imageUri: 'https://picsum.photos/300/300?image=823',
                meetings: 1,
            },
        ],
    };

    public componentDidMount() {
        setTimeout(() => { this.scrollView.scrollTo({x: - wp('12%')}); }, 1); // scroll view position fix
    }

    private createGuestsList(guests : GuestProps[]) {
        return guests.map((guest) => (
            <ScrollView
                key={guest.id}
                style={styles.listItem}
                showsVerticalScrollIndicator={false}
            >
                <Guest
                    id={guest.id}
                    name={guest.name}
                    description={guest.description}
                    imageUri={guest.imageUri}
                    meetings={guest.meetings}
                />
            </ScrollView>
        ));
    }

    public render() {
        const { navigation } = this.props;
        const { guests } = this.state;
        return (
            <View style={styles.container}>
            <BackButton navigation={navigation} />
                <ScrollView
                    ref={(scrollView) => { this.scrollView = scrollView; }}
                    horizontal={true}
                    decelerationRate={0}
                    snapToInterval={wp('76%')}
                    snapToAlignment={'center'}
                    contentInset={{top: 0, left: wp('12%'), bottom: 0, right: wp('12%')}}
                    contentContainerStyle={styles.contentContainer}
                >
                    {this.createGuestsList(guests)}
                </ScrollView>
            </View>
        );
    }
}

export default GuestsList;
