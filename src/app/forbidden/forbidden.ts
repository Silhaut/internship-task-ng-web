import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzResultModule } from 'ng-zorro-antd/result';

@Component({
  selector: 'app-forbidden',
  imports: [
    CommonModule,
    NzCardModule,
    NzResultModule,
  ],
  templateUrl: './forbidden.html',
  styleUrl: './forbidden.scss'
})
export class Forbidden {

}
