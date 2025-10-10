import { TestBed } from '@angular/core/testing';

import { Excercises } from './excercises';

describe('Excercises', () => {
  let service: Excercises;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Excercises);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
