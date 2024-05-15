import express from "express";
import mongoose from "mongoose";
import {
    LoginValidation,
    postCreateValidation,
    registerValidation,
} from "./validations.js";
import checkAuth from "./utils/checkAuth.js";
import * as UserController from "./controllers/UserController.js";
import * as PostController from "./controllers/PostController.js";
mongoose
    .connect(
        "mongodb+srv://admin:admin@cluster0.cxnvj6r.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then(() => {
        console.log("db ok");
    })
    .catch((err) => {
        console.log(err);
    });

const app = express();
app.use(express.json());

app.post("/auth/login", LoginValidation, UserController.login);
app.post("/auth/register", registerValidation, UserController.register);
app.get("/auth/me", checkAuth, UserController.getMe);
//crud
app.get("/posts", PostController.getAll);
app.get("/posts/:id", PostController.getOne);
app.post("/posts", checkAuth, postCreateValidation, PostController.create);
app.delete("/posts/:id", checkAuth, PostController.remove);
app.patch('/posts/:id',checkAuth, PostController.update);
app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log("server ok");
});