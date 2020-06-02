import { applyMiddleware, createStore } from "redux"

import logger from "redux-logger"
import thunk from "redux-thunk"
import promise from "redux-promise-middleware"
import articleReducer from "./reducers/ArticleReducer"

const mware = applyMiddleware(promise, thunk, logger)

export default createStore(articleReducer, mware)
