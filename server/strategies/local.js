import userModel from '../models/userModel.js';
import passportLocal from 'passport-local'


const LocalStrategy = passportLocal.Strategy;
const strategy = new LocalStrategy(
	function(username, password, done) {
		userModel.findOne({ username: username }, (err, user) => {
			if (err) {
				return done(err)
			}
			if (!user) {
				return done(null, false, { message: 'Incorrect username' })
			}
			if (!user.checkPassword(password)) {
				return done(null, false, { message: 'Incorrect password' })
            }
			return done(null, user)
		})
	}
)

export default strategy;