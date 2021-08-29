/* eslint-disable react/jsx-props-no-spreading */
import { Text, Padding, Input, Field as UIField } from '@/ui';
import { Field, useFormikContext } from 'formik';
import React, { ReactNode } from 'react';
import { FieldConfig } from '@/interfaces';

interface Props {
  fieldConfig: FieldConfig;
}

export function QuestionForm(props: Props): JSX.Element {
  const { fieldConfig } = props;

  const validate = (value: string): string => {
    let error;
    if (fieldConfig.isRequired && !value) {
      error = 'This field is required';
    }
    // eslint-disable-next-line radix
    if (fieldConfig.type === 'number' && !Number.isInteger(parseInt(value))) {
      error = 'Invalid value.';
    }
    return error;
  };

  const { values } = useFormikContext();
  const showInput = (fieldCfg: FieldConfig): boolean => {
    if (!fieldCfg.dependsOn) {
      return true;
    }
    return values[fieldCfg.dependsOn] === fieldCfg.dependsOnOption;
  };

  const changeInput = (e, name, field): void => {
    field.onChange({ target: { name, value: e } });
  };

  const renderInput = (type: string, field, meta): ReactNode => {
    switch (type) {
      case 'text':
      case 'textarea':
      case 'email':
      case 'phone':
      case 'number':
        return (
          <>
            <UIField
              fieldId={fieldConfig.id.toString()}
              label={fieldConfig.label}
              hint={fieldConfig.hint}
              error={meta.touched && meta.error}
            >
              <Input {...field} onChange={(e) => changeInput(e, fieldConfig.name, field)} />
            </UIField>
          </>
        );
      case 'radio':
        return fieldConfig.options.map((option) => {
          return (
            <div key={option.value}>
              <input
                type="radio"
                {...field}
                id={option.value}
                name={fieldConfig.name}
                value={option.value}
                checked={field.value === option.value}
              />
              {option.name && (
                <label htmlFor={option.value}>
                  <Text weight={600} color="dark" display="inline">
                    {option.name}
                  </Text>
                </label>
              )}
              <div>
                <Text weight={400} color="light">
                  {option.hint}
                </Text>
              </div>
            </div>
          );
        });

      case 'checkbox':
        if (field.options && field.options.length > 1) {
          return field.options.map((option) => {
            return (
              <>
                <input
                  type="checkbox"
                  {...field}
                  id={fieldConfig.name}
                  name={fieldConfig.name}
                  checked={option.value}
                />
                {option.name && (
                  <label htmlFor={fieldConfig.name}>
                    <Text weight={600} color="dark" display="inline">
                      {option.name}
                    </Text>
                  </label>
                )}
              </>
            );
          });
          // eslint-disable-next-line no-else-return
        } else {
          return (
            <>
              <input type="checkbox" {...field} id={fieldConfig.name} name={fieldConfig.name} checked={field.value} />
              {fieldConfig.label && (
                <label htmlFor={fieldConfig.name}>
                  <Text weight={600} color="dark" display="inline">
                    {fieldConfig.label}
                  </Text>
                </label>
              )}
            </>
          );
        }

      default:
        return <input type="text" {...field} />;
    }
  };

  return (
    <>
      {showInput(fieldConfig) && (
        <Field name={fieldConfig.name} validate={validate}>
          {({ field, meta }) => {
            return <Padding bottom={8}>{renderInput(fieldConfig.type, field, meta)}</Padding>;
          }}
        </Field>
      )}
    </>
  );
}
