const express = require("express");
const Posts = require("../schemas/posts")
const router = express.Router();
const ObjectId = require('mongodb').ObjectId;

//게시글 작성
router.post("/posts", async (req, res) => {
  const { user, password, title, content } = req.body;
  const createdAt = new Date();

  if (!user || !password || !title || !content) {
    return res.status(400).json({ message: "데이터 형식이 올바르지 않습니다." });
  }

  await Posts.create({ user, password, title, content, createdAt });

  res.json({ message: "게시글을 생성하였습니다." });
  
});


// 게시글 조회
router.get("/posts", async (req, res) => {
  const posts = await Posts.find().sort({ createdAt: -1 });

  const results = posts.map((post) => {
		return {
      postId: post.id,
			user: post.user,
			title: post.title,
      createdAt: post.createdAt
		};
  });

  res.json({
    data: results
  });
});

// 게시글 상세 조회
router.get("/posts/:_postId", async (req, res) => {
  const { _postId } = req.params;
  const posts = await Posts.find({ _id: ObjectId(_postId) });
  const results = posts.map((post) => {
		return {
      postId: post.id,
			user: post.user,
			title: post.title,
      content: post.content,
      createdAt: post.createdAt
		};
  });

  res.json({
    data: results
  });
});

// 게시글 수정
router.put("/posts/:_postId", async (req, res) => {
  const { _postId } = req.params;
  const { password, title, content } = req.body;
  if ( !password || !title || !content) {
    res.status(400).json({ message: "데이터 형식이 올바르지 않습니다." });
    return;
  }

  try {
    const posts = await Posts.find({ _id: ObjectId(_postId) });
    if (posts.length === 0) {
      res.status(404).json({ message: "게시글 조회에 실패하였습니다." });
      return;
    }
    if (password !== posts[0].password) {
      res.status(400).json({ message: "비밀번호가 일치하지 않습니다." });
      return;
    } else {
      await Posts.updateOne({ _id: ObjectId(_postId) }, { $set: { password, title, content } });
    }
  } catch (err) {
    res.status(404).json({ message: "게시글 조회에 실패하였습니다." });
    return;
  }

  res.json({ message: "게시글을 수정하였습니다." });
})

// 게시글 삭제
router.delete("/posts/:_postId", async (req, res) => {
  const { _postId } = req.params;
  const { password } = req.body;

  try {
    const posts = await Posts.find({ _id: ObjectId(_postId) });
    if (posts.length === 0) {
      res.status(404).json({ message: "게시글 조회에 실패하였습니다." });
      return;
    }
    if (password !== posts[0].password) {
      res.status(400).json({ message: "비밀번호가 일치하지 않습니다." });
      return;
    } else {
      await Posts.deleteOne({ _id: ObjectId(_postId) });
    }
  } catch (err) {
    res.status(404).json({ message: "게시글 조회에 실패하였습니다." });
    return;
  }

  res.json({ message: "게시글을 삭제하였습니다." });
});


module.exports = router;