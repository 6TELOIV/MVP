import horoscopeModel from '../models/horoscopeModel.js';

	export const getEntries = async (req, res) => {
		try{
			//console.log(req.session.passport.user);
			horoscopeModel.find()
			.then(entries => {
				let revisedArray = [];
				entries.forEach(entry=>{
					let revEntry = {
						sign: entry.sign, 
						house: entry.house, 
						moonPhase: entry.moonPhase, 
						quote: entry.quote,	
						quoteAuthor: entry.quoteAuthor, 
						quoteSrc: entry.quoteSrc,	
						summary: entry.summary,
						bestActivities: entry.bestActivities,
						moonThemes: entry.moonThemes, 
						signThemes: entry.signThemes, 
						houseThemes: entry.houseThemes
					}
					revisedArray = [...revisedArray, revEntry];
				})
				res.send(revisedArray).status(200); //Send all entries in response
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

	export const reset = async (req, res) => {
		try{
			if(!(req.body.resetPassword === "Heavenly Writing")) {
				res.status(500).send({
					errors: [
						{
							location: 'password',
							msg: 'Incorrect reset password. Reset failed'
						}
					]
				})
				return;
				
			}

			horoscopeModel.deleteMany()
			.then(() => {
				let counter = 0;
				let docArray = [1152];
				for (let i = 1; i <= 12; i++) {
					for (let j = 1; j <= 12; j++) {
						for (let k = 1; k <= 8; k++) {
							let newEntry = {
								sign: i, 
								house: j, 
								moonPhase: k, 
								quote: "Placeholder quote",	
								quoteAuthor: "Placeholder quote author", 
								quoteSrc: "http://www.placeholderWebsite.com",	
								summary: "Placeholder summary",
								bestActivities: "Placeholder best activities",
								moonThemes: "Placeholder moon themes", 
								signThemes: "Placeholder sign themes", 
								houseThemes: "Placeholder house themes"
							}
							docArray[counter++] = newEntry;
						}
					}	
				}
				horoscopeModel.insertMany(docArray)
				.then(entries => {
					console.log(entries.length + " Entries reset")
				})
				res.send("Success").status(200); //Send all entries in response
			})
			
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
	}
	
