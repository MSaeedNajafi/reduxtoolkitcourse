import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import logger from "./middleware/logger";
import toast from "./middleware/toast";
import reducer from "./reducer";

export default function () {
  return configureStore({ 
    reducer,
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    middleware: [
      ...getDefaultMiddleware(), 
      logger({destination: 'console'}),
      toast,
    ]
   });
}
