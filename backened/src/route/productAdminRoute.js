import {Router} from "express"

import {addProduct, updateProduct
        
} from "../controller/adminController.js"




const router = Router();

router.route("/addProduct").post(addProduct)
router.route("/updateProduct/:_id").post(updateProduct)



export default router