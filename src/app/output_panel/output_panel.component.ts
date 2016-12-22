import { Component, Input, ElementRef, OnChanges } from '@angular/core';
import * as $ from 'jquery';

@Component({
	selector: 'output-panel',
	template: '<div></div>',
	styles: [`:host {
		display: block;
		float: left;
		width: 50%;
		height: 400px;
	}`]
})
export class OutputPanelComponent implements OnChanges {
	@Input() jsSource: string;

	private _$iframeEl: JQuery;
	private _$headEl: JQuery;
	private _$bodyEl: JQuery;

	constructor(elementRef: ElementRef) {
		let el: HTMLElement = elementRef.nativeElement;
		this._$iframeEl = $('<iframe></iframe>').appendTo(el);
	}

	ngOnChanges(): void {
		let iElementRaw: HTMLIFrameElement = <HTMLIFrameElement>this._$iframeEl.get(0);

		//this._$iframeEl.height(0);
		this._$headEl = this._$iframeEl.contents().find('head').empty();
		this._$bodyEl = this._$iframeEl.contents().find('body').empty();

		['https://cdnjs.cloudflare.com/ajax/libs/rxjs/5.0.1/Rx.min.js'].forEach(url => {
				// creating script tags via jQuery doesn't load the scripts, so have to use createElement
				var script = iElementRaw.contentWindow.document.createElement('script');
				script.type = "text/javascript";
				script.src = url;
				iElementRaw.contentWindow.document.head.appendChild(script);
			});

		this._$headEl.append(`<script type="text/javascript">window.onerror = function(msg) { document.writeln(msg) };</script>`);
		this._$headEl.append(`<script type="text/javascript">
			var console = {
				log: function() {
					let args = Array.prototype.slice.call(arguments);
					let str = args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : arg).join(', ');
					document.writeln(str);
				}
			}
			document.writeln('<pre>');
			${this.jsSource}
			document.writeln('</pre>');</script>`);
	}
}