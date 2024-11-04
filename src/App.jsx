import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import JobList from './Component/JobList'
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
 

  return (
    <>
     
     {/* <div className="App"> */}
        {/* <h1>Job Listings</h1> */}
        <JobList/>
      {/* </div> */}
    </>
  )
}

export default App
