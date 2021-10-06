/*
 Sticky Notes App javascript file
*/

//variables
let noteTitle = document.querySelector('#noteTitle');
let noteCon = document.querySelector('#noteCon');
let row = document.querySelector('#row');
let h2 = document.querySelector('#h2');
let cols = document.querySelectorAll('.col');
let mainBtn = document.querySelector('#mainBtn');
let open = document.querySelector('.open');
let colorDiv = document.querySelector('.colors');
let close = document.querySelector('.clos');
let create = document.querySelector('#create');
let color;
let colorsCir = Array.from(document.querySelectorAll('.col'));

// 

open.addEventListener('click', openAdd);
close.addEventListener('click', closeAdd);



//restroing data from local storage

let allNotes;
if (localStorage.getItem('allNotes') == null) {

    allNotes = [];
} else {
    allNotes = JSON.parse(localStorage.getItem('allNotes'));
    displayNote(false);
}


// add a new note event listener

mainBtn.addEventListener('click', addNote);

//color control code


for (let i = 0; i < colorsCir.length; i++) {
    const newLocal = "active-col";

    colorsCir[i].addEventListener('click', (r) => {

        for (let j = 0; j < colorsCir.length; j++) {
            colorsCir[j].classList.remove(newLocal);

        }

        colorsCir[i].classList.add(newLocal);
        color = r.target.getAttribute('data-color');
        console.log(color);

    })

}


// add note function 
function addNote() {

    let note = {
        class: color,
        title: noteTitle.value,
        con: noteCon.value,
        date: getDate()
    }
    allNotes.push(note);
    displayNote(true);
    localStorage.setItem('allNotes', JSON.stringify(allNotes));

    clear();
    closeAdd();
    //console.log(allNotes);

};








//display function

function displayNote(added) {
    let container = '';
    for (let i = 0; i < allNotes.length; i++) {

        container += `    <div class="col-lg-3 col-md-4 col-sm-6 my-3">

     <div class="con">
     
                <div class="paper ">
                    <div  class="sticky ${allNotes[i].class} d-flex flex-column justify-content-between py-3 px-4">
                        <h3 class="handwritten h2 text-center">${allNotes[i].title}</h3 >
                        <p class="handwritten w-100 mx-2  mb-3">${allNotes[i].con}
                        </p>
                        <div class="d-flex justify-content-between align-items-end ">
                            <p class="date d-flex align-items-end h-100 ">${allNotes[i].date}</p>
                            <div class=" d-flex ">

                                <div class="edit mx-2  ">
                                    <button onclick="editNote(${i})"
                                        class="btn btns rounded-circle d-flex justify-content-center align-items-center"><i
                                            class="far fa-edit fa-fw"></i></button>
                                </div>
                                <div class="delete mx-2 ">
                                    <button onclick="deleteNote(${i})"
                                        class="btn btns rounded-circle d-flex justify-content-center align-items-center"><i
                                            class="fas fa-trash-alt  fa-fw"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
     </div>
            </div>`;

    }
    row.innerHTML = container;
    if (added) {
        let last = document.querySelectorAll('.paper')[document.querySelectorAll('.paper').length - 1];
        last.classList.add('justAdded');
    }


}


//delete function

function deleteNote(ind) {
    allNotes.splice(ind, 1);
    localStorage.setItem('allNotes', JSON.stringify(allNotes));
    let last = document.querySelectorAll('.con')[ind];
    last.classList.add('justDeleted');
    setTimeout(() => {
        displayNote(false);
    }, 400);

}

function editNote(ind) {
    openAdd('edit');
    h2.innerHTML = 'Edit Your Note';
    noteTitle.value = allNotes[ind].title;
    noteCon.value = allNotes[ind].con;
    mainBtn.innerHTML = 'Edit';

    mainBtn.classList.replace('btn-light', 'btn-outline-light');

    mainBtn.removeEventListener('click', addNote);
    mainBtn.addEventListener('click', editig);

    function editig() {

        allNotes[ind].title = noteTitle.value;
        allNotes[ind].con = noteCon.value;
        localStorage.setItem('allNotes', JSON.stringify(allNotes));
        displayNote(false);
        mainBtn.innerHTML = 'Add';
        h2.innerHTML = 'Add A New Note';
        mainBtn.classList.replace('btn-outline-light', 'btn-light');
        mainBtn.addEventListener('click', addNote);
        mainBtn.removeEventListener('click', editig);
        closeAdd();
        clear();

    }



}


let p = document.querySelector('.count');
noteCon.addEventListener('keyup', () => {
    let count = noteCon.value.length;

    if (count > 350) {
        mainBtn.disabled = 'false';


        count = noteCon.value.length;
        // console.log(noteCon.value[351]);
        // alert()
        p.innerHTML = `you can't write more than 350 char`;
    } else {
        p.innerHTML = `${count}/350`;
        mainBtn.disabled = '';
    }
})
















function getDate() {

    let d = new Date();
    let el = document.querySelectorAll('.date');

    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;


}

function clear() {
    noteCon.value = '';
    noteTitle.value = '';
}



function closeAdd() {
    create.classList.replace('in', 'out');
    open.style.display = 'block';
}

function openAdd(type = '') {
    create.classList.replace('out', 'in');
    open.style.display = 'none';
    if (type == 'edit') {
        colorDiv.style.display = 'none';
    } else {
        colorDiv.style.display = 'flex';
    }
}