import fetchWrapper from "./fetchWrapper";
const assetUrl = process.env.REACT_APP_ASSET_URL;

export const getImage = (path) => {
  if (path) {
    return assetUrl + path;
  } else {
    return "";
  }
};

export const getAllMembers = async () => {
  return fetchWrapper
    .get("members")
    .then((response) => {
      if (response) {
        if (response) {
          return response;
        }
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
