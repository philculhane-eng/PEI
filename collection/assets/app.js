const galleryScript = document.createElement("script");
galleryScript.src = new URL("../../assets/app.js?v=a4afd58db544", document.currentScript.src).href;
document.head.appendChild(galleryScript);
