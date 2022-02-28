const assetUrl = process.env.REACT_APP_ASSET_URL;

export const getImage = (path) => {
  if (path) {
    return assetUrl + path;
  } else {
    return "";
  }
};
