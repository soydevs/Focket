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
const authorizeBtn = document.getElementById('authorize');

const BASE_URL = 'http://localhost:3000/api/';

function getCreds() {
    const url = document.getElementById('url').innerText;
    const password = document.getElementById('password').innerText;
    return {url, password}
}

var pageurl;

chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, async function (tabs) {
    pageurl = tabs[0].url;
    //console.log(url);
    siteHeader.innerHTML = pageurl
    await fetchNotes()
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

var notes = [{
    title:'Note 1',
    content:'Elit excepteur nostrud minim dolore ut consequat cillum velit. Irure ex veniam cillum est voluptate voluptate. Aliqua duis tempor quis duis et occaecat fugiat elit consequat officia eu culpa officia eu. Non ea occaecat laborum et minim laborum amet cupidatat minim excepteur ex elit mollit sunt. Irure quis deserunt anim sit veniam quis sunt dolor eu deserunt tempor aliqua labore. Velit esse esse labore enim consectetur aliquip ad aliquip irure aliqua qui anim.'
},{
    title:'Note 2',
    content: 'Dolor dolore deserunt labore proident sit Lorem proident cupidatat sunt nisi. Laborum sunt id reprehenderit excepteur do. Minim reprehenderit pariatur eiusmod incididunt occaecat incididunt sint ad ea.'
},{
    title:'Note 3',
    content:'Id esse Lorem minim amet ex consectetur ullamco in voluptate. Veniam culpa velit amet aute pariatur eu minim ullamco Lorem proident. Qui deserunt et quis mollit deserunt id in sunt dolore qui dolor eu deserunt amet. Minim velit cupidatat nulla ut eiusmod adipisicing. Eu occaecat id enim exercitation aute sunt tempor cillum incididunt velit.'
}]
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
    
        p.innerHTML = note.content;
        h4.innerHTML = note.title;
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

const fetchNotes = async() => {
    try {
        let res = await fetch(BASE_URL + "articles", {
            method: "POST",
            body: JSON.stringify({url:pageurl}),
          });
        //console.log("here")
        if (res.status === 201) {
          aid = (await res.json()).data._id;
         // console.log(aid);
        } else throw "Server error";
      } catch (err) {
        //console.log("Error in adding: " + err);
      }
    //const resp = await fetch('http://localhost:3000/api/'+'notes/'+aid, {method:'GET', mode: 'no-cors'})
    try {
        const resp = await fetch(BASE_URL + "notes/" + aid, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          mode:'no-cors'
        });
        if (resp.status === 201) {
            notes = (await resp.json()).data
        } else throw "Server error";
      } catch (err) {
      //  console.log("Error in adding: " + err);
      }
    makeNotes()
}


makeNotes()

addBtn.addEventListener('click', async function() {
   // console.log(textArea.innerHTML);
    
    const resp = await fetch('http://localhost:3000/api/'+'notes/'+aid, {method:'POST', mode: 'no-cors', body:{
        title:titleArea.innerHTML,
        text:textArea.innerHTML,
        color:'black'
    }})
    notes.push({
        title:titleArea.innerHTML,
        content:textArea.innerHTML
    });
    titleArea.innerHTML = 'Sample title';
    textArea.innerHTML = 'Sample text';
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
})
saveBtn.addEventListener('click',async function() {
    if(noteIndex === '_')   return;
    // const resp = await fetch('http://localhost:3000/api/'+'notes/'+aid, {method:'PATCH', mode: 'no-cors', body:{
    //     uid:notes[noteIndex].id,
    //     title:titleArea.innerHTML,
    //     text:textArea.innerHTML,
    //     color:'black'
    // }})
    notes[noteIndex] = {
        title:titleArea.innerHTML,
        content:textArea.innerHTML
    };
    makeNotes();
    clearBtn.click();
})

makeNotes();

authorizeBtn.addEventListener('click', function() {
    let cred = getCreds();
    localStorage.setItem('url', cred.url);
    localStorage.setItem('password', cred.password);
    settingsBtn.click()
})