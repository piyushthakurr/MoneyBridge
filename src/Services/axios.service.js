import axios from "axios";
import { toast } from "../Components/Toast/toast.component";
import CryptoJS from "crypto-js";

const ENCDECRYPTKEY = "5c6f809520bcdaac956e20098d4b4d66";

export { _fetch as fetch };

function handleError(error, reject) {
  // console.log('error', error);
  if (!error) {
    toast.error("Something went wrong, Please try again");
    setTimeout(() => {
      //  window.localStorage.clear();
      //   window.location.href = "/";
    }, 800);
  }

  if (error) {
    let status = error.status;

    /*  if (error.status === 400) {
     // toast.error("Something went wrong, Please try again");
      setTimeout(() => {
        window.localStorage.clear();
     //   window.location.href = "/";
      }, 800);
    } */

    if (error.data === "jwt expired") {
      toast.error("Session expired, you are going to be logout");
      setTimeout(() => {
        window.localStorage.clear();
        window.location.href = "/";
        window.location.reload();
      }, 2000);
    }

    if (status === 404) {
      toast.error("Internal Server Error.");
      setTimeout(() => {
        //  window.localStorage.clear();
        // window.location.href = "/";
      }, 800);
    }

    if (
      error.data.message === "You are not authorised to perform this action."
    ) {
      return toast.error(error.data.message);
    }
  }

  reject(error);
  return;
}

function handleResponse(successs, resolve) {
  resolve(successs);
  return;
}

function setMehod(method, path, body, options, params) {
  let config = {};
  if (options) {
    if (options) {
      config.headers = { ...options };
    }
  }
  params = params ? "?" + new URLSearchParams(params).toString() : "";
  if (method === "get" || method === "delete") {
    return axios[method](`${path}${params}`, config);
  }
  if (method === "post" || method === "put") {
    return axios[method](`${path}`, body, config);
  }
}

function _fetch(method, path, body, options, params) {
  return new Promise((resolve, reject) => {
    return setMehod(method, path, body, options, params)
      .then(function (response) {
        handleResponse(response, resolve);
        return;
      })
      .catch(function (error) {
        handleError(error.response, reject);
        return;
      });
  });
}

// public async decryptValue(data: any) {
//   const bytes = CryptoJS.AES.decrypt(data.toString(), process.env.ENCDECRYPTKEY);
//   return bytes.toString(CryptoJS.enc.Utf8);
// }

export const decryption = function (data) {
  // // Decrypt
  var bytes = CryptoJS.AES.decrypt(data, "5c6f809520bcdaac956e20098d4b4d66");
  var plaintext = JSON.parse(JSON.stringify(bytes.toString(CryptoJS.enc.Utf8)));
  return plaintext;
};
