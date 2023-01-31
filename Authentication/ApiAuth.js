
const jwt = require("jsonwebtoken");

function ApiAuth(handler) {

  return (req, res) => {

    const {  headers: { authorization } } = req;
    // console.log(authorization)

    if (authorization) {
      try {

        const checkUser = jwt.verify(authorization, "SECRET_TOKEN")
        // console.log(checkUser._doc._id)
        req.userId = checkUser._doc._id
        return handler(req, res)
  
  
      } catch (error) {
        // console.log(error.message)
        res.status(401).json({ msg: error.message })
      }
    } else {
      res.status(401).json({ msg: "invalid user" })
      
    }

  }

}

module.exports = ApiAuth