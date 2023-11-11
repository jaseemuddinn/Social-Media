const Post = require("../models/Post");
const User = require("../models/User");
const { success, error } = require("../utils/responseWrapper");



const createPostController = async (req, res) => {
  try {
    const { caption } = req.body;
    if(!caption){
      return res.send(error(400, 'Caption is required!'))
    }
    const owner = req._id;

    const user = await User.findById(req._id);
    const post = await Post.create({
      owner,
      caption,
    });

    user.posts.push(post._id);
    // console.log("saving", user);
    await user.save();
    // console.log("saved", post);
    return res.send(success(201, post));
  } catch (e) {
    console.log(e);
    // return res.send(error(500, e.message));
  }
  return res.status(400).end();
};


const likeAndUnlikePost = async (req, res)=>{

  try {
  const {postId} = req.body;
  const currentUserId = req._id;
  const post = await Post.findById(postId)
  if(!post){
    return res.send(error(404, 'Post not found'))
  }

  if(post.likes.includes(currentUserId)) {
    const index = post.likes.indexOf(currentUserId)
    post.likes.splice(index, 1)

    await post.save();
    return res.send(success(200, 'Post unliked'))
  } 
  else {
    post.likes.push(currentUserId);
    await post.save();
    return res.send(success(200, 'Post liked!'))
  }
  } catch (e) {
    return res.send(error(500, e.message))
  }
  

};


const updatePostController = async (req, res)=>{

  try {
    const {postId, caption} = req.body;

  const currentUserId = req._id;
  const post  = await Post.findById(postId)

  if(!post){
    return res.send(error(404, 'Post not found'));
  }

  if(post.owner.toString() !== currentUserId){
    return res.send(error(403, 'only onwner can update their post'))
  }

  if(caption){
    post.caption = caption;

  }

  await post.save();

  return res.send(success(200, 'Post updated!', post))

  } catch (e) {
    return res.send(error(500, e.message))
  }
  
};

const deletePost = async (req, res) =>{
  try {
    const {postId} = req.body;
  const currentUserId = req._id;
  const post = await Post.findById(postId);
  const currentUser = await User.findById(currentUserId)
  if(!post){
    return res.send(error(404, 'Post not found'))
  }
  if(post.owner.toString() !== currentUserId){
    return res.send(error(404, "only owners can delete their posts"))
  }

  const index = currentUser.posts.indexOf(postId);
  currentUser.posts.splice(index, 1)
  await currentUser.save();
  await post.deleteOne();

  return res.send(success(200, 'post deleted successfully'))
  } catch (e) { 
    return res.send(error(500, e.message))
  }
  
}

module.exports = {
  createPostController,
  likeAndUnlikePost,
  updatePostController,
  deletePost
};



