/*The value of the Submit Record button*/
$("#btnAddRecord").click(function () {
    /*.button("refresh") function forced jQuery Mobile to refresh the text on the button*/
    $("#btnSubmitRecord").val("Add");
    if($("btnSubmitRecord").hasClass("btn-ui-hidden")){
        $("#btnSubmitRecord").button("refresh");
    }
});


$("#pageNewRecordForm").on("pageshow", function() {
    //We need this to know if we are editing or adding records
    var formOperation = $("#btnSubmitRecord").val();
    if (formOperation == "Add") {
        clearRecordForm();
    }
    else if (formOperation == "Edit") {
        //If we're editing a record we loadtge stored data in the form
        showRecordForm($("#btnSubmitRecord").attr("indexToEdit"));
    }
});

$("#frmNewRecordForm").submit(function () {
    var formOperation = $("#btnSubmitRecord").val();

    if (formOperation == "Add") {
        addRecord();
        $.mobile.changePage("#pageRecords");
    }
    else if (formOperation == "Edit") {
        editRecords($("#btnSubmitRecord").attr("indexToEdit"));
        $.mobile.changePage("#pageRecords");
        $("#btnSubmitRecord").removeAttr("indexToEdit");
    }
    /*Must return false*/
    return false;
});
function addRecord()
{
    if(checkRecordForm())
    {
        console.log("F");
        var record ={
            "Date": $('#datPowerDate').val(),
            "TotalWattsUsed": $('#txtPowerConsumed').val(),
            "HOO":$('#txtHours').val(),
                    }
        try
        {
            var tbRecords = JSON.parse(localStorage.getItem("tbRecords"));
            if(tbRecords==null)
            {
                tbRecords=[];
            }
        tbRecords.push(record);
        localStorage.setItem("tbRecords", JSON.stringify(tbRecords));
        alert("Saving Information");
        clearRecordForm();
        listRecords();
        }    
        catch (e) {
            /*Google browser use different error constant*/
            if (window.navigator.vendor === "Google Inc.") {
                if (e == DOMException.QUOTA_EXCEEDED_ERR) {
                    alert("Error: Local Stoage Exceeds Limit.");
                }
            }
            else if (e == QUOTA_EXCEEDED_ERR) {
                alert("Error: Saving to local storage.");
            }
            console.log(e);
            }
        }
    else
        {
            alert("Please complete the form properly.");
        }
    return true;

    }
/* Checks that users have entered all valid info and that the date they have entered is not in the future*/
function checkRecordForm()
{
       
    if
        (($("#txtWatts").val() != "") &&
        ($("#datDate").val()!="") &&
        ($("#txtHours").val()!=""))
       
    {
        return true;
    }
    else
    {
        return false;
    }
}
function listRecords()
{
    try
    {
        var tbRecords=JSON.parse(localStorage.getItem("tbRecords"));
    }
    catch (e) {
        /*Google browser use different error constant*/
        if (window.navigator.vendor === "Google Inc.") {
            if (e == DOMException.QUOTA_EXCEEDED_ERR) {
                alert("Error: Local Stoage Exceeds Limit.");
            }
        }
        else if (e == QUOTA_EXCEEDED_ERR) {
            alert("Error: Saving to local storage.");
        }
        console.log(e);
    }

//Load previous records, if they exist
if (tbRecords != null)
{
    //Order Records by date
    tbRecords.sort(compareDates);
    //Initalize Table
    $("#tblRecords").html(
        "<thead>" +
        "   <tr>" +
        "   <th>Date</th>" +
        "   <th><abbr title='Total Watts Used'>Total Watts Used(w)</abbv></th>" +
        "   <th><abbr title='Hours of Plant Operation'>Hours of Plant Operation</abbv></th>" +
        "   <th>Edit / Delete</th>" +
        "</tr>" +
        "</thead>" +
        "<tbody>" +
        "</tbody>"
        );

    //Loop to insert each record
    for (var i = 0; i < tbRecords.length; i++) {
        var rec = tbRecords[i];
        $("#tblRecords tbody").append("<tr>" +
          "  <td>" + rec.Date + "</td>" +
          "  <td>" + rec.TotalWattsUsed + "</td>" +
          "  <td>" + rec.HOO + "</td>" +
          "</td>" +
          "  <td><a data-inline='true'  data-mini='true' data-role='button' href='#pageNewRecordForm' onclick='callEdit(" + i + ")'data-icon='edit' data-iconpos='notext'></a>" +
          "  <a data-inline='true'  data-mini='true' data-role='button' href='#' onclick='callDelete("+i+")' data-icon='delete' data-iconpos='notext'></a></td>" +"</tr>");
    }


    $('#tblRecords [data-role="button"]').button(); 
    //'Refresh' the buttons. Without this the delete/edit buttons wont appear
    }
    else 
{
    $("#tblRecords").html("");
}
return true;
}
function compareDates(a,b)
{
    var x = new Date(a.date);
    var y = new Date(b.date);
    if (x > y) {
        return 1;
    }
    else 
    {
        return -1;
    }
}
function callEdit(index)
{
    $("#btnSubmitRecord").attr("indexToEdit", index);
    /*.button("refresh") function forces jQuery Mobile to refresh the text on the button*/
    $("#btnSubmitRecord").val("Edit");
    if ($("btnSubmitRecord").hasclass("btn-ui-hidden")) {
        $("#btnSubmitRecord").button("refresh");
    }
}
$("#pageNewRecordForm").on("pageshow", function() {
    //We need to know if we are editing or adding a record everytime we show this page
    //If we are adding a record we show the form with blank inputs
    var formOperation = $("#btnSumbitRecord").val();
    if (formOperation == "Add")
    {
        clearRecordForm();
    }
    else if (formOperation == "Edit") {
        //If we are editing a recore we load the stored data in the form
        showRecordForm($("#btnSubmitRecord").attr("indexToEdit"));
    }
});
//$("#frmNewRecordForm").submit(function() {
//    var formOperation = $("#btnSubmitRecord").val();

