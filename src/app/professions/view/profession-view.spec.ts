import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionView } from './profession-view';

describe('ProfessionView', () => {
  let component: ProfessionView;
  let fixture: ComponentFixture<ProfessionView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfessionView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessionView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
