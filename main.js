let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let search = document.getElementById('search');
let submit = document.getElementById('submit');
// let search_title = document.getElementById('search-title');
// let search_category = document.getElementById('search-category');
let mood = 'create';
let temp;

console.log(title,price,taxes,ads,discount,total,count,category,search,submit);
//get total
function getTotal(){
    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.backgroundColor = 'green';        
    }else{
        total.innerHTML = '';
        total.style.backgroundColor = 'red'; 
    }
}

//create product
let datapro;
if(localStorage.products != null){
    datapro = JSON.parse(localStorage.products);

}else{
    datapro = [];
}
submit.onclick = function(){
    let newpro = {
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        discount:discount.value,
        ads:ads.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value
    }
    
    if(newpro.count < 100 && title.value != '' && price.value!='' && category.value!=''){
        if(mood == 'create'){
            if(newpro.count > 1){
                for(let i=0;i<newpro.count;i++){
                    datapro.push(newpro);
                }
            }else{
                datapro.push(newpro);

            }
        }else{
            datapro[temp] = newpro;
            mood = 'create';
            submit.innerHTML = 'Create';
            count.style.display = 'block';
        }
        title.style.border = 'none';
        price.style.border = 'none';
        category.style.border = 'none';
        clearData();
        
    }else{
        title.style.border = '2px solid red';
        price.style.border = '2px solid red';
        category.style.border = '2px solid red';
        count.style.border =  '2px solid red';
    }   

    //save localStorage
    localStorage.setItem('products',JSON.stringify(datapro));
    console.log(datapro);

    showData();
}

//clear inputs
function clearData(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    count.value = '';
    category.value = '';
    total.innerHTML = '';
}
//read
function showData(){
    getTotal();
    let table = '';
    for(let i=0;i<datapro.length;i++){
        table += 
        `
        <tr>
            <td>${i + 1}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].category}</td>
            <td><button onclick="updateData( ${i} )" id="update">Update</button></td>
            <td><button onclick="deleteData( ${i} )" id="delete">Delete</button></td>
        </tr>
        `;
    }
    document.getElementById('tbody').innerHTML = table;
    let btnDelete = document.getElementById('deleteAll');
    if(datapro.length > 0){
        btnDelete.innerHTML = `
        <button onclick="deleteAll()">Delete All(${datapro.length})</button>
        `;
    }else{
        btnDelete.innerHTML = '';
    }
}
showData();
//count
//delete
function deleteData(i){
    datapro.splice(i,1);
    localStorage.products = JSON.stringify(datapro);
     console.log(datapro);
    showData();
}

function deleteAll(){
    localStorage.clear();
    datapro.splice(0);
    showData();
}

//update
function updateData(idx){
    title.value = datapro[idx].title;
    price.value = datapro[idx].price;
    ads.value = datapro[idx].ads;
    taxes.value = datapro[idx].taxes;
    discount.value = datapro[idx].discount;
    category.value = datapro[idx].category;
    getTotal();
    count.style.display = 'none';
    submit.innerHTML = 'Update';
    mood = 'update';
    temp = idx;
    scroll({
        top:0,
        behavior:'smooth'
    });
}
//search
let seacrchMode = 'Title';
function getSearchMode(id){
    let search = document.getElementById('search');
    if(id=="search-title"){
        seacrchMode = 'Title';
    }else{
        seacrchMode = 'Category';

    }
    search.placeholder = 'Seacrh By ' + seacrchMode;
    search.focus();
    search.value = '';
    showData();
}

function SearchData(value){
    let table='';
    for(let i=0;i<datapro.length;i++){
        if(seacrchMode=='Title'){
                if(datapro[i].title.toLowerCase().includes(value.toLowerCase())){
                    table +=
                    `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${datapro[i].title}</td>
                        <td>${datapro[i].price}</td>
                        <td>${datapro[i].taxes}</td>
                        <td>${datapro[i].ads}</td>
                        <td>${datapro[i].discount}</td>
                        <td>${datapro[i].total}</td>
                        <td>${datapro[i].category}</td>
                        <td><button onclick="updateData( ${i} )" id="update">Update</button></td>
                        <td><button onclick="deleteData( ${i} )" id="delete">Delete</button></td>
                    </tr>
                    `;    
                }
        }else{
                if(datapro[i].category.toLowerCase().includes(value.toLowerCase())){
                    table +=
                    `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${datapro[i].title}</td>
                        <td>${datapro[i].price}</td>
                        <td>${datapro[i].taxes}</td>
                        <td>${datapro[i].ads}</td>
                        <td>${datapro[i].discount}</td>
                        <td>${datapro[i].total}</td>
                        <td>${datapro[i].category}</td>
                        <td><button onclick="updateData( ${i} )" id="update">Update</button></td>
                        <td><button onclick="deleteData( ${i} )" id="delete">Delete</button></td>
                    </tr>
                    `;    
                }
        }
    }
    document.getElementById('tbody').innerHTML = table;

}
//clean data