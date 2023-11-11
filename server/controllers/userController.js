const Post = require("../models/Post");
const User = require("../models/User");
const { success, error } = require("../utils/responseWrapper");

const followOrUnfollowUser = async (req, res) => {
  try {
    const { userIdToFollow } = req.body;
    const currentUserId = req._id;

    const userToFollow = await User.findById(userIdToFollow);
    const currentUser = await User.findById(currentUserId);

    if (currentUserId === userIdToFollow) {
      return res.send(error(400, "user cannot follow yourself"));
    }

    if (!userToFollow) {
      return res.send(error(404, "user not found"));
    }

    if (currentUser.followings.includes(userIdToFollow)) {
      //already followed
      const followingIndex = currentUser.followings.indexOf(userIdToFollow);
      currentUser.followings.splice(followingIndex, 1);

      const followerIndex = userToFollow.followers.indexOf(currentUser);
      userToFollow.followers.splice(followerIndex, 1);

      await userToFollow.save();
      await currentUser.save();

      return res.send(success(200, "User unfollowed"));
    } else {
      userToFollow.followers.push(currentUserId);
      currentUser.followings.push(userIdToFollow);

      await userToFollow.save();
      await currentUser.save();

      return res.send(success(200, "user followed"));
    }
  } catch (e) {
    res.send(error(500, e.message));
  }
};

const getPostsOfFollowing = async (req, res) => {
  try {
    const currentUserId = req._id;
    const currentUser = await User.findById(currentUserId);
    const posts = await Post.find({
      owner: {
        $in: currentUser.followings,
      },
    });

    return res.send(success(200, posts));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

const getMyPosts = async (req, res) => {
  try {
    const currentUserId = req._id;
    const currentUser = await User.findById(currentUserId);
    const userAllPosts = await Post.find({
      owner: {
        $in: currentUser,
      },
    }).populate("likes");
    // console.log(posts);
    return res.send(success(200, userAllPosts));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

const getUserPosts = async (req, res) => {
  try {
    // const currentUserId = req._id;
    // const currentUser = await User.findById(currentUserId)

    const { userId } = req.body;
    if (!userId) {
      res.send(error(400, "User Id is required"));
    }
    const posts = await Post.find({
      owner: {
        $in: userId,
      },
    }).populate("likes");
    return res.send(success(200, posts));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

const deleteMyProfile = async (req, res) => {
  try {
    const currentUserId = req._id;
    const currentUser = await User.findById(currentUserId);
    const posts = currentUser.posts;

    //delete all posts
    await Post.deleteMany({
      owner: currentUserId,
    });

    //removes user from follower's following
    currentUser.followers.forEach(async (followerId) => {
      const follower = await User.findById(followerId);
      const index = follower.followings.indexOf(currentUserId);
      follower.followings.splice(index, 1);
      await follower.save();
    });

    //Remove user from following's followers
    currentUser.followings.forEach(async (followingId) => {
      const following = await User.findById(followingId);
      const index = following.followers.indexOf(currentUserId);
      following.followers.splice(index, 1);
      await following.save();
    });

    //remove user all likes
    const allPosts = await Post.find();
    allPosts.forEach(async (post) => {
      const index = post.likes.indexOf(currentUserId);
      post.likes.splice(index, 1);
      await post.save();
    });
    //delete user
    await currentUser.deleteOne();

    //delete cookies
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: true,
    });

    return res.send(success(200, "User has been deleted!"));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

const download = async (req, res)=>{
 try {
  const userId = findById(req._id)
  if(!userId){
    res.send(error(404, "User doesn't Exist"))
  }
  else{
    
  }
 } catch (e) {
  
 }
}

const getMyInfo = async (req, res) => {
  try {
    const user = await User.findById(req._id)
    return res.send(success(200, {user}))
  } catch (e) {
    res.send(error(500, e.message))
  }
}

module.exports = {
  followOrUnfollowUser,
  getPostsOfFollowing,
  getMyPosts,
  getUserPosts,
  deleteMyProfile,
  getMyInfo
};
