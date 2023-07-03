// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
let currentDayBox = $('#currentDay');
let currentDay = dayjs();
let currentHour = dayjs().format("h");
let currentMeridiem = dayjs().format('a');
currentDayBox.text(currentDay.format("dddd, MMM DD h:mm a"));
console.log(currentMeridiem);
// .text("hi!");
let divCounter = 0;
const possibleMeridiems = ["9AM",'10AM','11AM','12PM','1PM','2PM','3PM','4PM','5PM'];
const laborHours = ["9",'10','11','12','1','2','3','4','5'];
let currentIndex = 0;
function updateTime() {
  let currentDay = dayjs();
  currentDayBox.text(currentDay.format("dddd, MMM DD h:mm:ss a"));
}

// Update the time initially
updateTime();

// Update the time every second (1000 milliseconds)
setInterval(updateTime, 1000);
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  /* Think of every problem as input and outputs
    make pseudocode for problem
    use docs to fill in pseudocode
    test every line with console.log 
    if messed up look up solutions
    repeat */
    // <div id="hour-9" class="row time-block">
    //     <div class="col-2 col-md-1 hour text-center py-3">9AM</div>
    //     <textarea class="col-8 col-md-10 description" rows="3" "> </textarea>
    //     <button class="btn saveBtn col-2 col-md-1" aria-label="save"">
    //       <i class="fas fa-save" aria-hidden="true"></i>
    //     </button>
    // </div>
    // const divContainer = $(".container-fluid");
    // const rowDiv = createElement('div');
    // rowDiv.setAttribute("id","hour-" + currentHour);
    // rowDiv.setAttribute('class', 'row time-block');
    // const stylingDiv = createElement('div');
    // stylingDiv.setAttribute('class', 'col-2 col-md-1 hour text-center py-3');
    // stylingDiv.textContent = `${currentHour}${currentMeridiem}`;
    // const textArea = createElement('textarea');
    // textArea.setAttribute('col-8 col-md-10 description');
    // textArea.setAttribute("rows", '3');
    // const btn = createElement('button');
    // btn.setAttribute('class', 'btn saveBtn col-2 col-md-1');
    // btn.setAttribute('aria-label', 'save');
    // const saveIcon = createElement('i');
    // saveIcon.setAttribute('class', 'fas fa-save');
    // saveIcon.setAttribute('aria-hidden', 'true');


    // rowDiv.appendChild(stylingDiv);
    // rowDiv.appendChild(textArea);
    // rowDiv.appendChild(btn);
    // btn.appendChild(saveIcon);

    // divContainer.appendChild(rowDiv);
    for(var i =0; i<9; i++){
      const divContainer = $(".container-fluid");

      const rowDiv = $("<div>").attr("id", "hour-" + laborHours[currentIndex]).addClass("row time-block");

      const stylingDiv = $("<div>").addClass("col-2 col-md-1 hour text-center py-3").text(/*currentHour +*/ possibleMeridiems[currentIndex]);

      const textArea = $("<textarea>").addClass("col-8 col-md-10 description").attr("rows", "3");

      const btn = $("<button>").addClass("btn saveBtn col-2 col-md-1").attr("aria-label", "save");

      const saveIcon = $("<i>").addClass("fas fa-save").attr("aria-hidden", "true");

btn.append(saveIcon);
rowDiv.append(stylingDiv, textArea, btn);
divContainer.append(rowDiv);

currentIndex++;
}

  //add class to first div
  //append div to class container-fluid



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
    console.log(storageID);

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
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
timeSection.each(function(){
  //set testing current hour
  //get current id of timeSection
  const idOfTimeSection = $(this).attr('id');
  //uses match method to extract the number part of the id and converts it to a integer
  const numericId = idOfTimeSection.match(/\d+/)[0];
  const index = laborHours.indexOf(numericId);
   //if id < current hour
   if(index < laborHours.indexOf(currentHour)){
   //then set class to past 
    // $(this).removeClass("past" || "present" || "future");
    $(this).addClass('past')
    $(this).children('.btn').off('click').removeClass('saveBtn').addClass('pastSaveBtn');
   }else if(index > laborHours.indexOf(currentHour)){
    // $(this).removeClass("past" || "present" || "future");
    $(this).addClass('future')
   }else{
    // $(this).removeClass("past" || "present" || "future");
    $(this).addClass('present')
   }
  
//loop thorugh each block
//compare the numericid to the array of laborHours to see index
//if the laborHour index is = currentHour then set "current" class
//based on the postion of the index set all other based on which side of the array it is.

// if(numericId < currentHour){
//   //then set class to past 
//    // $(this).removeClass("past" || "present" || "future");
//    $(this).addClass('past')
//   }else if(numericId > currentHour){
//    // $(this).removeClass("past" || "present" || "future");
//    $(this).addClass('future')
//   }else{
//    // $(this).removeClass("past" || "present" || "future");
//    $(this).addClass('present')
//   }

});
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});
