import { prismadb } from "../database/db.js";
const listPost = async (req, res) => {
  try {
    const posts = await prismadb.user.findUnique({
      where: {
        id: req.uid,
      },
      select: {
        posts: true,
      },
    });
    return res.status(200).json(posts);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Error del servidor" });
  } finally {
    prismadb.$disconnect();
  }
};

const findPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await prismadb.post.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    return res.status(200).json(post);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Error del servidor" });
  } finally {
    prismadb.$disconnect();
  }
};

const createPost = async (req, res) => {
  const { title, content, published } = req.body;
  console.log(title, content, published);
  try {
    const post = await prismadb.post.create({
      data: {
        title,
        content,
        published,
        authorId: req.uid,
      },
    });

    return res.status(200).json(post);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Error del servidor" });
  } finally {
    prismadb.$disconnect();
  }
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content, published } = req.body;
  try {
    const FindPost = await prismadb.post.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!FindPost)
      return res.status(404).json({ message: "Post no encontrado" });

    const post = await prismadb.post.update({
      where: {
        id: parseInt(FindPost.id),
      },
      data: {
        title,
        content,
        published: published === "true",
      },
    });

    return res.status(200).json(post);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Error del servidor" });
  } finally {
    prismadb.$disconnect();
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const FindPost = await prismadb.post.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!FindPost)
      return res.status(404).json({ message: "Post no encontrado" });

    const post = await prismadb.post.delete({
      where: {
        id: parseInt(FindPost.id),
      },
    });

    return res.status(200).json(post);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Error del servidor" });
  } finally {
    prismadb.$disconnect();
  }
};

const searchPost = async (req, res) => {
  const { q } = req.query;
  try {
    const posts = await prismadb.post.findMany({
      where: {
        authorId: req.uid,
        title: {
          contains: q,
        },
      },
    });
    return res.status(200).json(posts);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Error del servidor" });
  } finally {
    prismadb.$disconnect();
  }
};

export { listPost, createPost, findPost, updatePost, deletePost, searchPost };
