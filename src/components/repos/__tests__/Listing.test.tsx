import { render, fireEvent, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import { RepoListing } from "../Listing";

test("renders <RepoListing /> component", async () => {
    const {container} = render(<RepoListing />);
    const listingContainer = container.getElementsByClassName('repo-listing');
    expect(listingContainer[0]).toBeInTheDocument();
});

test("renders loading state with repo listing", async () => {
    const { container } = render(<RepoListing />);
    const loaderElem = container.getElementsByClassName("react-loader");
    expect(loaderElem[0]).toBeInTheDocument();
})
