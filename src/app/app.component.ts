import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	js: string;

	onBuild(js: string): void {
		console.log(js);
		this.js = js;
	}
}
