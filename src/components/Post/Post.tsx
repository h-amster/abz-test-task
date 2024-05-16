import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { useFormik } from 'formik';
import './Post.scss';
import { Container } from '../Container/Container';
import { useEffect, useState } from 'react';
import { httpClient } from '../../utils/httpClient';
import { Position } from '../../types/Position';
import { Loader } from '../Loader/Loader';
import { validationSchema } from '../../utils/validationSchema';
import { Success } from '../Success/Success';
import { CustomInput } from '../CustomInput/CustomInput';
import { CustomUpload } from '../CustomUpload/CustomUpload';

type Props = {
  resetUsers: () => void;
};

export const Post: React.FC<Props> = ({ resetUsers }) => {
  const [positionsFromServer, setPositionsFromServer] = useState<Position[]>(
    [],
  );
  const [isPosLoading, setIsPosLoading] = useState(false);
  const [isRegSuccess, setIsRegSuccess] = useState(false);
  const [isFormDataLoadig, setIsFormDataLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      position: null,
      file: null,
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      const data = new FormData();

      data.append('name', values.name);
      data.append('email', values.email);
      data.append('phone', values.phone);
      data.append('position_id', `${values.position}`);
      data.append('photo', values.file as never);

      setIsFormDataLoading(true);

      httpClient
        .registerUser(data)
        .then(() => {
          resetUsers();
          setIsRegSuccess(true);
        })
        // eslint-disable-next-line no-console
        .catch(err => console.log(err))
        .finally(() => setIsFormDataLoading(false));
    },
  });

  const hasNameError = formik.touched.name && !!formik.errors.name;
  const hasEmailError = formik.touched.email && !!formik.errors.email;
  const hasPhoneError = formik.touched.phone && !!formik.errors.phone;
  const hasFileError = formik.touched.file && !!formik.errors.file;

  const fileName = formik.values.file
    ? (formik.values.file as { name: string }).name
    : 'Upload your photo';
  const nameErrorText = formik.touched.name && formik.errors.name;
  const emailErrorText = formik.touched.email && formik.errors.email;
  const fileErrorText = formik.errors.file;
  const phoneHelperText = formik.touched.phone && formik.errors.phone;

  const isBtnDisabled =
    !!formik.errors.name ||
    !!formik.errors.email ||
    !!formik.errors.phone ||
    !!formik.errors.file ||
    !formik.touched.name ||
    !formik.touched.email ||
    !formik.touched.phone ||
    !formik.touched.file;

  useEffect(() => {
    setIsPosLoading(true);

    httpClient
      .getPositions()
      .then(positions => {
        setPositionsFromServer(positions);
        formik.setFieldValue('position', positions[0].id);
        setIsPosLoading(false);
      })
      // eslint-disable-next-line no-console
      .catch(err => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFileChange = (file: File) => formik.setFieldValue('file', file);

  return (
    <section className="post" id="post">
      <Container>
        {!isRegSuccess ? (
          <>
            <h2 className="post__title">Working with POST request</h2>

            {isFormDataLoadig ? (
              <Loader className="post__form-loader" />
            ) : (
              <form className="post__form" onSubmit={formik.handleSubmit}>
                <fieldset className="post__group post__group--inputs">
                  <CustomInput
                    name="name"
                    label="Your name"
                    value={formik.values.name}
                    error={hasNameError}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={nameErrorText}
                  />

                  <CustomInput
                    name="email"
                    label="Email"
                    value={formik.values.email}
                    error={hasEmailError}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={emailErrorText}
                  />

                  <CustomInput
                    name="phone"
                    label="Phone"
                    value={formik.values.phone}
                    error={hasPhoneError}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={phoneHelperText}
                  />
                </fieldset>

                <fieldset className="post__group post__group--radio">
                  <h2 className="post__radio-title">Select your position</h2>
                  {isPosLoading ? (
                    <Loader />
                  ) : (
                    <RadioGroup
                      name="position"
                      className="post__radio-group"
                      value={formik.values.position}
                      onChange={formik.handleChange}
                    >
                      {positionsFromServer.map(pos => (
                        <FormControlLabel
                          key={pos.id}
                          value={pos.id}
                          control={<Radio className="post__radio-btn" />}
                          label={pos.name}
                        />
                      ))}
                    </RadioGroup>
                  )}
                </fieldset>

                <CustomUpload
                  fileErrorText={fileErrorText}
                  hasFileError={hasFileError}
                  fileName={fileName}
                  onBlur={formik.handleBlur}
                  handleFileChange={handleFileChange}
                />

                <button
                  className="post__submit"
                  type="submit"
                  disabled={isBtnDisabled}
                >
                  Sign up
                </button>
              </form>
            )}
          </>
        ) : (
          <Success />
        )}
      </Container>
    </section>
  );
};
