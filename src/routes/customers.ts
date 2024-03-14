import { Request, Response, Router } from "express";
import { Customer, validateCustomer } from "../models/customer";
import { sendError, sendSuccess } from "../helpers/helpers";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from "../constants/constants";
const router = Router();

router.post("/", async (req: Request, res: Response) => {
  const userdata = req.body;
  console.log('userdata',userdata);
  const { error } = validateCustomer(req.body);
  if (error)
    return sendError(res, BAD_REQUEST.statusCode, error.details[0].message);

  try {
    let customer = new Customer({
      uid: req.body.uid,
      name: req.body.name,
      address: req.body.address,
      email: req.body.email,
      phone: req.body.phone,
    });

    customer = await customer.save();
    sendSuccess(res, customer);
  } catch (error) {
    // console.log(error);
    sendError(
      res,
      INTERNAL_SERVER_ERROR.statusCode,
      INTERNAL_SERVER_ERROR.message 
    );
  }
  //   console.log(req.body);
});
export default router;
