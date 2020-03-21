import horoscopeModel from '../models/horoscopeModel.js';

	export const getEntries = async (req, res) => {
		try{
			horoscopeModel.find()
			.then(entries => {
				res.send(entries).status(200); //Send all entries in response
			})
			
		} catch (error) {
			console.error(error);
			res.status(500).send({
				errors: [
					{
						location: 'database',
						msg: 'Database read error'
					}
				]
			})
		}
	}

	export const edit = async(req, res) => {
		//Model example: 
		/*
			{
				sign: 1, 
				house: 1, 
				moonPhase: 1, 
				quote: "This is a quote",	
				quoteAuthor: "Author", 
				quoteSrc: "http://foo.com/blah_blah/",	
				summary: "Wow short summary",
				bestActivities: "Activities",
				moonThemes: "Moon Themes", 
				signThemes: "Sign Themes", 
				houseThemes: "House Themes"
			}
		*/
		try{	
			horoscopeModel.findOneAndUpdate({sign: req.body.sign, house: req.body.house, moonPhase: req.body.moonPhase}, {
				sign: req.body.sign, 
				house: req.body.house, 
				moonPhase: req.body.moonPhase, 
				quote: req.body.quote,	
				quoteAuthor: req.body.quoteAuthor, 
				quoteSrc: req.body.quoteSrc,	
				summary: req.body.summary,
				bestActivities: req.body.bestActivities,
				moonThemes: req.body.moonThemes, 
				signThemes: req.body.signThemes, 
				houseThemes: req.body.houseThemes
			}, {new: true})
			.then(() => {console.log("Updated Successfully")})
		} catch (error) {
			console.error(error);
			res.status(500).send({
				errors: [
					{
						location: 'database',
						msg: 'Database write error'
					}
				]
			})
		}
		res.send('Edit successful').status(200);
	}
	