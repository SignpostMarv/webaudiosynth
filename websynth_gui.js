/*
 * websynth_gui.js
 *
 * This program is licensed under the MIT License.
 * Copyright 2012, aike (@aike1000)
 *
 */

$(function() {

	// Background
	$('<img />').panel({
		id: 'panel',
		image: 'images/websynth.png',
		left: 20,
		top: 40
	}).appendTo('#draw');


	var x = 109;
	var y = 352;
	var sx = 22;
	var n = 0;

	var white_keys = [0,2,4,6,7,9,11,12,14,16,18,19,21,23,24,26,28,30,31,33,35,36,38,40,42,43];
	for (var i = 0; i < white_keys.length; i++)
	{
		$('<img />').keypad({
			id: 'key_' + white_keys[i],
			image: 'images/key_white.png', left: x + sx * i, top: y, width: 22, height: 112, note: white_keys[i],
			mousedown: (function(){p.play(this.id.split("_")[1]);}), mouseup:   (function() {p.stop();})
		}).appendTo('#draw');
	}

	x = 124;
	n = 0;

	var black_key_spaces = [1,1,2,1,2]; // modulo this to get spacing for black keys
	var black_keys = [1,3,5,8,10,13,15,17,20,22,25,27,29,32,34,37,39,41];
	for (var i = 0; i < black_keys.length; i++)
	{
		$('<img />').keypad({
			id: 'key_' + black_keys[i],
			image: 'images/key_black.png', left: x + sx * n, top: y, width: 12, height: 64,
			mousedown: (function() {p.play(this.id.split("_")[1]);}), mouseup:   (function() {p.stop();})
		}).appendTo('#draw');
		n += black_key_spaces[i % black_key_spaces.length];
	}

	// knob
	$('<img />').knob({
		id: 'knob01', image: 'images/knob01.png',
		left: 60, top: 142, width: 48, height: 48, value: 10, min: 1, max: 20,
		change: (function() {
			var value = Math.round($(this).knob("value"));
			p.vco1.set_glide_time(value);
			p.vco2.set_glide_time(value);
		})
	}).appendTo('#draw');

	$('<img />').switch({
		id: 'sw03', image: 'images/sw02.png',
		left: 60, top: 353, width: 32, height: 32, value: 1,
		click: (function() {
			p.vco1.set_glide_on($(this).switch("value"));
			p.vco2.set_glide_on($(this).switch("value"));
		})
	}).appendTo('#draw');


	$('<img />').knob({
		id: 'knob02', image: 'images/knob02.png',
		left: 145, top: 125, width: 40, height: 40, flames: 3, value: 50, sense: 100,
		change: (function() { p.vco1.set_pitch($(this).knob("value"));} )
	}).appendTo('#draw');

	$('<img />').knob({
		id: 'knob03', image: 'images/knob02.png',
		left: 145, top: 208, width: 40, height: 40, flames: 3, value: 0, sense: 100,
		change: (function() { p.vco2.set_pitch($(this).knob("value"));} )
	}).appendTo('#draw');
	p.vco2.set_pitch(0);

	$('<img />').knob({
		id: 'knob04', image: 'images/knob01.png',
		left: 200, top: 120, width: 48, height: 48, value: 50,
		change: (function() { p.vco2.set_fine($(this).knob("value"));} )
	}).appendTo('#draw');

	$('<img />').knob({
		id: 'knob05', image: 'images/knob01.png',
		left: 200, top: 203, width: 48, height: 48, value: 50,
		change: (function() { p.vco2.set_fine($(this).knob("value"));} )
	}).appendTo('#draw');

	$('<img />').knob({
		id: 'knob05_5', image: 'images/knob02.png',
		left: 260, top: 125, width: 40, height: 40, flames: 3, value: 50, sense: 100,
		change: (function() { p.vco1.set_wave($(this).knob("value"));} )
	}).appendTo('#draw');

	$('<img />').knob({
		id: 'knob05_6', image: 'images/knob02.png',
		left: 260, top: 208, width: 40, height: 40, flames: 3, value: 50, sense: 100,
		change: (function() { p.vco2.set_wave($(this).knob("value"));} )
	}).appendTo('#draw');


	$('<img />').knob({
		id: 'knob06', image: 'images/knob01.png',
		left: 325, top: 120, width: 48, height: 48, value: 50,
		change: (function() { p.vco1.set_gain($(this).knob("value"));} )
	}).appendTo('#draw');

	$('<img />').switch({
		id: 'sw01', image: 'images/sw01.png',
		left: 376, top: 128, width: 32, height: 32, value: 1,
		click: (function() { p.vco1.set_on($(this).switch("value"));} )
	}).appendTo('#draw');

	$('<img />').knob({
		id: 'knob07', image: 'images/knob01.png',
		left: 325, top: 200, width: 48, height: 48, value: 50,
		change: (function() { p.vco2.set_gain($(this).knob("value"));} )
	}).appendTo('#draw');

	$('<img />').switch({
		id: 'sw02', image: 'images/sw01.png',
		left: 376, top: 208, width: 32, height: 32, value: 1,
		click: (function() { p.vco2.set_on($(this).switch("value"));} )
	}).appendTo('#draw');


	$('<img />').knob({
		id: 'knob07_5', image: 'images/knob01.png',
		left: 423, top: 100, width: 48, height: 48, value: 50,
		change: (function() { p.filter.set_freq($(this).knob("value"));} )
	}).appendTo('#draw');

	$('<img />').knob({
		id: 'knob07_6', image: 'images/knob01.png',
		left: 480, top: 100, width: 48, height: 48, value: 50,
		change: (function() { p.filter.set_q($(this).knob("value"));} )
	}).appendTo('#draw');

	$('<img />').knob({
		id: 'knob07_7', image: 'images/knob01.png',
		left: 537, top: 100, width: 48, height: 48, value: 50,
		change: (function() { p.filter.set_amount($(this).knob("value"));} )
	}).appendTo('#draw');


	$('<img />').knob({
		id: 'knob08', image: 'images/knob01.png',
		left: 423, top: 153, width: 48, height: 48, value: 0,
		change: (function() { p.feg.set_a($(this).knob("value"));} )
	}).appendTo('#draw');

	$('<img />').knob({
		id: 'knob09', image: 'images/knob01.png',
		left: 480, top: 153, width: 48, height: 48, value: 20,
		change: (function() { p.feg.set_d($(this).knob("value")); p.feg.set_r($(this).knob("value"));} )
	}).appendTo('#draw');

	$('<img />').knob({
		id: 'knob10', image: 'images/knob01.png',
		left: 537, top: 153, width: 48, height: 48, value: 100,
		change: (function() { p.feg.set_s($(this).knob("value"));} )
	}).appendTo('#draw');

	$('<img />').knob({
		id: 'knob11', image: 'images/knob01.png',
		left: 423, top: 220, width: 48, height: 48, value: 0,
		change: (function() { p.eg.set_a($(this).knob("value"));} )
	}).appendTo('#draw');

	$('<img />').knob({
		id: 'kb_volume', image: 'images/knob01.png',
		left: 480, top: 220, width: 48, height: 48, value: 20,
		change: (function() { p.eg.set_d($(this).knob("value")); p.eg.set_r($(this).knob("value"));} )
	}).appendTo('#draw');

	$('<img />').knob({
		id: 'knob13', image: 'images/knob01.png',
		left: 537, top: 220, width: 48, height: 48, value: 100,
		change: (function() { p.eg.set_s($(this).knob("value"));} )
	}).appendTo('#draw');

	$('<img />').knob({
		id: 'knob10', image: 'images/knob01.png',
		left: 615, top: 105, width: 48, height: 48, value: 50,
		change: (function() { p.volume.set($(this).knob("value"));} )
	}).appendTo('#draw');

	$('<img />').knob({
		id: 'kb_delay', image: 'images/knob01.png',
		left: 615, top: 180, width: 48, height: 48, value: 20,
		change: (function() { p.delay.set($(this).knob("value"));} )
	}).appendTo('#draw');

});
