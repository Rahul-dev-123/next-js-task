
const jwt = require("jsonwebtoken")
const connect = require("../../utils/db")

connect()

const  {LoginUserController} = require("../../Controllers/User.Controller")


const login = async (req, res) => {

    const { method, body } = req;

    switch (method) {
        case "POST":
            const { status, result } = await LoginUserController(body)
            res.status(status).json(result)
            break;

        default:
            break;
    }


    // const createToken = jwt.sign(req.body, "SECRET_TOKEN", { expiresIn: "5m" })
    // console.log(createToken)
    // res.status(200).json({ msg: 'Login SucccessFully', token: createToken, success: true })
}

export default login