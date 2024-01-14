import { render, waitFor, within } from "@testing-library/react";

import { RepoListing } from "../Listing";

test("Repo card is rendered", async() => {
    const { container } = render(<RepoListing />);
    // const loaderElem = container.getElementsByClassName("react-loader");
    const detailElem = container.getElementsByClassName("repo-detail");
    await waitFor(() => expect(detailElem[0]).toBeInTheDocument());
    
    const repoCards = container.getElementsByClassName("repo-card");
    await waitFor(() => expect(repoCards.length).toBeGreaterThan(0));
    const firstCard = repoCards[0];
    expect(within(firstCard as HTMLElement).getAllByAltText("User Avatar Image")[0]).toBeInTheDocument();
    expect(within(firstCard as HTMLElement).getByRole("button")).toBeInTheDocument();
})