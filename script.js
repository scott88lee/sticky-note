var board = document.getElementById('board');
var searchInput = document.getElementById('searchInput');
var btnAddNote = document.getElementById('addNote');

btnAddNote.addEventListener('click', function() {
	var newNote = document.createElement('div');
	newNote.className = 'note';
	board.appendChild(newNote);

	var title = document.createElement('input');
	title.placeholder = 'Title';
	title.className = 'titleInput';
	newNote.appendChild(title);

	var content = document.createElement('textarea');
	content.rows = '8';
	content.className = 'noteContent';
	content.textContent = 'Remember to....'
	newNote.appendChild(content);

	var delNote = document.createElement('a');
	delNote.className = 'delNote';
	delNote.textContent = 'X'
	newNote.appendChild(delNote);

	delNote.addEventListener('click', function(){
		board.removeChild(newNote);	
	});
});

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