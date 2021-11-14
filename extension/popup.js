const siteHeader = document.getElementById('site');
const notesBlock = document.getElementById('notes');
const addBtn = document.getElementById('add');
const textArea = document.getElementById('textarea');

chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    var url = tabs[0].url;
    console.log(url);
    siteHeader.innerHTML = url
});

chrome.runtime.onMessage.addListener(function(msg, sender, response) {
    // First, validate the message's structure.
    if((msg.from === 'content') && (msg.subject === 'close')) {
        window.close()
        return;
    }
    if((msg.from === 'content') && (msg.subject === 'open')) {
        
        return;
    }
})
const notes = [1,2,3,4]
const colors = ['#000000', '#36454F', '#023020', '#301934']

function makeNotes() {
    notesBlock.innerHTML = '';
    notes.forEach((note, i)=>{
        const div = document.createElement('div');
        const h4 = document.createElement('h4');
        const p = document.createElement('p');
        const dbtn = document.createElement('button');
    
        dbtn.addEventListener('click', function() {
            div.parentElement.removeChild(div);
        })
    
        p.innerHTML = `
        Cillum aliquip minim culpa excepteur fugiat. In deserunt incididunt aute velit aute sit anim labore dolor et mollit nulla. Amet id officia consequat qui irure occaecat minim et do. Elit enim nulla eiusmod elit consequat id sit aute dolor. Ad magna sint ut reprehenderit et exercitation duis ipsum nisi quis ad irure culpa aliquip. Minim aliqua aliqua mollit culpa ipsum minim amet nostrud.
        `;
        h4.innerHTML = `Note ${note}`;
        div.appendChild(h4);
        div.appendChild(p);
        div.appendChild(dbtn)
        div.style.backgroundColor = colors[i%4]
        div.style.color = 'white';
        notesBlock.appendChild(div);
    })
}


addBtn.addEventListener('click', function() {
    console.log(textArea.innerHTML);
    textArea.innerHTML = '';
    notes.push('_');
    makeNotes();
})

makeNotes();