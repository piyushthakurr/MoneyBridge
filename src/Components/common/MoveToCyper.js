import React from "react";
import {
  ADATRANS,
  BCHTRANS,
  BTCTRANS,
  DASHTRANS,
  DOGETRANS,
  ETHTRANS,
  LTCTRANS,
  XRPTRANS,
} from "../../Constants/constant";
import { toast } from "../Toast/toast.component";

export default function moveToBlockCyper(coin, id, is_internal) {
  switch (coin.toUpperCase()) {
    case "BTC":
      window.open(BTCTRANS + id);
      break;
    case "ETH":
      window.open(ETHTRANS + id);
      break;
    case "USDT":
      window.open(ETHTRANS + id);
      break;

    case "LTC":
      window.open(LTCTRANS + id);
      break;
    case "BCH":
      window.open(BCHTRANS + id);
      break;
    case "DASH":
      window.open(DASHTRANS + id);
      break;
    case "DOGE":
      window.open(DOGETRANS + id);
      break;
    case "XRP":
      is_internal === 1
        ? toast.info("This transaction is internal")
        : window.open(XRPTRANS + id);
      break;
    case "ADA":
      window.open(ADATRANS + id);
      break;

    default:
      break;
  }
}
