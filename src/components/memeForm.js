//meme-form
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { postMeme, patchMeme } from "../utils/api";
import useForm from "../hooks/useForm";
import { ContentLoader } from "./loader";
import { validate } from "../utils/helper";

// Sets the initial data form form fields
const initialState = {
    name: "",
    caption: "",
    url: "",
};

export default function MemeForm({
    props,
    toast,
    addTheMeme,
    updateTheMeme,
    toggleForm,
}) {
    // If we are trying to update our meme
    let memeUpdated = false;
    let customErrors = {};

    const [loading, setLoading] = useState(false);

    // If props are being passed then our meme is getting updated
    if (props) {
        memeUpdated = true;
    }

    //Handles the submission or updation of meme based on the props
    const submitForm = async () => {
        setLoading(true);

        if (memeUpdated) {
            try {
                await patchMeme(props.id, values);
                updateTheMeme({ id: props.id, index: props.index });
            } catch (error) {
                toast.error(error.response.data.errorMessage);
            } finally {
                setLoading(false);
            }
        } else {
            try {
                const { id } = await postMeme(values);
                addTheMeme({ id });
            } catch (error) {
                toast.error(error.response.data.errorMessage);
            } finally {
                setLoading(false);
            }
        }
    };

    const { values, errors, handleChange, handleSubmit } = useForm(
        submitForm,
        validate,
        props ?? initialState,
        customErrors
    );

    return (
        <div>
            <div className="signup-container">
                <div className="left-container">
                    {/* Displays the meme if a URL is found in the values */}
                    {values?.url ? (
                        <div className="meme-preview">
                            <img
                                alt="meme"
                                src={values?.url}
                                onError={() => (customErrors.url = "Image url is invalid")}
                            />
                        </div>
                    ) : (
                            <div
                                className="meme-preview"
                                style={{ width: "100%", textAlign: "center" }}
                            >
                                <h2>MEME PREVIEW</h2>
                            </div>
                        )}
                </div>
                <div className="right-container">
                    <form className="addmeme-form" onSubmit={handleSubmit}>
                        <header>
                            <h1>Enter Meme Details</h1>
                            <div className="form-weight">
                                <div className="user-name">
                                    <label htmlFor="user-name">Name*</label>
                                    <input
                                        name="name"
                                        onChange={handleChange}
                                        id="user-name"
                                        placeholder="Enter your full name"
                                        value={values?.name || ""}
                                        disabled={memeUpdated}
                                        type="text"
                                    />
                                    {errors.name && (
                                        <p className="help is-danger">{errors.name}</p>
                                    )}
                                </div>
                            </div>
                            <div className="form-weight">
                                <div className="meme-caption">
                                    <label htmlFor="meme-caption">Caption*</label>
                                    <input
                                        name="caption"
                                        onChange={handleChange}
                                        id="meme-caption"
                                        placeholder="Enter the meme caption"
                                        value={values?.caption}
                                        type="text"
                                    />
                                    {errors.caption && (
                                        <p className="help is-danger">{errors.caption}</p>
                                    )}
                                </div>
                            </div>
                            <div className="form-weight">
                                <div className="meme-url">
                                    <label htmlFor="meme-url">Meme URL*</label>
                                    <input
                                        name="url"
                                        onChange={handleChange}
                                        id="meme-url"
                                        placeholder="Enter the meme url"
                                        value={values?.url}
                                        type="text"
                                    />
                                    {errors.url && <p className="help is-danger">{errors.url}</p>}
                                </div>
                            </div>
                        </header>
                        {loading ? <ContentLoader color="#e24c4c" /> :
                            (
                                <footer>
                                    <div className="set">
                                        <button
                                            className="cstm-btn close-btn"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                toggleForm();
                                            }}
                                        >Close</button>

                                        {memeUpdated ? (
                                            <input
                                                type="submit"
                                                value="Update"
                                                className="cstm-btn"
                                                id="submit"
                                            />
                                        ) : (
                                                <input
                                                    type="submit"
                                                    value="Submit"
                                                    className="cstm-btn"
                                                    id="submit"
                                                />
                                            )}
                                    </div>
                                </footer>
                            )}
                    </form>
                </div>
            </div>
        </div>
    );
}
