/*
 * Contoh kode untuk membaca query parameter,
 * Siapa tau relevan! :)
 * */

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

// Coba olah data ini hehe :)
console.log(params);

/*
 * Contoh penggunaan DOM di dalam class
 * */
const app = new App();
app.loadButton.onclick = app.run;

// app.loadButton.addEventListener('click', function(params){
//     params.preventDefault()
//     console.log(app.carCapacity)
//     app.load(app.carCapacity).then(app.run)
// })

// app.clearButton.addEventListener('click', () =>{
//     app.clear()
// })
app.init().then(app.run);
