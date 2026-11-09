const galleryScript = document.createElement("script");
galleryScript.src = new URL("../../assets/app.js?v=de1bca0e915f", document.currentScript.src).href;
document.head.appendChild(galleryScript);
