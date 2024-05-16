import classNames from 'classnames';
import './CustomUpload.scss';

type Props = {
  fileErrorText: string | undefined;
  hasFileError: boolean | undefined;
  fileName: string;
  handleFileChange: (file: File) => void;
  onBlur: (e: React.FocusEvent) => void;
};

export const CustomUpload: React.FC<Props> = ({
  hasFileError,
  fileName,
  onBlur,
  handleFileChange,
  fileErrorText,
}) => {
  return (
    <div
      className={classNames('upload', {
        'upload--error': hasFileError,
      })}
    >
      <label
        className={classNames('upload__btn', {
          'upload__btn--with-file': fileName,
        })}
        data-name={fileName}
      >
        <input
          name="file"
          className="upload__input"
          type="file"
          accept=".jpeg, .jpg"
          onChange={e =>
            e.currentTarget.files && handleFileChange(e.currentTarget.files[0])
          }
          onBlur={onBlur}
          required
        />
        Upload
      </label>
      {hasFileError && <p className="upload__error">{fileErrorText}</p>}
    </div>
  );
};
