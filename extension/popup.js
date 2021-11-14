const siteHeader = document.getElementById('site');
const notesBlock = document.getElementById('notes');
const addBtn = document.getElementById('add');
const textArea = document.getElementById('textarea');
const titleArea = document.getElementById('titlearea');
const area = document.getElementById('area');
const clearBtn = document.getElementById('clear');
const settingsBtn = document.getElementById('settings');
const settingsArea=document.getElementById('settingsarea');
const saveBtn = document.getElementById('save');

function getCreds() {
    const url = document.getElementById('url').innerText;
    const password = document.getElementById('password').innerText;
    return {url, password}
}

var pageurl;

chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    pageurl = tabs[0].url;
    console.log(url);
    siteHeader.innerHTML = pageurl
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

var noteIndex = '_';
var aid;

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
    
        p.innerHTML = 'Do amet dolor ad laboris aliqua est occaecat incididunt aliqua Lorem id. Qui laboris do minim excepteur excepteur in ex occaecat in enim enim quis cupidatat sunt. Magna fugiat in do Lorem fugiat aute sint reprehenderit aliquip. Do reprehenderit deserunt culpa mollit fugiat esse sint non irure dolore quis. Sint enim et quis laboris consequat consequat culpa. Qui laborum eiusmod nisi non nulla ut excepteur minim ut anim.';
        h4.innerHTML = `Note ${index}`;
        div.appendChild(h4);
        div.appendChild(p);
        div.appendChild(dbtn)
        div.style.backgroundColor = colors[i%4]
        div.style.color = 'white';
        div.dataset.index = i;

        div.addEventListener('click', function() {
            let index = div.dataset.index;
            titleArea.innerHTML = notes[index].title;
            textArea.innerHTML = notes[index].content;
            area.style.backgroundColor = colors[index%4];
            noteIndex = index;
        })

        notesBlock.appendChild(div);
    })
}

async function fetchNotes() {
    const url = localStorage.getItem('url')
    const res = await fetch('http://localhost:3000/api/articles', {method:'POST', mode:'no-cors', body:{url:pageurl}})
    const article = res.data;
    console.log(article)
    aid = article._id
    const resp = await fetch('http://localhost:3000/api/'+'notes/'+aid, {method:'GET', mode: 'no-cors'})
    notes = resp.data;
    makeNotes()
}

//fetchNotes()
makeNotes()

addBtn.addEventListener('click', async function() {
    console.log(textArea.innerHTML);
    
    const resp = await fetch('http://localhost:3000/api/'+'notes/'+aid, {method:'POST', mode: 'no-cors', body:{
        title:titleArea.innerHTML,
        text:textArea.innerHTML,
        color:'black'
    }})
    titleArea.innerHTML = 'Sample title';
    textArea.innerHTML = 'Sample text';
    notes.push(resp.data);
    noteIndex = '_';
    makeNotes();
})
clearBtn.addEventListener('click', function() {
    noteIndex = '_';
    titleArea.innerHTML='';
    textArea.innerHTML='';
    area.style.backgroundColor = 'rgb(0,230,0)';
    
})
settingsBtn.addEventListener('click', function() {
    settingsArea.style.display==='flex'?settingsArea.style.display='none':settingsArea.style.display='flex'
    let cred = getCreds();
    localStorage.setItem('url', cred.url);
    localStorage.setItem('password', cred.password);
})
saveBtn.addEventListener('click',async function() {
    if(noteIndex === '_')   return;
    const resp = await fetch('http://localhost:3000/api/'+'notes/'+aid, {method:'PATCH', mode: 'no-cors', body:{
        uid:notes[noteIndex].id,
        title:titleArea.innerHTML,
        text:textArea.innerHTML,
        color:'black'
    }})
    notes[noteIndex] = resp.data;
    makeNotes();
    clearBtn.click();
})

makeNotes();