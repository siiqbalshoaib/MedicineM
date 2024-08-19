import {Router} from "express"

import {addProduct} from "../controller/adminController.js"




const router = Router();

router.route("/addProduct").post(addProduct)


export default router