

const { RegisterUserController } = require("../../Controllers/User.Controller")
const connect = require("../../utils/db")

connect()

const register = async (req, res) => {

    const { method, body } = req;

    switch (method) {
        case "POST":
            const { status, result } = await RegisterUserController(body)
            res.status(status).json(result)
            break;

        default:
            res.status(504).json({ msg: "Invalid Method", })
            break;
    }

}

export default register