import React, { PureComponent, RefObject, createRef } from 'react';
import GoogleMapView, { PROVIDER_GOOGLE, Circle, Region, Marker } from 'react-native-maps';

import styles from './style';
import { colors } from '../../../../config/styles';
import { Location } from '../../../../state/lunches/types';
import { View, Image } from 'react-native';

export interface Point {
    lng: number;
    lat: number;
};

const LOCATION_ICON = require('./img/location_icon.png');

class MapView extends PureComponent<object> {
    private readonly initialRegion: Region = {
        latitude: 50.062525,
        longitude: 19.936764,
        longitudeDelta: 0.01,
        latitudeDelta: 0.01
    };

    private googleMapsRef: RefObject<GoogleMapView>;

    constructor(props: object) {
        super(props);

        this.googleMapsRef = createRef();
    }

    public navigateToUserLocation = (): void => {
        this.getUserLocation((lng, lat) => {
            this.googleMapsRef.current.animateToRegion({
                longitude: lng,
                latitude: lat,
                longitudeDelta: this.initialRegion.longitudeDelta,
                latitudeDelta: this.initialRegion.latitudeDelta
            }, 300);
        });
    }

    public async getSelectedUserLocation(): Promise<Location> {
        const camera = await this.googleMapsRef.current.getCamera();
        const { southWest, northEast } = await this.googleMapsRef.current.getMapBoundaries();

        const lngFromScreen = this.getCircleLng(southWest.longitude, northEast.longitude);

        return {
            latitude: camera.center.latitude,
            longitude: camera.center.longitude,
            radiusInMeters: this.distance({
                lat: camera.center.latitude,
                lng: northEast.longitude + lngFromScreen
            }, {
                    lat: camera.center.latitude,
                    lng: southWest.longitude - lngFromScreen
                })
        }
    }

    private getCircleLng(westLng: number, eastLng: number): number {
        return (westLng - eastLng) * .25;
    }

    private distance(p1: Point, p2: Point): number {
        const radlat1 = Math.PI * p1.lat / 180;
        const radlat2 = Math.PI * p2.lat / 180;
        const theta = p1.lng - p2.lng;
        const radtheta = Math.PI * theta / 180;
        let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1)
            dist = 1;
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        return Math.round((dist * 60 * 1.1515) * 1609.344);
    }

    private getUserLocation(cb: (lng: number, lat: number) => void): void {
        navigator.geolocation.getCurrentPosition(({
            coords
        }) => cb(coords.longitude, coords.latitude));
    }

    public render() {
        return (
            <View style={styles.mapContainer}>
                <GoogleMapView
                    style={styles.mapView}
                    provider={PROVIDER_GOOGLE}
                    initialRegion={this.initialRegion}
                    ref={this.googleMapsRef}
                    // onMapReady={this.navigateToUserLocation}
                    showsTraffic={false}
                    showsBuildings={false}
                    loadingEnabled={true}
                    loadingBackgroundColor={colors.colorLight}
                    loadingIndicatorColor={colors.brandColorPrimary}
                >
                </GoogleMapView>
                <View style={styles.circle} pointerEvents={'none'}>
                    <Image source={LOCATION_ICON} style={styles.circleIcon} />
                </View>
            </View>
        );
    }
}

export default MapView;