// post.js
import axios from "axios";
import { API_URL } from "../config/enviromentVariables";

export const fetchPosts = async (id = false, categories = false) => {
  try {
    if (categories) {
      let response = await axios({
        method: "get",
        url: `${API_URL}/api/findByCategory?id=${categories}`,
        json: true,
      });
      return response;
    } else {
      if (!id) {
        let response = await axios({
          method: "get",
          url: `${API_URL}/api/getAllPosts`,
          json: true,
        });

        return response;
      } else if (id) {
        let response = await axios({
          method: "get",
          url: `${API_URL}/api/${id}`,
          json: true,
        });
        return response;
      }
    }
  } catch (err) {
    console.log(err);
  }
};