//    if (formOperation == "Add")
//    {
//        addRecord();
//        $.mobile.changePage("#pageRecords");     
//    }
//    else if (formOperation == "Edit")
//    {
//        editRecord($("#btnSubmitRecord").attr("indexToEdit"));
//        $.mobile.changePage("#pageRecords");
//        $("#btnSubmitRecord").removeAttr("indexToEdit");
//    }
//    /*Must return false, or else submitting form results in a page reload*/
//    return false;
//});
function editRecord(index)
{
    if(checkRecordForm())
    {
        try
        {
            
            var tbRecords = JSON.parse(localStorage.getItem("tbRecords"));
            tbRecords[index] ={
                "Date"              : $('#datDate').val(),
                "TotalWattsUsed"    : $('#txtWatts').val(),
                "HOO"                : $('#txtHours').val()
                
            };//Alter the selected item in the array
            localStorage.setItem("tbRecords", JSON.stringify(tbRecords)); //Saving Array to local storage
            alert("Saving Information")
            clearRecordForm();
            listRecords();
        }
        catch (e) {
            /*Google browser use different error constant*/
            if (window.navigator.vendor === "Google Inc.") {
                if (e == DOMException.QUOTA_EXCEEDED_ERR) {
                    alert("Error: Local Stoage Exceeds Limit.");
                }
            }
            else if (e == QUOTA_EXCEEDED_ERR) {
                alert("Error: Saving to local storage.");
            }
            console.log(e);
        }
    }
    else
    {
        alert("Please complete the form properly.");
    }
}
function clearRecordForm()
{
    $('#datDate').val("");
    $('#txtWatts').val("");
    $('#txtHours').val("");
    return true;
}
function showRecordForm(index)
{
    try
    {
        var tbRecords=JSON.parse(localStorage.getItem("tbRecords"));
        var rec=tbRecords[index];
        $('#datDate').val(rec.Date);
        $('#txtWatts').val(rec.TotalWattsUsed);
        $('#txtHours').val(rec.HOO);
       
    }
    catch (e) {
        /*Google browser use different error constant*/
        if (window.navigator.vendor === "Google Inc.") {
            if (e == DOMException.QUOTA_EXCEEDED_ERR) {
                alert("Error: Local Stoage Exceeds Limit.");
            }
        }
        else if (e == QUOTA_EXCEEDED_ERR) {
            alert("Error: Saving to local storage.");
        }
        console.log(e);
    }
}
function deleteRecord(index)
{
    try
    {
        var tbRecords=JSON.parse(localStorage.getItem("tbRecords"));

        tbRecords.splice(index, 1);
    
        if(tbRecords.length==0){
            /*No items left in records, remove entire array from localstorage*/
            localStorage.removeItem("tbRecords");
        }
        else
        {
            localStorage.setItem("tbRecords",JSON.stringify(tbRecords));
        }
    }
    catch (e) {
        /*Google browser use different error constant*/
        if (window.navigator.vendor === "Google Inc.") {
            if (e == DOMException.QUOTA_EXCEEDED_ERR) {
                alert("Error: Local Stoage Exceeds Limit.");
            }
        }
        else if (e == QUOTA_EXCEEDED_ERR) {
            alert("Error: Saving to local storage.");
        }
        console.log(e);
    }
}
//Delete the given index and redisplay the table function callDelete(index)
function callDelete(index) {
    deleteRecord(index);
    listRecords();
}
//Removes all record data from localStorage
$("#btnClearHistory").click(function () {
    localStorage.removeItem("tbRecords");
    listRecords();
    alert("All records have been deleted.");
});