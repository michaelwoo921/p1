// window <- An object representation of (essentially) the browser
window.onload = () => { // The onload event triggers after the webpage is finished loading.
    // document <- An object representation of the DOM.
    //ajaxGetRestaurants();
    //createRestaurantList(restaurants);
    createNavBar();
    document.getElementById('addTrmsLink').onclick= addTrmsForm;
    fetchGetTrmss();
    authenticate();
}
function fetchGetTrmss(){
    // Fetch is an API for sending requests to servers that utilizes promises.
    fetch('/trmss').then((resp)=> {
            // The data that gets passed into the promise is basically a response object.
            // the response object has metadata (like the status code) and the body of the response
            // as well as useful methods like .json() which will create a promise with the data
            // as an object.
            return resp.json();
        }).then(data => createTrmsList(data));
}
function ajaxGetTrmss(){
    // Asynchronous Java and XML

    // Step 1: Create a new XMLHttpRequest
    let xhttp = new XMLHttpRequest();
    // Step 2: set callback for onreadystatechange
    xhttp.onreadystatechange = () => {
        // closure to the xhttp object to handle our response
        /*
        ReadyStates of AJAX:
        0 - New
        1 - Open
        2 - Recieved
        3 - Processing
        4 - Ready
        */
        if(xhttp.readyState === 4 && xhttp.status === 200) {
            console.log(xhttp.response);
            createTrmsList(JSON.parse(xhttp.response));
        }
    }
    // Step 3: open the connection
    xhttp.open('GET', '/trmss');
    // Step 4: send the request
    xhttp.send(); // Because this is a get request, the send will be empty.

}
function createTrmsList(trmsList){
    let section = document.getElementById('trmss');
    let row;
    for(let i = 0; i < trmsList.length; i++) {
        if(i%3 === 0) {
            row = document.createElement('section');
            row.className='row border';
            section.appendChild(row);
        }
        let div = createTrmsElement('div', '', 'col trms card', row);
        let img = document.createElement('img');
        img.src = trmsList[i].img;
        img.className = 'card-img-top trms-logo';
        div.appendChild(img);
        let card = document.createElement('div');
        card.className="card-body";
        div.appendChild(card);
        createTrmsElement('p', trmsList[i].name, '', card);
        createTrmsElement('p', trmsList[i].eta, 'deliverytime', card);
        createTrmsElement('p', trmsList[i].rating, 'rating', card);
        createTrmsElement('p', trmsList[i].type, 'foodtype', card);
    }
}
function createTrmsElement(element, data, className, parent){
    let e = document.createElement(element);
    e.innerHTML = data;
    e.className = className;
    parent.appendChild(e);
    return e;
}
let createLiteral = (trms) => {
    return `<div class="trms">
    <p>${trms.name}</p>
    <img src="${trms.img}"/>
    <p class="deliverytime">${trms.eta}</p>
    <p class="rating">${trms.rating} stars</p>
    <p class="foodtype">${trms.type}</p>
    </div>`
}