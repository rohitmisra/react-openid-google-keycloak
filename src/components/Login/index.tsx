import React, { FC, useState, useEffect, useCallback } from "react";
import { Card, Button, TextField, FormControl } from "@material-ui/core";
import styled from "@emotion/styled";

import { Google, KeyCloak } from "./config";

const StyledCard = styled(Card)`
  padding: 20px;
  margin: 100px auto;
  max-width: 40vw;
  min-width: 300px;
  Button {
    margin-bottom: 20px;
  }
`;

const LoginComp: FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleGoogleLogin = useCallback(async () => {
    const qParams = [
      `redirect_uri=${Google.REDIRECT_URI}`,
      `scope=${Google.SCOPE}`,
      `login_hint=rohitmisra.44@gmail.com`,
      `prompt=consent`,
      `state=google`
    ].join("&");
    try {
      const response = await fetch(`/api/auth-url/google?${qParams}`);
      const url = await response.text();
      window.location.assign(url);
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleKeyCloakLogin = useCallback(async () => {
    const qParams = [
      `redirect_uri=${KeyCloak.REDIRECT_URI}`,
      `scope=${KeyCloak.SCOPE}`,
      `login_hint=rohitmisra.44@gmail.com`,
      `prompt=consent`
    ].join("&");
    try {
      const response = await fetch(`/api/auth-url/keycloak?${qParams}`);
      const url = await response.text();
      window.location.assign(url);
    } catch (e) {
      console.error(e);
    }
  }, []);


  return (
    <StyledCard>
      <Button variant="contained" color="primary" onClick={handleGoogleLogin}>
        Login with Google
      </Button>

      <Button variant="contained" color="secondary" onClick={handleKeyCloakLogin}>
        Login with KeyCloak
      </Button>
    </StyledCard>
  );
};

export default LoginComp;
