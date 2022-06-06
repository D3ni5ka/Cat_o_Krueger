import React from "react";
import Form from "react-bootstrap/Form";
import selectStyle from "./Select.module.scss";

export interface Option {
  text: string;
  value: number | string;
}

interface Props {
  onChangeSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  value?: number | string;
  options: Option[];
  defaultValue?: string;
}

const Select: React.FC<Props> = ({
  onChangeSelect,
  value,
  options,
  defaultValue,
}) => {
  return (
    <div>
      <Form.Select
        className={selectStyle.select}
        onChange={(event) => onChangeSelect(event)}
        aria-label="Default select example"
        value={value}
        defaultValue={defaultValue}
      >
        {options.map((option) => (
          <option className={selectStyle.option} key={option.text} value={option.value}>
            {option.text}
          </option>
        ))}
      </Form.Select>
    </div>
  );
};

export default Select;
