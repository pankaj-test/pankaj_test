import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import UniversityListing from "../UniversitiListing";
import UniversityListingController from "../UniversityListingController";
import { BrowserRouter } from "react-router-dom";

jest.mock("../UniversityListingController", () => ({
  fetchUniversities: jest.fn(),
}));

const renderWithRouter = (ui: React.ReactElement) => {
  return render(ui, { wrapper: BrowserRouter });
};

describe("UniversityListing Component", () => {
  it("renders without crashing", () => {
    renderWithRouter(<UniversityListing />);
  });

  test("should delete a university when delete button is clicked", async () => {
    const universities = [
      { name: "University 1", country: "Country 1" },
      { name: "University 2", country: "Country 2" },
    ];

    (UniversityListingController.fetchUniversities as jest.Mock).mockResolvedValue(
      universities
    );

    renderWithRouter(<UniversityListing />);

    await waitFor(() => {
      expect(screen.getByText('University 1')).toBeInTheDocument();
      expect(screen.getByText('University 2')).toBeInTheDocument();
    });

    const localStorageMock = jest.spyOn(window.localStorage.__proto__, "setItem");

    window.confirm = jest.fn(() => true);

    fireEvent.click(screen.getAllByText('Delete')[0]);

    await waitFor(() => {
      expect(screen.queryByText('University 1')).toBeNull();
      expect(localStorageMock).toHaveBeenCalledWith(
        'universities',
        JSON.stringify([{ name: 'University 2', country: 'Country 2' }])
      );
    });
  });

  it("displays the correct title for university list", () => {
    renderWithRouter(<UniversityListing />);
    const title = screen.getByRole("heading", { name: /Discover Universities/i });
    expect(title).toBeInTheDocument();
  });

  it("renders search bar", () => {
    renderWithRouter(<UniversityListing />);
    const searchBar = screen.getByRole("textbox");
    expect(searchBar).toBeInTheDocument();
  });

  it("renders sorting dropdown", () => {
    renderWithRouter(<UniversityListing />);
    const sortingDropdown = screen.getByText(/Sort/i);
    expect(sortingDropdown).toBeInTheDocument();
  });

  it("filters universities based on search term", async () => {
    const universities = [
      { name: "University 1", country: "Country 1" },
      { name: "University 2", country: "Country 2" },
    ];

    (UniversityListingController.fetchUniversities as jest.Mock).mockResolvedValue(
      universities
    );

    renderWithRouter(<UniversityListing />);

    await waitFor(() => {
      expect(screen.getByText('University 1')).toBeInTheDocument();
      expect(screen.getByText('University 2')).toBeInTheDocument();
    });

    const searchBar = screen.getByRole("textbox");
    fireEvent.change(searchBar, { target: { value: "University 1" } });

    await waitFor(() => {
      expect(screen.getByText('University 1')).toBeInTheDocument();
      expect(screen.queryByText('University 2')).toBeNull();
    });
  });
});
