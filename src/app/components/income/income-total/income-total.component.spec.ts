import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeTotalComponent } from './income-total.component';

describe('IncomeTotalComponent', () => {
  let component: IncomeTotalComponent;
  let fixture: ComponentFixture<IncomeTotalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncomeTotalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncomeTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
