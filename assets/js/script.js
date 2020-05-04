// Function for accordion one (only one at a time)-------------------------------------
var title = document.querySelectorAll('.heading-one')//span
var tabArrayOne = Array.from(title);	
tabArrayOne.forEach(function(element) {
	element.onclick = function() {
		var content = this.parentElement;
		var activeTab = content.classList.contains("activeTab");
		if (!activeTab) {
			var tab = document.querySelectorAll(".accordion-tab");
			for(var i=0;i<tab.length;i++){
				tab[i].classList.remove('activeTab');
			}
			content.classList.add("activeTab");				
		}
		else {
			content.classList.remove("activeTab");
		}
	}
});

// Function for accordion two--------------------------------------------------------------
var title = document.querySelectorAll('.heading-two');
var tabArrayTwo = Array.from(title);	
tabArrayTwo.forEach(function(element) {
	element.onclick = function() {
		var content = this.parentElement;
		var activeTab = content.classList.contains("activeTab");
		if (!activeTab) {
			content.classList.toggle("activeTab");				
		}
		else {
			content.classList.remove("activeTab");
		}
	}
});

// Function for read more and read less----------------------------------------------
var read = document.querySelector('.read');
var showContent = document.querySelector('.more-content');
read.onclick = function(){
	if(read.innerHTML === "read more"){
		showContent.classList.add("show");
		read.innerHTML = "read less";
		read.setAttribute('title','Read Less');
	}
	else{
		showContent.classList.remove("show");	
		read.innerHTML = "read more";
		read.setAttribute('title','Read More');
	}
};

// Function for video modal---------------------------------------------------
var modal = document.querySelector('.lightbox-opened');
var play = document.querySelectorAll('.playlist figure');
var playArray = Array.from(play);
playArray.forEach(function(element){
	element.addEventListener('click',openModal);
});
modal.addEventListener('click',closeModal);
document.querySelector('body').addEventListener('keyup',closeOnEsc);

// Function for open modal
function openModal(e){
	e.preventDefault();
	var currentVideo = this.nextElementSibling.src;
	modal.children[0].src = currentVideo ;
	modal.classList.add("activeImage");
	document.querySelector('html').classList.add('no-scroll');
};

// Function to close modal
function closeModal(e){
	e.preventDefault();
	var playedVideo = document.querySelector('.lightbox-opened .currentVideo');
	if(e.target != playedVideo){
		modal.classList.remove("activeImage");
		document.querySelector('html').classList.remove('no-scroll');
	}
};

// Function to close modal on esc button
function closeOnEsc(e){
	e.preventDefault();
	if(e.which == 27){
		modal.classList.remove("activeImage");
		document.querySelector('html').classList.remove('no-scroll');
	}
};

// Function for image modal------------------------------------------------------------
var imageModal = document.querySelector('.lightbox');
var figure = document.querySelectorAll('.gallery figure');
var next = document.querySelector('.rightArrow');
var previous = document.querySelector('.leftArrow');
var figureArray = Array.from(figure);
var index;
figureArray.forEach(function(element){
	element.addEventListener('click',openImageModal);
});
imageModal.addEventListener('click',closeImageModal);

// Function for open modal
function openImageModal(e){
	e.preventDefault();
	index = figureArray.indexOf(this);
	console.log(index);
	var currentImage = this.children[0].src;
	imageModal.children[0].src = currentImage ;
	imageModal.classList.add("active");
	document.querySelector('html').classList.add('no-scroll');
};

// Function to close modal
function closeImageModal(e){
	e.preventDefault();
	var cancel = document.querySelector('.lightbox .cancel');
	if(e.target === cancel){
		imageModal.classList.remove("active");
		document.querySelector('html').classList.remove('no-scroll');
	}
};

// Function for next slide
next.addEventListener('click',function(){
	if(index === figureArray.length-1){
		index = 0;
	}
	else {
		index ++;
	}
	var imageSource = figureArray[index].children[0].src;
	imageModal.children[0].src = imageSource;
});

// Function for previous slide
previous.addEventListener('click',function(){
	if(index === 0){
		index = figureArray.length-1;
	}
	else {
		index --;
	}
	var imageSource = figureArray[index].children[0].src;
	imageModal.children[0].src = imageSource;
});

// Function of counter-----------------------------------------------------------------
window.onscroll = function(){
	var pos = document.querySelector('.counter').scrollHeight;
	if(pos < 225){
		var counter = document.querySelectorAll('.counting');
		var speed = 1000;
		var counterArray = Array.from(counter);
		counterArray.forEach(function(element){
			var updateCounter = function(){
				var target = parseInt(element.getAttribute("limit"));
				var count = parseInt(element.innerHTML);
				var increment = target/speed;
				if(count < target){
					element.innerHTML = Math.ceil(count + increment); 
					setTimeout(updateCounter,10);
				}
				else{
					count.innerHTML = target;
				}
			}
			updateCounter();
		});
	}	
}