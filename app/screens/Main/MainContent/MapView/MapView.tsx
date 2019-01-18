import React, { PureComponent, RefObject, createRef } from 'react';
import GoogleMapView, { PROVIDER_GOOGLE, Circle, Region, Marker } from 'react-native-maps';

import styles from './style';
import { colors } from '../../../../config/styles';

export interface MapViewState {
    lng: number;
    lat: number;
    radius: number;
};

export interface Point {
    lng: number;
    lat: number;
};

const LOCATION_ICON = require('./img/location_icon.png');

class MapView extends PureComponent<object, MapViewState> {
    public state: MapViewState;

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

        const {
            latitude,
            longitude,
            longitudeDelta
        } = this.initialRegion;

        this.state = {
            lat: latitude,
            lng: longitude,
            radius: this.getRadius(latitude, longitude, longitudeDelta)
        };
    }

    public componentDidMount(): void {
        setTimeout(() => {
            this.navigateToUserLocation();
        }, 1000);
    }

    public navigateToUserLocation(): void {  
        this.getUserLocation((lng, lat) => {
            this.googleMapsRef.current.animateToRegion({ 
                longitude: lng, 
                latitude: lat,
                longitudeDelta: this.initialRegion.longitudeDelta,
                latitudeDelta: this.initialRegion.latitudeDelta
            }, 300);    
            this.setState(prevState => ({ lng, lat }));    
        });  
    }

    public onRegionChange = (evt: Region) => {
        const {  
            latitude: lat, 
            longitude: lng, 
            longitudeDelta: lngDelta,  
        } = evt; 
        this.setState(prevState => ({
            lng,
            lat,
            radius: this.getRadius(lat, lng, lngDelta) 
        }));
    };

    private getRadius(lat: number, lng: number, lngRadius: number): number {
        return this.getDistanceBetweenPoints(
            { lat: lat, lng: lng - lngRadius / 2 },
            { lat: lat, lng: lng + lngRadius / 2 } 
        )
    }

    private getDistanceBetweenPoints(point1: Point, point2: Point): number {
        const earthRadius: number = 6371;
        const [dLat, dLng] = [
            this.degToRadians(point2.lat - point1.lat),
            this.degToRadians(point2.lng - point1.lng)
        ];
        const  a = 
            Math.sin( dLat / 2 ) * Math.sin( dLat / 2 ) +
            Math.cos(this.degToRadians(point1.lat)) * Math.cos(this.degToRadians(point2.lat)) * 
            Math.sin( dLng / 2 ) * Math.sin( dLng / 2 );
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt( 1 - a )); 
        return Math.abs(( earthRadius * c ) * 350);
    }

    private degToRadians(deg: number): number {
        return deg * ( Math.PI / 180 );
    }

    private getUserLocation(cb: (lng: number, lat: number) => void): void {
        navigator.geolocation.getCurrentPosition(({ 
            coords 
        }) => cb(coords.longitude, coords.latitude));
    }

    public render() {
        const {
            lng,
            lat,
            radius
        } = this.state;

        const coords = {
            latitude: lat,
            longitude: lng
        };

        return (
            <GoogleMapView
                style={styles.mapView} 
                provider={PROVIDER_GOOGLE}   
                initialRegion={this.initialRegion}
                ref={this.googleMapsRef}
                onRegionChange={this.onRegionChange}
                showsTraffic={false}
                showsBuildings={false}
                loadingEnabled={true} 
                loadingBackgroundColor={colors.colorLight}
                loadingIndicatorColor={colors.brandColorPrimary} 
            >
                <Marker 
                    coordinate={coords}
                    image={LOCATION_ICON}  
                />
                <Circle 
                    center={coords}
                    radius={radius} 
                    fillColor={'rgba(0, 0, 0, .3)'}
                    strokeWidth={2}
                    strokeColor={colors.brandColorPrimary} 
                /> 
            </GoogleMapView>
        );
    }
}

export default MapView;