import axios from "axios";

export default async (req, res) => {
  const { input } = req.body;

  try {
    const URL = "https://maps.googleapis.com/maps/api/place/autocomplete/json";
    const response = await axios.get(URL, {
      params: {
        input,
        key: process.env.PLACES_API_KEY,
        // types: "address",
        // location: "-37.815018,144.946014",
        // radius: "500000",
      },
    });

    console.log(response);

    res.status(200).json(response.data);
  } catch (e) {
    res.status(400).json(e.message);
  }
};
