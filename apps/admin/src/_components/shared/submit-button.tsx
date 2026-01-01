import { useFormStatus } from 'react-dom';
import { Button } from 'primereact/button';
import React from 'react';

const SubmitButton = ({ label, icon }: { label: string; icon: string }) => {
  const status = useFormStatus();
  return <Button disabled={status.pending} type="submit" label={label} icon={icon} />;
};

export default SubmitButton;
