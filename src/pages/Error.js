import { useRouteError } from "react-router-dom";

export default function Error() {
  const error = useRouteError();//it return the error thrown in the router elements
  let title = "An error occurred!";
  let message = "Something went wrong";
  if (error.status === 500) {
    message = error.data.message;
  }
  if (error.status === 400) {
    title = "Not found!";
    message = "could not find resource or page";
  }
  return <>
  <h1>{title}</h1>
  <p>{message}</p>
  </>
}
