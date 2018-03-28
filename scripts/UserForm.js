/*Adds values to the password */
function addValueToPassword(button) {
    var currVal = $("#passcode").val();
    if (button == "bksp")
    {
        $("#passcode").val(currVal.substring(0,currVal.length-1));
    }
    else
    {
        $("#passcode").val(currVal.concat(button));
    }
}

/*This calls the disclaimer or redirects to user info if needed*/
$("#btnEnter").click(function()
{
    var password=getPassword();
    if (document.getElementById("passcode").value == password)
    {
        if (localStorage.getItem("agreedToLegal") == null)
        {
            $("#btnEnter").attr("href",
             "#legalNotice").button();
        }
        else if (localStorage.getItem("agreedToLegal") == "true")
        {
            if (localStorage.getItem("user") == null)
            {
                /*User has not been made, redirect to create user*/
                $("#btnEnter").attr("href",
                   "#pageUserInfo").button();
            }
            else
            {
                $("#btnEnter").attr("href",
                  "#pageMenu").button();
            }
        }
    }
    else
    {
        alert("Incorrect Password, please try again.");
    }
});
/* This calls the current password or if one isnt set calls default password*/
function getPassword()
{
    if (typeof(Storage) == "undefined")
    {
        alert("Your browser doesnt not support HTML5 localStorage. Try upgrading.");
    }
    else if (localStorage.getItem("user") != null) {
        return JSON.parse(localStorage.getItem("user")).NewPassword;
    }
    else
    {
        /*Default Password*/
        return "2345";
    }
}
/*Stores if user has or hasnt read ToS*/
$("#noticeYes").click(function () {
    localStorage.setItem("agreedToLegal", "true");
});
/*Submitting user info function*/
$("#frmUserForm").submit(function () {//event: sumbitting the form
    saveUserForm();
    return true;
});
function checkUserForm() {// Checks for empty data fields in the form
    

    if (($("#txtPlantName").val() != "") &&
        ($("#txtPlantCity").val() != "") &&
        ($("#txtPlantState").val() != "") &&
        ($("#datPlantStart").val() != "") && 
        ($("txtPlantID").val()!=="") &&
        ($("#slcPlantType option:selected").val() != "Select Plant Type")) 
         {
        return true;
         }
        else
         {
        return false;
         }
}
function saveUserForm()

{
console.log("HI")
    if (checkUserForm())
    {
        var user =
            {
                "PlantName": $("#txtPlantName").val(),
                "PlantCity": $("#txtPlantCity").val(),
                "PlantState": $("#txtPlantState").val(),
                "NewPassword": $("#changePassword").val(),
                "PlantStart": $("#datPlantStart").val(),
                "PlantType": $("#slcPlantType option:selected").val(),
                "PlantID": $("#txtPlantID").val()
                
            };
        try
        {
            localStorage.setItem("user", JSON.stringify(user));
            alert("Saving Information");
            $.mobile.changePage("#pageMenu")
            window.location.reload();
        }
        catch(e)
        {
            /*Google browser use different error constant*/
            if(window.navigator.vendor==="Google Inc.")
            {
                if (e == DOMException.QUOTA_EXCEEDED_ERR)
                {
                    alert("Error: Local Stoage Exceeds Limit.");
                }
            }
            else if(e == QUOTA_EXCEEDED_ERR)            {
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
function showUserForm() {//Load the stored values in the form
    try {
        var user = JSON.parse(localStorage.getItem("user"));
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
    if (user != null)
    {
        $("#txtPlantName").val(user.PlantName);
        $("#txtPlantCity").val(user.PlantCity);
        $("#txtPlantState").val(user.PlantState);
        $("#changePassword").val(user.NewPassword);
        $("#datPlantStart").val(user.PlantStart);
        $('#slcPlantType option[value=' + user.PlantType + ']').attr('selected', 'selected');
        $("#slcPlantType option:selected").val(user.PlantType);
        $('#slcPlantType').selectmenu('refresh', true);

    }
}