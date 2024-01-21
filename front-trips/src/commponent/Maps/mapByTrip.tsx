import { fromLonLat } from "ol/proj";
import { Point } from "ol/geom";
import "ol/ol.css";

import { RMap, ROSM, RLayerVector, RFeature, ROverlay, RStyle, RLayerTile } from "rlayers";
import location from '../../images/location.png';
import useGetTripById from "../Jotai/getTripByIdGlobal";

import { useEffect } from "react";
import { useParams } from "react-router-dom";


// interface propsMap {
//     id: number
//     x: number
//     y: number
// }

export default function MapByTrip(): JSX.Element {
    const { dataById, getTripByIdGlobal } = useGetTripById();
    const params = useParams()

    useEffect(() => {
        if (params.id) {
        getTripByIdGlobal(params.id)
        }
      }, [params.id])
    

  return (
    <div className='w-full h-[60vh]'>
        {dataById && (
      <RMap
        className='w-full h-[100%]'
        initial={{ center: fromLonLat([+dataById.coordinatesx, +dataById.coordinatesy]), zoom: 11 }}
      >
    <RLayerTile url='http://mt0.google.com/vt/lyrs=m&hl=he&x={x}&y={y}&z={z}' />
      <RLayerVector zIndex={10}>
        <RStyle.RStyle>
          <RStyle.RIcon src={location} scale={0.06} anchor={[0.5, 0.8]} />
        </RStyle.RStyle>
        <RFeature
          geometry={new Point(fromLonLat([+dataById.coordinatesx, +dataById.coordinatesy]))}
          onClick={(e) =>
            e.map.getView().fit(e.target.getGeometry()!.getExtent(), {
              duration: 250,
              maxZoom: 15,
            })
          }
        >
<ROverlay className="bg-white rounded-full border border-black border-solid p-2">
  {dataById.title}
  <br />
  <em>&#11017; click to zoom</em>
</ROverlay>


        </RFeature>
      </RLayerVector>
    </RMap>
    )}
    </div>
  );
}