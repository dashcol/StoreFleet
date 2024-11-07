// Please don't change the pre-written code
// Import the necessary modules here

import { createNewOrderRepo } from "../model/order.repository.js";
import { ErrorHandler } from "../../../utils/errorHandler.js";

export const createNewOrder = async (req, res, next) => {
  // Write your code here for placing a new order
  try {
    const {
      shippingInfo,
      orderedItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    if (
      !shippingInfo.address ||
      !shippingInfo.state ||
      !shippingInfo.country ||
      !shippingInfo.pincode ||
      !shippingInfo.phoneNumber
    ) {
      return next(
        new ErrorHandler(400, "Please provide complete shipping information")
      );
    }

    if (!orderedItems || orderedItems.length === 0) {
      return next(new ErrorHandler(400, "No ordered items found"));
    }

    const newOrderData = {
      shippingInfo,
      orderedItems,
      user: req.user._id,
      paymentInfo,
      paidAt: Date.now(),
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      orderStatus: "Processing",
    };

    const newOrder = await createNewOrderRepo(newOrderData);

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order: newOrder,
    });
  } catch (error) {
    console.log(error);

    next(new ErrorHandler(500, error.message || "Order creation failed"));
  }
};
