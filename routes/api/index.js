const express = require('express');
const Competition = require('../../models/competition'); 
const Answer = require('../../models/answer'); 
const LikeLog = require('../../models/like-log'); 
const catchErrors = require('../../lib/async-error');
const Favorite = require('../../models/favorite');


const router = express.Router();

router.use(catchErrors(async (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    next({status: 401, msg: 'Unauthorized'});
  }
}));

router.use('/competitions', require('./competitions'));

// Like for Competition
router.post('/competitions/:id/like', catchErrors(async (req, res, next) => {
  const competition = await Competition.findById(req.params.id);
  if (!competition) {
    return next({status: 404, msg: 'Not exist competition'});
  }
  var likeLog = await LikeLog.findOne({author: req.user._id, competition: competition._id});
  if (!likeLog) {
    competition.numLikes++;
    await Promise.all([
      competition.save(),
      LikeLog.create({author: req.user._id, competition: competition._id})
    ]);
  }
  return res.json(competition);
}));

// Like for Answer
router.post('/answers/:id/like', catchErrors(async (req, res, next) => {
  const answer = await Answer.findById(req.params.id);
  answer.numLikes++;
  await answer.save();
  return res.json(answer);
}));

router.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    status: err.status,
    msg: err.msg || err
  });
});

router.use(catchErrors(async (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    next({status: 401, msg: 'Unauthorized'});
  }
}));

router.use('/competitions', require('../competitions'));

router.post('/competitions/:id/favorite', catchErrors(async (req, res, next) => {
  const competition = await competition.findById(req.params.id);
  if (!competition) {
    return next({status: 404, msg: 'Not exist competitions'});
  }
  var favorite = await Favorite.findOne({author: req.user._id, competition: competition._id});
  if (!favorite) {
    await Promise.all([
      Favorite.create({author: req.user._id, competition: competition._id})
    ]);
  }
  return res.json(competition);
}));





module.exports = router;
