/* Runs the function to display the user info, history, graph or suggestions, every time their div is shown*/
$(document).on("pageshow", function () {
    if ($('.ui-page-active').attr('id') == "pageuserInfo") {
        showUserForm()
    }
    else if ($('.ui-page-active').attr('id') == "pageRecords") {
        loadUserInformation();
        listRecords();
    }
    else if ($('.ui-page-active').attr('id') == "pageAdvice") {
        advicePage();
        resizeGraph();
    }
    else if ($('.ui-page-active').attr('id') == "pageGraph")
    {
        drawGraph();
        resizeGraph();
    }
});
function loadUserInformation() {
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
    if (user != null) {
        $("#divUserSection").empty();
             
        
        
        if (user.PlantType == "Clothing") {
            user.PlantType = "Clothing and Textiles";
        }
        else if (user.PlantType == "Electronics") {
            user.PlantType = "Electronics";
        }
        else if (user.PlantType == "Food") {
            user.PlantType = "Food";
        }
        else {
            user.PlantType = "Other";
        }
       
         
        $("#divUserSection").append("Plant Name: " + user.PlantName +
          "<br>Plant City: " + user.PlantCity +
          "<br>Plant State: " + user.PlantState +
          "<br>Plant Start Date: "+ user.PlantStart+
          "<br>New Password: " + user.NewPassword +
          "<br>Plant ID: " + user.PlantID +
          "<br>Plant Type: " + user.PlantType); 
        $("#divUserSection").append("<br><a href='#pageUserInfo' data-mini='true' id='btnProfile' data-role='button' data-icon='edit' data-iconpos='left' data-inline='true'>Edit Profile</a>");
        $('#btnProfile').button(); //'Refresh' the button
    }
}