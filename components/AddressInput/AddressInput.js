import { useState } from "react";
import { useCombobox } from "downshift";
import axios from "axios";
import Input from "../Input/Input";
// import { Field } from "formik";

// import styles from "./AddressInput.module.scss";
import styles from "../Input/Input.module.scss";

export default function AddressInput({ value, name, type, onChange, label, placeholder }) {
  const [inputItems, setInputItems] = useState([]);
  const {
    isOpen,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    items: inputItems,
    onInputValueChange: async ({ inputValue }) => {
      const response = await axios.post("/api/addressAutocomplete", {
        input: inputValue,
      });

      // const suggestions = response.data.predictions.map((result) => {
      //   return result;
      // });
      console.log("htmldf", response.data.predictions);
      setInputItems(response.data.predictions);
    },
    onSelectedItemChange: ({ inputValue }) => {
      const event = {
        target: {
          name,
          value: inputValue,
        },
      };
      onChange(event);
    },
  });

  return (
    <div className={styles.container} {...getComboboxProps()}>
      <label
        {...getLabelProps({
          htmlFor: name,
        })}
      >
        {label}
        {/* {required ? " * " : null} */}
        {/* {error ? <span style={{ color: "red" }}>{error}</span> : null} */}
      </label>

      {/* <Input name={name} type={type} label={label} placeholder={placeholder} /> */}

      <input
        {...getInputProps({
          type: "text",
          placeholder: placeholder,
          onChange: (e) => onChange(e),
          value,
          id: name,
          name,
        })}
      />

      <div {...getMenuProps()}>
        {isOpen && inputItems.length > 0 && (
          <div
          // className={styles.combobox}
          >
            {inputItems.map((item, index) => {
              const highlighted = highlightedIndex === index;
              return (
                <div
                  // className={`${styles.comboboxItem} ${
                  //   highlighted ? styles.highlightedComboboxItem : ""
                  // }`}
                  key={`${item}${index}`}
                  {...getItemProps({ item, index })}
                >
                  <p>{item.description}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
