import React, { useEffect, useState } from "react";
import shortid from "shortid";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { getShow } from "../../redux/actions/show";
// import Card from "../CardComponent";
import { render } from "@testing-library/react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";

//styling
import "./showComponent.scss";

const Show = (props) => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.show);
  const data = useSelector((state) => state.data);
  const loading = useSelector((state) => state.show.loading);
  const loaded = useSelector((state) => state.show.loaded);
  const error = useSelector((state) => state.show.error);

  // similar to compoonentDidMount
  useEffect(() => {
    dispatch(getShow());
  }, []);

  // local state only for this component
  const [currentSeason, setCurrentSeason] = useState(1);

  // conditional rendering
  if (show.data && show.loaded && !show.loading) {
    // group episodes by season:
    let episodesBySeason = parseEpisodesBySeason(show.data);

    console.log(episodesBySeason);
    const data = show.data;
    let show_id = show.data.id;

    return (
      <div className="show-container d-flex flex-column justify-content-center align-items-center">
        <div className="card w-100">
          <div class="container">
            <div class="row title">
              <div class="col p-0">
                <div>{data.name}</div>
              </div>
            </div>
            <div class="row p-0.5 summary">
              <div class="col p-0">
                <div>{parse(data.summary)}</div>
              </div>
            </div>
            <div className="row p-0">
              <div class="w-100"></div>
              <div class="col-12 col-md-6 p-0">
                <img src={data.image.original} alt="ima" weight={data.weight} />
              </div>
              <div class="col-12 col-md-6 p-0">
                <div className="info-container">
                  <div className="pagination-container">
                    <Pagination currentSeason={currentSeason} setCurrentSeason={setCurrentSeason} seasons={episodesBySeason} />
                  </div>

                  <div className="episode-list-container">
                    <EpisodeListBySeason show_id={show_id} season={currentSeason} episodes={episodesBySeason} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <p></p>
        <p>nice loading spinner here..</p>
      </div>
    );
  }
};

/**
 * function to group episodes by their seasons so the episodes
 * can be grouped and presented by their season.
 * @param {Object} data
 */
function parseEpisodesBySeason(data) {
  let episodesBySeason = data.episodes.reduce((all, elem, index) => {
    let val = Object.values(elem)[3];
    if (!all[val]) {
      all[val] = [];
    }
    all[val].push(elem);
    return all;
  }, []);
  return episodesBySeason;
}

/**
 * Functional component to render the season's episodes. The episodes have a Link to redirect the route to the Details component
 * @param {Object} props
 */
const EpisodeListBySeason = (props) => {
  return props.episodes[props.season].map((elem, index) => {
    return (
      <div className="episode-list-container" key={shortid.generate()}>
        <ul className="">
          <li className="d-flex">
            <Link to={`/shows/${props.show_id}/season/${elem.season}/episode/${elem.number}`}>
              <div className="episode">
                <b>{index + 1}.</b> {elem.name}
              </div>
            </Link>
          </li>
        </ul>
      </div>
    );
  });
};

/**
 * Functional component to render the pagination of the seasons, which is set dinamycally according to the
 * backend response. This component use and share the component's state for access and set the currentSeason.
 * @param {Object} props
 */
const Pagination = (props) => {
  let totalSeasons = props.seasons.length - 1;

  function handleGoToSeason(season) {
    console.log("ive been clicked");
    if (season > 0 && season <= totalSeasons) props.setCurrentSeason(season);
  }
  return (
    <div className="pagination-container">
      <div>Seasons</div>
      <ul className="d-flex justify-content-center">
        <li className="page-item" key={shortid.generate()}>
          <a className="page-link" onClick={() => handleGoToSeason(props.currentSeason - 1)}>
            Prev
          </a>
        </li>
        {props.seasons.map((elem, index) => {
          return (
            <li className="page-item" key={shortid.generate()}>
              <a className="page-link" onClick={() => handleGoToSeason(index)}>
                {index}
              </a>
            </li>
          );
        })}
        <li className="page-item" key={shortid.generate()}>
          <a className="page-link" onClick={() => handleGoToSeason(props.currentSeason + 1)}>
            Next
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Show;
