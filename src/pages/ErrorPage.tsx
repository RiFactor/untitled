import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex flex-col gap-4 p-2 py-40 text-center">
      <p>
        <strong>Oops...</strong> <br />
        the Page you are looking for isn't found.
      </p>
      <Link to="/" className="text-blue-400 hover:underline">
        Click here to go home and explore
      </Link>
    </div>
  );
};

export default ErrorPage;
