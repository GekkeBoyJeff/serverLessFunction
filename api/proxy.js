const fetch = require("node-fetch");

module.exports = async (req, res) => {
  const apiUrl = "https://dichter.responsible-it.nl";
  const endpoint = req.url.replace("/api/proxy", "/api/poetry");
  const requestUrl = `${apiUrl}${endpoint}`;

  const apiHeaders = {
    "Authorization": "Bearer dichter-a6a8ae46-4c90",
  };

  try {
    const apiResponse = await fetch(requestUrl, {
      method: req.method,
      headers: apiHeaders,
    });

    const data = await apiResponse.json();

    // Voeg CORS-headers toe aan de respons
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

    // Stuur de API-gegevens door
    res.status(200).json(data);
  } catch (error) {
    console.error("Er is een fout opgetreden:", error);
    res.status(500).json({ error: "Er is een fout opgetreden bij het verwerken van het verzoek." });
  }
};
