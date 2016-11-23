function writeTextOnShirt() {
	if (document.getElementById('nickname').value.length < 13) { 
		document.getElementById('tshirt_text').innerHTML = resizeShirtText(document.getElementById('nickname').value.replace('<','&lt'), document.getElementById('font'));
	}
}

function setColor(div) {
	document.getElementById('tshirt_text').style.color = div.style.backgroundColor;
}


function setFont(font) {
	fonts = ['AgencyFB', 'BebasNeue', 'Eurostile_Bold','TradeGothic'];
	for (var i = 0; i < fonts.length; i++) {
		if (fonts[i] == font) {
			document.getElementById(fonts[i]).style.color = "#fe612a";
		} else {
			document.getElementById(fonts[i]).style.color = "#ffffff";
		}
	}
	document.getElementById('tshirt_text').style.fontFamily = font;
	resizeShirtText(document.getElementById('tshirt_text').innerHTML);
}

function setSize(size) { 
	sizes = ['XS','S','M','L','XL','2XL','3XL'];
	for (var i = 0; i < sizes.length; i++) {
		if (sizes[i] == size) {
			document.getElementById(sizes[i]).style.color = "#fe612a";
		} else {
			document.getElementById(sizes[i]).style.color = "#ffffff";
		}
	}
	document.getElementById('store_size').innerHTML = size;
	document.getElementById('customer_size').innerHTML = size;
}

function resizeShirtText(str) {
	fonts = ['Unknown','Eurostile_Bold'];
	font = document.getElementById('tshirt_text').style.fontFamily;
	change_fontsize = false;
	for (var i = 0; i < fonts.length; i++) {
		if (fonts[i] == font) {
			change_fontsize = true;
		}
	}
	if (change_fontsize) {
			$('#tshirt_text').css('fontSize', "21px")
	} else {
			$('#tshirt_text').css('fontSize', "30px")
	}
	return str;
}

$(document).keydown(function(e) { 
	$('#error').modal('hide');
});
