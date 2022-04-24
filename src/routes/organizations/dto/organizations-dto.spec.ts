import { CreateOrganizationDto } from './organizations-dto';

describe('OrganizationsDto', () => {
  it('should be defined', () => {
    expect(new CreateOrganizationDto()).toBeDefined();
  });
});
