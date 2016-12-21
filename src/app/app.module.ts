import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AceEditorComponent } from './ace_editor/ace_editor.component';
import { OutputPanelComponent } from './output_panel/output_panel.component';

@NgModule({
  declarations: [
    AppComponent,
    AceEditorComponent,
    OutputPanelComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
