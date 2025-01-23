import { cardModel } from "~/models/cardModel";
import { columnModel } from "~/models/columnModel";

const createNew = async (reqBody) => {
  try {
    const newCard = {
      ...reqBody,
    };
    //gọi model để xử lý vào db
    const createdCard = await cardModel.createNew(newCard);
    //tìm Card với id
    const getNewCard = await cardModel.findOneById(createdCard.insertedId);
    if (getNewCard) {
      await columnModel.pushCardOrderIds(getNewCard);
    }
    return getNewCard;
  } catch (error) {
    throw error;
  }
};

export const cardService = {
  createNew,
};
