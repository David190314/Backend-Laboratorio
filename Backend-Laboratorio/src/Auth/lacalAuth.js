import passport from "passport"
export const loginLocalAut = passport.authenticate('local',{
    successRedirect: '/home',
    failureRedirect: '/login',
})

