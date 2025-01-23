/* eslint-disable no-useless-catch */
import { slugify } from "~/utils/formatters";
import { boardModel } from "~/models/boardModel";
import ApiError from "~/utils/ApiError";
import { StatusCodes } from "http-status-codes";
import { cloneDeep } from "lodash";

const createNew = async (reqBody) => {
  try {
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title),
    };
    //gọi model để xử lý vào db
    const createdBoard = await boardModel.createNew(newBoard);
    //tìm board với id
    const getNewBoard = await boardModel.findOneById(createdBoard.insertedId);
    return getNewBoard;
  } catch (error) {
    throw error;
  }
};

const getDetails = async (id) => {
  try {
    const board = await boardModel.getDetails(id);

    if (!board) throw new ApiError(StatusCodes.NOT_FOUND, "Board Not Found");
    const resBoard = cloneDeep(board);
    resBoard.columns.forEach((column) => {
      column.cards = resBoard.cards.filter(
        (card) => card.columnId.toString() === column._id
      );
    });
    delete resBoard.cards;
    return resBoard;
  } catch (error) {
    throw error;
  }
};

const update = async (id, reqBody) => {
  try {
    const updateData = { ...reqBody, updatedAt: Date.now() };
    const updateBoard = await boardModel.update(id, updateData);
    return updateBoard;
  } catch (error) {
    throw error;
  }
};

export const boardService = {
  createNew,
  getDetails,
  update,
};
