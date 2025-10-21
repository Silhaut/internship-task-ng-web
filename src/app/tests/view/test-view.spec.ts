import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestView } from './test-view';

describe('TestView', () => {
  let component: TestView;
  let fixture: ComponentFixture<TestView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
