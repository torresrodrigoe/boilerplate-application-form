/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, ModalFooter, Padding, Title, Text, Flexbox } from '@/ui';
import { Formik, Form } from 'formik';
import React from 'react';
import { StepConfig } from '@/interfaces';
import { QuestionForm } from '../question-form';

interface Props {
  formConfig: StepConfig;
  model: any;
  onSubmit: Function;
  onBack: Function;
}

export function StepComponent(props: Props): JSX.Element {
  const { formConfig, onSubmit, onBack, model } = props;

  const handleSubmit = (values): void => {
    onSubmit(values);
  };

  return (
    <div>
      <Padding top={40} x={40}>
        <Title size={17} as="h1" marginBottom={8}>
          {formConfig.label}
        </Title>
        {formConfig.hint && <Text color="#546A83">{formConfig.hint}</Text>}
      </Padding>
      <Formik initialValues={model} onSubmit={handleSubmit} validateOnBlur>
        <Form id={formConfig.name}>
          <Padding y={16} x={40}>
            {formConfig.questions.map((field) => {
              return <QuestionForm fieldConfig={field} key={field.id} />;
            })}
          </Padding>
          <ModalFooter>
            <Flexbox alignItems="center" flex={1} justifyContent="space-between">
              <div>
                {formConfig.order > 0 && (
                  <Button type="button" size="secondary" onClick={() => onBack()}>
                    Back
                  </Button>
                )}
              </div>
              <div>
                <Button type="submit">Next</Button>
              </div>
            </Flexbox>
          </ModalFooter>
        </Form>
      </Formik>
    </div>
  );
}
