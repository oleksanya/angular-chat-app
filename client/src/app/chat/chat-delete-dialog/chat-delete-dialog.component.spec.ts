import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatDeleteDialogComponent } from './chat-delete-dialog.component';

describe('ChatDeleteDialogComponent', () => {
  let component: ChatDeleteDialogComponent;
  let fixture: ComponentFixture<ChatDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatDeleteDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
