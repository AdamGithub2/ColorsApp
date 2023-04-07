import React from "react";
import { Color } from "../models/Color.model";
import { Button } from "react-bootstrap";

type Props = { data: Color; removeItem: (hex: string) => void };

const ColorsTableItem = ({ data, removeItem }: Props) => {
  return (
    <div style={styles.wrapperColor as React.CSSProperties}>
      <div style={styles.rectangle as React.CSSProperties}>
        <div style={{ backgroundColor: data.hex, width: 30, height: 30 }}></div>
      </div>
      <div style={styles.contentWidth as React.CSSProperties}>
        {data.hex.toUpperCase()}
      </div>
      {!data.default ? (
        <Button
          className="btn btn-light btn-outline-dark"
          style={styles.button as React.CSSProperties}
          onClick={() => removeItem(data.hex)}
        >
          X
        </Button>
      ) : null}
    </div>
  );
};

const styles = {
  wrapperColor: {
    margin: 5,
    borderWidth: 1,
    borderColor: "black",
    borderStyle: "solid",
    borderRadius: 30,
    width: 180,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  rectangle: {
    margin: 10,
    borderStyle: "solid",
    borderWidth: 1,
    color: "black",
  },
  contentWidth: { width: 100 },
  button: { borderRadius: 20, borderWidth: 0, margin: 5 },
};

export default ColorsTableItem;
