(()=>{"use strict";var e="";function t(e){e.classList.toggle("card__like-button_is-active")}function n(e){e.remove()}function r(e){e.classList.add("popup_is-opened"),e.classList.remove("popup_is-animated"),document.addEventListener("keydown",i)}function o(e){e.classList.add("popup_is-animated"),e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",i)}function i(e){if("Escape"===e.key){var t=document.querySelector(".popup_is-opened");t&&o(t)}}const a=e+"0863e5bc26221680f1e2.svg",c=e+"6666407ac3aa5af1d5de.jpg";var p=function(e,t){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.classList.remove("popup__button_disabled"),t.disabled=!1):(t.classList.add("popup__button_disabled"),t.disabled=!0)};document.querySelector(".logo").src=a;var u=document.querySelector(".profile__edit-button"),s=document.querySelector(".profile__add-button"),d=document.querySelector(".popup_type_edit"),l=document.querySelector(".popup_type_new-card"),_=document.querySelectorAll(".popup__close"),m=d.querySelector(".popup__form"),v=l.querySelector(".popup__form"),f=d.querySelector('input[name="name"]'),y=d.querySelector('input[name="description"]'),k=document.querySelector(".places__list"),S={name:"Жак-Ив Кусто",description:"Исследователь океана",avatar:c};function q(){document.querySelector(".profile__title").textContent=S.name,document.querySelector(".profile__description").textContent=S.description}function L(e){var o=function(e,t){var n=t.handleDelete,r=t.handleLike,o=t.handleImageClick,i=document.querySelector("#card-template").content.cloneNode(!0).querySelector(".card"),a=i.querySelector(".card__image"),c=i.querySelector(".card__title"),p=i.querySelector(".card__like-button"),u=i.querySelector(".card__delete-button");return a.src=e.link,a.alt=e.name,c.textContent=e.name,p.addEventListener("click",(function(){return r(p)})),u.addEventListener("click",(function(){return n(i)})),a.addEventListener("click",(function(){return o(e)})),i}(e,{handleDelete:n,handleLike:t,handleImageClick:function(e){var t=document.querySelector(".popup_type_image"),n=t.querySelector(".popup__image"),o=t.querySelector(".popup__caption");n.src=e.link,n.alt=e.name,o.textContent=e.name,r(t)}});k.prepend(o)}_.forEach((function(e){e.addEventListener("click",(function(){o(e.closest(".popup"))}))})),u.addEventListener("click",(function(){f.value=S.name,y.value=S.description,clearValidation(m,b),r(d)})),m.addEventListener("submit",(function(e){e.preventDefault(),S.name=f.value,S.description=y.value,q(),o(d)})),s.addEventListener("click",(function(){return r(l)})),v.addEventListener("submit",(function(e){e.preventDefault();var t=v.querySelector('input[name="place-name"]').value,n=v.querySelector('input[name="link"]').value;t&&n&&L({name:t,link:n}),o(l),v.reset(),clearValidation(v,b)})),q(),document.addEventListener("click",(function(e){e.target.classList.contains("popup_is-opened")&&o(e.target)})),[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach(L);var b={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};Array.from(document.querySelectorAll(".popup__form")).forEach((function(e){e.addEventListener("submit",(function(e){e.preventDefault()})),function(e){var t=Array.from(e.querySelectorAll(".popup__input")),n=e.querySelector(".popup__button");p(t,n),t.forEach((function(r){r.addEventListener("input",(function(){!function(e,t){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?function(e,t){var n=e.querySelector(".".concat(t.id,"-error"));t.classList.remove("popup__input_type_error"),n.textContent="",n.classList.remove("popup__error_visible")}(e,t):function(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.add("popup__input_type_error"),r.textContent=n,r.classList.add("popup__error_visible")}(e,t,t.validationMessage)}(e,r),p(t,n)}))}))}(e)}))})();