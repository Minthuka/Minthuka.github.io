import { Form, useLoaderData, useFetcher, redirect } from "react-router-dom";
import { getContact, updateContact } from "../contacts";

// Loader function to fetch the contact data
export async function loader({ params }) {
    const contact = await getContact(params.contactId);
    if (!contact) {
      throw new Response("", {
        status: 404,
        statusText: "Not Found",
      });
    }
    return contact;
}

// Action function to handle updates to the contact (like favoriting)
export async function action({ request, params }) {
    const formData = await request.formData();
    const updates = {
        favorite: formData.get("favorite") === "true",
    };
    await updateContact(params.contactId, updates);
    return null;
}

// Action function to handle the deletion of a contact
export async function destroyAction({ params }) {
    await deleteContact(params.contactId);
    return redirect("/contacts"); // Redirect to the contacts list after deletion
}

// Contact component
export default function Contact() {
    const contact = useLoaderData(); // Use the loader data here

    return (
        <div id="contact">
            <div>
                <img
                    key={contact.avatar}
                    src={
                        contact.avatar ||
                        `https://robohash.org/${contact.id}.png?size=200x200`
                    }
                />
            </div>

            <div>
                <h1>
                    {contact.first || contact.last ? (
                        <>
                            {contact.first} {contact.last}
                        </>
                    ) : (
                        <i>No Name</i>
                    )}{" "}
                    <Favorite contact={contact} />
                </h1>

                {contact.twitter && (
                    <p>
                        <a
                            target="_blank"
                            href={`https://twitter.com/${contact.twitter}`}
                        >
                            {contact.twitter}
                        </a>
                    </p>
                )}

                {contact.notes && <p>{contact.notes}</p>}

                <div>
                    <Form action="edit">
                        <button type="submit">Edit</button>
                    </Form>
                    <Form
                        method="post"
                        action="destroy"
                        onSubmit={(event) => {
                            if (!confirm("Please confirm you want to delete this record.")) {
                                event.preventDefault();
                            }
                        }}
                    >
                        <button type="submit">Delete</button>
                    </Form>
                </div>
            </div>
        </div>
    );
}

// Favorite component to handle the favoriting functionality
function Favorite({ contact }) {
    const fetcher = useFetcher();
    const favorite = fetcher.formData
        ? fetcher.formData.get("favorite") === "true"
        : contact.favorite;

    return (
        <fetcher.Form method="post">
            <button
                name="favorite"
                value={favorite ? "false" : "true"}
                aria-label={
                    favorite
                        ? "Remove from favorites"
                        : "Add to favorites"
                }
            >
                {favorite ? "★" : "☆"}
            </button>
        </fetcher.Form>
    );
}
