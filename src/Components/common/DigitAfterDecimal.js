import React from "react";

export default function DigitAfterDecimal(value, upto) {
  if (value <= 0) {
    value = "0.0";
  } else {
    let firstBlncTest = String(value).split(".", 2);
    if (firstBlncTest.length > 1) {
      if (firstBlncTest[1].length > upto) {
        let presc3 = firstBlncTest[1].substring(0, upto);
        value = firstBlncTest[0] + "." + presc3;
        if (value <= 0) value = "0.0";
      }
    }
  }

  return value;
}
