
const connect = require("../../../utils/db");
const ApiAuth = require("../../../Authentication/ApiAuth")
const { GetAllUserController } = require("../../../Controllers/User.Controller")

connect()


async function handler(req, res) {

    const { method } = req;

    if (method == "GET") {
        const { status, result } = await GetAllUserController(req)
        res.status(status).json(result)
    } else {
        res.status(504).json({ msg: "Invalid Method" })
    }

}

export default ApiAuth(handler)