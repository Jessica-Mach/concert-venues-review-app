import React, { useState, useEffect } from "react";
import { Switch, Route, Link, Redirect } from "react-router-dom";

import ConcertVenueForm from "./ConcertVenueForm";
import VenueIndex from "./VenueIndex.js";
import Admin from "./Admin";
import EditVenue from "./EditVenue";
import VenueShow from "./VenueShow.js";

const NavBar = (props) => {
  
  return (
    <div>
      <div className="header">
        <div className="left">
          <Link to="/">
            <h1 className="coName">'Live' From Here</h1>
          </Link>
        </div>
        
        <div className="right">
          <nav>
            <Link to="/concert-venues">Venues</Link>|
            <Link to="/concert-venues/new">Add Venue</Link>
          </nav>
        </div>
      </div>
     
      <Switch>
        <Route exact path="/">
          <Redirect to="/concert-venues" />
        </Route>
        <Route exact path="/concert-venues" component={VenueIndex} />
        <Route exact path="/concert-venues/new" component={ConcertVenueForm} />
        <Route exact path="/admin/concert-venues" component={Admin} />
        <Route exact path="/admin/:id" component={EditVenue} />
        <Route exact path="/concert-venues/:id" component={VenueShow} />
      </Switch>
  
    </div>
  )
}

export default NavBar;
