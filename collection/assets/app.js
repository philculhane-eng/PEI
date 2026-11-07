const galleryScript = document.createElement("script");
galleryScript.src = new URL("../../assets/app.js?v=640d836b53da", document.currentScript.src).href;
document.head.appendChild(galleryScript);
