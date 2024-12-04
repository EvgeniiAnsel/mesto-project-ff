(()=>{"use strict";function e(t){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e(t)}function t(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function r(t,r,n){return(r=function(t){var r=function(t){if("object"!=e(t)||!t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,"string");if("object"!=e(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"==e(r)?r:r+""}(r))in t?Object.defineProperty(t,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[r]=n,t}var n="https://mesto.nomoreparties.co/v1/".concat("wff-cohort-27","/"),o=function(e,o){return fetch(new URL(e,n),function(e){for(var n=1;n<arguments.length;n++){var o=null!=arguments[n]?arguments[n]:{};n%2?t(Object(o),!0).forEach((function(t){r(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):t(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}({headers:{authorization:"25c7281b-ee62-429d-9090-7b85d165a07d","Content-Type":"application/json"}},o)).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))};function i(e,t){var r=t.handleDelete,n=t.handleLike,o=t.handleImageClick,i=document.querySelector("#card-template").content.cloneNode(!0).querySelector(".card"),a=i.querySelector(".card__image"),u=i.querySelector(".card__title"),c=i.querySelector(".card__like-button"),l=i.querySelector(".card__delete-button");return a.src=e.link,a.alt=e.name,u.textContent=e.name,c.addEventListener("click",(function(){return n(c)})),l.addEventListener("click",(function(){return r(i)})),a.addEventListener("click",(function(){return o(e)})),i}function a(e){e.classList.toggle("card__like-button_is-active")}function u(e){e.remove()}function c(e){e.classList.add("popup_is-opened"),e.classList.remove("popup_is-animated"),document.addEventListener("keydown",p)}function l(e){e.classList.add("popup_is-animated"),e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",p)}function p(e){if("Escape"===e.key){var t=document.querySelector(".popup_is-opened");t&&l(t)}}var s=function(e,t){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.classList.remove("popup__button_disabled"),t.disabled=!1):(t.classList.add("popup__button_disabled"),t.disabled=!0)},d=function(){document.querySelectorAll(".form__input-error").forEach((function(e){e.textContent=""})),document.querySelectorAll(".popup__input").forEach((function(e){e.classList.remove("popup__input_type_error")}))};function f(e,t){if(e){if("string"==typeof e)return m(e,t);var r={}.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?m(e,t):void 0}}function m(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=Array(t);r<t;r++)n[r]=e[r];return n}document.querySelector(".logo").src=logo;var y=document.querySelector(".profile__edit-button"),v=document.querySelector(".profile__add-button"),_=document.querySelector(".popup_type_edit"),b=document.querySelector(".popup_type_new-card"),S=document.querySelectorAll(".popup__close"),h=document.querySelector(".profile__image"),g=document.querySelector(".popup_type_update-avatar"),L=document.forms.update_avatar,q=L.querySelector(".popup__input_type_url"),P=_.querySelector(".popup__form"),k=b.querySelector(".popup__form"),E=_.querySelector('input[name="name"]'),O=_.querySelector('input[name="description"]'),w=document.querySelector(".places__list"),C={name:"Жак-Ив Кусто",description:"Исследователь океана",avatar};editProfileForm.addEventListener("submit",(function(e){e.preventDefault();var t,r=startPopupProgress(editProfilePopup);(t={name:editFormNameInput.value,about:editFormDescriptionInput.value},o("users/me",{method:"PATCH",body:JSON.stringify(t)})).then((function(){profileTitle.textContent=editFormNameInput.value,profileDescription.textContent=editFormDescriptionInput.value,l(editProfilePopup)})).catch(console.error).finally(r)})),S.forEach((function(e){e.addEventListener("click",(function(){l(e.closest(".popup"))}))})),y.addEventListener("click",(function(){E.value=C.name,O.value=C.description,d(),c(_)})),P.addEventListener("submit",(function(e){e.preventDefault(),C.name=E.value,C.description=O.value,l(_)})),v.addEventListener("click",(function(){return c(b)})),h.addEventListener("click",(function(){q.value="",d(),c(g)})),L.addEventListener("submit",(function(e){e.preventDefault();var t,r=startPopupProgress(g);(t=q.value,o("users/me/avatar",{method:"PATCH",body:JSON.stringify({avatar:t})})).then((function(e){h.style='background-image: url("'.concat(e.avatar,'")'),l(g)})).catch(console.error).finally(r)})),k.addEventListener("submit",(function(e){e.preventDefault();var t,r,n=k.querySelector('input[name="place-name"]').value,p=k.querySelector('input[name="link"]').value;n&&p&&(t=i({name:n,link:p},{handleDelete:u,handleLike:a,handleImageClick:function(e){var t=document.querySelector(".popup_type_image"),r=t.querySelector(".popup__image"),n=t.querySelector(".popup__caption");r.src=e.link,r.alt=e.name,n.textContent=e.name,c(t)}}),w.prepend(t)),(r=newCard,o("cards",{method:"POST",body:JSON.stringify(r)})).then((function(){cardsList.prepend(i(newCard,deleteCard,likeCard,openImagePopup,userId)),k.reset(),l(newCardPopup)})).catch(console.error).finally(stop),l(b),k.reset(),d()})),Promise.all([o("cards"),o("users/me")]).then((function(e){var t,r,n=(r=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,i,a,u=[],c=!0,l=!1;try{if(i=(r=r.call(e)).next,0===t){if(Object(r)!==r)return;c=!1}else for(;!(c=(n=i.call(r)).done)&&(u.push(n.value),u.length!==t);c=!0);}catch(e){l=!0,o=e}finally{try{if(!c&&null!=r.return&&(a=r.return(),Object(a)!==a))return}finally{if(l)throw o}}return u}}(t,r)||f(t,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=n[0],a=n[1];userId=a._id,profileTitle.textContent=a.name,profileDescription.textContent=a.about,h.style='background-image: url("'.concat(a.avatar,'")');var u,c=function(e){var t="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!t){if(Array.isArray(e)||(t=f(e))){t&&(e=t);var r=0,n=function(){};return{s:n,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:n}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,i=!0,a=!1;return{s:function(){t=t.call(e)},n:function(){var e=t.next();return i=e.done,e},e:function(e){a=!0,o=e},f:function(){try{i||null==t.return||t.return()}finally{if(a)throw o}}}}(o);try{for(c.s();!(u=c.n()).done;){var l=u.value;cardsList.append(i(l,deleteCard,likeCard,openImagePopup,userId))}}catch(e){c.e(e)}finally{c.f()}})),document.addEventListener("click",(function(e){e.target.classList.contains("popup_is-opened")&&l(e.target)})),Array.from(document.querySelectorAll(".popup__form")).forEach((function(e){e.addEventListener("submit",(function(e){e.preventDefault()})),function(e){var t=Array.from(e.querySelectorAll(".popup__input")),r=e.querySelector(".popup__button");s(t,r),t.forEach((function(n){n.addEventListener("input",(function(){!function(e,t){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?function(e,t){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove("popup__input_type_error"),r.textContent="",r.classList.remove("popup__error_visible")}(e,t):function(e,t,r){var n=e.querySelector(".".concat(t.id,"-error"));t.classList.add("popup__input_type_error"),n.textContent=r,n.classList.add("popup__error_visible")}(e,t,t.validationMessage)}(e,n),s(t,r)}))}))}(e)}))})();