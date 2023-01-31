
const connect = require("../../utils/db");

const {ResetPasswordController} = require("../../Controllers/ForgetPass.Controller")

connect()


export default async function handler(req, res) {

    const { method, body } = req;

    if (method == "POST") {
        const { status, result } = await ResetPasswordController(body)
        res.status(status).json(result)
    } else {
        res.status(504).json({ msg: "Invalid Method" })
    }
    
}