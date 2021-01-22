import React, { useEffect, useState } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { getEpisodeByNumber } from "../../redux/actions/show";
import { Link } from "react-router-dom";
import parse from "html-react-parser";

//style
import './detailsComponent.scss';

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

  if (details.data && details.loaded && !details.loading && details.data.status != 404) {
    let data = details.data;

    return (
      <div className="details-container d-flex flex-column justify-content-center align-items-center">
        <div className="card w-100">
          <div class="container">
            <div className="info-container">
              <div class="row p-0">
                <div class="col p-0">
                  <div className="title">{data.name}</div>
                </div>
              </div>
              <div className="row p-0">
                <div class="w-100"></div>
                <div class="col-12 col-md-6 p-0">
                  {data.image && data.image.medium ? <img src={data.image.medium} alt="ima" weight={data.weight} /> : "No photo available.."}
                </div>
                <div class="col-12 col-md-6 p-0">
                  <div className="summary">
                    <div>{details.data.summary ? parse(details.data.summary) : "no summary available.."}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row pt-3 pb-3">
              <Link to={`/`}>
                <button type="button" class="btn btn-secondary w-100">
                  Back
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    if (details.data && details.data.status === 404) {
      return <p>Episode not available..</p>;
    } else {
      return <p>loading...</p>;
    }
  }
}

  

