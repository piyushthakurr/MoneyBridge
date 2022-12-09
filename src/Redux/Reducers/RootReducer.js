import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { connectRouter } from "connected-react-router";
import CounterReducer from "./CounterReducer.js";
import Loader from "./Loader/loader.reducer";
import Auth from "./User/auth.reducer";
import User from "./User/user.reducer";
import Dashboard from "./Dashboard/dashobard.reducer";
import Deposite from "./DepositeTrans/Deposite.reducer";
import Orders from "./orders/order.reducer";

import Currency from "./Currency/currency.reducer";
import Withdraw from "./withdrawTransactions/withdrawTrans.reducer";
import Subadmin from "./subadmin/subadmin.reducer";
import Profile from "./profile/profile.reducer";
import AdminCurrencyList from "./AdminCurrency/AdminCurrency";
import { createBrowserHistory } from "history";
import Escrow from "./Escrow/Escrow";
import CurrencyPair from "./CurrencyPair/currencypair";
import DisputeList from "./AdminDisputeList/AdminDisputeList";
import Trade from "./AdminTrade/trade";
import Offer from "./AdminOffer/offer.reducer";
export const history = createBrowserHistory();

export default combineReducers({
  routing: routerReducer,
  loader: Loader,
  auth: Auth,
  user: User,
  dashboard: Dashboard,
  deposite: Deposite,
  orders: Orders,
  currency: Currency,
  disputelist: DisputeList,
  withdraw: Withdraw,
  subadmin: Subadmin,
  profile: Profile,
  AdminCurrencyList: AdminCurrencyList,
  Escrow: Escrow,
  CurrencyPair: CurrencyPair,
  Trade: Trade,
  Offer: Offer,
  router: connectRouter(history),
});
