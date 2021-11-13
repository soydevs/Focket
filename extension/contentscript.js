chrome.runtime.onMessage.addListener(function(msg, sender){
    if(msg == "toggle"){
        toggle();
        
    }
})

var iframeOpen = false;

var iframe = document.createElement('iframe'); 
iframe.style.width="500px";
iframe.style.height = "450px";
iframe.style.overflowX = "hidden";
iframe.style.overflowY = "hidden";
iframe.style.width = "0px";
iframe.style.position = "fixed";
iframe.style.top = "0px";
iframe.style.right = "0px";
iframe.style.zIndex = "9000000000000000000";
iframe.src = chrome.runtime.getURL("popup.html")

function toggle(){
    
    if(!iframeOpen){
        iframe.style.width="500px";
        document.body.appendChild(iframe)
        
        chrome.runtime.sendMessage({
            from: 'content',
            subject: 'open',
            url: window.location.href
        });
    }
    else{
        iframe.style.width="0px";
        chrome.runtime.sendMessage({
            from: 'content',
            subject: 'close'
            });
        iframe.parentNode.removeChild(iframe)
    }
    iframeOpen = !iframeOpen
}