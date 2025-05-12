function loading(){
    const overlay = document.createElement("div");
    overlay.style.background = "rgba(196, 196, 196, 0.30)";
    overlay.style.backdropFilter = "blur(2px)";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "360px";
    overlay.style.height = "800px";
    overlay.style.display = "flex";
    overlay.style.position = "fixed";
    overlay.style.zIndex = "9999"; //para que se ponga por encima
    overlay.style.alignItems = "center";   // Centrado vertical
    overlay.style.justifyContent = "center"; // Centrado horizontal
    
    const loader = document.createElement("img");
    loader.src = "../img/loader.gif";
    loader.style.width = "96px";
    loader.style.height = "96px";
    loader.style.position = "absolute";
    
    overlay.appendChild(loader);
    document.body.appendChild(overlay);
}