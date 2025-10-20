import { Component, inject, OnInit } from '@angular/core';
import { AdminService } from '../_services/admin';
import { Observable, of } from 'rxjs';
import { AdminOverviewDto } from '../_dto/admin-overview.dto';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-overview',
  imports: [
    CommonModule,
    NzPageHeaderModule,
    NzFlexModule,
    NzTagModule,
    NzCardModule,
    NzDividerModule,
    NzStatisticModule,
    NzTableModule,
    RouterModule,
  ],
  templateUrl: './admin-overview.html',
  styleUrl: './admin-overview.scss'
})
export class AdminOverview implements OnInit {
  private adminService = inject(AdminService)

  overviewData$!: Observable<AdminOverviewDto>;

  ngOnInit() {
    this.adminService.overview().subscribe(result => {
      this.overviewData$ = of(result);
    })
  }
}
