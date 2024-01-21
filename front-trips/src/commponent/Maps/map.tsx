import React, { useEffect, useState } from "react";
import { fromLonLat } from "ol/proj";
import "ol/ol.css";
import {
  RMap,
  RLayerVector,
  RFeature,
  RStyle,
  RLayerTile,
  ROverlay,
} from "rlayers";
import { Point } from "ol/geom";
import location from '../../images/location.png';
import useGetAllTrips from "../Jotai/globalAllTrips";



export default function Interactions(): JSX.Element {
  const { dataAllTrips, getAllTripsGlobal } = useGetAllTrips();
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);

  useEffect(() => {
    getAllTripsGlobal();
  }, []);

  return (
    <div className='w-full h-[60vh] bg-black'>
      <React.Fragment>
        <RMap
          className='w-full h-[100%]'
          initial={{ center: fromLonLat([34.920, 31.350]), zoom: 7.5 }}
        >
          <RLayerTile url='http://mt0.google.com/vt/lyrs=m&hl=he&x={x}&y={y}&z={z}' />
          <RLayerVector zIndex={10}>
            <RStyle.RStyle>
              <RStyle.RIcon src={location} scale={0.02} />
            </RStyle.RStyle>
            {dataAllTrips.map((f, index) => (
              <RFeature
                key={index}
                geometry={new Point(fromLonLat([+f.coordinatesx, +f.coordinatesy]))}
                onClick={(e) => {
                  if (e.map && e.target) {
                    e.map.getView().fit(e.target.getGeometry()!.getExtent(), {
                      duration: 250,
                      maxZoom: 15,
                    });
                  }
                }}
                onPointerEnter={() => setHoveredLocation(f.imageurl)}
                onPointerLeave={() => setHoveredLocation(null)}

              >
                 {hoveredLocation === f.imageurl && (
              <ROverlay className="w-[250px] h-[120px] h-12  border-2 border-black">
                <img src={f.imageurl} alt="Location" className="w-full h-full object-cover" />
              </ROverlay>
                 )}



              </RFeature>
            ))}
          </RLayerVector>
        </RMap>
      </React.Fragment>
    </div>
  );
}
