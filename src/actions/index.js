import { HANDLE_LOGIN,SAVE_SEARCH_PLANNET,SAVE_PLANNET_DETAILS } from "../constants/action-types";
export function handleLogin(payload) {
  return { type: HANDLE_LOGIN, payload };
}
export function saveSearchPlannet(payload) {
    return { type: SAVE_SEARCH_PLANNET, payload };
}
export function savePlannetDetails(payload) {
    return { type: SAVE_PLANNET_DETAILS, payload };
}