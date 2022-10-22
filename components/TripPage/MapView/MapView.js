import Map, { Source, Layer, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const geojson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [-122.4, 37.8] },
      properties: {
        title: "Mapbox DC",
        "marker-symbol": "monument",
      },
    },
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [-121.4, 37.8] },
      properties: {
        title: "Mapbox DC",
        "marker-symbol": "monument",
      },
    },
  ],
};

// "geojson-marker": {
//     "type": "geojson",
//     "data": {
//         "type": "Feature",
//         "geometry": {
//             "type": "Point",
//             "coordinates": [-77.0323, 38.9131]
//         },
//         "properties": {
//             "title": "Mapbox DC",
//             "marker-symbol": "monument"
//         }
//     }
// }

const layerStyle = {
  id: "point",
  type: "circle",
  paint: {
    "circle-radius": 10,
    "circle-color": "#007cbf",
  },
};

export default function MapView({ activities, trip_id, setActiveActivity }) {
  return (
    <Map
      initialViewState={{
        longitude: -122.4,
        latitude: 37.8,
        zoom: 14,
      }}
      //   style={{ width: 600, height: 400 }}
      style={{ width: "100vw", height: "calc(100vh - 10rem)" }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      dragRotate={false}
    >
      <Source id="my-data" type="geojson" data={geojson}>
        <Layer {...layerStyle} />
      </Source>
      {/* {activities.map((activity) => {
        // console.log(activity);
        const { lat, lng } = activity.location_coordinates;

        if (!lat || !lng) return null;

        return (
          <Marker longitude={lng} latitude={lat} anchor="center">
            <button
              style={{
                //   width: 16,
                // height: 16,
                background: "white",
                // borderRadius: "0.25rem",
                border: "none",
                boxShadow: "0 0.25rem 1rem 0 rgba(0,0,0, 0.5)",
                padding: "0.25rem 0.5rem",
                cursor: "pointer",
                color: "black",
              }}
              //   onClick={setActiveActivity}
              onClick={() => setActiveActivity(activity)}
            >
              {activity.image && <img src={activity.image} width="20" />}
              <span>{activity.name}</span>
            </button>
          </Marker>
        );
      })} */}
    </Map>
  );
}
