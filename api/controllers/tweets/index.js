const Twitter = require("twitter");
const Tweet = require("./../../models/tweets");
const lib = require("./../../lib/dates");
const response = require("./../../lib/response");
const config = require("../../../config");

const getTweets = (req, res)=>{
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    Tweet
    .find({}, ["content", "createdAt", "user", "likes", "comments"])
    .populate("user", ["name", "username"])
    .populate("comments.user", ["name", "username"])
    .sort({ createdAt: -1 })
    .limit(Number(limit))
    .skip(skip)
    .then((tweets)=>{
        Tweet.countDocuments((err, total)=>{
            const totalPages = Math.ceil(total / limit);
            const hasMore = page < totalPages;
            res.status(200).json(response(true, [{tweets, total, totalPages, hasMore}]));
        });
        
        
    })
    .catch((err)=>{
        res.json(response(false, undefined, err));
    });
};

const newComment = (req, res) => {
    if (req.body.comment.length > 0){
        const id = req.body.id;
        const comment = {
            comment: req.body.comment,
            user: req.id
        };
        Tweet.updateOne({ _id: id}, { $addToSet: { comments: comment } } ) 
        .then((tweets)=>{
            res.status(200).json(response(true, tweets));
        })
        .catch((err)=>{
            res.json(response(false, undefined, err));
        });
    }else{
        res.json(response(false, undefined, "El comentario no puede estar vacío"));
    }
    
};

const newLike = (req, res) => {
    const id = req.body.id;
    Tweet.updateOne({ _id: id}, { $inc: { likes: 1 } } ) 
    .then((tweets)=>{
        res.status(200).json(response(true, tweets));
    })
    .catch((err)=>{
        res.json(response(false, undefined, err));
    });
};

const newTweet = (req, res)=>{
    const tweet = {
        content: req.body.content,
        user: req.id,
    };
    const obj = new Tweet(tweet);
    obj.save()
    .then((tweet) => {
        res.json(response(true, [tweet]))
    })
    .catch((err) => {
        res.json(response(false, undefined, err));
    });
};

const getTweet = (req, res) => {
    const id = req.params.id;
    Tweet.find({ _id: id}, ["content", "createdAt"])
    .populate("user", ["name", "username"])
    .sort({ createdAt: -1 })
    .then((tweets)=>{
        res.status(200).json(response(true, tweets));
    })
    .catch((err)=>{
        res.json(response(false, undefined, err));
    });
};

const getTweetsStream = (req, res) => {
    const username = req.params.username;
    const client = new Twitter({
        consumer_key: config.twitter.consumerKey,
        consumer_secret: config.twitter.consumerSecret,
        access_token_key: config.twitter.accessTokenKey,
        access_token_secret: config.twitter.accessTokenSecret
      });
    client.get("statuses/user_timeline", {screen_name: username}, (err, tweets, reponse) => {
        if (err) {
            res.status(500).json(response(false, undefined, [ {message: "Ocurrió un error"}]));
        } else
            res.status(200).json(response(true, tweets));
    });  
};

module.exports = {getTweets, getTweet, newTweet, getTweetsStream, newComment, newLike};