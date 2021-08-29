/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { StepComponent } from '../../components/step-component';
import { StepConfig, Flow } from '@/interfaces';
import { Modal, ModalBody } from '@/ui';

interface Props {
  flow: Flow;
}

const getModel = (form: StepConfig): any => {
  return form.questions.reduce((m, field) => {
    const updateM = { ...m };
    updateM[field.name] = undefined;
    if (field.initialValue) {
      updateM[field.name] = field.initialValue;
    }
    return updateM;
  }, {});
};

export function ApplicationForm(props: Props): JSX.Element {
  const { flow } = props;
  const [currentStep, setCurrentStep] = useState(0);
  const [openForm, setOpenForm] = useState(false);
  const [formValues, setFormValues] = useState(flow.steps.map(getModel));

  const handleSubmit = (values: any): void => {
    const newFormValues = [...formValues];
    newFormValues[currentStep] = values;
    setFormValues(newFormValues);
    if (currentStep === flow.steps.length - 1) {
      console.log('FINAL SUBMIT');
      console.log(newFormValues);
      return;
    }

    setCurrentStep(currentStep + 1);
  };
  const handleBack = (): void => {
    setCurrentStep(currentStep - 1);
  };

  const getSteps = (): React.ReactNode => {
    return flow.steps
      .filter((form) => form.order === currentStep)
      .map((form: StepConfig) => {
        return (
          <StepComponent
            formConfig={form}
            model={formValues[currentStep]}
            onSubmit={handleSubmit}
            onBack={handleBack}
            key={Math.random()}
          />
        );
      });
  };

  React.useEffect(() => {
    setOpenForm(true);
  }, []);

  return (
    <>
      <Modal
        isOpen={openForm}
        overlay={false}
        onToggle={() => {
          return false;
        }}
      >
        <ModalBody>{getSteps()}</ModalBody>
      </Modal>
    </>
  );
}
