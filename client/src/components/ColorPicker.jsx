import { SketchPicker } from "react-color";
import { useSnapshot } from "valtio";
import state from "../store";

export default function ColorPicker() {
  const snap = useSnapshot(state);

  return (
    <div className="absolute left-full ml-3">
      <SketchPicker
        color={snap.color}
        disableAlpha
        onChange={(color) => (state.color = color.hex)}
        // presetColors={[
        //   "#000000",
        //   "#E53935",
        //   "#D81B60",
        //   "#8E24AA",
        //   "#5E35B1",
        //   "#1E88E5",
        //   "#039BE5",
        //   "#00ACC1",
        //   "#00838F",
        //   "#43A047",
        //   "#7CB342",
        //   "#FDD835",
        //   "#FFAB00",
        //   "#FB8C00",
        //   "#F4511E",
        //   "#6D4C41",
        //   "#546E7A",
        //   "#455A64",
        //   "#37474F",
        //   "#263238",
        // ]}
      />
    </div>
  );
}
