const Contact = (props) => {
  function capitalizeFirstLetter(string) {
    if (!string) return string; // Check if the string is empty or undefined
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return (
    <>
      <div
        tabIndex="0"
        className={`hover:cursor-pointer flex w-[100%] items-center border rounded p-2 m-2 ${
          props.contact._id === props.receiver ? "bg-gray-800" : ""
        } `}
      >
        <img
          src={`http://localhost:3000/${props.contact.image}`}
          alt={props.contact.username}
          className="w-10 h-10 rounded-full"
        />

        <div className="ml-3">
          <h3 className="text-white font-bold font-custom text-[15px]">
            {capitalizeFirstLetter(props.contact.username)}
          </h3>
        </div>
      </div>
    </>
  );
};

export default Contact;
