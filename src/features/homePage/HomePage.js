import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box , Grid, Button } from '@material-ui/core';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import EqualizerOutlinedIcon from '@material-ui/icons/EqualizerOutlined';
import Carousel from 'react-material-ui-carousel';

export const HomePage = (props) => {
	const userData = [
		{
			name: "Chelsy Horne",
			text: "\"Since I started using Tillertable it's been really easy to keep track of what's going on.\""
		},
		{
			name: "Kalvin Andrews",
			text: "\"I'll say I've used a ton of tabling software. This is by far the best with zero competition. Absolutely none.\""
		},
		{
			name: "Willie Boyce",
			text: "\"You won't believe that it was only made in two days!\""
		},
	];

	return (
		<React.Fragment>
			<section className="banner-hero">
				<h1>Your equity, visualized</h1>
			</section>

			<section className="intro">
				<h2>Get your equity together</h2>
			
				<section className="intro-text">
				<p>Tillertable is a world-class equity management software used by over <i>one billion</i> startups. It does quite literally everything*</p>

				<p className="fine-print">*Tillertable does not, in fact, do literally everything.</p>
				</section>

			</section>

			<section className="details">
				<h2>All of your needs in one place</h2>

				<p>With Tillertable you can view all of your individual shareholders and visualize their stake in the company. You get exactly what you need.</p>

				<Grid 
					component="section" 
					container 
					className="features">
					<Grid 
						component="section" 
						item 
						xs={12} 
						md={4}>
						<h3>Add equity</h3>
						<MonetizationOnOutlinedIcon 
							style={{fontSize: 100}}/>
						<p>Whether a investor, founder, or employee, we've got all your holders covered.</p>
					</Grid>
					<Grid 
						component="section" 
						item 
						xs={12} 
						md={4}>
							<h3>Adjust</h3>
							<EditOutlinedIcon style={{fontSize: 100}}/>
							<p>Things change. We get that. That's why you can edit any parameter you want. Made a typo? No worries.</p>
					</Grid>
					<Grid 
						component="section" 
						item 
						xs={12} 
						md={4}>
							<h3>Visualize</h3>
								<EqualizerOutlinedIcon 
									style={{fontSize: 100}} />
							<p>Curious about how much stake your investors have? We've got you covered with powerful visualizations down to the individual person.</p>
					</Grid>
				</Grid>
			</section>

			<section className="testimonials">
				<h2>What are other people saying?</h2>

				<Carousel>
					{
						userData.map( (item, ind) => (
							<Box 
								key={ind} 
								display="flex" 
								flexDirection="column" justifyContent="center" alignItems="center">
								<h2>{item.name}</h2>
								<p>{item.text}</p>
							</Box>))
					}
				</Carousel>
			</section>

			<Box 
				display="flex"
				flexDirection="column"
				justifyContent="center"
				alignItems="center"
				className="call-to-action">
				<p>Change your captabling experience forever.</p>
				<Button 
					component={RouterLink} 
					to="/onboarding" 
					variant="contained" 
					color="primary">Try it now</Button>
			</Box>
			<Box 
				display="flex" 
				flexDirection="column" 
				alignItems="center" 
				className="footer">
				<p>App created by Christopher Tiller</p>
			</Box>
		</React.Fragment>
	)
}
