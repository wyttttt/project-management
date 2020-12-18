import React from 'react';
import { HashRouter as Router, Redirect, Route,  Switch } from 'react-router-dom'
import { Header } from './pages/Home';
import Routes from './router.config';

function PrivateRoute({ component:Com, ...rest }) {
	return (
	  <Route
		{...rest}
		render={({ location }) =>
		   localStorage.getItem('user')
		   ?<Com {...rest} /> 
		   : (
			<Redirect
			  to={{
				pathname: "/login",
				state: location 
			  }}
			/>
		  )
		}
	  />
	);
  }
export const RouteWithSubRoutes=(route)=> {
	if(route.pri){
		return <PrivateRoute {...route}  routes={route.routes}></PrivateRoute>
	}else{
		return (
			<Route
			  path={route.path}
			  render={props => (
				<route.component {...props} routes={route.routes} />
			  )}	
			/>
		  );

	}
  }

  const App = ()=>{
	return <Router>
		<Header/>
		<Switch>
			{
				Routes.map(({...rest})=>{
					return <RouteWithSubRoutes {...rest}/>
				})
			}
			
		</Switch>
		</Router>
}
export default App;
