/*
The MIT License (MIT)

Copyright (c) 2016 Seachaos

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/


function AnimatMan(){

};

AnimatMan.prototype._render_div = function(){
	var dom = this.dom;

	this.x += parseInt(this.width);
	if(this.x>=this.bgWidth){
		this.x = 0;
		this.y += parseInt(this.height);
	}
	if(this.y>=this.bgHeight){
		this.y = 0;
	}
	var pos = '-'+this.x + 'px -' + this.y +'px';
	dom.css('background-position', pos);

	// keep render
	setTimeout(function(){
		dom.animatman._render_div();
	}, this.sleep);
}

AnimatMan.prototype.onImageLoadReady = function(dom, src){
	dom.css('background-image', 'url('+src+')');
	var bgsize = dom.bgWidth+'px '+dom.bgHeight+'px!important;'
	dom.css('background-size', bgsize);
	this.x = 0;
	this.y = 0;
	dom.css('background-position', '-'+this.x + 'px -' + this.y +'px');

	// will be check render mode, but now only div mode
	this._render_div();
}

AnimatMan.prototype.start = function(dom, src, width, height, opt){
	this.dom = dom;
	this.width = width;
	this.height = height;
	var img = $('<img style="display:none" />');
	img.load(function(){
		var animatman = dom.animatman;
		animatman.bgWidth = parseFloat(this.width);
		animatman.bgHeight = parseFloat(this.height);
		animatman.onImageLoadReady(dom, src);
	})
	img.attr('src', src);
};

$.animatman = function(dom, src, width, height, opt){
	var animatman = new AnimatMan();

	var opt = opt || {}
	animatman.fps = opt.fps || 24;
	animatman.sleep = 1000 / animatman.fps;

	dom.width(width);
	dom.height(height);
	dom.animatman = animatman;
	dom.animatman.start(dom, src, width, height, opt);
}
