
const {SendMailController, } = require("../../Controllers/ForgetPass.Controller")

export default async function handler(req, res) {

    const { method, body : {email} } = req;

    if (method == "POST") {
       
        const { status, result } = await SendMailController({email})
        res.status(status).json(result)

    } else {
        res.status(504).json({ msg: "Invalid Method" })
    }
   

}