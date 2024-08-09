import { Router } from "express";
import { registerUser,
        loginUser,
        logoutUser
       } from "../controller/userController.js";

import {verifyJWT} from "../middleware/authMiddleware.js"


const  router = Router()

router.route("/register").post(
    // upload.fields([
    //     {
    //         name: "avatar",
    //         maxCount: 1
    //     }, 
    //     {
    //         name: "coverImage",
    //         maxCount: 1
    //     }
    // ]),
    registerUser
)

router.route("/login").post(loginUser)

// secured routes
router.route("/logout").post(verifyJWT, logoutUser)

export  default router;