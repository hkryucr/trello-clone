const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const keys = require("../../config/keys");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const passport = require("passport");
const validateRegisterInput = require("../../validations/register");
const validateLoginInput = require("../../validations/login");
// const fs = require("fs");

router.get("/", async (req, res) => {
  const users = await User.find({})
  res.json(users)
});

router.post('/register', (req, res) => {
  User.findOne({
    email: req.body.email
  }).then(user => {
    if (user) {
      return res.status(400).json({
        email: "A user is already registered with that email"
      })
    } else {
      const newUser = new User({
        email: req.body.email,
        password: req.body.password,
        initials: req.body.initials,
        fullName: req.body.fullName,
        bio: req.body.bio
      })

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save()
            .then((user) => res.json(user))
            .catch(err => console.log(err));
        })
      })

      newUser.save().then(user => res.send(user)).catch(err => res.send(err));
    }
  });
})

router.post("/login", (req, res) => {
	const {
		errors,
		isValid
	} = validateLoginInput(req.body);

	if (!isValid) {
		return res.status(404).json(errors);
	};

	const {
		email,
		password
	} = req.body

	User.findOne({
		email
	})
	.then(user => {
		if (!user) {
			errors.email = "This email does not exist";
			return res.status(404).json(errors);
		};
		console.log("login success");

		bcrypt.compare(password, user.password).then(isMatch => {
			if (isMatch) {
				// const payload = selectFields(user);
        const payload = {
          id: user.id,
          email: user.email 
        };

				jwt.sign(payload, keys.secretOrKey, {
					expiresIn: 3600
				}, (err, token) => {
          console.log("Login success");
          return res.json({
            success: true,
            token: "Bearer " + token,
            user: payload
          })
				});
			} else {
				errors.password = "Incorrect passwrd";
				return res.status(404).json(errors);
			};
		});
	});
});

// router.get("/deleteAll", async (req, res) => {
//   User.deleteMany({}, function (err) {
//     console.log("User collection removed");
//     User.find().then(users => {
//       res.json(users);
//     });
//   });
// });

router.get("/:id", (req, res) => {
  User
    .findById(req.params.id)
    .populate("boards")
    .exec(function (err, user) {
      if (err) return res.status(404).json({
        nouserfound: "No user found with that id"
      });
      res.json(user);
    });
});

module.exports = router;
