import { StudentsSchema } from './students.schema';

describe('StudentsSchema', () => {
  it('should be defined', () => {
    expect(new StudentsSchema()).toBeDefined();
  });
});
