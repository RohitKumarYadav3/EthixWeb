import { enquirySchema, loginSchema, leadUpdateSchema } from '@/lib/validation';

describe('Enquiry Validation', () => {
  const validEnquiry = {
    name: 'Raj Patel',
    email: 'raj@example.com',
    phone: '+919876543210',
    service: 'web-design',
    message: 'I need a website for my retail business in Mumbai.',
  };

  it('accepts a valid enquiry', () => {
    const result = enquirySchema.safeParse(validEnquiry);
    expect(result.success).toBe(true);
  });

  it('rejects name that is too short', () => {
    const result = enquirySchema.safeParse({ ...validEnquiry, name: 'R' });
    expect(result.success).toBe(false);
  });

  it('rejects invalid email', () => {
    const result = enquirySchema.safeParse({ ...validEnquiry, email: 'not-an-email' });
    expect(result.success).toBe(false);
  });

  it('rejects phone that is too short', () => {
    const result = enquirySchema.safeParse({ ...validEnquiry, phone: '123' });
    expect(result.success).toBe(false);
  });

  it('rejects message that is too short', () => {
    const result = enquirySchema.safeParse({ ...validEnquiry, message: 'short' });
    expect(result.success).toBe(false);
  });

  it('rejects invalid service enum', () => {
    const result = enquirySchema.safeParse({ ...validEnquiry, service: 'invalid-service' });
    expect(result.success).toBe(false);
  });

  it('accepts optional company, city, and budget fields', () => {
    const result = enquirySchema.safeParse({
      ...validEnquiry,
      company: 'Patel Retail Pvt Ltd',
      city: 'Pune, Maharashtra',
      budget: '25k-50k',
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.city).toBe('Pune, Maharashtra');
    }
  });

  it('accepts empty honeypot field', () => {
    const result = enquirySchema.safeParse({ ...validEnquiry, website: '' });
    expect(result.success).toBe(true);
  });

  it('rejects filled honeypot field (spam detection)', () => {
    const result = enquirySchema.safeParse({ ...validEnquiry, website: 'spam.com' });
    expect(result.success).toBe(false);
  });

  it('normalizes email to lowercase', () => {
    const result = enquirySchema.safeParse({ ...validEnquiry, email: 'RAJ@EXAMPLE.COM' });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.email).toBe('raj@example.com');
    }
  });
});

describe('Login Validation', () => {
  it('accepts valid email and password', () => {
    const result = loginSchema.safeParse({
      email: 'admin@ethixweb.com',
      password: 'securepassword123',
    });
    expect(result.success).toBe(true);
  });

  it('rejects invalid email', () => {
    const result = loginSchema.safeParse({
      email: 'not-an-email',
      password: 'password',
    });
    expect(result.success).toBe(false);
  });

  it('rejects empty password', () => {
    const result = loginSchema.safeParse({
      email: 'admin@ethixweb.com',
      password: '',
    });
    expect(result.success).toBe(false);
  });

  it('normalizes email to lowercase', () => {
    const result = loginSchema.safeParse({
      email: 'ADMIN@ETHIXWEB.COM',
      password: 'password',
    });
    if (result.success) {
      expect(result.data.email).toBe('admin@ethixweb.com');
    }
  });
});

describe('Lead Update Validation', () => {
  it('accepts valid status update', () => {
    const result = leadUpdateSchema.safeParse({ status: 'contacted' });
    expect(result.success).toBe(true);
  });

  it('rejects invalid status', () => {
    const result = leadUpdateSchema.safeParse({ status: 'invalid-status' });
    expect(result.success).toBe(false);
  });

  it('accepts notes update', () => {
    const result = leadUpdateSchema.safeParse({ notes: 'Called the client, they are interested.' });
    expect(result.success).toBe(true);
  });

  it('rejects notes that are too long', () => {
    const result = leadUpdateSchema.safeParse({ notes: 'x'.repeat(5001) });
    expect(result.success).toBe(false);
  });

  it('accepts empty object (no fields to update)', () => {
    const result = leadUpdateSchema.safeParse({});
    expect(result.success).toBe(true);
  });
});
