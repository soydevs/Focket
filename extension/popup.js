const siteHeader = document.getElementById('site')
chrome.runtime.onMessage.addListener(async (msg, sender, response) => {
    // First, validate the message's structure.
    console.log("got")
    if((msg.from === 'content') && (msg.subject === 'close')) {
        console.log("hehe")
        window.close()
        return;
    }
    if((msg.from === 'content') && (msg.subject === 'open')) {
        console.log("hii")
        return;
    }
})