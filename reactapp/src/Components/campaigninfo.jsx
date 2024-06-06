import { React } from "react";
import { useEffect, useState } from "react";
import Navbar from "../Components/navbar";
import Card from "../Components/card";
import axios from "axios";
import Spinner from "react-bootstrap/esm/Spinner";

export default function Campaigninfo() {
  const [campaigns, setCampaigns] = useState([{}]);
  const [characters, setCharacters] = useState([{}]);
  const [loading, setLoading] = useState(true);

  const fetchCampaign = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8080/campaigns");
      setCampaigns(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() =>
    //useEffect renders functions
    {
      setTimeout(() => setLoading(false), 3300);
      fetchCampaign();
    }, []);

  // sets the loader
  if (loading) {
    return (
      <h1 className="background my-4 ">
        <Spinner animation="border" />
      </h1>
    );
  }

  return (
    <div>
      <div className="">
        <br></br>
        <div className="container row">
          {campaigns.map((campaign, index) => (
            <div className="col" key={index}>
              <Card
                title={campaign.Title}
                description={campaign.Description}
                characters={campaign.Characters}
                date={campaign.Date} 
                log={campaign.Log}>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
