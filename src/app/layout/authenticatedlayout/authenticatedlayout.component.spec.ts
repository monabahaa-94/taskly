import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticatedlayoutComponent } from './authenticatedlayout.component';

describe('AuthenticatedlayoutComponent', () => {
  let component: AuthenticatedlayoutComponent;
  let fixture: ComponentFixture<AuthenticatedlayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthenticatedlayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthenticatedlayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
