
$(function () {

let currentDayBox = $('#currentDay');
let currentDay = dayjs();
//this is hour plus the meridiem
let currentHour = dayjs().format("hA");
//array for actual times. These get compared to determine past, current or future
const laborHours = ["9AM",'10AM','11AM','12PM','1PM','2PM','3PM','4PM','5PM'];
//index counter
let currentIndex = 0;

//button to clear storage
let clearStorage = $('#storage-clear');
clearStorage.click(function() {
  localStorage.clear();
  //reloads page after clear
  location.reload();
});


//automatically updates time
function updateTime() {
  currentDay = dayjs();
  currentDayBox.text(currentDay.format("dddd, MMM DD h:mm:ss a"));
}
  // Update the time initially
  updateTime();

  // Update the time every second (1000 milliseconds)
  setInterval(updateTime, 1000);

//loop creates the available hours. In this case it is the labor hours
for(var i =0; i<9; i++){
  //gets the div container to house divs
  const divContainer = $(".container-fluid");
  //creates a div with the hour that will get compared. ---> <div id="hour-9" class="row time-block">
  const rowDiv = $("<div>").attr("id", "hour-" + laborHours[currentIndex]).addClass("row time-block");
  //this houses the hour and meridiemto the left of the box ---> <div class="col-2 col-md-1 hour text-center py-3">9AM</div>
  const stylingDiv = $("<div>").addClass("col-2 col-md-1 hour text-center py-3").text(/* currentHour */ laborHours[currentIndex]);
  //where user writes text --->  <textarea class="col-8 col-md-10 description" rows="3"> </textarea>
  const textArea = $("<textarea>").addClass("col-8 col-md-10 description").attr("rows", "3");
  //this is save button ---> <button class="btn saveBtn col-2 col-md-1" aria-label="save">
  const btn = $("<button>").addClass("btn saveBtn col-2 col-md-1").attr("aria-label", "save");
  //this is the icon in the save button ---> <i class="fas fa-save" aria-hidden="true"></i>
  const saveIcon = $("<i>").addClass("fas fa-save").attr("aria-hidden", "true");

  //combines all created elements
  btn.append(saveIcon);
  rowDiv.append(stylingDiv, textArea, btn);
  divContainer.append(rowDiv);

  //index counter +1
  currentIndex++;
}

  // Select text box
const userText = $('.description');

// Select save buttons
const saveBtns = $('.saveBtn');

saveBtns.each(function() {
  // Save button event click
  $(this).on("click", () => {
    // Value is equal to the description value. This refers to the button. 
    //so essentially the buttons sibling or (description) is selected
    const description = $(this).siblings('.description');
    const value = description.val();
    // Get the ID of the closest ancestor div
    const storageID = $(this).closest('div').prop('id');
    // If value has text, set it in local storage
    value !== '' ? localStorage.setItem(storageID, value) : console.log('empty');
  });
});

userText.each(function () {
  //figure out whats the current id of dexription box
  let currentId = $(this).closest('div').prop('id');
  // given the current id we should be able to get the stored value based on name of current id
  let storedValue = localStorage.getItem(currentId);
  $(this).text(storedValue);
});

  // TODO: Add code to apply the past, present, or future class to each time
  let timeSection = $('.time-block');
  
  timeSection.each(function(){
    //get current id of timeSection
    const idOfTimeSection = $(this).attr('id');
    //uses match method to extract the number part of the id and am || pm
    const matches = idOfTimeSection.match(/(\d+)(AM|PM)/);
    const numericIdWithMeridiem = matches[1] + matches[2];
  // ////////////////////////////////////////////////////////////////////////////////////////////
    // // Note: This is for testing purposes. Switches the current hour.
    // also we have to type the meridiem. So we need to uncomment this if it is past the time and we need
    // to test it.

    // currentHour = "2PM";
  // ////////////////////////////////////////////////////////////////////////////////////////////
  //checks to see of the current hour is in labor hours
    if (laborHours.includes(currentHour)) {
      const index = laborHours.indexOf(numericIdWithMeridiem);
      //if the index is less than the current hour
      if(index < laborHours.indexOf(currentHour)){
      //then set class to past 
        $(this).addClass('past')
        $(this).children('.btn').off('click').removeClass('saveBtn').addClass('pastSaveBtn');
    
        //if index is greater than the labor hours
      }else if(index > laborHours.indexOf(currentHour)){
        //set class to future
        $(this).addClass('future')
    
      }else{
        //else it is present
        $(this).addClass('present')
      }

    // when the current hour is not within the labor hours then it sets all to past
    } else{
        $(this).addClass('past')
        $(this).children('.btn').off('click').removeClass('saveBtn').addClass('pastSaveBtn');
    }
  });


});
