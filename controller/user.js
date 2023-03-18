const { UserModel } = require("../models/user.model");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const salt = +process.env.salt;

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userexists = await UserModel.findOne({ email });

    if (userexists) {
      return res
        .status(409)
        .send({ message: "User already exists , Please Login" });
    }

    bcrypt.hash(password, salt, async (err, hash) => {
      if (err) {
        console.log(err);
        return res.status(401).send({ Error: err });
      } else {
        const user = await new UserModel({ name, email, password: hash });
        user.save();
        res.status(201).send({ message: "User registered sucessfully" });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ Error: "Something went wrong" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .send({ message: "User dosen't exists, Please Signup" });
    } else {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          console.log(err);
          return res.status(401).send({ Error: err });
        }

        if (result) {
          const UserId = user._id;
          console.log(UserId);
          const name = user.name;
          const token = jwt.sign(
            { UserId, name, email },
            process.env.Tokensecret,
            { expiresIn: 60 * 60 * 24 * 7 }
          );
          res.cookie("token", token);
          res.status(201).send({ message: "Login Sucessful", token });
        } else {
          res
            .status(401)
            .send({ message: "Incorrect credentials , Please login again" });
        }
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ Error: "Something went wrong" });
  }
};

exports.dashboard = async (req, res) => {
  try {
    const UserId = req.body.UserId
    const userData = await UserModel.aggregate({$match : {_id : UserId}},{
        $lookup : {
            from : 'Booking',
            localField : '_id',
            foreignField : 'user',
            as : 'bookings'
        }
    })
    res.status(200).send({message : "User Data" , userData})
  } catch (err) {
    console.log(err);

    res.status(500).send({ Error: "Something went wrong" });
  }
};
