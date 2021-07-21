import { useHistory } from "react-router-dom";

const CheckLogin = (userInfo) => {
  const history = useHistory();

  if (userInfo != null) {
    return true;
  } else {
    return false;
  }
}

export default CheckLogin;