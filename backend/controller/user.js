const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../src/models/user')
exports.signup = (req, res, next) => {
    const file = req.file.filename
    console.log("================"+file);
    bcrypt.hash(req.body.password, 10).then(
      (hash) => {

          const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
            profilePicture: file,
          });

          user.save().then(
            () => {
              res.status(201).json({
                message: 'User added successfully!'
              });
            }
          ).catch(
            (error) => {
              res.status(500).json({
                error: error
              });
            }
          );

         });
        
      }


      exports.login = async (req, res, next) => {
        await User.findOne({ email: req.body.email }).then(
          (user) => {
            if (!user) {
              return res.status(401).json({
                error: 'User not found!'
              });
            }
            bcrypt.compare(req.body.password, user.password).then(
              (valid) => {
                if (!valid) { 
                  return res.status(401).json({
                    error: 'Incorrect password!'
                  });
                }
                const token = jwt.sign(
                  { userId: user._id },'JWT_TOKEN_SECRET',
                  { expiresIn: '100h' });
                res.status(200).json({
                  userId: user._id,
                  token: token
                });
              }
            )
          }
        )
      }