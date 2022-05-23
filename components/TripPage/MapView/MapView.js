import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

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
      {activities.map((activity) => {
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
      })}
    </Map>
  );
}
