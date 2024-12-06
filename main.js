(()=>{"use strict";var e={baseUrl:"https://nomoreparties.co/v1/wff-cohort-27",headers:{authorization:"25c7281b-ee62-429d-9090-7b85d165a07d","Content-Type":"application/json"}},t=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))},n=function(){return fetch("".concat(e.baseUrl,"/users/me"),{headers:e.headers}).then(t).catch((function(e){console.error("Ошибка при получении профиля пользователя:",e)}))};function r(n,r){var o=n.classList.contains("card__like-button_is-active")?"DELETE":"PUT";fetch("".concat(e.baseUrl,"/cards/likes/").concat(r._id),{method:o,headers:{Authorization:e.headers.authorization,"Content-Type":"application/json"}}).then(t).then((function(e){e&&Array.isArray(e.likes)?(n.closest(".card").querySelector(".card__like-count").textContent=e.likes.length,n.classList.toggle("card__like-button_is-active"),r.likes=e.likes):console.error("Ошибка: Обновленные данные карточки не содержат массива лайков",e)})).catch((function(e){console.error("Ошибка лайка:",e)}))}function o(n,r){var o=r._id;fetch("".concat(e.baseUrl,"/cards/").concat(o),{method:"DELETE",headers:{Authorization:e.headers.authorization,"Content-Type":"application/json"}}).then(t).then((function(){n.remove()})).catch((function(e){console.error("Ошибка при удалении карточки:",e)}))}function a(e,t){var n=t.handleImageClick,a=t.currentUserId,i=document.querySelector("#card-template").content.cloneNode(!0).querySelector(".card"),c=i.querySelector(".card__image"),u=i.querySelector(".card__title"),l=i.querySelector(".card__like-button"),s=i.querySelector(".card__delete-button"),d=i.querySelector(".card__like-count");c.src=e.link,c.alt=e.name,u.textContent=e.name;var p=Array.isArray(e.likes)?e.likes:[];return d.textContent=p.length,p.some((function(e){return e._id===a}))&&l.classList.add("card__like-button_is-active"),l.addEventListener("click",(function(){return r(l,e)})),e.owner._id===a?(s.classList.remove("card__delete-button_hidden"),s.addEventListener("click",(function(){return o(i,e)}))):s.classList.add("card__delete-button_hidden"),c.addEventListener("click",(function(){return n(e)})),i.setAttribute("data-id",e._id),i}function i(e,t){var n=t.isLoading,r=t.initialText,o=t.loadingText;e?n?(e.textContent=o||"Загрузка...",e.disabled=!0):(e.textContent=r,e.disabled=!1):console.error("Ошибка: передана некорректная кнопка.")}function c(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",l)}function u(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",l)}function l(e){if("Escape"===e.key){var t=document.querySelector(".popup_is-opened");t&&u(t)}}var s=function(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),r.textContent="",r.classList.remove(n.errorClass)},d=function(e,t,n){(function(e){return e.some((function(e){return!e.validity.valid}))})(e)||function(e){return e.some((function(e){return""===e.value.trim()}))}(e)?(t.classList.add(n.inactiveButtonClass),t.disabled=!0):(t.classList.remove(n.inactiveButtonClass),t.disabled=!1)},p=function(e,t){e.querySelectorAll(t.inputSelector).forEach((function(n){s(e,n,t)}))},f={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};function m(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}document.querySelector(".logo").src="0863e5bc26221680f1e2.svg";var y=document.querySelector(".profile__edit-button"),v=document.querySelector(".profile__add-button"),h=document.querySelector(".popup_type_edit"),_=document.querySelector(".popup_type_new-card"),S=document.querySelector(".popup_type_new-avatar"),b=document.querySelectorAll(".popup__close"),g=h.querySelector(".popup__form"),q=_.querySelector(".popup__form"),L=S.querySelector(".popup__form"),C=h.querySelector('input[name="name"]'),k=h.querySelector('input[name="description"]'),E=L.querySelector('input[name="avatar-link"]'),A=document.querySelector(".places__list"),x=document.querySelector(".profile__title"),T=document.querySelector(".profile__description"),B=document.querySelector(".profile__image"),U=document.querySelector(".popup_type_image"),I=U.querySelector(".popup__image"),j=U.querySelector(".popup__caption"),w=function(e){I.src=e.link,I.alt=e.name,j.textContent=e.name,c(U)};document.querySelectorAll(".popup").forEach((function(e){!function(e){e.addEventListener("mousedown",(function(t){t.target===e&&u(e)}))}(e)}));var z={},D=function(){n().then((function(e){z=e,x.textContent=e.name,T.textContent=e.about,B.style.backgroundImage="url(".concat(e.avatar,")")})).catch((function(e){console.error("Ошибка при обновлении профиля:",e)}))};D();var O,P="";Promise.all([n(),fetch("".concat(e.baseUrl,"/cards"),{headers:e.headers}).then(t).catch((function(e){console.error("Ошибка при получении всех карточек:",e)}))]).then((function(e){var t,n,i=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,a,i,c=[],u=!0,l=!1;try{if(a=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=a.call(n)).done)&&(c.push(r.value),c.length!==t);u=!0);}catch(e){l=!0,o=e}finally{try{if(!u&&null!=n.return&&(i=n.return(),Object(i)!==i))return}finally{if(l)throw o}}return c}}(t,n)||function(e,t){if(e){if("string"==typeof e)return m(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?m(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),c=i[0],u=i[1];P=c._id,D(),A.innerHTML="",u.forEach((function(e){var t=a(e,{handleDelete:o,handleLike:r,handleImageClick:w,currentUserId:P});A.prepend(t)}))})).catch((function(e){console.error("Ошибка при получении данных пользователя или карточек",e)})),b.forEach((function(e){e.addEventListener("click",(function(){u(e.closest(".popup"))}))})),v.addEventListener("click",(function(){q.reset(),p(q,f);var e=Array.from(q.querySelectorAll(f.inputSelector)),t=q.querySelector(f.submitButtonSelector);d(e,t,f),c(_)})),q.addEventListener("submit",(function(n){n.preventDefault();var c=q.querySelector('input[name="place-name"]'),l=q.querySelector('input[name="link"]');if(c.validity.valid&&l.validity.valid){var s,d,p=n.target.querySelector(f.submitButtonSelector),m=p.textContent;i(p,{isLoading:!0,initialText:m,loadingText:"Сохранение..."}),(s=c.value,d=l.value,fetch("".concat(e.baseUrl,"/cards"),{method:"POST",headers:{Authorization:e.headers.authorization,"Content-Type":"application/json"},body:JSON.stringify({name:s,link:d})}).then(t).catch((function(e){console.error("Ошибка при добавлении карточки на сервер:",e)}))).then((function(e){var t=a(e,{handleDelete:o,handleLike:r,handleImageClick:w,currentUserId:P});A.prepend(t),u(_),q.reset()})).catch((function(e){console.error("Ошибка при добавлении карточки на сервер",e)})).finally((function(){i(p,{isLoading:!1,initialText:m})}))}})),B.addEventListener("click",(function(){L.reset(),p(L,f);var e=Array.from(L.querySelectorAll(f.inputSelector)),t=L.querySelector(f.submitButtonSelector);d(e,t,f),c(S)})),L.addEventListener("submit",(function(n){n.preventDefault();var r,o=E.value,a=n.target.querySelector(f.submitButtonSelector),c=a.textContent;i(a,{isLoading:!0,initialText:c,loadingText:"Сохранение..."}),(r=o,fetch("".concat(e.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify({avatar:r})}).then(t).catch((function(e){console.error("Ошибка при обновлении аватара:",e)}))).then((function(){B.style.backgroundImage="url(".concat(o,")"),u(S),L.reset()})).catch((function(e){console.error("Ошибка при обновлении аватара",e)})).finally((function(){i(a,{isLoading:!1,initialText:c})}))})),y.addEventListener("click",(function(){var e,t,n;C.value=z.name||"",k.value=z.about||"",p(g,f),e=C.value===z.name,t=k.value===z.about,n=g.querySelector(f.submitButtonSelector),e&&t?(n.classList.add(f.inactiveButtonClass),n.disabled=!0):(n.classList.remove(f.inactiveButtonClass),n.disabled=!1),c(h)})),g.addEventListener("submit",(function(n){n.preventDefault();var r=C.value,o=k.value,a=n.target.querySelector(f.submitButtonSelector),c=a.textContent;i(a,{isLoading:!0,initialText:c,loadingText:"Сохранение..."}),function(n,r){return fetch("".concat(e.baseUrl,"/users/me"),{method:"PATCH",headers:{Authorization:e.headers.authorization,"Content-Type":"application/json"},body:JSON.stringify({name:n,about:r})}).then(t).then((function(e){return console.log("Профиль обновлен",e),e})).catch((function(e){console.error("Ошибка при обновлении профиля:",e)}))}(r,o).then((function(e){x.textContent=e.name,T.textContent=e.about,B.style.backgroundImage="url(".concat(e.avatar,")"),u(h)})).catch((function(e){console.error("Ошибка при обновлении профиля",e)})).finally((function(){i(a,{isLoading:!1,initialText:c})}))})),O=f,Array.from(document.querySelectorAll(O.formSelector)).forEach((function(e){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);d(n,r,t),n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?s(e,t,n):function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r.inputErrorClass),o.textContent=n,o.classList.add(r.errorClass)}(e,t,t.validationMessage,n)}(e,o,t),d(n,r,t)}))}))}(e,O)}))})();