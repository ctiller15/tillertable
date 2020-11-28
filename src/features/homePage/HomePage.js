import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

export const HomePage = (props) => {
	return (
		<React.Fragment>
			<h1>Your equity, visualized</h1>

			<section>
				<h2>Get your equity together</h2>
			
				<p>Tillertable is a world-class equity management software used by over <i>one billion</i> startups. It does quite literally everything*</p>
			</section>

			<section>
				<h2>All of your needs in one place</h2>

				<p>With Tillertable you can view all of your individual shareholders and visualize their stake in the company. You get exactly what you need.</p>
			</section>

			<section>
				<h2>What are other people saying?</h2>

				<p>"Since I started using Tillertable it's been really easy to keep track of what's going on.</p>

				<p>"I'll say I've used a ton of tabling software. This is by far the best with zero competition. Absolutely none."</p>

				<p>"You won't believe that it was only made in two days!"</p>
			</section>


			<RouterLink to="/onboarding">Try it now</RouterLink>
		
			<section></section>

		</React.Fragment>
	)
}
