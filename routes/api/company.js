const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

// Load input validation
const validateRegisterInputCompany = require("../../validation/registerCompany");
const validateLoginInput = require("../../validation/login");

// Load User Model
const companyModel = require("../../models/Company");
const passport = require("passport");

router.post("/getprofile", (req, res) => {
    jwt.verify(req.body.token, keys.secretOrKey, function (err, decoded) {
        if (err) {
            return res
                .status(200)
                .json({ success: false, message: "Unable to fetch profile" });
        }
        if (decoded) {
            const id = decoded.id;
            companyModel.findOne({ _id: id, is_deleted: false }).then((user) => {
                if (user) {
                    return res
                        .status(200)
                        .json({
                            success: true,
                            data: user,
                            message: "Here you go good sir",
                        });
                } else {
                    return res
                        .status(200)
                        .json({ success: false, message: "Unable to fetch profile" });
                }
            });
        }
    });
});


//Get Profile By Email
router.post("/getprofilebyemail", (req, res) => {
    companyModel.findOne({ email: req.body.email, is_deleted: false }).then((user) => {
        if (user) {
            return res.status(200).json({
                success: true,
                data: user,
                message: "Here you go good sir",
            });
        } else {
            return res
                .status(200)
                .json({ success: false, message: "Unable to fetch profile" });
        }
    });
});


//Register User
router.post("/register", (req, res) => {
    const { errors, isValid } = validateRegisterInputCompany(req.body);
    // Check validation
    if (!isValid) {
        return res
            .status(200)
            .json({ success: false, error: errors, message: "Invalid Data Entered" });
    }

    companyModel.findOne({ email: req.body.email, name: req.body.name }, (err, user) => {
        if (user) {
            return res
                .status(200)
                .json({ success: false, message: "Email already in use!" });
        } else {
            const newUser = new companyModel({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            });

            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then((user) => {
                            console.log(user);
                            res.status(200).json({
                                success: true,
                                error: false,
                                user: user,
                                message: "User successfully registered!",
                            })
                        }
                        )
                        .catch((err) => {
                            return res
                                .status(200)
                                .json({ success: false, message: "Please try agin later" });
                        });
                });
            });
        }
    });
});

router.get("/log", (req, res) => {
    return res.status(400).json({ message: "We good to go!" });
})

router.post("/login", (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    // Check validation
    if (!isValid) {
        return res.status(200).json({ message: "Invalid Data Entered" });
    }
    const email = req.body.email;
    const password = req.body.password;

    // Find User by email
    companyModel.findOne({ email: email, is_deleted: false }).then((user) => {
        // Check if user exists
        if (!user) {
            return res.json({ success: false, message: "Email not found!" });
        }
        // Check password
        bcrypt.compare(password, user.password).then((isMatch) => {
            if (isMatch) {
                // User matched, create jwt payload
                const payload = {
                    id: user._id,
                    name: user.name,
                };

                // Sign token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    { expiresIn: 31556926 },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: token,
                        });
                    }
                );
            } else {
                return res.json({ success: false, message: "Password incorrect!" });
            }
        });
    });
});

// Update user password
router.post("/updatepassword", (req, res) => {
    const { email, currPassword, newPassword } = req.body;

    companyModel.findOne({ email: email, is_deleted: false }, (err, doc) => {
        if (err) {
            return res.status(400).json({
                error: true,
                message: "Unable to update password!",
            });
        } else if (!doc) {
            return res.status(200).json({
                error: false,
                message: "User not found!",
            });
        } else {
            bcrypt.compare(currPassword, doc.password).then((isMatch) => {
                if (isMatch) {
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newPassword, salt, (err, hash) => {
                            if (err) throw err;
                            companyModel.findOneAndUpdate(
                                { email: email },
                                { password: hash },
                                (err, newDoc) => {
                                    if (err) {
                                        return res.status(400).json({
                                            error: true,
                                            message: err.message,
                                            data: err,
                                        });
                                    } else {
                                        return res.status(200).json({
                                            error: false,
                                            data: newDoc,
                                            message: "Password updated successfully!",
                                        });
                                    }
                                }
                            );
                        });
                    });
                } else {
                    return res.status(401).json({
                        error: true,
                        message: "Old password is incorrect!",
                    });
                }
            });
        }
    });
});

// Update name of user
router.post("/updatename", (req, res) => {
    const { email, firstname, lastName } = req.body;

    companyModel.findOneAndUpdate(
        { email: email, is_deleted: false },
        { name: firstname + " " + lastName, firstName: firstname, lastName: lastName },
        (err, doc) => {
            if (err) {
                return res.status(400).json({
                    error: true,
                    message: err.message,
                    data: err,
                });
            } else {
                return res.status(200).json({
                    error: false,
                    message: "Name updated successfully!",
                });
            }
        }
    );
});

module.exports = router;
