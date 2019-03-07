import { View, Image } from 'react-native';
import React, { PureComponent, RefObject, createRef } from 'react';
import GoogleMapView, { PROVIDER_GOOGLE, Region, Marker } from 'react-native-maps';

import styles from './style';
import { colors } from '@app/config/styles';

import { LunchStage } from '../MainContent';
import LocationCircle from './LocationCircle/style';
import { Location, Lunch } from '@app/state/lunches/types';

export interface Point {
    lng: number;
    lat: number;
};

export interface UserLocation extends Location {
    id: string;
};

const LOCATION_ICON = require('./img/location_icon.png');

export interface MapViewProps {
    stage: LunchStage;
    runningLunch: Lunch;
};

class MapView extends PureComponent<MapViewProps> {

    private readonly initialRegion: Region = {
        latitude: 50.062525,
        longitude: 19.936764,
        longitudeDelta: 0.01,
        latitudeDelta: 0.01
    };

    private googleMapsRef: RefObject<GoogleMapView>;

    constructor(props: MapViewProps) {
        super(props);

        this.googleMapsRef = createRef();
    }

    public componentDidUpdate(prevProps: MapViewProps): void {
        if (prevProps !== this.props && this.props.stage === 'lunchAssigned') {
            const {
                runningLunch: { id, locations }
            } = this.props;
            this.animateTo({
                longitude: locations[id].longitude,
                latitude: locations[id].latitude,
                longitudeDelta: 0.05,
                latitudeDelta: 0.05
            });
        }
    }

    public navigateToUserLocation = (): void => {
        this.getUserLocation((lng, lat) => {
            this.animateTo({
                longitude: lng,
                latitude: lat,
                longitudeDelta: this.initialRegion.longitudeDelta,
                latitudeDelta: this.initialRegion.latitudeDelta
            })
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

    private animateTo(region: Region): void {
        this.googleMapsRef.current.animateToRegion({
            longitude: region.longitude,
            latitude: region.latitude,
            longitudeDelta: region.longitudeDelta,
            latitudeDelta: region.latitudeDelta
        }, 300);
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

    private getUsersLocations(runningLunch: Lunch): UserLocation[] {
        return runningLunch && Object.keys(runningLunch.locations)
            .filter(key => key !== runningLunch.id)
            .map(key => ({ ...runningLunch.locations[key], id: key }));
    }

    public render() {
        const {
            stage,
            runningLunch
        } = this.props;

        const userLocations = this.getUsersLocations(runningLunch);

        return (
            <View style={styles.mapContainer}>
                <GoogleMapView
                    style={styles.mapView}
                    ref={this.googleMapsRef}
                    provider={PROVIDER_GOOGLE}
                    // onMapReady={this.navigateToUserLocation}
                    showsTraffic={false}
                    initialRegion={this.initialRegion}
                    showsBuildings={false}
                    loadingEnabled={true}
                    loadingBackgroundColor={colors.colorLight}
                    loadingIndicatorColor={colors.brandColorPrimary}
                >
                    {stage === 'lunchAssigned' && <LocationCircle userLocations={userLocations} />}
                </GoogleMapView>
                {stage !== 'lunchAssigned' && (
                    <View style={styles.circle} pointerEvents={'none'}>
                        <Image source={LOCATION_ICON} style={styles.circleIcon} />
                    </View>
                )}
            </View>
        );
    }
}

export default MapView;