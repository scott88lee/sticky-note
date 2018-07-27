var board = document.getElementById('board');
var searchInput = document.getElementById('searchInput');

var btnAddNote = document.getElementById('addNote');
btnAddNote.addEventListener('click', function() {appendNote()});

function appendNote(storedTitle, storedContent) {
	//Creating sticky note
	var newNote = document.createElement('div');
	newNote.className = 'note';
	board.appendChild(newNote);

	//Creating title input
	var title = document.createElement('input');
	title.placeholder = 'Title';
	title.className = 'titleInput';
	newNote.appendChild(title);

	//Value assigned when recalled from storage
	if (storedTitle) {
		title.value = storedTitle;
	}

	//Textarea creation
	var content = document.createElement('textarea');
	content.rows = '8';
	content.className = 'noteContent';
	content.textContent = 'Remember to....'
	newNote.appendChild(content);

	//Value assigned when recalled from storage
	if (storedContent) {
		content.value = storedContent;
	}

	// Clickable div to delete sticky note
	var delNote = document.createElement('a');
	delNote.className = 'delNote';
	delNote.textContent = 'X'
	newNote.appendChild(delNote);

	delNote.addEventListener('click', function(){
		board.removeChild(newNote);	
	});
}

function clearBoard() { //Clears the board
	var noteList = document.getElementsByClassName('note');
	for (var i=noteList.length-1; i>=0; i--){
		board.removeChild(noteList[i]);
	}
}

function searchTitles() {
	var titleList = document.getElementsByClassName('titleInput');
	var noteList =  document.getElementsByClassName('note');

	if (searchInput.value) { // Only clears the board when a search value exist
		for (var i=0; i<titleList.length; i++){
			if (searchInput.value.toLowerCase() == titleList[i].value.toLowerCase()){
				noteList[i].style.display = "inline-block";		
			} else {
				noteList[i].style.display = "none";	
			}
		}
	}

	if (searchInput.value == '') {
		for (var i=0; i<noteList.length; i++){
			noteList[i].style.display = "inline-block";
		}
	}
}

function saveData(){
	var titles = [];
	var contents = [];

	var titleList = document.getElementsByClassName('titleInput');
	var contentList = document.getElementsByClassName('noteContent');

	for (var i=0; i<titleList.length; i++){
		titles.push(titleList[i].value.toString());
		contents.push(contentList[i].value.toString());
	}

	localStorage.setItem("titles", JSON.stringify(titles));
	localStorage.setItem("contents", JSON.stringify(contents));
}

function retrieveData(){
	var titles = JSON.parse(localStorage.getItem("titles"));
	var contents = JSON.parse(localStorage.getItem("contents"));

	clearBoard();

	for (var i=0; i<titles.length; i++){ //Populate
		//Creates sticky notes with retrieved data
		appendNote(titles[i], contents[i]);
	}
}