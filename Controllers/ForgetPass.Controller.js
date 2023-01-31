
const nodemailer = require('nodemailer');
const UserModel = require("../Models/User.Model")
const bcrypt = require("bcrypt")

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'melyna.green32@ethereal.email',
        pass: 'tHCBVvKwcp6Z7uC5bs'
    }
});





const SendMailController = async ({ email }) => {

    try {

        const existUser = await UserModel.findOne({ email }, { password: 0 })
        console.log(existUser)

        if (existUser) {

            let otp = Math.floor(100000 + Math.random() * 900000);

            const mailOptions = {
                from: 'melyna.green32@ethereal.email', // sender address
                to: email, // list of receivers
                subject: "Reset Password", // Subject line
                text: `Your otp for reset your password is ${otp}`, // plain text body
                html: `<p>Your otp for reset your password is <b>${otp}</b>`, // html body
            };

            const sendmail = await transporter.sendMail(mailOptions);

            if (sendmail.response.includes("Accepted")) {
                return ({ status: 200, result: { msg: "Mail sent.", otp, userid: existUser._id, success: true } })
            } else {
                return ({ status: 404, result: { msg: "Something went wrong", success: false } })
            }

        } else {
            return ({ status: 404, result: { msg: "Email Id does not exist", success: false } })
        }

    } catch (error) {
        console.log(error)
        return ({ status: 500, result: { msg: "Internal Server Error.", success: false } })

    }


}


const ResetPasswordController = async ({userId,password}) => {

    const hashPassword = bcrypt.hashSync(password, 8)
  
    try {

        const updateUser = await UserModel.findOneAndUpdate({ _id : userId }, { password: hashPassword })
        return ({ status: 200, result: { msg: "Password Update successfully.", success: true } })

        
    } catch (error) {
        console.log(error)
        return ({ status: 500, result: { msg: "Internal Server Error.", success: false } })
    }
}


module.exports = {
    SendMailController,
    ResetPasswordController
}