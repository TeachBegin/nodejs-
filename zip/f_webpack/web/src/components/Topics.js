import React from 'react';
import {Route,Link} from 'react-router-dom'

const Topics=({match})=>{
  return(
    <div>
      <h2>Topics</h2>
      <ul>
        <li>
          <Link to={`${match.url}/rendering`}>
            Rendering with React
          </Link>
        </li>
        <li>
          <Link to={`${match.url}/components`}>
            Components
          </Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>
           props v.state
          </Link>
        </li>
      </ul>

      <Route path={`${match.url}/:topics`}component={Topic}/>
      <Route exact path={match.url} render={()=>(
        <h3>Please select a topic.</h3>
      )}/>
    </div>
  )}

const Topic =({match})=>(
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)

export default Topics
