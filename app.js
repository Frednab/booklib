const bookList = document.querySelector('#book-list');
const form = document.querySelector('#add-cafe-form');


// creating element and rendering

function renderBook(doc){

    // creating element
     let li = document.createElement('li');
     let book = document.createElement('span');
     let author = document.createElement('span');
     let lesson = document.createElement('span');
     let cross = document.createElement('div');




     //seting the element
     li.setAttribute('data-id',doc.id);
     book.textContent = doc.data().book;
     author.textContent = doc.data().author;
     lesson.textContent = doc.data().lesson;
     cross.textContent ='x';



    //  adding the element
    li.appendChild(book);
    li.appendChild(author);
    li.appendChild(lesson);
    li.appendChild(cross);



    bookList.appendChild(li);

     // deleting data
     cross.addEventListener('click', (e) =>{
            e.stopPropagation();
            let id = e.target.parentElement.getAttribute('data-id');
            db.collection('library').doc(id).delete();
    } )


}


// // getting data
// db.collection('library').get().then((snapshot=>{
//     snapshot.docs.forEach(doc=>{
//         renderBook(doc);
//     })
// }))


form.addEventListener( 'submit', (e)=>{
    e.preventDefault();
    // Saving Or Adding data
    db.collection('library').add({

        book: form.book.value,
        author: form.author.value,
        lesson: form.lesson.value
    });
        form.book.value='';
        form.author.value='';
        form.lesson.value='';

    });

    // getting real time data
db.collection('library').orderBy('book').onSnapshot(snapshot=>{
    let changes = snapshot.docChanges();
    changes.forEach(change=>{
        if(change.type =='added'){
            renderBook(change.doc);
        } else if(change.type =='removed'){
            let li = bookList.querySelector('[data-id=' + change.doc.id +']');
            bookList.removeChild(li);
        }
    })
})
