let trmsTemp = `
<section id="addTrms" class="container">
    <section class="row">
        <label name="name">Name:</label>
        <input type="text" name="name" id="n-trms-name" />
    </section>
    <section class="row">
        <label name="rating">Rating:</label>
        <input type="text" name="rating" id="n-trms-rating" />
    </section>
    <section class="row">
        <label name="chef">chef:</label>
        <input type="text" name="chef" id="n-trms-chef" />
    </section>
    <section class="row">
        <label name="type">type:</label>
        <input type="text" name="type" id="n-trms-type" />
    </section>
    <section class="row">
        <label name="img">img:</label>
        <input type="text" name="img" id="n-trms-img" />
    </section>
    <button id="n-rest-submit">Add Trms</button>
</section>
`
function addTrmsForm(){
    document.getElementById('trmsForm').innerHTML=trmsTemp;
    document.getElementById('n-trms-submit').onclick = addTrms;
    document.getElementById('addTrms').onkeydown = checkEnter;
}
function removeTrmsForm(){
    document.getElementById('trmsForm').innerHTML='';
    window.location.reload();
}
function checkEnter(event) {
    console.log(event);
    if(event.which === 13) {
        addTrms();
    }
}
function addTrms() {
    let data = {};
    data.name=document.getElementById('n-trms-name').value;
    data.img=document.getElementById('n-trms-img').value;
    data.rating=document.getElementById('n-trms-rating').value;
    data.chef=document.getElementById('n-trms-chef').value;
    data.type=document.getElementById('n-trms-type').value;
    console.log(data);
    fetch('/trmss', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        // redirect: 'follow', // manual, *follow, error
        body: JSON.stringify(data)}).then(()=>{removeTrmsForm()})
}