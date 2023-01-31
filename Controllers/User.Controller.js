
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const UserModel = require("../Models/User.Model")


const RegisterUserController = async (body) => {

    const hashPassword = bcrypt.hashSync(body.password, 8)
    body.password = hashPassword
    // console.log({body})

    try {

        const existUser = await UserModel.exists({ email: body.email });
        // console.log({existUser})

        if (!existUser) {
            const createUser = await UserModel.create(body);
            // console.log({createUser})

            if (createUser) {

                const createToken = jwt.sign({ ...createUser }, "SECRET_TOKEN", { expiresIn: "5m" })

                return ({ status: 201, result: { msg: "User Register Successfully", success: true, token: createToken } })
            }

        } else {
            return ({ status: 404, result: { msg: "Email Id Already exist.", success: false } })
        }

    } catch (error) {
        console.log({ error: error.message })

        return ({ status: 500, result: { msg: "Internal Server Error.", success: false } })
    }

}

const LoginUserController = async (body) => {

    try {

        const existUser = await UserModel.findOne({ email: body.email });

        if (existUser) {

            const checkPassword = bcrypt.compareSync(body.password, existUser.password)

            if (checkPassword) {

                const createToken = jwt.sign({ ...existUser }, "SECRET_TOKEN", { expiresIn: "5h" })

                return ({ status: 200, result: { msg: "User Login Successfully", success: true, token: createToken } })

            } else {
                return ({ status: 404, result: { msg: "Invalid Credentials", success: false } })
            }

        } else {
            return ({ status: 404, result: { msg: "Invalid Credentials", success: false } })
        }

    } catch (error) {
        console.log(error)
        return ({ status: 500, result: { msg: "Internal Server Error.", success: false } })
    }



}

const GetAllUserController = async ({ userId }) => {

    try {

        const allUser = await UserModel.find({ _id: { $ne: userId } }, { password: 0 })

        return ({ status: 200, result: { msg: allUser, success: true } })

    } catch (error) {
        console.log(error)
        return ({ status: 500, result: { msg: "Internal Server Error.", success: false } })

    }
}

const GetUserDetailController = async ({ userid }) => {

    try {

        const userDetail = await UserModel.findOne({ _id: userid }, { password: 0 })
        // console.log(userDetail)
        return ({ status: 200, result: { msg: userDetail, success: true } })

    } catch (error) {
        console.log(error)
        return ({ status: 500, result: { msg: "Internal Server Error.", success: false } })

    }
}

const UpdateUserController = async ({ userid, body }) => {

    try {

        const updateUser = await UserModel.findByIdAndUpdate({ _id: userid }, { ...body }, { new: true })

        return ({ status: 200, result: { msg: "User Update Successfully", success: true } })

    } catch (error) {
        console.log(error)
        return ({ status: 500, result: { msg: "Internal Server Error.", success: false } })

    }
}


const DeleteUserController = async (_id) => {

    try {

        const deleteUser = await UserModel.deleteOne({ _id })
        console.log(deleteUser)

        return ({ status: 200, result: { msg: "User Delete Successfully", success: true } })

    } catch (error) {
        console.log(error)
        return ({ status: 500, result: { msg: "Internal Server Error.", success: false } })

    }
}


module.exports = {
    RegisterUserController,
    LoginUserController,
    GetAllUserController,
    DeleteUserController,
    UpdateUserController,
    GetUserDetailController,
    
}