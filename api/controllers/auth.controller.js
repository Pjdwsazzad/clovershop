const Admin = require("../models/admin.model")
const config = require("../../config/index")
const jwt = require("jsonwebtoken")

async function registerAdministrator(req, res) {
    const { firstName, lastName, email, password } = req.body

    const admin = new Admin({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
    })

    await admin.save()
    .then(function() {
        console.log(`[CloverShop]: Administrator with the email ${email} has been created.`)
        return res.status(200)
    })
    .catch(function(err) {
        console.log(err)
        return res.status(400).json({message: "Could not create a new administrator"})
    })
}

async function authorizeAdministrator(req, res) {
    const { email, password } = req.body
    const admin = await Admin.findOne({email: email, password: password})

    if(!admin)
        return res.status(401).json({message: "Incorrect email or password"})

    else {
        const token = jwt.sign({_id: admin._id}, config.SERVER_SESSION_SECRET_KEY)
        res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000 // store cookie for one day
        })

        return res.status(200).json({message: "Ok"})
    }
}

async function deauthorizeAdministrator(req, res) {
    res.cookie("jwt", "", {
        maxAge: 0
    })
    return res.status(200)
}

async function getAdministratorInformation(req, res) {
    try {
        const cookie = req.cookies["jwt"]

        if(!cookie)
            return res.status(401)

        const auth = jwt.verify(cookie, config.SERVER_SESSION_SECRET_KEY)

        if(!auth)
            return res.status(401)

        const admin = await Admin.findOne({_id: auth._id})
        return res.json({
            firstName: admin.firstName,
            lastName: admin.lastName,
            email: admin.email
        })
    } 
    catch(e) {
        console.log(e)
        return res.status(401)
    }
}

module.exports = {
    registerAdministrator,
    authorizeAdministrator,
    deauthorizeAdministrator,
    getAdministratorInformation
}