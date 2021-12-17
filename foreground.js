var jpn = document.createElement("jpn"); 
document.body.appendChild(jpn); 
jpn.innerHTML = `<script src="./foreground.js"></script>   
<div class="jpnSlator">
    <div id="jpnOriginal"></div>
    <div id="jpnText"></div>
    <div class="jpnBottom">
        <div class="hover4" id="jpnTranslate"><span>あ->A</span></div>
		<div class="hover4" id="refresh"><span>⟳</span></div>
        <div class="hover4" id="jpnJisho"></div>
    </div>
</div>`;


var selectedText = "";
let translationText= "";
let pronounceText= "";
var test = document.getElementById("jpnText");

window.addEventListener("mouseup", highlighter => {
	selectedText = document.getSelection().toString().slice(0, 20);
	console.log(selectedText)
}); 


let keysPressed = {};

document.addEventListener('keydown', (event) => {
	keysPressed[event.key] = true;

 
	if (keysPressed['Control'] && event.key == 't') {

		console.log(selectedText);

		fetch("https://labs.goo.ne.jp/api/hiragana", {
	"method": "POST",
	"headers": {
		"content-type": "application/json",
	},
	"body": JSON.stringify({
		"app_id": "aabe38c6df57fa98fd6de01b93ad6a70ed086d5dabdc39e79f016952cc7ad881",
		"sentence": selectedText,
		"output_type": "hiragana",
	})
})

.then((response) => response.json())
.then((data) => {
	console.log(data)
	pronounceText = data.converted;
    var jisho = document.getElementById("jpnJisho");
	test.textContent = data.converted;
	var original = document.getElementById("jpnOriginal");
	original.textContent = selectedText;
	jisho.innerHTML = `<a class='hover' href='https://jisho.org/search/${selectedText}'target='_blank' style = "color: white">info</a>`;
    document.querySelector(".jpnSlator").style.visibility = "visible";
	translationText = selectedText;
})
.catch(err => {
	console.error(err);
});

		};
 });
 

 var div = document.getElementById("jpnTranslate");
 div.addEventListener('click', function (e) {
	console.log(translationText);

	fetch("https://deep-translate1.p.rapidapi.com/language/translate/v2", {
	"method": "POST",
	"headers": {
		"content-type": "application/json",
		"x-rapidapi-host": "deep-translate1.p.rapidapi.com",
		"x-rapidapi-key": "b0e17a3c45msh21350d55cb5c0c8p1229dbjsna5b18ae68b38"
	},
	"body": JSON.stringify({
		"q": translationText,
		"source": "ja",
		"target": "en",
	})
})

.then((response) => response.json())
.then(( { data } ) => {
	console.log(data)
	console.log(data.translations.translatedText)
	test.textContent = data.translations.translatedText;
	pronounceText = data.translations.translatedText;
})
.catch(err => {
	console.error(err);
});

});

 document.addEventListener('keyup', (event) => {
	delete keysPressed[event.key];
 });



 document.addEventListener("keydown", (e) => {
	if (e.keyCode == 81) {
		document.querySelector(".jpnSlator").style.visibility = "hidden"
	}
});


var replace = document.getElementById("refresh");
 replace.addEventListener('click', function (e) {		
			var html = document.querySelector('html');
			var walker = document.createTreeWalker(html, NodeFilter.SHOW_TEXT);
			var node;
			while (node = walker.nextNode()) {
			  node.nodeValue = node.nodeValue.replace(translationText, pronounceText)
			
		  
	}
});


document.addEventListener("keydown", (e) => {
	if (e.keyCode == 87) {
			let light = document.querySelector(".jpnSlator");
			let result = light.classList.toggle("toggle");
			let result2 = light.classList.toggle("bright");

			let light1 = document.querySelector(".jpnBottom");
			let result1 = light1.classList.toggle("darkmode");

			let light2 = document.querySelector("#jpnJisho a");
			light2.style.color = light2.style.color == "white" ? "black" : "white";
}
});

document.addEventListener("keydown", (e) => {
	if (e.keyCode == 69) {
		let magnify = document.querySelector(".jpnSlator");
		magnify.classList.toggle("magnify");
	}
});