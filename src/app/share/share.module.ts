import { NgModule, ModuleWithProviders } from '@angular/core' // "modulo com providers" pra ficar duas opções de carregamento ..so o modulo ou o modulo com o providers
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { InputComponent } from './input/input.component'
import { CommonModule } from '@angular/common';
import { SnackbarComponent } from './message/snackbar/snackbar.component';

@NgModule({
  declarations:[InputComponent, SnackbarComponent],
  imports:[
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  exports:[
    FormsModule,
    ReactiveFormsModule,
    InputComponent,
    SnackbarComponent
  ]
})

export class SharedModule{
}

