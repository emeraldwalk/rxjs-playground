import { Component, Input, Output, ElementRef, OnInit, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

// Hack: Not sure why this doesn't just work an an import * as ts from 'typescript';
import * as typescript from 'typescript';
declare let ts: typeof typescript;

@Component({
	selector: 'ace-editor',
	template: '<div></div>',
	styles: [`:host {
		display: block;
		float: left;
		width: 50%;
		height: 400px;
	}`]
})
export class AceEditorComponent implements OnInit {
	@Input() source: string;
	@Output() onBuild: EventEmitter<string>;

	private _sourceSubject: Subject<string>;
	private _editor: AceAjax.Editor;
	private _session: AceAjax.IEditSession;

	constructor(elementRef: ElementRef) {
		this._sourceSubject = new Subject<string>();
		this.onBuild = new EventEmitter<string>();

		this._editor = ace.edit(elementRef.nativeElement);
		this._session = this._editor.getSession();

		this._editor.setTheme('ace/theme/chrome');
		this._editor.$blockScrolling = Infinity;
		this._session.setMode('ace/mode/typescript');

		this._sourceSubject
			.debounceTime(700)
			.subscribe(value => {
				let js = ts.transpile(value, {
					target: ts.ScriptTarget.ES5
				});
				this.onBuild.emit(js);
			});

		this._session.on('change', () => {
			this._sourceSubject.next(this._session.getValue());
		});
	}

	ngOnInit(): void {
		this._session.setValue(this.source || '');
	}
}