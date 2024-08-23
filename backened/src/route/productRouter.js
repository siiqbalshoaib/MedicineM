import {Router} from "express"

import {getAllProduct
        
} from "../controller/productController.js"

const router = Router();

router.route("/allProduct").get(getAllProduct)



export default router