import React from 'react';
import logo from './logo.svg';
import { Button, AppBar, Toolbar, IconButton, Box } from '@material-ui/core';

import { OnboardingForm } from './features/onboardingForm/OnboardingForm';
import { HomePage } from './features/homePage/HomePage';
import { Dashboard } from './features/dashboard/Dashboard';

import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';

import { loggedIn } from './features/users/userSlice';

import HomeIcon from '@material-ui/icons/Home';

import { 
	BrowserRouter as Router,
	Link as RouterLink,
	Switch,
	Route,
} from 'react-router-dom';
import './App.css';

const useStyles = makeStyles({
	root: {
		background: 'rgb(40, 40, 40)',
	},
});

function App() {

	const navClasses = useStyles();
	const userLoggedIn = useSelector(loggedIn);

  	return (
		<Router>
			<Box className="App"
			display="flex"
			flexDirection="column"
				flexGrow={1}>
				<AppBar
					classes={{
						root: navClasses.root,
					}}
					position="static">
					<Box component={Toolbar}
					display="flex"
					justifyContent="space-between">
						{/*Need to update navbar to create a dashboard link if user is "logged in". Need to update redux store to account for user state. Also need home link. See if you have time to add that.*/}
						<IconButton
							edge="start"
							component={RouterLink}
							to="/"
							color="inherit"
						>
							<HomeIcon />
						</IconButton>

						{userLoggedIn ? 
								<Button
									component={RouterLink}
									to="/dashboard"
									color="inherit"
								>Dashboard</Button>
							:
							<Button 
								component={RouterLink} 
								to="/onboarding" 
								color="inherit">Sign up</Button>}
								
					</Box>
				</AppBar>
				<Switch>
					<Route path="/onboarding">
						<OnboardingForm />
					</Route>
					<Route path="/dashboard">
						<Dashboard />
					</Route>
					<Route path="/">
						<HomePage />
					</Route>
				</Switch>

			<Box 
				display="flex" 
				flexDirection="column" 
				alignItems="center" 
				className="footer">
				<p>App created by Christopher Tiller</p>
			</Box>
			</Box>
	  </Router>
  );
}

export default App;
