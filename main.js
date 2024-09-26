// get total
// create Product
// Save localstorage
// Clear Inputs
// Raed 
// Count
// delete
// update
// search
// clean data 

let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');


let mood = 'create';
let tmp;
//get total

let getTotal = function()
{
    if(price.value !='' ){
        let result=  (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background= 'green';
        total.style.letterSpacing= '2px';
    }else{
        total.style.background= 'red';
        total.style.letterSpacing= '0px';
    }
}

//create Product && Save localstorage

if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product)
}else{
    dataPro = [];
}


submit.onclick = function(){
    let newPro ={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }
    if(mood ==='create'){
        if(newPro.count> 1){
            for(let i = 0 ; i < newPro.count; i++){
                dataPro.push(newPro);
            }
        }   
        else
        {
            dataPro.push(newPro);
        }
    }
    else
    {
        dataPro[tmp] = newPro;
        mood = 'create';
        submit.innerHTML = 'Create';
        count.style.display= 'block';
    }
    
    //save localstorage
    localStorage.setItem('product', JSON.stringify(dataPro));
    clearData();
    showData();
}

//clear Inputs

function clearData(){
    title.value = '';
    price.value ='';
    ads.value ='';
    taxes.value='';
    total.innerHTML='';
    discount.value='';
    count.value='';
    category.value='';
}

//read

function showData()
{
     let table = '';
     for(let i = 0; i < dataPro.length; i++){
        table += `
        <tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
        </tr>`
    }
     document.getElementById('tbody').innerHTML = table;
     let btnDelete = document.getElementById('deleteAll')
     if (dataPro.length > 0 ){
        btnDelete.innerHTML= `<button onclick = "deleteAll()">Delete All ${"("} ${dataPro.length } ${")"}</button>`
     }
     else{
        btnDelete.innerHTML ='';
     }
     getTotal();
}

showData();

// Delete one Product

function deleteData(i){
    dataPro.splice(i , 1);
    localStorage.product = JSON.stringify(dataPro);
    showData();
}

//delete Button

function deleteAll(){
    localStorage.clear();
    dataPro.splice(0);
    showData()
}

//update
function updateData(i){
    title.value = dataPro[i].title;
    price.value =dataPro[i].price;
    ads.value =dataPro[i].ads;
    taxes.value=dataPro[i].taxes;
    getTotal();
    discount.value=dataPro[i].discount;
    count.style.display='none';
    category.value=dataPro[i].category;
    submit.innerHTML= 'Update';
    mood = 'update';
    tmp= i;
    scroll({
       top:0,
       behavior:'smooth',
    })
    
}

//search

let searchMood= 'title';
function getSearchMood(id){
    let search= document.getElementById('search');
    if(id == 'searchTitle'){
        searchMood= 'title';
        search.placeholder = 'Search By Title';
    }
    else{
        searchMood= 'category';
        search.placeholder = 'Search By Category';
    }
search.focus()
search.value ='';
showData();
}

function searchData(value){
    let table='';
    if(searchMood == 'title')
    {
        for(let i =0; i<dataPro.length; i++){
            if(dataPro[i].title.includes(value.toLowerCase())){
                console.log(i)
                table += `
                <tr>
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                </tr>`
            }
        }
    }
    else{
        for(let i =0; i<dataPro.length; i++){
            if(dataPro[i].category.includes(value.toLowerCase())){
                table +=`
                <tr>
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                </tr>`
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}