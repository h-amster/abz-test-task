import * as yup from 'yup';

const phoneRegex = /^\+380\d{9}$/;
const regExpRFC2822 =
  // eslint-disable-next-line max-len
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

export const validationSchema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .min(2, 'Name should be more than 2 characters length')
    .max(60, 'Name should be less tahn 60 characters length'),
  email: yup
    .string()
    .required('Email is required')
    .matches(regExpRFC2822, 'Email must be a valid email according to RFC2822'),
  phone: yup
    .string()
    .required('Phone is required')
    .matches(
      phoneRegex,
      'Phone number, should start with code of Ukraine +380 and be valid',
    ),
  position: yup.string(),
  file: yup
    .mixed()
    .required('Photo is required')
    .test('fileType', 'Only JPEG or JPG files are allowed', value => {
      const allowedFormats = ['image/jpeg', 'image/jpg'];

      return value instanceof File && allowedFormats.includes(value.type);
    })
    .test('fileSize', 'Image size must not exceed 5MB', value => {
      return value instanceof File && value.size <= 5242880;
    })
    .test('fileDimensions', 'Dimensions must be at least 70x70px', value => {
      if (value instanceof File) {
        const img = new Image();

        img.src = URL.createObjectURL(value);

        return new Promise(resolve => {
          img.onload = () => {
            resolve(img.width >= 70 && img.height >= 70);
          };
        });
      }
    }),
});
