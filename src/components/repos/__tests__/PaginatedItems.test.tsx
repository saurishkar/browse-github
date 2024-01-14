import { render, within } from "@testing-library/react"

import { PaginatedItems } from "../../PaginatedItems"

test("Pagination component is rendered", async() => {
    const { container } = render(<PaginatedItems currentPage={1} totalPages={50} onClickPage={() => console.log('click')} />);
    const elem = container.getElementsByClassName("pagination-container")
    expect(elem[0]).toBeInTheDocument();
})

test("Pagination has Previous and Next button", async() => {
    const { container } = render(<PaginatedItems currentPage={1} totalPages={50} onClickPage={() => console.log("clicked")} />);
    const leftBtn = within(container).getByText("Previous");
    expect(leftBtn).toBeInTheDocument();
    expect(leftBtn).toBeDisabled();
    const rightBtn = within(container).getByText("Next");
    expect(rightBtn).toBeInTheDocument();
    expect(rightBtn).toBeEnabled();
})