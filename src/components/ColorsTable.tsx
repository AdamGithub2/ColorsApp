import React, { useEffect, useState } from "react";
import { Color } from "../models/Color.model";
import ColorsTableItem from "./ColorsTableItem";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { checkColor } from "./ColorHelpers";

const styles = {
  colorsSection: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    paddingTop: 15,
  },
};

function ColorsTable() {
  //Default colors
  const colors: Color[] = [
    { hex: "#FF0000", default: true },
    { hex: "#00FF00", default: true },
    { hex: "#0000FF", default: true },
  ];

  const [colorsArray, setColorsArray] = useState<Color[]>(colors);
  const [inputValue, setInputValue] = React.useState("");
  const [validText, setValidText] = React.useState("");

  const [sortOption, setSortOption] = React.useState("");
  const [moreRed, setMoreRed] = React.useState<boolean>(false);
  const [moreGreen, setMoreGreen] = React.useState(false);
  const [moreBlue, setMoreBlue] = React.useState(false);
  const [moreSaturation, setMoreSaturation] = React.useState(false);

  useEffect(() => {
    const tempColor: Color[] = JSON.parse(
      localStorage.getItem("dataKey") || "[]"
    );
    setColorsArray(tempColor);
    console.log(tempColor);
  }, []);

  const onChangeHandlerValue = (event: any) => {
    setInputValue(event.target.value);
  };

  const addColorToArray = () => {
    validateInputs();
  };

  const validateInputs = () => {
    setValidText("");
    const regexp = /^#([a-f0-9]{6})$/i;
    if (
      regexp.test(inputValue) &&
      !colorsArray.some((item: Color) => item["hex"] === inputValue)
    ) {
      localStorage.setItem(
        "dataKey",
        JSON.stringify([...colorsArray, { hex: inputValue, default: false }])
      );
      setColorsArray((oldArray) => [
        ...oldArray,
        { hex: inputValue, default: false },
      ]);
    } else {
      setValidText(
        "Color exist or is incorrect, should contain # and 6 charts from 0 to F, example: #0099FF"
      );
    }
  };

  const removeFromListByName = (hex: string) => {
    const newList = colorsArray.filter((item: Color) => item.hex !== hex);
    setColorsArray(newList);
    localStorage.setItem("dataKey", JSON.stringify(newList));
  };

  function compare(hex1: Color, hex2: Color) {
    if (checkColor(hex1.hex, sortOption) > checkColor(hex2.hex, sortOption)) {
      return -1;
    }
    if (checkColor(hex2.hex, sortOption) > checkColor(hex1.hex, sortOption)) {
      return 1;
    }
    return 0;
  }

  return (
    <div style={{ padding: 20 }}>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Color hex value</Form.Label>
          <Form.Control
            type="text"
            placeholder="example: #FF00FF"
            onChange={onChangeHandlerValue}
            onFocus={() => setValidText("")}
            value={inputValue}
          />
          <Form.Text className="text-muted">{validText}</Form.Text>
        </Form.Group>
        <div className="d-grid gap-2">
          <Button
            type="button"
            variant="secondary"
            size="lg"
            onClick={() => addColorToArray()}
          >
            Add
          </Button>
        </div>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Sort</Form.Label>
          <Form.Select
            aria-label="Default select example"
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option>Select</option>
            <option value="R">{"Red"}</option>
            <option value="G">{"Green"}</option>
            <option value="B">{"Blue"}</option>
            <option value="S">{"Saturation"}</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Check
            inline
            label={"Red > 50%"}
            name="group1"
            type={"checkbox"}
            checked={moreRed}
            onChange={() => setMoreRed(!moreRed)}
          />
          <Form.Check
            inline
            label={"Green > 50%"}
            name="group1"
            type={"checkbox"}
            checked={moreGreen}
            onChange={() => setMoreGreen(!moreGreen)}
          />
          <Form.Check
            inline
            label={"Blue > 50%"}
            name="group1"
            type={"checkbox"}
            checked={moreBlue}
            onChange={() => setMoreBlue(!moreBlue)}
          />
          <Form.Check
            inline
            label={"Saturation > 50%"}
            name="group1"
            type={"checkbox"}
            checked={moreSaturation}
            onChange={() => setMoreSaturation(!moreSaturation)}
          />
        </Form.Group>
      </Form>

      <div style={styles.colorsSection as React.CSSProperties}>
        {colorsArray
          .filter((item: Color) =>
            moreRed ? checkColor(item.hex, "R") > 127 : true
          )
          .filter((item: Color) =>
            moreGreen ? checkColor(item.hex, "G") > 127 : true
          )
          .filter((item: Color) =>
            moreBlue ? checkColor(item.hex, "B") > 127 : true
          )
          .filter((item: Color) =>
            moreSaturation ? checkColor(item.hex, "S") > 50 : true
          )
          .sort(compare)
          .map((item: Color) => (
            <ColorsTableItem
              key={item.hex}
              data={item}
              removeItem={(hex: string) => removeFromListByName(hex)}
            />
          ))}
      </div>
    </div>
  );
}

export default ColorsTable;
