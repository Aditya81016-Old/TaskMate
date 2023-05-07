import "../stylesheet/style.sass"

type props = {
    toggleFunction: () => void
    addFunction: () => Promise<void>

}

export default function AddCategory(props: props) {
    const {toggleFunction, addFunction} = props

  return (
    <div id="Add-Category" className="hidden">
      <div className="box">
        <h3>Create a new category</h3>

        <input type="text" name="text" id="category-name-input" placeholder="new category's name here" />


        <div className="button-group">
          <button className="secondary" onClick={toggleFunction}>Cancel</button>
          <button className="primary" onClick={addFunction}>Submit</button>
        </div>
      </div>
    </div>
  );
}
