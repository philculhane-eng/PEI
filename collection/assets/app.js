const galleryScript = document.createElement("script");
galleryScript.src = new URL("../../assets/app.js?v=2", document.currentScript.src).href;
document.head.appendChild(galleryScript);
