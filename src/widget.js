import React, { useState } from 'react';
import Form from 'react-jsonschema-form';

// Custom RangeSlider widget
const RangeSliderWidget = ({ id, schema, value, onChange, readonly }) => {
  const [minValue, setMinValue] = useState(value[0] || schema.minimum || 0);
  const [maxValue, setMaxValue] = useState(value[1] || schema.maximum || 100);

  const handleChange = (e) => {
    const { value } = e.target;

    if (value[0] >= schema.minimum && value[1] <= schema.maximum) {
      setMinValue(value[0]);
      setMaxValue(value[1]);
      onChange([value[0], value[1]]);
    }
  };

  return (
    <div>
      <input
        type="range"
        id={id}
        value={[minValue, maxValue]}
        disabled={readonly}
        onChange={handleChange}
      />
      <div>
        <span>{minValue}</span>
        <span>{maxValue}</span>
      </div>
    </div>
  );
};

// JSON Schema for the form
const schema = {
  type: "object",
  properties: {
    priceRange: {
      type: "array",
      title: "Price Range",
      items: {
        type: "number",
      },
    },
  },
};


// Example usage of the custom range slider widget
function App() {
  const onSubmit = (formData) => {
    console.log("Form data:", formData);
  };

  return (
    <div>
      <h1>Custom Range Slider Widget</h1>
      <Form
        schema={schema}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default App;
