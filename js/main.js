import { setUserFormSubmit } from './form-validate.js';
import {
  showFormMessage,
  onSuccess,
  onError
} from './modal-message.js';

setUserFormSubmit(showFormMessage(onSuccess), showFormMessage(onError));
