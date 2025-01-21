import NotFound from "../../assets/404NotFound.png";
const error = () => {
  return (
    <div className="flex justify-center bg-yellow-100">
      <img src={NotFound} className="bg-transparent" />
    </div>
  );
};

export default error;
