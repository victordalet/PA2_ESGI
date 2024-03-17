import React from "react";
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';

export interface Coordinate {
    lat?: number;
    long?: number
    city: string;
}

export class MapComponents extends React.Component<{ dataCoordinate: Coordinate[] }> {


    render() {

        const {dataCoordinate} = this.props;


        return (
            <div style={{
                height: '40vh',
                width: '80vw',
                marginLeft: '-10%',
                borderRadius: '20px',
                overflow: 'hidden',
                border: '2px solid #000'
            }}>
                <MapContainer center={[44.6, 2.34]} zoom={6} scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {
                        dataCoordinate.map( (c, index) => {
                            if (c.lat === undefined || c.long === undefined) {
                                return;
                            }
                            return (
                                <Marker key={index} position={[c.lat , c.long]}>
                                    <Popup>
                                        {c.city}
                                    </Popup>
                                </Marker>
                            );
                        })
                    }
                </MapContainer>
            </div>
        );
    }

}

