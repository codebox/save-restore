function save(){
	function saveValue(el,val){
		var key = el.id || el.name;
		if (key) {
			if (val !== null){
				localStorage[key] = val;
			} else {
				localStorage.removeItem(key);
			}
		}
	}
	function saveInput(el){
		var type = el.type ? el.type.toLowerCase() : null;
		var value = null;
		if (!type || type==='text' || type==='password'){
			value = el.value;
		} else if (type==='checkbox') {
			value = el.checked;
		} else if (type==='radio') {
			if (el.checked){
				value = el.value;
			}
		}
		saveValue(el, value);
	}
	function saveSelect(el){
		saveValue(el, el.selectedIndex);
	}
	function saveTextarea(el){
		saveValue(el, el.value);
	}
	var handlers = {
		'input'    : {'save' : saveInput},
		'select'   : {'save' : saveSelect},
		'textarea' : {'save' : saveTextarea}
	};
	var tag, el, els, i, obj;
	for(tag in handlers){
		els = document.getElementsByTagName(tag);
		obj = handlers[tag];
		for(i in els){
			obj.save(els[i]);
		}
	}
}

function restore(){
	function retrieveValue(el){
		var key = el.id || el.name;
		if (key) {
			return localStorage[key];
		} else {
			return null;
		}
	}
	function restoreInput(el){
		var type = el.type ? el.type.toLowerCase() : null;
		var value = retrieveValue(el);
		if (value !== null){
			if (!type || type==='text' || type==='password'){
				el.value = value;
			} else if (type==='checkbox') {
				el.checked = (value==='true');
			} else if (type==='radio') {
				if (el.value === value){
					el.checked = true;
				}
			}
		}
	}
	function restoreSelect(el){
		var value = retrieveValue(el);
		if (value !== null){
			el.selectedIndex = value;
		}
	}
	function restoreTextarea(el){
		var value = retrieveValue(el);
		if (value !== null){
			el.value = value;
		}
	}
	var handlers = {
		'input'    : {'restore' : restoreInput},
		'select'   : {'restore' : restoreSelect},
		'textarea' : {'restore' : restoreTextarea}
	};
	var tag, el, els, i, obj;
	for(tag in handlers){
		els = document.getElementsByTagName(tag);
		obj = handlers[tag];
		for(i in els){
			obj.restore(els[i]);
		}
	}
}

function clearFields(){
	function clearInput(el){
		var type = el.type ? el.type.toLowerCase() : null;
		if (!type || type==='text' || type==='password'){
			el.value = '';
		} else if (type==='checkbox') {
			el.checked = false;
		} else if (type==='radio') {
			el.checked = false;
		}
	}
	function clearSelect(el){
		el.selectedIndex = -1;
	}
	function clearTextarea(el){
		el.value = '';
	}
	var handlers = {
		'input'    : {'clear' : clearInput},
		'select'   : {'clear' : clearSelect},
		'textarea' : {'clear' : clearTextarea}
	};
	var tag, el, els, i, obj;
	for(tag in handlers){
		els = document.getElementsByTagName(tag);
		obj = handlers[tag];
		for(i in els){
			obj.clear(els[i]);
		}
	}
}