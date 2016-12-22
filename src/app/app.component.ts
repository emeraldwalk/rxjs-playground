import { Component } from '@angular/core';

let samples = {
	'Basic Subject':
`/**
 * Basic subject sample (NOTE: console.log is redirected to output window).
 */
let subject = new Rx.Subject<number>();

subject.subscribe(res => console.log(res));

[1, 2, 3].forEach(i => subject.next(i));`
};

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	initialSource: string;
	js: string;

	constructor() {
		this.initialSource = samples['Basic Subject'];
	}

	onBuild(js: string): void {
		//console.log(js);
		this.js = js;
	}
}
