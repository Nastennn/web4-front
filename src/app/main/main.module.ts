import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoComponent } from './info/info.component';
import { HistoryComponent } from './history/history.component';
import { CheckPointsComponent } from './check-points/check-points.component';
import {MainRoutingModule} from './main-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MainComponent} from './main.component';
import {UrlPermission} from '../services/url-permission/url-permission.service';
import {SliderModule} from 'primeng/slider';
import {InputTextModule} from 'primeng/inputtext';

@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SliderModule,
    InputTextModule
  ],
  providers: [UrlPermission],
  declarations: [MainComponent, InfoComponent, HistoryComponent, CheckPointsComponent]
})
export class MainModule { }
