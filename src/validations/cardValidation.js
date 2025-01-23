import Joi from "joi";
import { StatusCodes } from "http-status-codes";
import ApiError from "~/utils/ApiError";
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from "~/utils/validators";

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    boardId: Joi.string()
      .required()
      .pattern(OBJECT_ID_RULE)
      .messages({ OBJECT_ID_RULE_MESSAGE }),
    columnId: Joi.string()
      .required()
      .pattern(OBJECT_ID_RULE)
      .messages({ OBJECT_ID_RULE_MESSAGE }),
    title: Joi.string().required().min(3).max(50).trim().strict(),
  });
  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false }); //abortEarly: false để validation trả về nhiều lỗi
    next(); // validate dữ liệu hợp lệ thì req đi tiếp đến controller(middleware)
  } catch (error) {
    next(
      new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message)
    );
  }
};

export const cardValidation = {
  createNew,
};
