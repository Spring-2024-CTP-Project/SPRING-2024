import { React } from "react";
import { useEffect, useState } from "react";
import Navbar from "../Components/navbar";
import Card from "../Components/card";
import axios from "axios";
import Spinner from "react-bootstrap/esm/Spinner";

export default function Campaigninfo() {
  const [campaigns, setCampaigns] = useState([{}]);
  const [loading, setLoading] = useState(true);

  const fetchCampaign = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8080/campaigns");
      setCampaigns(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      console.log("Campaign:", campaigns)
      setLoading(false)
    }

  };

  useEffect(() =>
    //useEffect renders functions
    {
      fetchCampaign();
    }, []);

  // sets the loader

  return (
    <div>
      <div className="">
        <br></br>
        { loading ?  (  <h1 className="background my-4 ">
        <Spinner animation="border" />
      </h1>) : ( campaigns.length===0 ? (<div className=" container card bg-dark ">
  <div className="col card-body ">
    <h3 className=" text-white"> NO CAMPAIGNS</h3>
  </div>
  <p className="text-white">Add some below</p>
</div>) : (<div className="container row">
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
        </div>))}

      </div>
    </div>
  );
}
