import React, { PureComponent, RefObject, createRef } from 'react';
import Mapbox from '@mapbox/react-native-mapbox-gl';
import circle from '@turf/circle';

import styles from './style';

export interface MapViewState {
    lng: number;
    lat: number;
    zoomLevel: number;
    circleRadius: number;
};

class MapView extends PureComponent<object, MapViewState> {
    private mapboxRef: RefObject<Mapbox>;
    public state: MapViewState;

    constructor(props: object) {
        super(props);

        this.mapboxRef = createRef();
        this.state = {
            lng: 0,
            lat: 0,
            zoomLevel: 16,
            circleRadius: .2
        }
    }

    public setCameraToUserLocation(): void {
        navigator.geolocation.getCurrentPosition(({ coords }) => {
            this.setState(prevState => ({ 
                lng: coords.longitude, lat: coords.latitude 
            }), () => {
                this.mapboxRef.current.setCamera({
                    centerCoordinate: [this.state.lng, this.state.lat],
                    zoom: this.state.zoomLevel
                });
            })
        });

    }

    private getCircleShape(lng: number, lat: number, radius: number): typeof circle {
        return circle(
            [lng, lat],
            radius,
            { units: 'kilometers', properties: {} }
        );
    }

    private onRegionChange = async () => { 
        try {
            const center = await this.mapboxRef.current.getCenter();
            this.setState(prevState => ({ 
                lng: parseFloat(center[0]),
                lat: parseFloat(center[1])
            }));
        } catch(err) {}
    };

    private changeCircleCoord = ({ geometry }) => {
        const [lng, lat] = geometry.coordinates;
        this.setState(prevState => ({ lng, lat })); 
    };

    public render() {
        const {
            lng, 
            lat,
            circleRadius
        } = this.state;

        const shape = this.getCircleShape(lng, lat, circleRadius); 

        return (
            <Mapbox.MapView 
                animated={true}
                styleURL={Mapbox.StyleURL.Street}
                style={styles.absoluteContainer}
                compassEnabled={false} 
                ref={this.mapboxRef}
                showUserLocation={true}
                onPress={this.changeCircleCoord}
                onRegionIsChanging={this.onRegionChange}
            >
                <Mapbox.ShapeSource 
                    id={'circle'}
                    shape={shape}
                    >
                    <Mapbox.FillLayer  
                        id={'circleLayer'}
                        style={{
                            fillOpacity: .25,
                        }} 
                    />
                </Mapbox.ShapeSource>
            </Mapbox.MapView>
        )
    }
}

export default MapView;