/* 
to use, use this import statement:
    import message from '.helpers/emailer.js'

then call message(user, horoscope) to email them the horoscope
*/

import nodemailer from 'nodemailer';

//emails a user a horoscope
async function message(user, horoscope, date) {
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'heavenlywritingllc@gmail.com',
          pass: 'Michelleheaven1!'
        }
    });

    let msg = {
        from: 'heavenlywritingllc@gmail.com',
        to: user.username,
        subject: 'Your message from the stars',
        html: 
        `
        <div>
          <h1>Welcome ${user.username}</h1>
          <h2>${date.toLocaleDateString('en-US', { timeZone: 'UTC' })}</h2>
          <q>${horoscope.quote}</q>
          <p>Your Weekly Summary of the Stars: "${horoscope.summary}"</p>
        </div>
        `
    }

    transporter.sendMail(msg, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}

export default message;