/*
 * websynth_sequencer.js
 *
 * This program is licensed under the MIT License.
 * Copyright 2012, aike (@aike1000)
 *
 */

$(function() {
	var n8 = 200;
	// J.S.Bach - Suite No 1 in G major BWV 1007 Prelude
	var sequence_note     = [
		 2,  9, 18, 16, 18,  9, 18,  9,
		 2,  9, 18, 16, 18,  9, 18,  9,
		 2, 11, 19, 18, 19, 11, 19, 11,
		 2, 11, 19, 18, 19, 11, 19, 11,
		 2, 13, 19, 18, 19, 13, 19, 13,
		 2, 13, 19, 18, 19, 13, 19, 13,
		 2, 14, 18, 16, 18, 14, 18, 14,
		 2, 14, 18, 16, 18, 14, 18, 14
	];
	var sequence_duration = [
		n8, n8, n8, n8, n8, n8, n8, n8,
		n8, n8, n8, n8, n8, n8, n8, n8,
		n8, n8, n8, n8, n8, n8, n8, n8,
		n8, n8, n8, n8, n8, n8, n8, n8,
		n8, n8, n8, n8, n8, n8, n8, n8,
		n8, n8, n8, n8, n8, n8, n8, n8,
		n8, n8, n8, n8, n8, n8, n8, n8,
		n8, n8, n8, n8, n8, n8, n8, n8
	];

	var key_note_mappings = {
		90: 7,
		83: 8,
		88: 9,
		68: 10,
		67: 11,
		86: 12,
		71: 13,
		66: 14,
		72: 15,
		78: 16,
		74: 17,
		77: 18,
		188: 19,
		81: 19,
		50: 20,
		87: 21,
		51: 22,
		69: 23,
		82: 24,
		53: 25,
		84: 26,
		54: 27,
		89: 28,
		55: 29,
		85: 30,
		73: 31,
		57: 32,
		79: 33,
		48: 34,
		80: 35,
	}

	$('<img />').switch({
		id: 'play_button', image: 'images/play_button.png',
		left: 350, top: 500, width: 36, height: 36, value: 0,
		click: (function() { seq(0);} )
	}).appendTo('#draw');

	function seq_note_on(note) {
		p.play(note);
		$('#key_' + note).keypad("value", 1);
	};

	function seq_note_off(note) {
		p.stop(note);
		$('#key_' + note).keypad("value", 0);
	};

	function seq(pos) {
		if (pos >= sequence_note.length) {
			seq(0);
		} else if ($('#play_button').switch("value") == 1) {
			seq_note_on(sequence_note[pos]);
			setTimeout(function() {seq_note_off(sequence_note[pos]);}, sequence_duration[pos] - 10);
			setTimeout(function() {seq(pos + 1);}, sequence_duration[pos]);
		}
	};

	var down_key_stack = [];

	$('body').keydown(function(event) {
		var note = key_note_mappings[event.which];

		if (note)
		{
			if (down_key_stack.indexOf(note) == -1)
			{
				down_key_stack.push(note);
				p.stop();
				seq_note_on(note);
			}
		}
	});

	$('body').keyup(function(event) {
		var note = key_note_mappings[event.which];

		if (note && (down_key_stack.indexOf(note) > -1))
		{
			if (down_key_stack[down_key_stack.length-1] == note)
			{
				// the key up was the current key playing, turn it off
				seq_note_off(note);
				if (down_key_stack.length > 1)
				{
					// there's another note on, it needs to be played
					new_note_needed = true;
					seq_note_on(down_key_stack[down_key_stack.length-2]);
				}
			}
			down_key_stack.splice(down_key_stack.indexOf(note));
		}
		//super failsafe
		if (down_key_stack.length == 0)
		{
			p.stop();
			for (var i = 0; i < 42; i++)
			{
				$('#key_' + i).keypad("value", 0);
			}
		}
	});

});
