import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TestWithUserAndAnswerAndResultDto } from '../../_dto/test.dto';
import { TestsService } from '../../_services/tests';
import { CommonModule } from '@angular/common';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';

@Component({
  selector: 'app-view',
  imports: [
    CommonModule,
    NzPageHeaderModule,
    NzCardModule,
    NzDescriptionsModule,
    RouterModule,
  ],
  templateUrl: './test-view.html',
  styleUrl: './test-view.scss'
})
export class TestView implements OnInit {
  private testsService = inject(TestsService);
  private route = inject(ActivatedRoute);

  testId!: string;
  test!: TestWithUserAndAnswerAndResultDto;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.testId = params['id'];
      this.loadTest()
    })
  }

  loadTest() {
    this.testsService.getTest(this.testId).subscribe(result => {
      this.test = result;
    });
  }
}
