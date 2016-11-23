// Move the center of the div that contains the overlay of text on the image and also verify that the string is not longer than 12 or 0.
function calculateCenter(field, str) {
		if (str.length > 0 && str.length < 13) {
			// Turns out 52 is the middle of the div on the image when printing.
			document.getElementById(field).style.left = 50-(str.length/2);
			document.getElementById(field).innerHTML = str;
			return true;
		} else {
			return false;
		}
}

function hexToColor(hex) {
	switch (hex) {
			case "#ffffff":
				return "White";
			break;
			case "#000000":
				return "Black";
			break;
			case "#fe612a":
				return "Orange";
			break;
			case "#3196ce":
				return "Blue";
			break;
			case "#8a8a8a":
				return "Silver";
			break;
			case "#88753d":
				return "Gold";
			break;
			case "#fc0361":
				return "Pink";
			break;
			case "#4cee0f":
				return "Green";
			break;
			case "#b10021":
				return "Red";
			break;
			default:
				return "Unknown";
			break;
	}
}

function toHex(color) {
    if (color.charAt(0) === "#") {
        return color;
    }

    var nums = /(.*?)rgb\((\d+),\s*(\d+),\s*(\d+)\)/i.exec(color),
        r = parseInt(nums[2], 10).toString(16),
        g = parseInt(nums[3], 10).toString(16),
        b = parseInt(nums[4], 10).toString(16);

    return "#"+ (
        (r.length == 1 ? "0"+ r : r) +
        (g.length == 1 ? "0"+ g : g) +
        (b.length == 1 ? "0"+ b : b)
    );
}

// If calculateCenter returns true then fill in our fields in the print div
function submitForm() {
	if (calculateCenter('store_text_shirt', document.getElementById('nickname').value.replace('<', '&lt'))) {
		var currentdate = new Date(); 
		var datetime = currentdate.getFullYear() + "-"
			+ (currentdate.getMonth()+1)  + "-" 
			+ currentdate.getDate() + " "  
			+ currentdate.getHours() + ":"  
			+ (currentdate.getMinutes()<10?'0':'') + currentdate.getMinutes();
		calculateCenter('customer_text_shirt',document.getElementById('nickname').value.replace('<', '&lt'));
		document.getElementById('store_text').innerHTML = "<h4>"+document.getElementById('nickname').value+"</h4>";
		document.getElementById('customer_text').innerHTML = "<h4>"+document.getElementById('nickname').value+"</h4>";
		document.getElementById('store_color').innerHTML = "<h4>"+hexToColor(toHex(document.getElementById('tshirt_text').style.color))+"</h4>";
		document.getElementById('customer_color').innerHTML = "<h4>"+hexToColor(toHex(document.getElementById('tshirt_text').style.color))+"</h4>";
		document.getElementById('store_font').innerHTML = "<h4>"+document.getElementById('tshirt_text').style.fontFamily+"</h4>";
		document.getElementById('customer_font').innerHTML = "<h4>"+document.getElementById('tshirt_text').style.fontFamily+"</h4>";
		document.getElementById('store_time').innerHTML = "<h4>"+datetime+"</h4>";
		document.getElementById('customer_time').innerHTML = "<h4>"+datetime+"</h4>";
		$('#print').show();
		return true;
	} else {
		$('#error').modal('show');
		document.getElementById('nickname').focus();
		document.getElementById('error_message').innerHTML = "Nickname is too long, it cannot be longer than 12 characters";
		setTimeout(function(){ $('#error').modal('hide'); }, 3000);
		return false;
	}
}

// If submitForm returns true, then hide the form and show the page to be printed instead
function printForm() {
	document.getElementById('error_message').innerHTML = "";
	if (document.getElementById('store_size').innerHTML.length == 0) {
		document.getElementById('error_message').innerHTML += "No shirt size has been choosen<br>";
	}
	if (document.getElementById('tshirt_text').innerHTML.length == 0) {
		document.getElementById('error_message').innerHTML += "Nickname field is empty<br>";
	}
	if (document.getElementById('error_message').innerHTML.length > 0) {
		$('#error').modal('show');
		setTimeout(function() { $('#error').modal('hide'); }, 3000);
		document.getElementById('nickname').focus();
		return;
	}
	
	if (document.getElementById('tshirt_text').style.color == "") {
		document.getElementById('tshirt_text').style.color = "#ffffff";
	}
	if (submitForm()) {
		setprintFont();
		$('#form').hide();
		$('#print_page').show();
		window.print();
		$('#print_page').hide();
		$('#form').show();
	}
}

function setprintFont() {
	document.getElementById('store_text_shirt').style.fontSize = ($('#tshirt_text').css('fontSize').slice(0, -2) / 1.6) + "px";
	document.getElementById('store_text_shirt').style.webkitTextFillColor = document.getElementById('tshirt_text').style.color;
	document.getElementById('store_text_shirt').style.fontFamily = document.getElementById('tshirt_text').style.fontFamily;
	document.getElementById('customer_text_shirt').style.fontSize = ($('#tshirt_text').css('fontSize').slice(0, -2) / 1.6) + "px";
	document.getElementById('customer_text_shirt').style.webkitTextFillColor = document.getElementById('tshirt_text').style.color;
	document.getElementById('customer_text_shirt').style.fontFamily = document.getElementById('tshirt_text').style.fontFamily;
}

// Since we don't actually post things in our form, this will remove the enter functionality and send it to our printForm function instead
$(document).ready(function() {
	$(window).keydown(function(event){
		if(event.keyCode == 13){
			event.preventDefault();
			printForm();
	    }
	});
});

