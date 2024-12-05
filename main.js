(()=>{"use strict";var e={};function t(e,t){var n=t.handleDelete,o=t.handleLike,r=t.handleImageClick,u=document.querySelector("#card-template").content.cloneNode(!0).querySelector(".card"),c=u.querySelector(".card__image"),a=u.querySelector(".card__title"),i=u.querySelector(".card__like-button"),p=u.querySelector(".card__delete-button");return c.src=e.link,c.alt=e.name,a.textContent=e.name,i.addEventListener("click",(function(){return o(i)})),p.addEventListener("click",(function(){return n(u)})),c.addEventListener("click",(function(){return r(e)})),u}function n(e){e.classList.toggle("card__like-button_is-active")}function o(e){e.remove()}function r(e){e.classList.add("popup_is-opened"),e.classList.remove("popup_is-animated"),document.addEventListener("keydown",c)}function u(e){e.classList.add("popup_is-animated"),e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",c)}function c(e){if("Escape"===e.key){var t=document.querySelector(".popup_is-opened");t&&u(t)}}e.p="";const a=e.p+"0863e5bc26221680f1e2.svg";var i=function(e,t){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.classList.remove("popup__button_disabled"),t.disabled=!1):(t.classList.add("popup__button_disabled"),t.disabled=!0)},p=function(){document.querySelectorAll(".form__input-error").forEach((function(e){e.textContent=""})),document.querySelectorAll(".popup__input").forEach((function(e){e.classList.remove("popup__input_type_error")}))},l={baseUrl:"https://nomoreparties.co/v1/wff-cohort-27",headers:{authorization:"25c7281b-ee62-429d-9090-7b85d165a07d","Content-Type":"application/json"}},s=function(){return fetch("".concat(l.baseUrl,"/cards"),{headers:l.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка ".concat(e.status))})).then((function(e){return e}))};document.querySelector(".logo").src=a;var d=document.querySelector(".profile__edit-button"),_=document.querySelector(".profile__add-button"),m=document.querySelector(".popup_type_edit"),f=document.querySelector(".popup_type_new-card"),v=document.querySelectorAll(".popup__close"),y=m.querySelector(".popup__form"),S=f.querySelector(".popup__form"),q=m.querySelector('input[name="name"]'),b=m.querySelector('input[name="description"]'),h=document.querySelector(".places__list");function L(e,t,n){t?(e.textContent="Сохранение...",e.disabled=!0):(e.textContent=n,e.disabled=!1)}s().then((function(e){console.log(e)})),fetch("".concat(l.baseUrl,"/users/me"),{headers:l.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка ".concat(e.status))})).then((function(e){return e})).then((function(e){document.querySelector(".profile__title").textContent=e.name,document.querySelector(".profile__description").textContent=e.about,document.querySelector(".profile__image").style.backgroundImage="url('".concat(e.avatar,"')")})),s().then((function(e){e.forEach((function(e){var u=t(e,{handleDelete:o,handleLike:n,handleImageClick:function(e){var t=document.querySelector(".popup_type_image"),n=t.querySelector(".popup__image"),o=t.querySelector(".popup__caption");n.src=e.link,n.alt=e.name,o.textContent=e.name,r(t)}});h.prepend(u)}))})),v.forEach((function(e){e.addEventListener("click",(function(){u(e.closest(".popup"))}))})),d.addEventListener("click",(function(){q.value=profile.name,b.value=profile.description,p(),r(m)})),y.addEventListener("submit",(function(e){e.preventDefault(),profile.name=q.value,profile.description=b.value,u(m)})),_.addEventListener("click",(function(){return r(f)})),S.addEventListener("submit",(function(e){e.preventDefault();var c=e.target.querySelector(x.submitButtonSelector),a=c.textContent;L(c,!0,a);var i=S.querySelector('input[name="place-name"]').value,l=S.querySelector('input[name="link"]').value;i&&l&&setTimeout((function(){var e=t({name:i,link:l},{handleDelete:o,handleLike:n,handleImageClick:function(e){var t=document.querySelector(".popup_type_image"),n=t.querySelector(".popup__image"),o=t.querySelector(".popup__caption");n.src=e.link,n.alt=e.name,o.textContent=e.name,r(t)}});h.prepend(e),L(c,!1,a),u(f),S.reset(),p()}),1e3)}));var k=document.querySelector(".profile__image"),g=document.querySelector(".popup_type_new-avatar");g||console.error("Попап для смены аватара не найден!");var E=g.querySelector(".popup__form"),C=E.querySelector('input[name="avatar-link"]');k.addEventListener("click",(function(){r(g)})),E.addEventListener("submit",(function(e){e.preventDefault();var t=C.value,n=e.target.querySelector(x.submitButtonSelector),o=n.textContent;L(n,!0,o),t&&setTimeout((function(){document.querySelector(".profile__image").style.backgroundImage="url(".concat(t,")"),u(g),E.reset(),L(n,!1,o)}),1e3)})),document.addEventListener("click",(function(e){e.target.classList.contains("popup_is-opened")&&u(e.target)}));var x={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};E.addEventListener("submit",(function(e){e.preventDefault();var t=C.value;t&&updateAvatar(t).then((function(e){document.querySelector(".profile__image").style.backgroundImage="url(".concat(e.avatar,")"),u(g),E.reset()})).catch((function(e){console.error("Ошибка обновления аватара:",e)}))})),Array.from(document.querySelectorAll(".popup__form")).forEach((function(e){e.addEventListener("submit",(function(e){e.preventDefault()})),function(e){var t=Array.from(e.querySelectorAll(".popup__input")),n=e.querySelector(".popup__button");i(t,n),t.forEach((function(o){o.addEventListener("input",(function(){!function(e,t){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?function(e,t){var n=e.querySelector(".".concat(t.id,"-error"));t.classList.remove("popup__input_type_error"),n.textContent="",n.classList.remove("popup__error_visible")}(e,t):function(e,t,n){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add("popup__input_type_error"),o.textContent=n,o.classList.add("popup__error_visible")}(e,t,t.validationMessage)}(e,o),i(t,n)}))}))}(e)}))})();