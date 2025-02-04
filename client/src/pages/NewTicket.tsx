import { useEffect, useState } from "react";
import { RootState, useAppDispatch, useAppSelector } from "../app/store";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createTicket, reset } from "../features/ticket/ticketSlice";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";

const NewTicket = () => {
  const { user } = useAppSelector((state: RootState) => state.auth);
  const { isLoading, isError, isSuccess, message } = useAppSelector(
    (state: RootState) => state.tickets
  );
  const [name] = useState(user?.name);
  const [email] = useState(user?.email);
  const [product, setProduct] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      dispatch(reset());
      navigate("/tickets");
    }

    dispatch(reset());
  }, [dispatch, isError, isSuccess, message, navigate]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createTicket({ product, description }));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <BackButton url="/" />
      <section className="heading">
        <h1>Create New Ticket</h1>
        <p>Please fill out the form below</p>
      </section>

      <section className="form">
        <div className="form-group">
          <label htmlFor="name">Customer Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            disabled
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Customer Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            disabled
          />
        </div>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="product">Product </label>
            <select
              name="product"
              id="product"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            >
              <option value="iPhone">iPhone</option>
              <option value="Macbook Pro">Macbook Pro</option>
              <option value="iMac">iMac</option>
              <option value="iPad">iPad</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              className="form-control"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
};

export default NewTicket;
