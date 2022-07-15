import React from "react";
import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";
import { TextField, SelectField, healthCheckRatingOption, formTypeOption, DiagnosisSelection } from "./FormField";
import { HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from "../types";
import { useStateValue } from "../state";
export type HealthCheckEntryFormValues = Omit<HealthCheckEntry, "id">;
export type OccupationalHealthcareEntryFormValues = Omit<OccupationalHealthcareEntry, "id">;
export type HospitalEntryFormValues = Omit<HospitalEntry, "id">;
export type EntryFormValues = HealthCheckEntryFormValues | OccupationalHealthcareEntryFormValues | HospitalEntryFormValues;

interface Props {
  onSubmit: (values: HealthCheckEntryFormValues) => void;
  onCancel: () => void;
}

const healthCheckRatingOptions: healthCheckRatingOption[] = [
  { value: 0, label: "Healthy" },
  { value: 1, label: "LowRisk" },
  { value: 2, label: "HighRisk" },
  { value: 3, label: "CriticalRisk" }
];

const formTypeOptions: formTypeOption[] = [
  { value: 'HealthCheck', label: "Health check" },
  { value: 'OccupationalHealthcare', label: "Occupational healthcare" },
  { value: 'Hospital', label: "Hospital" },
];

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {

  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        date: "",
        specialist: "",
        description: "",
        healthCheckRating: 0,
        type: "HealthCheck"
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.type) {
          errors.type = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.healthCheckRating && values.healthCheckRating !== 0) {
          errors.healthCheckRating = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <SelectField
              label="type"
              name="type"
              options={formTypeOptions}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <SelectField
              label="healthCheckRating"
              name="healthCheckRating"
              options={healthCheckRatingOptions}
            />
            <DiagnosisSelection
              diagnoses={diagnoses}
              setFieldTouched={setFieldTouched}
              setFieldValue={setFieldValue}
            />

            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
