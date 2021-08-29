import React from 'react';
import { ApplicationForm } from '@/layouts';
import { mockApplicationForm } from '@/mockups';

export default function IndexPage(): JSX.Element {
  return <ApplicationForm flow={mockApplicationForm} />;
}
