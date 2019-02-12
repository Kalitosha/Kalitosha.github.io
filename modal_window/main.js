var imNumber;
var maxImNumber = 9;
var minImNumber = 1;

function openWin(numb) {
	imNumber = numb;  
	insert_image(numb);  
	var modal = document.querySelector('#modal'); 
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";	
    resizeModalWindow();  
}

function insert_image(numb){    
	try{
		var modal = document.querySelector('#modal');   

		var img = document.createElement("img");
		var tag = document.querySelector('.t' + numb);	
		var tag_list = tag.childNodes;
		for (var i = 0; i < tag_list.length; i++) {
			if ((tag_list[i].tagName) == "IMG") {
				img.setAttribute('src', tag_list[i].src);
				break;
			}
		}
		var m_image = document.querySelector('#m_image');
	    m_image.appendChild(img);
	} 
	catch(err){
		closeModal(); 
		console.log(err);
	}
}
/*******************************************************************************/
function closeModal() {
    var modal = document.querySelector('#modal');
    modal.style.display = "none";
    modal.style.removeProperty('display');
    modal.removeAttribute('style');
    
    document.body.removeAttribute('style');

    remove_image();
    imNumber = 1;
    resizeModalWindow();
}

function remove_image(){
	var m_image = document.querySelector('#m_image');
	var img_list = m_image.childNodes;
	for (var i = 0; i < img_list.length; i++) {
		if ((img_list[i].tagName) == "IMG") {
			m_image.removeChild(img_list[i]);
		}
	}
}
/*******************************************************************************/
document.querySelector('.b_left').addEventListener("click", function(e) {
	if (imNumber >= minImNumber) {
		remove_image();
		openWin(imNumber-1);
	}
	e.stopPropagation();
});

document.querySelector('.b_right').addEventListener("click", function(e) {
	if (imNumber <= maxImNumber) {
		remove_image();
		openWin(imNumber+1);
	}
	e.stopPropagation();
});
/*******************************************************************************/
window.addEventListener('resize', function(event){
  resizeModalWindow();
});

function resizeModalWindow(){
    var m_image = document.querySelector('#m_image');

    var btns = document.querySelector('#btns');
    btns.style.height = m_image.offsetHeight + "px";
    btns.style.width = m_image.offsetWidth + "px";

    var b_left = document.querySelector('.b_left');
    b_left.style.lineHeight = btns.offsetHeight + "px";
    var b_right = document.querySelector('.b_right');
    b_right.style.lineHeight = btns.offsetHeight + "px";
}