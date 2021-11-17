# Modal Window Project
Small script that adds simple modal windows with light and dark themes

## Installing

#### CSS styles

Can use minify file

```html
<link rel="stylesheet" type="text/css" href="..path../css/style-modals.min.css">
```

Or

```html
<link rel="stylesheet" type="text/css" href="..path../css/style-modals.css">
```

#### Import

Can use minify file

```javascript
import nameModule from "./..path../modals.min.js";
```

Or

```javascript
import nameModule from "./..path../modals.js";
```

Can then create a variable to make it easier to call functions

```javascript
const name = nameModule();
```

## How use

#### Using functions

* `setModal()` creates the event that calls the modal window when an element of the HTML containing the `modal` attribute is clicked
```HTML
<button type="button" modal="button-modal-1">Button Name</button>
<a href="#" modal="button-modal-2">Link Name</a>
```
```javascript
name.setModal('button-modal-1', 'set-modal-window-id', {
	title: 'modal window title',
	content: 'modal window content',
	ok: {
		text: 'Text that is printed on the ok button',
		callback() {}
	},
	cancel: {
		text: 'Text that is printed on the cancel button'
		callback() {}
	}
});
```

* `openModal()` creates and/or opens a modal window every time the function is called in a certain event (click, focus, hover...)
```javascript
name.openModal('set-modal-window-id', {
	title: 'modal window title',
	content: 'modal window content',
	ok: {
		text: 'Text that is printed on the ok button',
		callback() {}
	},
	cancel: {
		text: 'Text that is printed on the cancel button'
		callback() {}
	}
});
```

* `closeModal()` closes an existing modal window when the function is executed
```javascript
name.closeModal('modal-window-id');
```

#### Dark theme

Add **"dark"** element with **true** value inside object parameter in function `setModal()` or `openModal()`

```javascript
name.openModal('set-modal-window-id', {
	title: 'modal window title',
	dark: true,
	content: ''
});
```

#### NOTES

* The element **"content"** can insert HTML
* It is necessary to insert at least one element of the object (title, dark, content, ok, cancel)