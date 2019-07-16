import React, { PureComponent } from 'react';
import { View, Image, Animated } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { ParallaxSwiper, ParallaxSwiperPage } from 'react-native-parallax-swiper';

import styles from './style';

import Intro from '@app/components/Intro';
import Bubble from '@app/components/Bubble';
import ExternalLogin from './ExternalLogin';
import { triangleSides } from '@app/components/Triangle/Triangle';



const LOGIN_BACKGROUND_1 = require('./img/intro1.png');
const LOGIN_BACKGROUND_2 = require('./img/intro2.png');
const LOGIN_BACKGROUND_3 = require('./img/intro3.png');

class Landing extends PureComponent<NavigationScreenProps> {
    private renderFirstScreen = () => (
        <View style={styles.container}>  
            <Bubble
                triangleSide={triangleSides.topLeft}
                bubbleStyles={styles.firstBubble}
                bubbleContainerStyles={styles.bubbleContainer}
            >
                <Intro
                    title="Let’s go for lunch!"
                    text="Making Lunch is an app that helps you grab lunch close to where you are, while meeting new friends at the same time."
                />
            </Bubble>
        </View>
    )

    private renderSecondScreen = () => (
        <View style={styles.container}>
            <View style={{flex: 1}}/>
            <Bubble
                triangleSide={triangleSides.bottomLeft}
                bubbleStyles={styles.secondBubble}
                bubbleContainerStyles={styles.bubbleContainer}
            >
                <Intro
                    title="It’s so nice to meet you!"
                    text="Choose your time and how nearby you want to eat. Then, we’ll gather the nicest people around one table close to you!"
                />
            </Bubble>
        </View>
    )

    private renderFinalScreen = () => (
        <View style={styles.container}>
            <Bubble
                triangleSide={triangleSides.topRight}
                bubbleStyles={styles.thirdBubble}
                bubbleContainerStyles={styles.bubbleContainer}
            >
                <Intro
                    title="Let's get started!"
                    text="I don’t know about you, but I’m getting hungry."
                />
            </Bubble>
            <ExternalLogin /> 
        </View>
    )

    public render() {
        return (
            <ParallaxSwiper
                speed={.15}
                animatedValue={new Animated.Value(0)}
                dividerWidth={0}
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
