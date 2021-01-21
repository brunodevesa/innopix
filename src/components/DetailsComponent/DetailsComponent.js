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

  if (details.data && details.loaded && !details.loading) {
    return (
      <div>
        <h1>Details Page</h1>
        <p>{details.data.name}</p>
        <div>{parse(details.data.summary)}</div>

        <Link to={`/`}>
            <button type="button" class="btn btn-primary">Back</button>
        </Link>
      </div>
    );
  } else {
    return <p>loading...</p>;
  }
}
