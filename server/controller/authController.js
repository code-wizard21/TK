const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const db = require("../models");
const axios = require('axios');
require('dotenv').config();
const Userlist = db.userlist;
const verifyCaptcha = async (token) => {
  const verificationURL = `https://www.google.com/recaptcha/api/siteverify`;
  
  try {
    const response = await axios.post(verificationURL, null, {
      params: {
        secret: process.env.CAPTCHA_SECRET,
        response: token
      },
    });

    if (response.data.success) {
      // Verification successful
      console.log('reCAPTCHA verification successful:', response.data);
      // You can also check 'response.data.score' to see the score for this request
      // and take action based on that score
    } else {
      // Verification failed
      throw 'reCAPTCHA verification failed:' + response.data['error-codes'];
    }
  } catch (error) {
    throw 'Error verifying reCAPTCHA:' + error;
  }
};
exports.Register = async (req, res) => {
  try {
    const verifresp = await fetch("https://www.google.com/recaptcha/api/siteverify");
  } catch(e) {}
  // Create a Userlist
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const userlist = {
    Name: req.body.name,
    Email: req.body.email,
    Password: hashedPassword,
    Job: "customer",
    PhoneNumber: req.body.phone,
  };
  // Save Tutorial in the database
  Userlist.create(userlist)
    .then((data) => {
      // console.log(data.dataValues)

      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the userlist.",
      });
    });
};

exports.getCustomer = async (req, res) => {
  const customer = await Userlist.findAll({
    where: {
      Job: "customer",
    },
  });
  res.send(customer);
};

exports.signin = async (req, res) => {
  try {
    console.log(req.body);
    console.log(process.env.CAPTCHA_SECRET);
    try {
      await verifyCaptcha(req.body.token);
    } catch(e) {
      return res.send({ error: e, status: 500});
    }
    const user = await Userlist.findOne({
      where: { Email: req.body.Email },
    });
    if (!user) {
      return res.send({ error: "User not found", status: 400 });
    }
    const isPasswordValid = await bcrypt.compare(
      req.body.Password,
      user.Password
    );
    if (!isPasswordValid) {
      return res.send({ error: "Invalid password", status: 400 });
    }
    const token = jwt.sign(
      {
        email: user.Email,
        birthday: user.Birthday,
        job: user.Job,
        name: user.Name,
      },
      "secret"
    );
    res.send({ token, status: 200 });
  } catch (err) {
    res.send({err})
  }
};
exports.authUpdate = async (req, res) => {
  const id = req.body.id;
  const { Name, Email } = req.body;

  try {
    const user = await Userlist.update(
      { Name, Email },
      {
        where: {
          id: id,
        },
      }
    );
    // const tablelist = await Userlist.findAll({});
    // console.log(tablelist)
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.authDelete = async (req, res) => {
  const id = req.body.id;
  try {
    const user = await Userlist.destroy({
      where: {
        id: id,
      },
    });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.deleteItemCustom = async (req, res) => {
  console.log(req.body);

  const id = req.body.id;
  try {
    const user = await Userlist.destroy({
      where: {
        id: id,
      },
    });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
