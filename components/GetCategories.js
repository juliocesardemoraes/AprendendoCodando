// post.js
import axios from "axios";
import { API_URL } from "../config/enviromentVariables";

export const fetchCategories = async (id = false) => {
  try {
    if (id === false) {
      let response = await axios({
        method: "get",
        url: `${API_URL}/api/category/create`,
        json: true,
      });
      return response;
    } else if (id) {
      let response = await axios({
        method: "get",
        url: `${API_URL}/api/category/${id}`,
        json: true,
      });
      return response;
    }
  } catch (err) {
    console.log(err);
  }
};
