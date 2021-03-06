const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const keys = require("../../config/keys");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const passport = require("passport");
const validateRegisterInput = require("../../validations/register");
const validateLoginInput = require("../../validations/login");
const { use } = require("passport");

router.get("/", async (req, res) => {
  const users = await User.find({})
  res.json(users)
});
const selectSessionFields = (user) => {
  return { 
    _id: user._id,
    fullName: user.fullName,
    email: user.email,
    initials: user.initials
  }
}

const selectUserFields = (user) => {
  return {
    _id: user._id,
    email: user.email,
    fullName: user.fullName,
    initials: user.initials,
    boards: user.boards,
    starredBoards: user.starredBoards,
    bio: user.bio
  };
}

router.post('/signup', (req, res) => {
  const {
    errors,
    isValid
  } = validateRegisterInput(req.body);
  
  if (!isValid) {
    return res.status(404).json(errors);
  };

  User.findOne({
    email: req.body.email
  }).then(user => {
    if (user) {
      return res.status(400).json({ email: "There is an account associated with this email" })
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
            .then((user) => {
              const payload = selectSessionFields(user);
              jwt.sign(payload, keys.secretOrKey, {
                expiresIn: 3600
              }, (err, token) => {

                return res.json({
                  success: true,
                  token: "Bearer " + token,
                  user
                });
              });
            })
            .catch(err => res.status(404).json(err));
        })
      })
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

  var userWithEmail = User.findOne({ email });
  userWithEmail.exec().then(function (user) {
    // handle success
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = selectSessionFields(user);

        jwt.sign(payload, keys.secretOrKey, {
          expiresIn: 3600
        }, (err, token) => {
          return res.json({
            success: true,
            token: "Bearer " + token,
            user: payload
          })
        });
      } else {
        errors.password = "Incorrect password";
        return res.status(404).json(errors);
      };
    });
  }).catch(function (err) {
    // handle error
    errors.email = "There isn't an account for this username";
    return res.status(404).json(errors);
  });
});

router.get("/:id", (req, res) => {
  User
    .findById(req.params.id)
    .populate("boards")
    .populate([
      { 
        path: "boards", 
        model: "Board", 
        populate: {
          path: "background",
          model: "Background"
        }
      }
    ])
    .exec(function (err, user) {
      if (err) return res.status(404).json({
        nouserfound: "No user found with that id"
      });

      const userObj = selectUserFields(user);
      res.json(userObj);
    });
});

module.exports = router;
