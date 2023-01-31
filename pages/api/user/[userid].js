
const connect = require("../../../utils/db");
const ApiAuth = require("../../../Authentication/ApiAuth")
const { DeleteUserController, UpdateUserController, GetUserDetailController } = require("../../../Controllers/User.Controller")


connect()

async function handler(req, res) {

    const { method, query: { userid }, body } = req;
   
    switch (method) {
        case "GET":

            var  { status, result } = await GetUserDetailController({ userid : userid == 0 ? req.userId : userid  })
            res.status(status).json(result)

            break;

        case "PUT":
            var { status, result } = await UpdateUserController({ userid, body })
            res.status(status).json(result)
            break;

        case "DELETE":
            var { status, result } = await DeleteUserController(userid)
            res.status(status).json(result)
            break;

        default:
            res.status(504).json({ msg: "Invalid Method", })
            break;
    }


}

export default ApiAuth(handler)