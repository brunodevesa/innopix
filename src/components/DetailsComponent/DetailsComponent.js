import React, { useEffect, useState } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { getEpisodeByNumber } from "../../redux/actions/show";
import { Link } from "react-router-dom";
import parse from "html-react-parser";

export default function DetailsComponent(props) {
  const details = useSelector((state) => state.details);
  const dispatch = useDispatch();
  
  // get the url path parameters
  const param1 = props.match.params.id1;
  const param2 = props.match.params.id2;
  const param3 = props.match.params.id3;

  useEffect(() => {
    let obj = {
      show: param1,
      season: param2,
      episode: param3,
    };
    dispatch(getEpisodeByNumber(obj));
  }, []);

  console.log("details:", details);

  if (details.data && details.loaded && !details.loading && details.data.status !=404) {
      let data = details.data;
      
    return (
      <div className="show-container d-flex flex-column justify-content-center align-items-center">
        <div className="card w-100">
          <div class="container">
            <div class="row">
              <div class="col">
                <div className="title">{data.name}</div>
              </div>
            </div>
            <div className="row p-1">
              <div class="w-100"></div>
              <div class="col-12 col-md-6">
                {data.image.medium ? <img src={data.image.medium} alt="ima" weight={data.weight} /> : "No photo available.."}
              </div>
              <div class="col-12 col-md-6">
                <div className="info-container">
                  <div>{details.data.summary ? parse(details.data.summary) : "no summary available.."}</div>

                  <Link to={`/`}>
                    <button type="button" class="btn btn-primary">
                      Back
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
      if(details.data && details.data.status === 404){
          return(
              <p>Episode not available..</p>
          )
      }
      else{
          
              return <p>loading...</p>;
      }
  }
}


          {
            /* 
        <h1>Details Page</h1>
        <p>{details.data.name}</p>
        <div>{parse(details.data.summary)}</div>
            
            
            
        <Link to={`/`}>
            <button type="button" class="btn btn-primary">Back</button>
        </Link>
        */
          }