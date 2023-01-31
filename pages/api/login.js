

const connect = require("../../utils/db");
const ApiAuth = require("../../Authentication/ApiAuth")
const { LoginUserController } = require("../../Controllers/User.Controller")



connect()



const login = async (req, res) => {

    const { method, body } = req;

    switch (method) {
        case "POST":
            const { status, result } = await LoginUserController(body)
            res.status(status).json(result)
            break;

        default:
            res.status(504).json({ msg: "Invalid Method", })
            break;
    }


 
}

// export default ApiAuth(login)
export default login

