import React, { useState, useEffect } from 'react';
import { Button } from '@/ui';
import type { FieldResponse } from '../types/fields';

export default function IndexPage(): JSX.Element {
  const [fields, setFields] = useState<FieldResponse | null>(null);

  useEffect(() => {
    fetch('/api/fields')
      .then((res) => res.json())
      .then((fields) => setFields(fields));
  }, []);

  if (!fields) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <pre>{JSON.stringify(fields, null, 2)}</pre>
      <Button>Example button</Button>
    </div>
  );
}
