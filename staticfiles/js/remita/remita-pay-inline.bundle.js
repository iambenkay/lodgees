!function(e){function t(i){if(n[i])return n[i].exports;var r=n[i]={i:i,l:!1,exports:{}};return e[i].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,i){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:i})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=1)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(2),r=n(3),o=function(){function e(){}return e.log=function(e,t){void 0===t&&(t=""),i.environment.production||console.log(e,t)},e.error=function(e,t){i.environment.production||console.error(e,t)},e.randomId=function(){return r().replace(/-/g,"")},e}();t.UtilService=o},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(0),r=n(6),o=new r.InlinePaymentEngineModule;window.RmPaymentEngine=o,i.UtilService.log("RmPaymentEngine",window.RmPaymentEngine)},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.environment={production:!0},t.environment.production||console.log("Current environment: ",t.environment)},function(e,t,n){function i(e,t,n){var i=t&&n||0;"string"==typeof e&&(t="binary"===e?new Array(16):null,e=null),e=e||{};var a=e.random||(e.rng||r)();if(a[6]=15&a[6]|64,a[8]=63&a[8]|128,t)for(var s=0;s<16;++s)t[i+s]=a[s];return t||o(a)}var r=n(4),o=n(5);e.exports=i},function(e,t){var n="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof window.msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto);if(n){var i=new Uint8Array(16);e.exports=function(){return n(i),i}}else{var r=new Array(16);e.exports=function(){for(var e,t=0;t<16;t++)0==(3&t)&&(e=4294967296*Math.random()),r[t]=e>>>((3&t)<<3)&255;return r}}},function(e,t){function n(e,t){var n=t||0,r=i;return[r[e[n++]],r[e[n++]],r[e[n++]],r[e[n++]],"-",r[e[n++]],r[e[n++]],"-",r[e[n++]],r[e[n++]],"-",r[e[n++]],r[e[n++]],"-",r[e[n++]],r[e[n++]],r[e[n++]],r[e[n++]],r[e[n++]],r[e[n++]]].join("")}for(var i=[],r=0;r<256;++r)i[r]=(r+256).toString(16).substr(1);e.exports=n},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(7),r=function(){function e(){}return e.prototype.init=function(e){return(new i.InlinePaymentEngineComponent).init(e)},e}();t.InlinePaymentEngineModule=r},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(8),r=n(0),o=n(9),a=n(10),s=n(11),l=n(12),u=function(){function e(){this.INLINE_SCRIPT_NAME="remita-pay-inline",this.IFRAME_CLASS_NAME="iframe-pop",this.APP_LOADER_ID="js-app-loader",this.OMITTED_PAYMENT_KEYS=["onClose","onSuccess","onError","config"],this.view=new i.InlinePaymentEngineView}return e.prototype.init=function(e){return this.view.setupAppLoader(this.APP_LOADER_ID),this.isValidPaymentOptions(e)&&(this.eventMethod=window.addEventListener?"addEventListener":"attachEvent",this.eventer=window[this.eventMethod],this.messageEvent="attachEvent"==this.eventMethod?"onmessage":"message",e.transactionId=e.transactionId||r.UtilService.randomId(),e.id=e.transactionId,this.defaultOptions=new o.PaymentEngineOptions(e),this.siteBaseUrl=void 0!==e.config&&e.config.host?e.config.host:this.getInlineScriptPathUrl(),this.htmlPath=this.siteBaseUrl+"/base-template.html",this.buildPaymentWidget(this.defaultOptions),this.listenForCloseEvent(),r.UtilService.log("init component",e),r.UtilService.log("init component this.defaultOptions",this.defaultOptions)),this},e.prototype.getInlineScriptPathUrl=function(){for(var e=document.getElementsByTagName("script"),t="https://login.remita.net/payment/v1",n=0;n<e.length;n++){var i=e[n];if(i&&i.src){var r=i.src.indexOf(this.INLINE_SCRIPT_NAME);-1!=r&&(t=i.src.substring(0,r-1))}}return t},e.prototype.isValidPaymentOptions=function(e){if(!e)throw new Error("Please provide the required payment options to continue.");if(!l.Validators.isString(e.key)||0===e.key.length)throw new Error('Please set a valid "key" option to continue.');if(!l.Validators.isString(e.firstName)||0===e.firstName.length)throw new Error('Please set a valid "firstName" option to continue.');if(!l.Validators.isString(e.lastName)||0===e.lastName.length)throw new Error('Please set a valid "lastName" option to continue.');if(!l.Validators.isNumber(parseFloat(e.amount)))throw new Error('Please set a valid "amount" option to continue.');return!0},e.prototype.buildPaymentWidget=function(e){this.isIframeLoaded=!1,this.isIframeOpen=!1,e.metadata.referrer=this.view.getWindowHref(),e.metadata=JSON.stringify(e.metadata);var t=this.view.deleteKeysFromObject(e,this.OMITTED_PAYMENT_KEYS),n=this.htmlPath+"?"+this.view.serialize(t);this.setupPaymentWidget(n),r.UtilService.log("params",{options:e,params:t,iframeSrcPath:n})},e.prototype.setupPaymentWidget=function(e){var t=this,n=10*this.view.getHighestZIndex("div"),i="z-index: "+Math.max(n,999999);i+="\n        ;\ndisplay: none;\n        \nbackground: transparent;\n        \nbackground: rgba(0,0,0,0.005);\n        \nborder: 0px none transparent;\n        \noverflow-x: hidden;\n        \noverflow-y: hidden;\n        \nvisibility: hidden;\n        \nmargin: 0;\n        \npadding: 0;\n        \n-webkit-tap-highlight-color: transparent;\n        \n-webkit-touch-callout: none; position: fixed;\n        \nleft: 0;\n        \ntop: 0;\n        \nwidth: 100%;\n        \nheight: 100%;\n        ",this.view.appendPaymentIframe({id:this.defaultOptions.id,src:e,cssText:i,className:this.IFRAME_CLASS_NAME,parent:document.body}).onload=function(){t.isIframeLoaded=!0}},e.prototype.listenForCloseEvent=function(){var e=this;try{window.addEventListener(this.messageEvent,function(t){var n=t.data||t.message;if(n&&"string"==typeof n){var i=e.view.parseResponse(n,e.defaultOptions);if(!i.isIframe)return;e.handleIframeEvents(i)}},!1)}catch(e){r.UtilService.error("CloseEventException ",e)}},e.prototype.handleIframeEvents=function(e){var t=e.action,n=e.data;switch(t){case a.RmIframeEventType.RemitaCloseAppLoader:this.removeAppLoadingView();break;case a.RmIframeEventType.RemitaClose:n?this.handleSuccess(n):this.performCloseEvent();break;case a.RmIframeEventType.RemitaError:n&&this.handleError(n);break;case a.RmIframeEventType.RemitaOpen:break;default:this.closePaymentWidget()}},e.prototype.displayPaymentIframe=function(e){e.contentWindow.postMessage(a.RmIframeEventType.RemitaOpen+" "+this.defaultOptions.id,"*"),this.isIframeOpen=!0,this.view.displayPaymentIframe(this.defaultOptions.id)},e.prototype.openIframe=function(){this.showPaymentWidget()},e.prototype.showPaymentWidget=function(){var e,t=this;this.isIframeOpen||(e=document.getElementById(this.defaultOptions.id),this.isIframeLoaded?this.displayPaymentIframe(e):e.onload=function(){t.displayPaymentIframe(e),t.isIframeLoaded=!0})},e.prototype.closePaymentWidget=function(){this.isIframeOpen&&(this.isIframeOpen=!1,this.view.hidePaymentIframe(this.defaultOptions.id)),this.removeAppLoadingView()},e.prototype.removeAppLoadingView=function(){document.getElementById(this.APP_LOADER_ID)&&document.getElementById(this.APP_LOADER_ID).remove()},e.prototype.handleSuccess=function(e){var t=new s.ChargeResponse(JSON.parse(e));this.defaultOptions.onSuccess&&(this.defaultOptions.onSuccess.call(this,t),this.performCloseEvent())},e.prototype.handleError=function(e){var t=new s.ChargeResponse(JSON.parse(e));this.defaultOptions.onError&&t&&this.defaultOptions.onError.call(this,t)},e.prototype.performCloseEvent=function(){this.defaultOptions.onClose&&(this.defaultOptions.onClose.call(this),this.closePaymentWidget())},e}();t.InlinePaymentEngineComponent=u},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(){}return e.prototype.parseResponse=function(e,t){var n,i,r,o,a;return"string"==typeof e?(n=e.split(" ")[0],n&&(i=e.split(" "),r=i[1],o=i.slice(2).join(" "),a=t.id==r),{action:n,isIframe:a,data:o}):null},e.prototype.deleteKeysFromObject=function(e,t){for(var n=JSON.parse(JSON.stringify(e)),i=0;i<t.length;i++)delete n[t[i]];for(var r in n)n.hasOwnProperty(r)&&!n[r]&&delete n[r];return n},e.prototype.serialize=function(e){return Object.keys(e).map(function(t){return encodeURIComponent(t)+"="+encodeURIComponent(e[t])}).join("&")},e.prototype.getWindowHref=function(){var e=window.location.href;return e&&e.length>500&&(e=e.split("?")[0]),e},e.prototype.getHighestZIndex=function(e){for(var t=document.getElementsByTagName(e),n=0,i=0;i<t.length;i++){var r=document.defaultView.getComputedStyle(t[i],null).getPropertyValue("z-index");r>n&&"auto"!=r&&(n=r)}return parseInt(0)},e.prototype.appendPaymentIframe=function(e){var t=document.createElement("iframe");return t.setAttribute("frameBorder","0"),t.setAttribute("allowtransparency","true"),t.setAttribute("sandbox","allow-same-origin allow-scripts allow-forms allow-popups allow-modals allow-popups-to-escape-sandbox"),t.style.cssText=e.cssText,t.id=t.name=e.id,t.src=e.src,t.className=e.className,e.parent.appendChild(t),t},e.prototype.displayPaymentIframe=function(e){var t=document.getElementById(e);t.style.display="block",t.style.visibility="visible",document.body.style.overflow="hidden"},e.prototype.hidePaymentIframe=function(e){var t=document.getElementById(e);t.style.display="none",t.style.visibility="hidden",document.body.style.overflow="",t.remove()},e.prototype.setupAppLoader=function(e){var t=document.createElement("div");t.style.cssText="\n            position: fixed;\n            top: 0;\n            left: 0;\n            width: 100%;\n            height: 100%;\n            background: rgba(0, 0, 0, 0.73);\n            z-index: 99;\n        ",t.setAttribute("id",e),t.innerHTML=this.getAppLoaderTemplate(),document.body.appendChild(t)},e.prototype.getAppLoaderTemplate=function(){return'\n            <div id="remita_section" \n            style="margin: 0;position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);\n            ">\n                <svg style="margin: 20px; display: inline-block;" width="100px" height="100px" viewBox="0 0 464 156" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n                \n                    <defs></defs>\n                    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n                        <g id="Remita_Ellipses">\n                            <g id="Page-1" transform="translate(14.000000, 6.000000)">\n                                <path d="M69.0157101,130.697805 C53.2804909,146.425721 27.7676839,146.425721 12.0324647,130.697805 C-3.70275452,114.969888 -3.70275452,89.4689227 12.0324647,73.7410066 C27.7676839,58.0130905 53.2804909,58.0130905 69.0157101,73.7410066 C84.7509293,89.4689227 84.7509293,114.969888 69.0157101,130.697805" id="Fill-13" fill="#F16521" transform="translate(0 1.70667)">\n                    <animateTransform attributeName="transform" dur="0.8s" type="translate" values="0 15 ; 0 -15; 0 15" repeatCount="indefinite" begin="0.00"></animateTransform>\n                </path>\n                                <path d="M69.0157101,73.7423454 C84.7509293,89.4702615 84.7509293,114.971227 69.0157101,130.699143 C53.2804909,146.427059 27.7676839,146.427059 12.0324647,130.699143" id="Fill-15" fill="#D95129" transform="translate(0 1.70667)">\n                    <animateTransform attributeName="transform" dur="0.8s" type="translate" values="0 15 ; 0 -15; 0 15" repeatCount="indefinite" begin="0.00"></animateTransform>\n                </path>\n                                <path d="M231.263125,126.847491 C210.392663,147.708266 176.554174,147.708266 155.683712,126.847491 C134.815929,105.986715 134.815929,72.1639309 155.683712,51.3031556 C176.554174,30.4450579 210.392663,30.4450579 231.263125,51.3031556 C252.133587,72.1639309 252.133587,105.986715 231.263125,126.847491" id="Fill-17" fill="#F16521" transform="translate(0 15.952)">\n                <animateTransform attributeName="transform" dur="0.8s" type="translate" values="0 18 ; 0 -18; 0 18" repeatCount="indefinite" begin="0.25"></animateTransform>\n                </path>\n                                <path d="M231.263125,51.3047622 C252.133587,72.1655375 252.133587,105.988322 231.263125,126.849097 C210.392663,147.707195 176.554174,147.707195 155.683712,126.849097" id="Fill-19" fill="#D95129" transform="translate(0 15.952)">\n                <animateTransform attributeName="transform" dur="0.8s" type="translate" values="0 18 ; 0 -18; 0 18" repeatCount="indefinite" begin="0.25"></animateTransform>\n                </path>\n                                <path d="M415.074006,121.625737 C387.238687,149.448137 342.109092,149.448137 314.268416,121.625737 C286.435776,93.8033372 286.435776,48.692011 314.268416,20.8669337 C342.109092,-6.95546606 387.238687,-6.95546606 415.074006,20.8669337 C442.912003,48.692011 442.912003,93.8033372 415.074006,121.625737" id="Fill-21" fill="#1CA78B" transform="translate(0 -14.1169)">\n                <animateTransform attributeName="transform" dur="0.8s" type="translate" values="0 23 ; 0 -23; 0 23" repeatCount="indefinite" begin="0.4"></animateTransform>\n                </path>\n                                <path d="M415.074006,20.868808 C442.912003,48.6912077 442.912003,93.8025339 415.074006,121.627611 C387.238687,149.450011 342.109092,149.450011 314.268416,121.627611" id="Fill-23" fill="#168972" transform="translate(0 -8.36689)">\n                <animateTransform attributeName="transform" dur="0.8s" type="translate" values="0 23 ; 0 -23; 0 23" repeatCount="indefinite" begin="0.4"></animateTransform>\n                </path>\n                            </g>\n                        </g>\n                    </g>\n                </svg>\n            </div>\n        '},e}();t.InlinePaymentEngineView=i},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e){e&&(this.id=e.id||"",this.key=e.key||"",this.email=e.email||"",this.amount=e.amount||"",this.currency=e.currency||"NGN",this.firstName=e.firstName||"",this.lastName=e.lastName||"",this.customerId=e.customerId||"",this.metadata=e.metadata||{},this.onClose=e.onClose||function(){console.log("closed")},this.onSuccess=e.onSuccess||function(e){console.log("callback Successful Response",e)},this.onError=e.onError||function(e){console.log("callback Error Response",e)},this.pan=e.pan||"",this.expiryMonth=e.expiryMonth||"",this.expiryYear=e.expiryYear||"",this.cvv=e.cvv||"",this.pin=e.pin||"",this.transactionId=e.transactionId||"",this.channel=e.channel||"",this.config=e.config||null,this.bankCode=e.bankCode||"",this.accountNumber=e.accountNumber||"",this.narration=e.narration||"")}return e}();t.PaymentEngineOptions=i},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(){}return e.RemitaOpen="RemitaOpen",e.RemitaClose="RemitaClose",e.RemitaError="RemitaError",e.RemitaCloseAppLoader="RemitaCloseAppLoader",e}();t.RmIframeEventType=i},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e){e&&(this.paymentReference=e.paymentReference||"",this.processorId=e.processorId||"",this.transactionId=e.transactionId||"",this.message=e.message||"",this.amount=e.debitedAmount||null)}return e}();t.ChargeResponse=i},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(){}return e.isString=function(e){return"string"==typeof e||e instanceof String},e.isNumber=function(e){return"number"==typeof e&&isFinite(e)},e.isArray=function(e){return e&&"object"==typeof e&&e.constructor===Array},e.isFunction=function(e){return"function"==typeof e},e.isObject=function(e){return e&&"object"==typeof e&&e.constructor===Object},e.isNull=function(e){return null===e},e.isUndefined=function(e){return void 0===e},e.isNullOrUndefined=function(t){return e.isNull(t)||e.isUndefined(t)},e.isBoolean=function(e){return"boolean"==typeof e},e.isRegExp=function(e){return e&&"object"==typeof e&&e.constructor===RegExp},e.isError=function(e){return e instanceof Error&&void 0!==e.message},e.isDate=function(e){return e instanceof Date},e.isSymbol=function(e){return"symbol"==typeof e},e.prototype.isValidEmail=function(e){return/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e)},e}();t.Validators=i}]);