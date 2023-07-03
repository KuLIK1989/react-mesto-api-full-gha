import { setting } from "./setting.js";

export function renderLoading(popup, process, buttonSubmitText) {
   const buttonSubmit = popup.querySelector(setting.submitButtonSelector);
   if (process) {
      buttonSubmit.textContent = "Сохранение...";
   } else {
      buttonSubmit.textContent = buttonSubmitText;
   }
}