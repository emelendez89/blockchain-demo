import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockchainUiComponent } from './blockchain-ui.component';

describe('BlockchainUiComponent', () => {
  let component: BlockchainUiComponent;
  let fixture: ComponentFixture<BlockchainUiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockchainUiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockchainUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
