let transactions = [];
let editIndex = -1;

function addTransaction(){

    let description = document.getElementById("description").value;
    let amount = Number(document.getElementById("amount").value);
    let type = document.getElementById("type").value;

    if(description=="" || amount<=0){
        alert("Enter valid data");
        return;
    }

    let data={
        description,
        amount,
        type
    };

    if(editIndex==-1){
        transactions.push(data);
    }else{
        transactions[editIndex]=data;
        editIndex=-1;
    }

    document.getElementById("description").value="";
    document.getElementById("amount").value="";

    showTransaction();
}

function showTransaction(){

    let body=document.getElementById("tableBody");

    body.innerHTML="";

    let deposit=0;
    let withdraw=0;

    transactions.forEach((t,index)=>{

        if(t.type=="Deposit")
            deposit+=t.amount;
        else
            withdraw+=t.amount;

        body.innerHTML+=`

        <tr>

        <td>${t.description}</td>

        <td>₹${t.amount}</td>

        <td>${t.type}</td>

        <td>

        <button class="edit" onclick="editTransaction(${index})">Edit</button>

        <button class="delete" onclick="deleteTransaction(${index})">Delete</button>

        </td>

        </tr>

        `;

    });

    document.getElementById("deposit").innerHTML="₹"+deposit;

    document.getElementById("withdraw").innerHTML="₹"+withdraw;

    document.getElementById("balance").innerHTML="₹"+(deposit-withdraw);

}

function editTransaction(index){

    let t=transactions[index];

    document.getElementById("description").value=t.description;

    document.getElementById("amount").value=t.amount;

    document.getElementById("type").value=t.type;

    editIndex=index;

}

function deleteTransaction(index){

    transactions.splice(index,1);

    showTransaction();

}