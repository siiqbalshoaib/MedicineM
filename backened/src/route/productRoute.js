import {Router} from "express"

import {addProduct,
        getAllProduct
} from "../controller/adminController.js"




const router = Router();

router.route("/addProduct").post(addProduct)

router.route("/allProduct").get(getAllProduct)


export default router