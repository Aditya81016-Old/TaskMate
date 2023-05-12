import "../stylesheet/style.sass";

type props = {
  toggleFunction: () => void;
  submitFunction: () => Promise<void>;
  id: string;
  title: string;
  placeholder: string;
  warning: string;
};

export default function InputPopup(props: props) {
  const { toggleFunction, submitFunction, id, title, placeholder, warning } =
    props;

  return (
    <div id={id} className="InputPopup hidden">
      <div className="box">
        <h3>{title}</h3>

        <input
          type="text"
          name="text"
          id={`${id}-input`}
          placeholder={placeholder}
        />
        <p className="warning fixed mt-24">{warning}</p>

        <div className="button-group">
          <button className="secondary" onClick={toggleFunction}>
            Cancel
          </button>
          <button className="primary" onClick={submitFunction}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
