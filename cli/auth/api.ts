import { cors, __HOSTS } from "@base-sdk/core";
import {
  __auth_proxy,
  ProxyAuthenticationMode,
  AuthProxySessionStartRequest,
  AuthProxySessionStartResult,
} from "@base-sdk-fp/auth";
import Axios from "axios";
import { machineIdSync } from "node-machine-id";
import { AuthStore } from "./store";

// it is ok to load dynamically since its cli env.
const PROXY_AUTH_REQUEST_SECRET = () =>
  process.env.PUBLIC_GRIDA_FIRST_PARTY_PROXY_AUTH_REQUEST_TOTP_SECRET;

function _termenv(): "vscode" | "terminal" | "unknown" {
  switch (process.env.TERM_PROGRAM) {
    case "vscode":
      return "vscode";
    case "Apple_Terminal":
      return "terminal";
  }
  return "unknown";
}

function _make_request(): AuthProxySessionStartRequest {
  return {
    appId: "co.grida.assistant",
    clientId: machineIdSync(),
    mode: ProxyAuthenticationMode.long_polling,
    redirect_uri: _termenv() == "vscode" ? "vscode://" : undefined,
  };
}

export async function startAuthenticationSession(): Promise<AuthProxySessionStartResult> {
  return __auth_proxy.openProxyAuthSession(
    PROXY_AUTH_REQUEST_SECRET(),
    _make_request()
  );
}

export async function startAuthenticationWithSession(
  session: AuthProxySessionStartResult
) {
  const result = await __auth_proxy.requesetProxyAuthWithSession(
    PROXY_AUTH_REQUEST_SECRET(),
    session,
    _make_request()
  );

  AuthStore.set(result.access_token);
  // save result

  return result;
}

export async function startAuthentication() {
  const session = await startAuthenticationSession();
  return await startAuthenticationWithSession(session);
}

export async function isAuthenticated() {
  return (await AuthStore.get())?.length > 1; // using 1 (same as != undefined.)
}

export async function getAccessToken(): Promise<string> {
  return await AuthStore.get();
}

export async function checkAuthSession(session: string): Promise<boolean> {
  // TODO:
  const res = await __auth_proxy.checkProxyAuthResult(
    PROXY_AUTH_REQUEST_SECRET(),
    session
  );

  const success = res.success && res.access_token !== undefined;
  if (success) {
    AuthStore.set(res.access_token);
  }
  return success;
}

const secure_axios = async () => {
  const axios = Axios.create({
    baseURL: "https://accounts.services.grida.co",
    headers: {
      Authorization: `Bearer ${await getAccessToken()}`,
    },
  });
  cors.useAxiosCors(axios, {
    apikey: process.env.PUBLIC_GRIDA_FIRST_PARTY_CORS_API_KEY,
  });
  return axios;
};

export async function getUserProfile() {
  try {
    const resp = await (await secure_axios()).get(`profile`);
    return resp.data;
  } catch (error) {
    console.log("Error while fetching my profile ", error);
    throw error;
  }
}
