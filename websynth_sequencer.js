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
			down_key_stack.splice(down_key_stack.indexOf(note), 1);
			$('#key_' + note).keypad("value", 0);
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

	var mutable_parameters = [
		'knob01',
		'knob02',
		'knob03',
		'knob04',
		'knob05',
		'knob05_5',
		'knob05_6',
		'knob06',
		'knob07',
		'knob07_5',
		'knob07_6',
		'knob07_7',
		'knob08',
		'knob09',
		'knob10',
		'knob11',
		'kb_volume',
		'knob13',
		'knob10',
		'kb_delay',
	];

	var mutable_switches = [
		'sw01',
		'sw02',
		'sw03',
	];

	var presets = {
		"soft_lead": {"knob01":10,"knob02":100,"knob03":100,"knob04":50,"knob05":48,"knob05_5":50,"knob05_6":50,"knob06":50,"knob07":50,"knob07_5":17.2,"knob07_6":8.8,"knob07_7":50,"knob08":0.4,"knob09":20,"knob10":12.4,"knob11":0,"kb_volume":20,"knob13":100,"kb_delay":84,"sw01":1,"sw02":1,"sw03":0},
		"buzz_lead": {"knob01":10,"knob02":50,"knob03":0,"knob04":50,"knob05":50,"knob05_5":50,"knob05_6":50,"knob06":50,"knob07":50,"knob07_5":50,"knob07_6":50,"knob07_7":50,"knob08":0,"knob09":20,"knob10":100,"knob11":0,"kb_volume":20,"knob13":100,"kb_delay":20,"sw01":1,"sw02":1,"sw03":1},
		"brass_1": {"knob01":5.604,"knob02":100,"knob03":100,"knob04":50,"knob05":38.8,"knob05_5":39,"knob05_6":50,"knob06":50,"knob07":50,"knob07_5":48.8,"knob07_6":27.6,"knob07_7":50,"knob08":3.6,"knob09":9.2,"knob10":4,"knob11":0,"kb_volume":20,"knob13":100,"kb_delay":25.2,"sw01":1,"sw02":1,"sw03":0},
		"dirty_bass": {"knob01":10,"knob02":0,"knob03":41,"knob04":50,"knob05":35.6,"knob05_5":52,"knob05_6":55,"knob06":50.4,"knob07":34,"knob07_5":40.4,"knob07_6":58.8,"knob07_7":50,"knob08":0,"knob09":0,"knob10":22,"knob11":0,"kb_volume":15.6,"knob13":0,"kb_delay":20,"sw01":1,"sw02":1,"sw03":0},
		"clean_bass": {"knob01":10,"knob02":0,"knob03":41,"knob04":50,"knob05":54,"knob05_5":52,"knob05_6":55,"knob06":46.4,"knob07":42,"knob07_5":10.799999999999997,"knob07_6":36.8,"knob07_7":26.799999999999997,"knob08":0,"knob09":0,"knob10":22,"knob11":0,"kb_volume":6.799999999999997,"knob13":32.39999999999999,"kb_delay":0,"sw01":1,"sw02":1,"sw03":0},
		"synth_brass": {"knob01":10,"knob02":50,"knob03":41,"knob04":54,"knob05":43.6,"knob05_5":46,"knob05_6":45,"knob06":46.4,"knob07":42,"knob07_5":83.6,"knob07_6":39.2,"knob07_7":26.799999999999997,"knob08":0,"knob09":100,"knob10":0,"knob11":0,"kb_volume":0.3999999999999986,"knob13":62.79999999999999,"kb_delay":82,"sw01":1,"sw02":1,"sw03":0},
		"space": {"knob01":10,"knob02":67,"knob03":46,"knob04":50,"knob05":35.6,"knob05_5":0,"knob05_6":50,"knob06":50.4,"knob07":38.8,"knob07_5":20.400000000000006,"knob07_6":0,"knob07_7":50,"knob08":100,"knob09":100,"knob10":100,"knob11":0,"kb_volume":100,"knob13":100,"kb_delay":100,"sw01":1,"sw02":1,"sw03":0},
		"string": {"knob01":10,"knob02":67,"knob03":46,"knob04":50,"knob05":32.4,"knob05_5":65,"knob05_6":50,"knob06":50.4,"knob07":44,"knob07_5":18.800000000000004,"knob07_6":0,"knob07_7":50,"knob08":100,"knob09":100,"knob10":100,"knob11":93.6,"kb_volume":100,"knob13":100,"kb_delay":100,"sw01":1,"sw02":1,"sw03":0},
		"glass_harmonica": {"knob01":10,"knob02":67,"knob03":46,"knob04":50,"knob05":32.4,"knob05_5":0,"knob05_6":0,"knob06":50.4,"knob07":44,"knob07_5":18.800000000000004,"knob07_6":0,"knob07_7":50,"knob08":100,"knob09":100,"knob10":100,"knob11":15.2,"kb_volume":30.800000000000004,"knob13":100,"kb_delay":54.8,"sw01":1,"sw02":1,"sw03":0},
		
	}

	$('#dump').click(function(event) {
		var output = {};
		$.each(mutable_parameters, function(idx, el){
			output[el] = $('#' + el).knob("value");
			//$('#' + el).knob("value", presets["soft_lead"][el]);
		});
		$.each(mutable_switches, function(idx, el){
			output[el] = $('#' + el).switch("value");
			//$('#' + el).switch("value", presets["soft_lead"][el]);
		});
		console.log(JSON.stringify(output));
	});

	$('#patch').change(function(event){
		var new_patch = $('#patch').val();
		$.each(mutable_parameters, function(idx, el){
			//output[el] = $('#' + el).knob("value");
			$('#' + el).knob("value", presets[new_patch][el]);
		});
		$.each(mutable_switches, function(idx, el){
			//output[el] = $('#' + el).switch("value");
			$('#' + el).switch("value", presets[new_patch][el]);
		});

	});

});
