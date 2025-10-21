import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ResultsService } from '../../_services/results';
import { TestResultWithTestWithoutUserAndProfessionDto } from '../../_dto/test-result.dto';
import { CommonModule } from '@angular/common';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';

@Component({
  selector: 'app-view',
  imports: [
    CommonModule,
    NzPageHeaderModule,
    NzCardModule,
    NzDescriptionsModule,
    NzTagModule,
    NzTableModule,
    NzDividerModule,
    RouterModule,
  ],
  templateUrl: './result-view.html',
  styleUrl: './result-view.scss'
})
export class ResultView implements OnInit {
  private resultsService = inject(ResultsService);
  private route = inject(ActivatedRoute);

  resultId!: string;
  testId!: string;
  result!: TestResultWithTestWithoutUserAndProfessionDto;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.resultId = params['id'];
      this.loadTest()
    })
  }

  loadTest() {
    this.resultsService.getTestResult(this.resultId).subscribe(result => {
      this.result = result;
      this.testId = result.test.id;
    });
  }
}
