import React, {useState} from 'react'
import {folders} from '../helper/folders'
import Folder from './Folder';

const Home = () => {

  const [expanded, setIsExpanded] = useState(new Set([]));
  const [data, setData] = useState(folders);

  return (<>
    <div className="home-container">
      <Folder folder={data} expanded={expanded} setIsExpanded= {setIsExpanded} parentPath={''} setData={setData}/>
    </div>  
    </>
  )
}

export default Home;