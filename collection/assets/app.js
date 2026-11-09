const galleryScript = document.createElement("script");
galleryScript.src = new URL("../../assets/app.js?v=8bcc89d549c7", document.currentScript.src).href;
document.head.appendChild(galleryScript);
