import React, { FC, useEffect } from "react";
import { RouteComponentProps } from "react-router";

import { Google, KeyCloak } from "./config";

const LoginCallback: FC<RouteComponentProps> = ({ location }) => {
  useEffect(() => {
    const code = (location.search.match(/code=([^&]+)/) || [])[1];
    const state = (location.search.match(/state=([^&]+)/) || [])[1];
    const qParams = [
      `code=${code}`,
      `redirect_uri=${KeyCloak.REDIRECT_URI}`,
      `scope=${KeyCloak.SCOPE}`
    ].join("&");
    fetch(`/api/auth-from-code/keycloak?${qParams}`, {
      credentials: "include"
    })
      .then(res => res.json())
      .then(res => console.log(res))
      .catch(console.error);
  }, []);

  return <p>
{location.search}
</p>;
};

export default LoginCallback;
