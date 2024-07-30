import "./Header.css";
function Header(props) {
  const { value, onChange, onSubmit } = props;
  return (
    <header>
      <input
        type="text"
        value={value}
        placeholder="Search for Articles"
        onChange={(e) => {
          console.log({ inputObj: e });
          onChange(e.target.value);
        }}
      />
      <button onClick={onSubmit}>Submit</button>
    </header>
  );
}

export default Header;
