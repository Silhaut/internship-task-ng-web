import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProfessionDialog } from './update-profession-dialog';

describe('UpdateProfessionDialog', () => {
  let component: UpdateProfessionDialog;
  let fixture: ComponentFixture<UpdateProfessionDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateProfessionDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateProfessionDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
