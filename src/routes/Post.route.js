import { Router } from "express";
import {
  createPost,
  deletePost,
  findPost,
  listPost,
  updatePost,
  searchPost,
} from "../controllers/Post.controller.js";
import { AuthPage } from "../middlewares/AuthToken.js";
import {
  validatioData,
  validatioParams,
  validationQuery,
} from "../middlewares/ValidationMiddleware.js";

const router = Router();

router.get("/", AuthPage, listPost);
router.get("/:id", AuthPage, validatioParams, findPost);
router.get("/search/posts", AuthPage, validationQuery, searchPost);
router.post("/", AuthPage, validatioData, createPost);
router.patch("/:id", AuthPage, validatioParams, validatioData, updatePost);
router.delete("/:id", AuthPage, validatioParams, deletePost);

export default router;