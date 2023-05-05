import Form from "react-bootstrap/Form";

function SelectComp({setProfession}) {
    
  return (
    <div
      style={{
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      }}
    >
      <Form.Select onChange={((e) => setProfession(e.target.value))} aria-label="Default select example" style={{ width: "50%" }}>
        <option value="default">סוג דיווח</option>
        <option value="clean">ניקיון</option>
        <option value="sewerage">ביוב</option>
        <option value="animals">חיות ובעלי חיים</option>
        <option value="construction">בינוי</option>
        <option value="roads">כבישים</option>
        <option value="electricity">חשמל</option>
      </Form.Select>
    </div>
  );
}

export default SelectComp;
