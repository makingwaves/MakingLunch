import React, { PureComponent } from 'react';
import { View, Image, Animated } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { ParallaxSwiper, ParallaxSwiperPage } from 'react-native-parallax-swiper';

import styles from './style';

import Bubble from '../../components/Bubble';
import Intro from '../../components/Intro/Intro';
import ExternalLogin from './ExternalLogin';
import { triangleSides } from '../../components/Triangle/Triangle';


const LOGIN_BACKGROUND_1 = require('./img/intro1.png');
const LOGIN_BACKGROUND_2 = require('./img/intro2.png');
const LOGIN_BACKGROUND_3 = require('./img/intro3.png');

class Landing extends PureComponent<NavigationScreenProps> {
    private renderFirstScreen = () => (
        <View style={styles.container}>  
            <Bubble
                triangleSide={triangleSides.topLeft}
                borderRadiusTopLeft={0}
            >
                <Intro
                    title="Hello there!"
                    text="Making Lunch unde omnis iste natus error sit volup tatem accus antium dolore mque laudantium,
                    totam rem aperiam."
                />
            </Bubble>
        </View>
    )

    private renderSecondScreen = () => (
        <View style={styles.container}>
            <View style={{flex: 1}}/>
            <Bubble
                triangleSide={triangleSides.bottomLeft}
                borderRadiusBottomLeft={0}
            >
                <Intro
                    title="It’s so nice to meet you!"
                    text="Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit,
                    sed quia non."
                />
            </Bubble>
        </View>
    )

    private renderFinalScreen = () => (
        <View style={styles.container}>
            <Bubble
                triangleSide={triangleSides.topRight}
                borderRadiusTopRight={0}
            >
                <Intro
                    title="Let's get started now"
                    text="Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet."
                />
            </Bubble>
            <ExternalLogin />
        </View>
    )

    public render() {
        return (
            <ParallaxSwiper
                speed={0.5}
                animatedValue={new Animated.Value(0)}
            > 
                <ParallaxSwiperPage
                    BackgroundComponent={<Image style={styles.backgroundImage} source={LOGIN_BACKGROUND_1}/>}
                    ForegroundComponent={this.renderFirstScreen()}
                />
                <ParallaxSwiperPage
                    BackgroundComponent={<Image style={styles.backgroundImage} source={LOGIN_BACKGROUND_2}/>}
                    ForegroundComponent={this.renderSecondScreen()}
                />
                <ParallaxSwiperPage
                    BackgroundComponent={<Image style={styles.backgroundImage} source={LOGIN_BACKGROUND_3}/>}
                    ForegroundComponent={this.renderFinalScreen()}
                />
            </ParallaxSwiper>
        );
    }
}

export default Landing;
