const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

// Load User Model
const userModel = require("../../models/User");

// Send Follow Request
router.post("/sendfollowrequest", (req, res) => {
    const { emailofuser, emailoftarget } = req.body;
    let user = null;
    let target = null;
    user_request = {
        user: {},
        my_handshake: true,
        target_handshake: false,
    }
    target_request = {
        user: {},
        my_handshake: false,
        target_handshake: true,
    }
    userModel.findOne(
        { email: emailofuser, is_deleted: false },
        (err, doc) => {
            if (err) {
                return res.status(400).json({
                    error: true,
                    message: err.message,
                    data: err,
                });
            } else if (doc === null) {
                return res.status(400).json({
                    error: true,
                    message: "Inavlid Email Address",
                });
            } else {
                user = doc;
                userModel.findOne(
                    { email: emailoftarget, is_deleted: false },
                    (err, doc) => {
                        if (err) {
                            return res.status(400).json({
                                error: true,
                                message: err.message,
                                data: err,
                            });
                        } else if (doc === null) {
                            return res.status(400).json({
                                error: true,
                                message: "Inavlid Email Address",
                            });
                        } else {
                            target = doc;
                            let already = false
                            user.requests_sent.map((item) => {
                                if (item.user.email === target.email) already = true;
                            })
                            user.following.map((item) => {
                                if (item.email === target.email) already = true;
                            })
                            target.requests_recieved.map((item) => {
                                if (item.user.email === user.email) already = true;
                            })
                            target.followers.map((item) => {
                                if (item.email === user.email) already = true;
                            })
                            if (!already) {
                                user_request.user = {
                                    name: target.name,
                                    email: target.email,
                                    _id: target._id,
                                    avatar_url: target.avatar_url
                                }
                                target_request.user = {
                                    name: user.name,
                                    email: user.email,
                                    _id: user._id,
                                    avatar_url: user.avatar_url
                                }
                                user.requests_sent.push(user_request);
                                target.requests_recieved.push(target_request);
                                user.save().then(savedDoc => {
                                    user = savedDoc;
                                    target.save().then(savedDoc => {
                                        return res.status(400).json({
                                            error: false,
                                            message: "Request Sent",
                                            user: user,
                                            target: savedDoc,
                                        });
                                    })
                                })
                            }
                            else {
                                return res.status(400).json({
                                    error: false,
                                    message: "Request already sent and pending approval",
                                });
                            }
                        }
                    }
                );
            }
        }
    );
});

// Accept Follow Request
router.post("/acceptfollowrequest", (req, res) => {
    const { emailofuser, emailoftarget } = req.body;
    let user = null;
    let target = null;
    userModel.findOne(
        { email: emailofuser, is_deleted: false },
        (err, doc) => {
            if (err) {
                return res.status(400).json({
                    error: true,
                    message: err.message,
                    data: err,
                });
            } else if (doc === null) {
                return res.status(400).json({
                    error: true,
                    message: "Inavlid Email Address",
                });
            } else {
                user = doc;
                userModel.findOne(
                    { email: emailoftarget, is_deleted: false },
                    (err, doc) => {
                        if (err) {
                            return res.status(400).json({
                                error: true,
                                message: err.message,
                                data: err,
                            });
                        } else if (doc === null) {
                            return res.status(400).json({
                                error: true,
                                message: "Inavlid Email Address",
                            });
                        } else {
                            let error1 = true;
                            let error2 = true;
                            let error3 = true;
                            let error4 = true;
                            target = doc;
                            let target_object = {
                                name: target.name,
                                email: target.email,
                                _id: target._id,
                                avatar_url: target.avatar_url
                            }
                            let user_object = {
                                name: user.name,
                                email: user.email,
                                _id: user._id,
                                avatar_url: user.avatar_url
                            }
                            user.requests_recieved.map((item) => {
                                if (item.user.email === emailoftarget && !item.my_handshake) { item.my_handshake = true; error1 = false; }
                            })
                            target.requests_sent.map((item) => {
                                if (item.user.email === emailofuser && !item.target_handshake) { item.target_handshake = true; error2 = false; }
                            })
                            if (user.followers.indexOf(target_object) === -1) { user.followers.push(target_object); error3 = false; }
                            if (target.following.indexOf(user_object) === -1) { target.following.push(user_object); error4 = false; }
                            if (!error1 && !error2 && !error3 && !error4) {
                                user.save().then(savedDoc => {
                                    let newUser = savedDoc;
                                    target.save().then(savedDoc => {
                                        let newTarget = savedDoc;
                                        return res.status(400).json({
                                            error: false,
                                            message: "Request Accepted",
                                            user: newUser,
                                            target: newTarget,
                                        });
                                    })
                                })
                            }
                            else {
                                return res.status(400).json({
                                    error: true,
                                    message: "Request Does Not Exist",
                                });
                            }
                        }
                    }
                )
            }
        }
    );
});


// Reject Follow Request
router.post("/rejectfollowrequest", (req, res) => {
    const { emailofuser, emailoftarget } = req.body;
    let user = null;
    let target = null;
    userModel.findOne(
        { email: emailofuser, is_deleted: false },
        (err, doc) => {
            if (err) {
                return res.status(400).json({
                    error: true,
                    message: err.message,
                    data: err,
                });
            } else if (doc === null) {
                return res.status(400).json({
                    error: true,
                    message: "Inavlid Email Address",
                });
            } else {
                user = doc;
                userModel.findOne(
                    { email: emailoftarget, is_deleted: false },
                    (err, doc) => {
                        if (err) {
                            return res.status(400).json({
                                error: true,
                                message: err.message,
                                data: err,
                            });
                        } else if (doc === null) {
                            return res.status(400).json({
                                error: true,
                                message: "Inavlid Email Address",
                            });
                        } else {
                            let error1 = true;
                            let error2 = true;
                            let error3 = true;
                            let error4 = true;
                            target = doc;
                            let target_object = {
                                name: target.name,
                                email: target.email,
                                _id: target._id,
                                avatar_url: target.avatar_url
                            }
                            let user_object = {
                                name: user.name,
                                email: user.email,
                                _id: user._id,
                                avatar_url: user.avatar_url
                            }
                            for (var i = 0; i < user.requests_recieved.length; i++) {
                                if (user.requests_recieved[i].user.email === emailoftarget && !user.requests_recieved[i].my_handshake) {
                                    error1 = false;
                                    user.requests_recieved.splice(i, 1);
                                }
                            }
                            for (var i = 0; i < target.requests_sent.length; i++) {
                                if (target.requests_sent[i].user.email === emailofuser && !target.requests_sent[i].target_handshake) {
                                    error2 = false;
                                    target.requests_sent.splice(i, 1);
                                }
                            }
                            if (user.followers.indexOf(target_object) === -1) { error3 = false; }
                            if (target.following.indexOf(user_object) === -1) { error4 = false; }

                            if (!error1 && !error2 && !error3 && !error4) {
                                user.save().then(savedDoc => {
                                    let newUser = savedDoc;
                                    target.save().then(savedDoc => {
                                        let newTarget = savedDoc;
                                        return res.status(400).json({
                                            error: false,
                                            message: "Request Rejected",
                                            user: newUser,
                                            target: newTarget,
                                        });
                                    })
                                })
                            }
                            else {
                                return res.status(400).json({
                                    error: true,
                                    message: "Request Does Not Exist",
                                });
                            }
                        }
                    }
                )
            }
        }
    );
});



module.exports = router;