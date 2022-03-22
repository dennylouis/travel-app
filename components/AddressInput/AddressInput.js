import { useState } from "react";
import { useCombobox } from "downshift";
import axios from "axios";
import Input from "../Input/Input";

// import { Field } from "formik";

// import styles from "./AddressInput.module.scss";
import styles from "../Input/Input.module.scss";

export default function AddressInput({
  locationDescription,
  locationCoordinates,
  locationPlaceID,
  name,
  type,
  onChange,
  label,
  placeholder,
}) {
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
      // console.log("htmldf", response.data.predictions);
      setInputItems(response.data.predictions);
    },

    onSelectedItemChange: async (props) => {
      const { selectedItem } = props;
      // console.log("selected", props);

      onChange({
        target: {
          name: "location_description",
          value: selectedItem.description,
        },
      });
      onChange({
        target: {
          name: "location_place_id",
          value: selectedItem.place_id,
        },
      });

      const response = await axios.post("/api/getLatLong", {
        address: selectedItem.description,
      });

      // console.log("lat long", response.data);

      onChange({
        target: {
          name: "location_coordinates",
          value: { ...response.data.results[0].geometry.location },
        },
      });
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
          value: locationDescription,
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
