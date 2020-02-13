function openTab(evt, tabName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

var slideIndex = 0;

function openTabSide(evt, tabName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  slideIndex = 0;

  if (tabName == "hdt") {
    carouselHelpDesk();
  } else if (tabName == "hdt2") {
    carouselHelpDesk2();
  } else if (tabName == "rla") {
    carouselRevitLib();
  } else if (tabName == "trt") {
    carouselTravel();
  } else if (tabName == "sit") {
    carouselSysInfo();
  }

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontentSide");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinksSide");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the link that opened the tab
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

function openTabSideMob(evt, tabName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  slideIndex = 0;

  if (tabName == "hdt") {
    carouselHelpDesk();
  } else if (tabName == "hdt2") {
    carouselHelpDesk2();
  } else if (tabName == "rla") {
    carouselRevitLib();
  } else if (tabName == "trt") {
    carouselTravel();
  } else if (tabName == "sit") {
    carouselSysInfo();
  }

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontentSide");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  //tablinks = document.getElementsByClassName("tablinksSide");
  for (i = 0; i < tablinks.length; i++) {
    //tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the link that opened the tab
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

function openResume(evt) {
  var x = document.getElementById("resume-knowledge");
  var button = document.getElementById("resume-show-button");

  if (window.getComputedStyle(x).opacity == 0) {
    x.classList.remove("rInActive");
    x.classList.add("rActive");
    button.innerHTML = "Hide ";
    window.scrollBy(0, 400);
  } else {
    x.classList.add("rInActive");
    x.classList.remove("rActive");
    button.innerHTML = "Show ";
  }
}

var Revitto = null;
function carouselRevitLib() {
  if (Revitto) {
    clearTimeout(Revitto);
  }
  var i;
  var x = null;
  x = document.getElementsByClassName("revitImg");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > x.length) {
    slideIndex = 1;
  }
  x[slideIndex - 1].style.display = "block";
  Revitto = setTimeout(carouselRevitLib, 4000); // Change image every 2 seconds
}
var HDto = null;
function carouselHelpDesk() {
  if (HDto) {
    clearTimeout(HDto);
  }
  var i;
  var x = null;
  x = document.getElementsByClassName("HDImg");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > x.length) {
    slideIndex = 1;
  }
  x[slideIndex - 1].style.display = "block";
  HDto = setTimeout(carouselHelpDesk, 4000); // Change image every 2 seconds
}
//test
var HDto2 = null;
function carouselHelpDesk2() {
  if (HDto2) {
    clearTimeout(HDto2);
  }
  var i;
  var x = null;
  x = document.getElementsByClassName("HD2Img");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > x.length) {
    slideIndex = 1;
  }
  x[slideIndex - 1].style.display = "block";
  HDto2 = setTimeout(carouselHelpDesk2, 4000); // Change image every 2 seconds
}

var Travelto = null;
function carouselTravel() {
  if (Travelto) {
    clearTimeout(Travelto);
  }
  var i;
  var x = null;
  x = document.getElementsByClassName("travelImg");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > x.length) {
    slideIndex = 1;
  }
  x[slideIndex - 1].style.display = "block";
  Travelto = setTimeout(carouselTravel, 4000); // Change image every 2 seconds
}

var SysInfo = null;
function carouselSysInfo() {
  if (SysInfo) {
    clearTimeout(SysInfo);
  }
  var i;
  var x = null;
  x = document.getElementsByClassName("sysImg");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > x.length) {
    slideIndex = 1;
  }
  x[slideIndex - 1].style.display = "block";
  SysInfo = setTimeout(carouselSysInfo, 4000); // Change image every 2 seconds
}

/* Toggle between showing and hiding the navigation menu links when the user clicks on the hamburger menu / bar icon */
function myFunction() {
  var x = document.getElementById("myLinks");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}
