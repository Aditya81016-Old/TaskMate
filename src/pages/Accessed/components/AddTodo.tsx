import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type props = {
  clickFucntion: VoidFunction;
};

export default function AddTodo(props: props) {
  const { clickFucntion } = props;

  return (
    <>
      <button
        onClick={clickFucntion}
        id="AddTodo"
        className="rounded-full w-14 h-14 fixed bottom-10 right-10 text-xl flex justify-center items-center bg-orange-600 text-white"
      >
        <FontAwesomeIcon icon={faAdd} />
      </button>
    </>
  );
}
