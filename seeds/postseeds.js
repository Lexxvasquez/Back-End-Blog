const { Post } = require("../models");

const postData = [
  {
    title: "Facebook",
    post_text:
      "What is Facebook like when using it?",
    user_id: 1,
  },
  {
    title: "Instagram",
    post_text: "What is Instagram like when using it? ",
    user_id: 3,
  },
  {
    title: "Twitter",
    post_text:
      "This is used to tweet how you feel and share other posts you may like!",
    user_id: 2,
  },
  {
    title: "Can you live life without social media?",
    post_text:
      "Yessss!!!!!",
    user_id: 4,
  },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;