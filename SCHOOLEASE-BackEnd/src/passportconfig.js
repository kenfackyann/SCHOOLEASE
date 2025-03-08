const { authenticate } = require("passport")

const localStrategy = require("passport-local").Strategy
function initialize(passport){
    const authenticateUser = (emailAddress,password,done)=>{

    }
    passport.use(new localStrategy({usernameField: 'emailAdress'}),
authenticateUser)
passport.serializeUser((user,done)=>{})
passport.serializeUser((id,done)=>{})

}