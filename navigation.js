import React from "react";
import './App.css';
import Node1 from './assets/screens/node1'
import Februar from './screens/februar'



import Home from './screens/home'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


export default function Navigation() {
    return (
        <Router >
            
            <header>
            </header>
          
                <div>

                    <div className="NavbarIcons">
                        <Link to="/">Zurück</Link>

                        <Link to="/Node1" > </Link>

                        <Link to="/februar" ></Link>

                    </div>



                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route path="/Node1">
                            <Node1 />
                        </Route>
                        <Route path="/februar">
                            <Februar />
                        </Route>
                        
                    </Switch>
                </div>
               

        </Router>


    );
}



const styles = {};

   styles.NavbarIcons = {
    textDecoration: 'none',
   }